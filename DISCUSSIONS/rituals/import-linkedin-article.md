# Import LinkedIn Article Ritual

When the user says **"import [LINKEDIN URL]"**, follow these steps.

## Step 1: Ensure branch

- [ ] If on `main`, create and switch to a branch (e.g. `import-linkedin-article`).
- [ ] If already on a feature branch, continue on it.

## Step 2: Fetch the article

Run:
```
python3 fetch_article.py "<URL>" /tmp/article-raw.md \
  --img-dir assets/img/pretensions \
  --img-prefix /assets/img/pretensions/
```

This downloads the HTML, extracts article content as markdown, downloads images locally, and cleans LinkedIn tracking/redirect URLs.

## Step 3: Review the raw fetch

Read `/tmp/article-raw.md` and identify:

- **Title** — from the `# heading` or meta info at the top
- **Date** — from the meta info (format: YYYY-MM-DD)
- **Description/excerpt** — from the meta `Description:` line, or write a short one
- **Cover image** — usually the first `![...]()` image, with a caption line after it (often italic)
- **LinkedIn noise** — look for "Recommended by LinkedIn" sections (block of linked article recommendations with names and dates). These must be removed entirely.

## Step 4: Build the post file

Create `_pretensions/YYYY-MM-DD-kebab-case-title.md` with:

1. **Frontmatter** from the extracted info:
   ```yaml
   ---
   layout: post
   title: "Article Title Here"
   date: YYYY-MM-DD HH:MM
   categories: []
   sequence: N
   excerpt: >
     Short description here.
   original_url: <the LinkedIn URL>
   cover_image: /assets/img/pretensions/FILENAME
   cover_image_caption: "Caption text here."
   ---
   ```
   - `sequence`: next unused number in the collection (check existing posts)
   - `cover_image` and `cover_image_caption`: extracted from the article body (see step 3)

2. **Article body**: everything after the script header (`# Title`, meta lines, `---`), with these cleanups:
   - Remove the cover image and caption from the body (now in frontmatter)
   - Remove any "Recommended by LinkedIn" sections entirely
   - Clean up whitespace-only lines and collapse 3+ blank lines to 2
   - Fix numbered items that aren't true markdown lists: if numbered points (e.g. `1. Some criticism...`) are separated by paragraphs of discussion, convert `N. ` to `**N.** ` so they render with correct numbers instead of all showing as "1."

## Step 5: Build and verify

- [ ] Run `bundle exec jekyll build` — must succeed
- [ ] Tell the user to check the article locally (`bundle exec jekyll serve`)

## Step 6: Present for review

Show the user a summary:
- Title, date, filename
- Number of images downloaded
- Any issues found (noise sections removed, numbering fixes, etc.)
- Ask if they want to commit or make further adjustments

## Notes

- **Do not commit or push** without explicit user approval.
- The `fetch_article.py` script uses BeautifulSoup to parse HTML and converts to markdown. It does not use AI summarisation — the text is preserved verbatim.
- LinkedIn auth walls may block some URLs. The `?trk=public_post_feed-article-content` URL format works for public articles viewed in incognito.
- Images are named by content hash (MD5) to avoid duplicates.
