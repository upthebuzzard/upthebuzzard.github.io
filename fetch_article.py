#!/usr/bin/env python3
"""Fetch a URL and extract article content as clean markdown.

Usage: python3 fetch_article.py <url> [output_file] [--img-dir DIR] [--img-prefix PREFIX]

Options:
  --img-dir DIR       Directory to save downloaded images
  --img-prefix PREFIX Path prefix for image references in markdown
                      (e.g. /assets/img/pretensions/)

Outputs markdown to stdout, or to output_file if specified.
"""

import sys
import os
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import re
import hashlib
import mimetypes


def fetch_html(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                       'AppleWebKit/537.36 (KHTML, like Gecko) '
                       'Chrome/120.0.0.0 Safari/537.36',
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode('utf-8', errors='replace')


def download_image(url, img_dir):
    """Download an image and return the local path, or None on failure."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                           'AppleWebKit/537.36 (KHTML, like Gecko) '
                           'Chrome/120.0.0.0 Safari/537.36',
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            content_type = resp.headers.get('Content-Type', '')

        # Determine extension from content type
        ext = mimetypes.guess_extension(content_type.split(';')[0].strip()) or ''
        if ext == '.jpe':
            ext = '.jpg'
        if not ext:
            # Try from URL path
            path = urllib.parse.urlparse(url).path
            _, ext = os.path.splitext(path)
        if not ext:
            ext = '.jpg'  # fallback

        # Name based on content hash to avoid duplicates
        name = hashlib.md5(data).hexdigest()[:12] + ext
        os.makedirs(img_dir, exist_ok=True)
        local_path = os.path.join(img_dir, name)
        with open(local_path, 'wb') as f:
            f.write(data)
        print(f'  Downloaded image: {name} ({len(data)} bytes)', file=sys.stderr)
        return local_path
    except Exception as e:
        print(f'  Failed to download image: {e}', file=sys.stderr)
        return None


def clean_linkedin_url(href):
    """Strip LinkedIn redirect wrappers and tracking params."""
    # LinkedIn wraps external links in a redirect
    if '/redir/redirect?' in href:
        parsed = urllib.parse.urlparse(href)
        params = urllib.parse.parse_qs(parsed.query)
        if 'url' in params:
            href = params['url'][0]
    # Strip tracking params
    parsed = urllib.parse.urlparse(href)
    params = urllib.parse.parse_qs(parsed.query)
    params.pop('trk', None)
    params.pop('trackingId', None)
    clean_query = urllib.parse.urlencode(
        {k: v[0] for k, v in params.items()}, quote_via=urllib.parse.quote)
    href = urllib.parse.urlunparse(
        parsed._replace(query=clean_query if clean_query else ''))
    return href


# Global state for image downloading (set by extract_article)
_img_dir = None
_img_path_prefix = None


def element_to_markdown(el, depth=0):
    """Recursively convert an HTML element to markdown."""
    if el.name is None:  # NavigableString (text node)
        return el.string or ''

    # Skip non-visible elements
    if el.name in ('script', 'style', 'nav', 'header', 'footer', 'noscript',
                    'svg', 'button', 'form', 'input'):
        return ''

    # Recurse into children
    children_md = ''.join(element_to_markdown(c, depth) for c in el.children)

    if el.name in ('h1',):
        return f'\n# {children_md.strip()}\n\n'
    if el.name in ('h2',):
        return f'\n## {children_md.strip()}\n\n'
    if el.name in ('h3',):
        return f'\n### {children_md.strip()}\n\n'
    if el.name in ('h4',):
        return f'\n#### {children_md.strip()}\n\n'
    if el.name in ('h5', 'h6'):
        return f'\n##### {children_md.strip()}\n\n'
    if el.name == 'p':
        text = children_md.strip()
        if text:
            return f'\n{text}\n\n'
        return ''
    if el.name == 'blockquote':
        lines = children_md.strip().split('\n')
        quoted = '\n'.join(f'> {line}' for line in lines)
        return f'\n{quoted}\n\n'
    if el.name in ('ul',):
        return f'\n{children_md}\n'
    if el.name in ('ol',):
        return f'\n{children_md}\n'
    if el.name == 'li':
        text = children_md.strip()
        # Check if parent is ol
        if el.parent and el.parent.name == 'ol':
            idx = 1
            for sib in el.parent.children:
                if sib == el:
                    break
                if getattr(sib, 'name', None) == 'li':
                    idx += 1
            return f'{idx}. {text}\n'
        return f'- {text}\n'
    if el.name == 'strong' or el.name == 'b':
        text = children_md.strip()
        if text:
            return f'**{text}**'
        return ''
    if el.name == 'em' or el.name == 'i':
        text = children_md.strip()
        if text:
            return f'*{text}*'
        return ''
    if el.name == 'a':
        href = el.get('href', '')
        text = children_md.strip()
        if href and text:
            href = clean_linkedin_url(href)
            return f'[{text}]({href})'
        return text
    if el.name == 'br':
        return '\n'
    if el.name == 'hr':
        return '\n---\n\n'
    if el.name == 'img':
        alt = el.get('alt', '')
        src = el.get('src', '') or el.get('data-src', '') or el.get('data-delayed-url', '')
        if src and _img_dir:
            local_path = download_image(src, _img_dir)
            if local_path:
                # Use the prefix for markdown path (e.g. /assets/img/pretensions/)
                filename = os.path.basename(local_path)
                md_path = f'{_img_path_prefix}{filename}' if _img_path_prefix else local_path
                return f'\n![{alt}]({md_path})\n\n'
        if src:
            return f'\n![{alt}]({src})\n\n'
        return ''
    if el.name == 'figure':
        return f'\n{children_md}\n'
    if el.name == 'figcaption':
        text = children_md.strip()
        if text:
            return f'*{text}*\n\n'
        return ''
    if el.name == 'pre':
        code = el.get_text()
        return f'\n```\n{code}\n```\n\n'
    if el.name == 'code':
        return f'`{children_md}`'
    if el.name == 'div' or el.name == 'section' or el.name == 'article':
        return children_md
    if el.name == 'span':
        return children_md

    # Default: just return children
    return children_md


def extract_article(html, img_dir=None, img_path_prefix=None):
    """Try to find and extract the main article content."""
    global _img_dir, _img_path_prefix
    _img_dir = img_dir
    _img_path_prefix = img_path_prefix

    soup = BeautifulSoup(html, 'html.parser')

    # Try common article containers in order of specificity
    article = None
    for selector in ['article', '[role="main"]', '.article-content',
                     '.post-content', '.entry-content', 'main',
                     '.pulse-article', '.article__content']:
        article = soup.select_one(selector)
        if article:
            break

    if not article:
        # Fallback: use body
        article = soup.find('body') or soup

    # Extract title
    title = ''
    title_el = soup.find('h1') or soup.find('title')
    if title_el:
        title = title_el.get_text().strip()

    # Extract meta info
    meta = {}
    for tag in soup.find_all('meta'):
        prop = tag.get('property', '') or tag.get('name', '')
        content = tag.get('content', '')
        if prop and content:
            meta[prop] = content

    date = (meta.get('article:published_time', '') or
            meta.get('datePublished', '') or
            meta.get('date', ''))
    # LinkedIn sometimes puts datePublished outside of meta tags
    if not date:
        for tag in soup.find_all(attrs={'name': 'datePublished'}):
            date = tag.get('content', '')
        if not date:
            # Try finding it as text content in a meta-like tag
            import json
            for script in soup.find_all('script', type='application/ld+json'):
                try:
                    data = json.loads(script.string)
                    if isinstance(data, dict):
                        date = data.get('datePublished', '')
                except (json.JSONDecodeError, TypeError):
                    pass
    author = meta.get('author', '') or meta.get('article:author', '')
    description = meta.get('og:description', '') or meta.get('description', '')

    # Convert to markdown
    md = element_to_markdown(article)

    # Remove "Recommended by LinkedIn" sections (noise)
    md = re.sub(r'## Recommended by LinkedIn.*?(?=\n##[^#]|\n###[^#]|\Z)',
                '', md, flags=re.DOTALL)

    # Clean up whitespace-only lines
    md = re.sub(r'\n[ \t]+\n', '\n\n', md)

    # Clean up excessive blank lines
    md = re.sub(r'\n{3,}', '\n\n', md)

    # Convert image+caption pairs to <figure> elements
    # Pattern: ![alt](src)\n\n*caption text*
    def img_to_figure(m):
        alt = m.group(1)
        src = m.group(2)
        caption = m.group(3)
        return (f'\n<figure>\n'
                f'  <img src="{src}" alt="{alt}">\n'
                f'  <figcaption>{caption}</figcaption>\n'
                f'</figure>\n')

    md = re.sub(r'\n!\[([^\]]*)\]\(([^)]+)\)\n+\*([^*]+)\*',
                img_to_figure, md)

    md = md.strip()

    # Build output
    output_parts = []
    if title:
        output_parts.append(f'# {title}\n')
    if author:
        output_parts.append(f'**Author:** {author}')
    if date:
        output_parts.append(f'**Date:** {date}')
    if description:
        output_parts.append(f'**Description:** {description}')
    if output_parts:
        output_parts.append('\n---\n')

    output_parts.append(md)
    return '\n'.join(output_parts)


def main():
    args = sys.argv[1:]
    url = None
    outfile = None
    img_dir = None
    img_prefix = None

    i = 0
    while i < len(args):
        if args[i] == '--img-dir' and i + 1 < len(args):
            img_dir = args[i + 1]
            i += 2
        elif args[i] == '--img-prefix' and i + 1 < len(args):
            img_prefix = args[i + 1]
            if not img_prefix.endswith('/'):
                img_prefix += '/'
            i += 2
        elif url is None:
            url = args[i]
            i += 1
        elif outfile is None:
            outfile = args[i]
            i += 1
        else:
            i += 1

    if not url:
        print(f'Usage: {sys.argv[0]} <url> [output_file] [--img-dir DIR] [--img-prefix PREFIX]',
              file=sys.stderr)
        sys.exit(1)

    print(f'Fetching {url}...', file=sys.stderr)

    html = fetch_html(url)
    print(f'Got {len(html)} bytes, extracting article...', file=sys.stderr)

    markdown = extract_article(html, img_dir=img_dir, img_path_prefix=img_prefix)

    if outfile:
        with open(outfile, 'w') as f:
            f.write(markdown)
        print(f'Written to {outfile}', file=sys.stderr)
    else:
        print(markdown)


if __name__ == '__main__':
    main()
