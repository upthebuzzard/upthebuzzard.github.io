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

## 6. MEDIUM: RSS feeds missing for 4 collections

Collections **with** per-collection `feed.xml`: moose_and_goose, grey_parrot, predicting_the_present, emus, fragments, overgeneralisations, distractions, jekyll_notes (8)

Collections **without**: games, haiku, hifi, pretensions (4)

The footer shows an RSS link for any collection with posts (`footer.html:11`), but if the collection has no `feed.xml`, that link 404s.

**Risk**: Broken RSS links for these 4 collections. The link points to `feed.xml` relative to the collection index, which doesn't exist.

---

## 7. MEDIUM: `get-zone.html` is included multiple times per page render

`get-zone.html` is included in:
- `top-nav.html`
- `contextual-nav.html`
- `by-author.html` (which itself is included by `page.html` and `post.html`)
- `footer.html`

Each include sets `page_zone` as a top-level variable, so the multiple calls are redundant but not harmful. However, it's wasteful and makes the data flow confusing — you can't easily see where `page_zone` comes from in any given template.

**Risk**: Maintenance confusion. Someone might edit `get-zone.html` thinking it's called once.

---

## 8. MEDIUM: `site.collections | where` lookup repeated ~15 times

The pattern `{% assign collection = site.collections | where:"label", page.collection | first %}` appears in at least 15 different includes and layouts. Each one independently looks up the same collection object.

Same issue as #2 — any change to how collections are resolved needs updating everywhere.

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

## 10. MEDIUM: `contextual-nav.html` is never included anywhere visible

This 104-line file builds a full hamburger-style navigation menu. But searching for `contextual-nav` in layouts and other includes shows it's not included by `default.html` or any other layout.

Possible that it's referenced by the minima theme's default layout, but since you override `default.html`, it may be orphaned dead code.

**Status**: Needs verification — check if minima's base templates reference it.

*Update*: Minima 2.x does include a `header.html` that references its own nav. Since this site overrides `default.html` entirely and uses `top-nav.html` instead, `contextual-nav.html` appears to be the old/alternative mobile nav that's no longer wired in.

---

## 11. LOW: RSS feed copyright says "All rights reserved" but site is CC BY-NC-SA

**Files**: `_includes/all_feed.xml:6`, `_includes/collection_feed.xml:9`

```xml
<copyright>All rights reserved.</copyright>
```

But the site is licensed under CC BY-NC-SA 4.0. These should match.

---

## 12. LOW: Twitter social links still reference twitter.com

**Files**: `_includes/icon-twitter.html`, `about.md:25`

Twitter is now X. The icon, SVG, and links still point to `twitter.com`. Not broken (redirects work), but dated.

---

## 13. LOW: `site.url` used for 404 page links instead of `relative_url`

**File**: `404.md:12,14`

```markdown
Leap, gazelle-like, to the [home page]({{ site.url }})
```

This generates an absolute URL (`https://stories.upthebuzzard.com`). During local dev, this links to production instead of localhost. Other pages correctly use relative paths like `/`.

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

| # | Issue | Effort | Impact |
|---|---|---|---|
| 1 | door_sign published as page | Small | Immediate junk page live |
| 3 | prev/next matches by title | Small | Silent nav bugs on dup titles |
| 4 | Topic dedup uses string contains | Small | Silent topic loss |
| 5 | Unclosed div in post.html | Small | Broken HTML if posts collection used |
| 6 | Missing feed.xml for 4 collections | Small | 404 RSS links |
| 2 | Background image logic x4 | Medium | Maintenance burden |
| 8 | Collection lookup x15 | Medium | Maintenance burden |
| 9 | Dead disqus code | Tiny | Code hygiene |
| 10 | Orphaned contextual-nav | Medium | Verify then remove or re-wire |
| 11 | RSS copyright mismatch | Tiny | Accuracy |
| 7 | get-zone called 4x per page | Low | Redundancy |
