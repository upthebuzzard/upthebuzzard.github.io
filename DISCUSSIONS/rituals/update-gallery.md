# Update Gallery Ritual

Add new article images to the homepage gallery and regenerate thumbnails.

Invoked from `deploy.md` when the gallery freshness check finds images added since `_data/gallery.yml` was last updated. Can also be run standalone when the user says "update the gallery" or similar.

## Step 1: Identify candidate images

Get the last commit that touched the gallery data:

```
git log -1 --format=%H -- _data/gallery.yml
```

List image files under `assets/img/` (excluding `assets/img/thumbnails/`) that were added in commits after that SHA:

```
git diff --name-only --diff-filter=A <last-gallery-sha>..HEAD -- 'assets/img/'
```

Filter out anything under `thumbnails/`. Extract `src:` entries from `_data/gallery.yml` and remove any candidates that are already listed there.

Report: list of candidate image paths, or "No new images found" and stop.

## Step 2: Classify each candidate

For each candidate image, propose an entry with four fields:

- `src` — the `/assets/img/...` path (verbatim from the file)
- `alt` — descriptive alt text (infer from filename, surrounding post, or ask the user)
- `link` — the URL of the post or collection the image belongs to (find by searching posts for the filename)
- `group` — one of: `stories`, `predicting_the_present`, `pretensions`, `hobbies`, `other` (based on which collection the image belongs to)

Present all proposed entries to the user in one batch and ask them to:
- Confirm the batch, or
- Edit any fields, or
- Exclude specific images from the gallery

## Step 3: Update gallery.yml

Append the confirmed entries to `_data/gallery.yml`. Keep the existing ordering (entries grouped by collection); append each new entry into its matching group block.

## Step 4: Regenerate thumbnails

```
./scripts/generate_thumbnails.sh
```

The script skips thumbnails that already exist and only generates new ones. Confirm the expected count of new thumbnails was created.

## Step 5: Verify

- [ ] Run `bundle exec jekyll build --quiet` — no errors.
- [ ] Grep the built `_site/index.html` for the new thumbnail paths to confirm they render.
- [ ] Confirm no 404s: every `src` in `gallery.yml` has a matching file under `assets/img/thumbnails/`.

## Step 6: Commit

Stage `_data/gallery.yml` and the new thumbnails under `assets/img/thumbnails/`. Ask the user to confirm before committing.

Commit message: `Add gallery entries for <N> new images`

Report: number of entries added, number of thumbnails generated, commit SHA.
