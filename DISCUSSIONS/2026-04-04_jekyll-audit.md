# Jekyll Audit — 2026-04-04

A systematic review of how Jekyll is used across the site, looking for bad practices, fragilities, and risks for future content/functionality changes.

## Summary

The Jekyll setup is mature and GitHub Pages-compliant. No show-stoppers, but there are several **repeated patterns**, **fragile logic**, and **accidental outputs** that create maintenance risk and could bite on new articles or functionality changes.

---

## 1. CRITICAL: `door_sign_include.html` is published as a standalone page

**File**: `_moose_and_goose_stories/door_sign_include.html`

Because `moose_and_goose_stories` has `output: true`, Jekyll outputs *every* file in the collection — including this include fragment. It's live at `/moose_and_goose_stories/door_sign_include.html` as a raw HTML snippet with no layout, no `<html>` tag, no `<head>`.

**Risk**: Looks broken if crawled/indexed. Any future non-post files added to a collection directory will also be accidentally published.

**Fix options**:
- Move it to `_includes/door_sign.html` and switch from `include_relative` to `include` (would need `variant` parameter support — already works)
- Or add `published: false` in frontmatter (but the file has no frontmatter currently)

---

## 2. HIGH: Background image resolution logic is duplicated 4 times

The cascade "site default → collection → page" for `background_image_url` is copy-pasted identically in:
- `_includes/head.html` (lines 27-36)
- `_includes/porthole.html` (lines 24-33)
- `_includes/contextual-nav.html` (lines 88-97)
- `_includes/head-twitter.html` + `_includes/head-facebook.html` (similar cascade for og:image)

If you add a new level to the cascade (e.g. zone-level backgrounds), you'd need to update 4-5 places.

**Fix**: Extract to a single include like `resolve-background-image.html` that sets the variable once.

---

## 3. HIGH: `collection_prev_next.html` matches by title, not URL

**File**: `_includes/collection_prev_next.html:41`
```liquid
{% if links.title == page.title %}
```

If two posts in the same collection share the same title, prev/next navigation will break (it'll match the first one found). This also affects `contextual-nav.html` lines 44 and 77 which use the same pattern.

**Risk**: Adding a new post with a duplicate title (e.g. "VWG Tweet Challenge" appears 7 times in `predicting_the_present`) will silently break navigation for those posts.

**Fix**: Match on `links.url == page.url` instead of title.

---

## 4. HIGH: Pretensions topic deduplication is fragile (string `contains`)

**Files**: `top-nav.html:24`, `_pretensions/index.md:24`

```liquid
{% unless topic_list contains topic %}
```

This uses Liquid's string `contains`, not array `contains`. If one topic is a substring of another (e.g. "AI" and "AI Strategy"), the shorter one could be silently dropped because the string "AI" is contained in "AI|AI Strategy".

**Risk**: Adding a topic like "Strategy" when "AI Strategy" exists, or "AI" when any topic contains "AI", will silently lose topics from nav and index.

**Fix**: Check with delimiters: `{% assign check = topic_list | append: "|" %}{% unless check contains topic | prepend: "|" %}` or build a proper array.

---

## 5. MEDIUM: `post.html` has an unclosed `<div>` / conditional structure issue

**File**: `_layouts/post.html:33-52`

The `post-content` div is opened at line 33 and closed at line 47, but the closing `</div>` and the `post-content-details` div are *inside* the `{% if page.collection != 'posts' %}` block. For the built-in `posts` collection, the `post-content` div is never closed.

```
line 33:   <div class="post-content">   ← opened always
line 38:     {% if page.collection != 'posts' %}
line 47:   </div>                        ← closed only for collections
line 52:   {% endif %}
```

**Risk**: Broken HTML for any post in the default `posts` collection. Currently harmless because you don't use `posts`, but if you ever do, layout breaks.

---

## 6. ~~MEDIUM: RSS feeds missing for 4 collections~~ FIXED

Created `feed.xml` in `_games/`, `_haiku/`, `_hifi/`, and `_pretensions/`, using the same `collection_feed.xml` include as the existing collections.

---

## 7. ~~MEDIUM: `get-zone.html` is included multiple times per page render~~ FIXED

Moved `get-zone.html` call to `default.html` (once, before all other includes). Removed redundant calls from `top-nav.html`, `footer.html`, `page.html`, and `by-author.html`.

---

## 8. ~~MEDIUM: `site.collections | where` lookup repeated ~15 times~~ FIXED

Extended `get-zone.html` to also set `page_collection` during its single lookup. Replaced 6 redundant collection lookups in `credits.html`, `resolve-background-image.html`, `footer.html`, `page.html`, `post.html`, and `story_details.html` with the shared `page_collection` variable.

---

## 9. MEDIUM: Disqus include reference with no include file

**File**: `_layouts/post.html:54-56`
```liquid
{% if site.disqus.shortname %}
  {% include disqus_comments.html %}
{% endif %}
```

There is no `disqus_comments.html` in `_includes/` and no `disqus` config in `_config.yml`. The `if` guard means it's dead code, but if someone ever adds `disqus:` to config, the build will fail.

**Fix**: Remove the dead code.

---

## 10. ~~MEDIUM: `contextual-nav.html` is never included anywhere visible~~ FIXED

Confirmed not referenced by any layout, include, or by minima's base templates. Deleted the orphaned file.

---

## 11. ~~LOW: RSS feed copyright says "All rights reserved" but site is CC BY-NC-SA~~ FIXED

Changed `<copyright>` in both `all_feed.xml` and `collection_feed.xml` to `CC BY-NC-SA 4.0`.

---

## 12. ~~LOW: Twitter social links still reference twitter.com~~ FIXED

Updated profile links in `icon-twitter.html` and `about.md` to `x.com`. Twitter card meta tags and embedded tweets left as-is (standard names / third-party embed code).

---

## 13. ~~LOW: `site.url` used for 404 page links instead of `relative_url`~~ FIXED

Changed both links in `404.md` to use `/` (relative path). Display text for the second link still shows `{{ site.url }}`.

---

## 14. LOW: Google verification file not in exclude list

**File**: `googlefefc3e230be2bb45.html`

This is published (intentionally, for Google Search Console verification). But it's not in the exclude list and not documented. If someone cleaned up root files they might accidentally remove it.

---

## 15. INFO: `page.zone` only set on 2 pages via frontmatter

Only `colophon.md` (`zone: site`) and `_pretensions/about.md` (`zone: B`) set `zone` directly. All other pages rely on the collection-level zone resolved by `get-zone.html`. This works, but it means standalone pages (like `hobbies.md`) that aren't in a collection get `page_zone = ""`, which falls through to the default "Zone A" nav.

`hobbies.md` has `zone: C` in frontmatter but `get-zone.html` checks `page.zone` first, so this works correctly. The about page at root (`about.md`) has no zone, so it gets the Zone A nav — which seems intentional.

---

## 16. INFO: `include_relative` used for door_sign — correct but unusual

`include_relative` pulls from the file's directory, not `_includes/`. It's used correctly for `door_sign_include.html` within M&G stories, but this is the only use in the entire site, making it a one-off pattern that could confuse future maintenance (see #1 for the bigger issue).

---

## Priority ranking for fixes

| # | Issue | Status |
|---|---|---|
| 1 | door_sign published as page | FIXED |
| 2 | Background image logic x4 | FIXED |
| 3 | prev/next matches by title | FIXED |
| 4 | Topic dedup uses string contains | FIXED |
| 5 | Unclosed div in post.html | FIXED |
| 6 | Missing feed.xml for 4 collections | FIXED |
| 7 | get-zone called 4x per page | FIXED |
| 8 | Collection lookup x15 | FIXED |
| 9 | Dead disqus code | FIXED |
| 10 | Orphaned contextual-nav | FIXED |
| 11 | RSS copyright mismatch | FIXED |
| 12 | Twitter → X links | FIXED |
| 13 | 404 page absolute URLs | FIXED |
| 14 | Google verification file docs | Won't fix (intentionally published) |
| 15 | page.zone set on 2 pages | INFO only — working as designed |
| 16 | include_relative for door_sign | Resolved by #1 |
