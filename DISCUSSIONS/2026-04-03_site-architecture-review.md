# Site Architecture Review

**Date**: 2026-04-03
**Participants**: Claude (summary & assessment), Gemini 2.5 Flash (feedback)

## Site Architecture Summary

Jekyll static site hosted on GitHub Pages. Personal storytelling blog with 11 content collections organised into 4 "zones" with distinct navigation and visual styling. Theme: minima 2.5.1 with extensive custom overrides.

### Constraints

- GitHub Pages only — no custom Ruby plugins. Only jekyll-feed, jekyll-sitemap, jekyll-redirect-from.
- All template logic in Liquid (no Ruby, no JS frameworks).
- Single compiled CSS from SCSS. No JavaScript (fully static HTML/CSS).

### Zone System

The site's key architectural concept: 4 zones with distinct branding, navigation, and styling.

**Zone A — "A Smattering of Stories"** (6 collections, seq 1-25)
- Moose & Goose, Grey Parrot, Predicting the Present, Emus All The Way Down, Fragments, Haiku
- Default branding, porthole background images, featured on homepage
- Nav shows all Zone A collections

**Zone B — "Pretensions"** (1 collection, seq 50)
- Professional tech/strategy articles (imported from LinkedIn)
- Own branding ("Pretensions"), own about page
- Background images disabled on article pages (cleaner professional look)
- Nav shows dynamically-extracted topics from post frontmatter
- Supports cover_image, cover_image_caption, original_url frontmatter

**Zone C — "Hobbies"** (2 collections: Games seq 30, Hifi seq 110)
- Shared landing page (/hobbies.md)
- Own nav with just Games | Hifi

**Zone D — "Deprecated"** (3 collections: Distractions, Overgeneralisations, Jekyll Notes)
- Hidden from nav and homepage, accessible only via direct URL

### Zone Implementation

- Each collection has a `zone` field in _config.yml
- `get-zone.html` include resolves page_zone from page or collection
- `top-nav.html` switches nav links/branding per zone
- `head.html` conditionally skips background images for Zone B posts
- `footer.html` provides cross-zone discovery ("Also by this author" links)
- `by-author.html` links to zone-appropriate about page

### Layout Hierarchy

```
default.html (head, porthole, top-nav, content wrapper, footer)
├── home.html (homepage — Zone A collections only)
├── page.html (standalone pages)
├── post.html (articles — cover_image, category-based rendering, story_details)
└── collection.html (collection landing pages)
```

### Key Includes (~24 files)

- **Structure**: head.html, top-nav.html, footer.html, porthole.html, get-zone.html
- **Post metadata**: by-author.html, story_details.html, credits.html, collection_prev_next.html, related-posts.html
- **Social/SEO**: head-twitter.html, head-facebook.html, google-analytics.html
- **Utility**: figure.html, copyright.html, icon-*.html
- **Feeds**: all_feed.xml, collection_feed.xml
- **Content-specific**: breaking-news-*.html

### SCSS Architecture

```
assets/main.scss (variable overrides + radio-script custom element styles)
└── _sass/minima.scss (orchestrator)
    ├── _sass/minima/_base.scss (resets, typography, wrapper)
    ├── _sass/minima/_layout.scss (components, top-nav, post styles, cover images)
    └── _sass/minima/_syntax-highlighting.scss
```

- Font: Rosario (Google Fonts), 16px base
- Max content width: 800px
- Breakpoints: 600px (mobile), 800px (laptop)
- Desktop-first responsive approach

### Post Conventions

- Filename: YYYY-MM-DD-kebab-case-title.md
- Frontmatter: layout, title, date, categories, sequence, excerpt
- Optional: background_image_url, credits, related-posts, cover_image, topics, original_url
- Category effects: "story" appends "THE END"; "radio-script" enables custom HTML tags

### Notable Patterns

- **Porthole effect**: Fixed background images (100px viewport) that scroll with content
- **Cross-zone discovery**: Footer links let readers find other zones
- **No JavaScript**: Entire site is static HTML/CSS
- **Custom HTML elements**: `<radio-script>`, `<character>`, `<direction>`, `<speech>` for radio play formatting (styled via CSS)
- **Feed generation**: Per-collection RSS feeds plus an aggregated all-collections feed

---

## Gemini Feedback

### Strengths

1. **Zone system** is the standout design — clean content segmentation with distinct branding, navigation, and styling per zone. Enhances user experience by setting expectations.
2. **Good use of Jekyll-native features** — collections, frontmatter-driven rendering, includes, layout hierarchy all used effectively.
3. **No-JS commitment** gives excellent load times, reduces complexity, minimises security surface.
4. **Cross-zone discovery** via footer "Also by this author" links encourages exploration without cluttering primary navigation.
5. **Custom HTML elements** for radio scripts are a creative CSS-only solution for semantic content markup.
6. **Comprehensive feed generation** — both per-collection and aggregated RSS feeds.

### Concerns

1. **Liquid logic complexity** — `top-nav.html` and `head.html` contain extensive if/elsif chains for zone switching. As zones grow, this becomes verbose, fragile, and error-prone. Relies on "magic string" comparisons (`page_zone == "B"`) scattered across templates.
2. **Theme upgrade risk** — deep overrides on minima 2.5.1 make future theme upgrades (e.g. minima 3.x or security patches) very difficult. Hard to distinguish original theme code from custom code in the SCSS structure.
3. **Porthole performance/accessibility** — `background-attachment: fixed` can cause performance issues on mobile/low-power devices and may be problematic for users with motion sensitivities.

### Suggestions

1. **Centralise zone config in `_data/zones.yml`** — define zone properties (name, collections, branding flags, nav type, porthole toggle) in one data file. Templates would look up zone config instead of hardcoding conditionals. Reduces scattered logic, makes zone management easier.
2. **Isolate custom SCSS into `_sass/custom/`** — separate custom styles from minima's files. Import custom partials after minima. Clearer upgrade path: replace `_sass/minima/` without touching `_sass/custom/`.
3. **Review porthole for `prefers-reduced-motion`** — consider disabling `background-attachment: fixed` via media query for accessibility.
4. **Document theme overrides** — maintain a list of modified minima files and what changed, to ease future upgrades.

---

## Assessment of Feedback

Gemini's analysis is sensible and well-targeted. Key takeaways:

- **The `_data/zones.yml` suggestion is the most impactful.** It would replace hardcoded Liquid conditionals with data lookups, making the zone system genuinely data-driven. This is worth pursuing if more zones or restructuring is planned. It aligns with the existing pattern of using _config.yml collection metadata — just takes it a step further.

- **SCSS isolation is good hygiene** but lower priority. The current structure works; the risk only materialises if minima is upgraded, which is unlikely given the GitHub Pages constraint pins it.

- **Porthole `prefers-reduced-motion`** is a quick, valuable accessibility win that could be done independently.

- **Theme override documentation** is useful but may not justify a standalone file — the CLAUDE.md and DISCUSSIONS/ already capture much of this context.

- The concerns about Liquid complexity are valid but somewhat inherent to Jekyll on GitHub Pages. The data-driven zones approach is the best mitigation available within the constraints.
