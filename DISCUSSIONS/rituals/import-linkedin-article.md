# Import LinkedIn Article Ritual

When the user says **"import [LINKEDIN URL]"**, follow these steps.

## Step 1: Ensure branch

- [ ] If on `main`, create and switch to a branch (e.g. `import-linkedin-article`).
- [ ] If already on a feature branch, continue on it.

## Step 2: Clean and verify the URL

LinkedIn URLs copied from a logged-in session may include tracking parameters or redirects. Before fetching:

1. **Strip query parameters** — remove everything from `?` onwards (e.g. `?trk=...`, `?trackingId=...`)
2. **Strip trailing slashes** — the script works with or without, but keep URLs consistent
3. **Verify the format** — the URL should look like: `https://www.linkedin.com/pulse/slug-here`
   - If it's a feed/activity URL (e.g. `linkedin.com/feed/update/urn:li:activity:...`), open it in an incognito browser to find the canonical `/pulse/` URL
4. **Test accessibility** — run `curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" "<URL>"` — should return `200`. If it returns `403` or `999`, the article may be auth-walled; try appending `?trk=public_post_feed-article-content`.

## Step 3: Fetch the article

Run:
```
python3 scripts/fetch_article.py "<URL>" /tmp/article-raw.md \
  --img-dir assets/img/pretensions \
  --img-prefix /assets/img/pretensions/
```

The script will:
- Download the HTML and extract article content as clean markdown
- Download all images locally (including lazy-loaded `data-delayed-url` images)
- Clean LinkedIn tracking/redirect URLs from links
- Strip "Recommended by LinkedIn" noise sections
- Convert image+caption pairs to `<figure>`/`<figcaption>` elements
- Clean up whitespace (collapse blank lines)
- Output metadata: title, date, description

## Step 4: Review the raw fetch

Read `/tmp/article-raw.md` and identify:

- **Title** — from the `# heading` at the top
- **Date** — from the `**Date:**` line. If missing, extract manually from HTML meta tags
- **Description/excerpt** — from the `**Description:**` line, or write a short one
- **Cover image** — usually the first `<figure>` element, with a `<figcaption>`
- **Unwanted images** — the script downloads ALL images including LinkedIn UI elements (profile photos, reaction icons, recommendation thumbnails). Check `assets/img/pretensions/` for small/irrelevant images and delete them.
- **Residual noise** — verify "Recommended by LinkedIn" sections were fully removed. If not, note the text before and after the noise for manual removal.

## Step 5: Build the post file

Create `_pretensions/YYYY-MM-DD-kebab-case-title.md` with:

1. **Frontmatter** from the extracted info:
   ```yaml
   ---
   layout: post
   title: "Article Title Here"
   date: YYYY-MM-DD HH:MM
   categories: []
   topics: [Topic Name]
   sequence: N
   excerpt: >
     Short description here.
   original_url: <the LinkedIn URL>
   cover_image: /assets/img/pretensions/FILENAME
   cover_image_caption: "Caption text here."
   ---
   ```
   - `topics`: one or more topic tags (e.g. `[Strategy]`, `[Product Strategy]`, `[AI]`, `[Thinking]`). Used for grouping on the pretensions landing page and topic nav links. Check existing posts for current topics.
   - `sequence`: next unused number in the collection (check existing posts)
   - `cover_image` and `cover_image_caption`: extracted from the first `<figure>` in the body, then remove that figure from the body

2. **Article body**: everything after the script header (`# Title`, meta lines, `---`), with these cleanups:
   - Remove the cover image/figure from the body (now in frontmatter)
   - Fix numbered items that aren't true markdown lists: if numbered points (e.g. `1. Some criticism...`) are separated by paragraphs of discussion, convert `N. ` to `**N.** ` so they render with correct numbers instead of all showing as "1."

## Step 6: Cross-link check

After creating the post file, check if any **existing** pretensions articles contain LinkedIn URLs that point to the newly imported article. If so, update them to use local site paths.

```
grep -r "linkedin.com.*pulse" _pretensions/ | grep -v "original_url"
```

The local URL pattern is: `/pretensions/YYYY-MM-DD-slug.html`

## Step 7: Build and verify

- [ ] Run `bundle exec jekyll build` — must succeed
- [ ] Tell the user to check the article locally (`bundle exec jekyll serve`)

## Step 8: Present for review

Show the user a summary:
- Title, date, filename
- Number of article images kept (cover + inline)
- Number of junk images removed
- Cross-links updated (if any)
- Any other issues found (numbering fixes, residual noise, etc.)
- Ask if they want to commit or make further adjustments

## Notes

- **Do not commit or push** without explicit user approval.
- The `fetch_article.py` script uses BeautifulSoup to parse HTML and converts to markdown. It does not use AI summarisation — the text is preserved verbatim.
- Images are named by content hash (MD5) to avoid duplicates across articles.
- LinkedIn lazy-loads most images using `data-delayed-url` instead of `src` — the script handles this.
