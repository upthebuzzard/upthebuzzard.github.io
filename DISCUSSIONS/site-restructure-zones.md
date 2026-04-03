# Site Restructure: Zones and Identity

## The Problem

The site ("A Smattering of Stories") started as a creative writing blog and has accumulated diverse content over time. Adding professional articles ("Pretensions") imported from LinkedIn creates a tension: LinkedIn contacts arriving at a strategy article land on a site headlined by children's detective stories.

The existing non-story collections (Hifi, Jekyll Notes, Games, Distractions) already sit awkwardly alongside the fiction, but don't create a professional credibility problem the way Pretensions might.

## Current State: 11 Collections, Flat List

All collections appear equally on the homepage, ordered by `sequence` number:

1. Moose & Goose (children's detective stories)
2. Grey Parrot (children's stories)
10. Predicting the Present (flash fiction)
11. Emus All The Way Down (riffs on present-day)
20. Fragments (non-fiction, whimsical)
25. Haiku
30. Games
40. Overgeneralisations
50. **Pretensions (NEW — professional articles)**
90. Distractions (curated links)
100. Jekyll Notes
110. Hifi

## Agreed Grouping

### Zone A: "A Smattering of Stories" — the creative identity

The existing brand. Fiction and creative non-fiction that share a whimsical, personal tone.

**Collections:**
- Moose & Goose
- Grey Parrot
- Predicting the Present
- Emus All The Way Down
- Fragments
- Haiku

### Zone B: "Pretensions" — the professional identity

Career-facing articles on product, tech, and strategy. Imported from LinkedIn. Needs its own landing page, navigation, and branding that won't surprise a LinkedIn contact.

**Collections:**
- Pretensions

**Migration:** Move "How to Think of an Answer" from Overgeneralisations into Pretensions (whimsical end of the professional spectrum). Use `jekyll-redirect-from` to preserve the old URL.

### Zone C: Hobbyist — personal interests

Non-fiction that's neither creative writing nor professional. Personal, niche.

**Collections:**
- Hifi
- Games

### Zone D: Deprecated — not effective or relevant

Collections to remove from navigation. Existing URLs preserved via redirects or by keeping the files in place, but no longer promoted.

**Collections:**
- Distractions
- Overgeneralisations (after salvaging "How to Think of an Answer" into Pretensions)
- Jekyll Notes (artefact of early site development)

### Questions about zones

- Does Zone C need its own identity, or just a quieter presence within Zone A?
- Could Zone C be a simple "Also on this site" section at the bottom of the Zone A homepage?
- What does "deprecated" mean in practice — hide from homepage and nav, but keep pages live? Or add a notice?

## Navigation and Branding Ideas

### Option 1: Zone A is the homepage, Zone B is a standalone section

```
stories.upthebuzzard.com/              → Zone A homepage (stories + creative)
stories.upthebuzzard.com/pretensions/  → Zone B landing page (professional)
```

- Homepage is "A Smattering of Stories" as now, but with a small link to Pretensions
- Pretensions landing page has its own header/branding, nav back to stories
- Pretensions article pages show "Pretensions" branding, not "A Smattering of Stories"

### Option 2: Brief gateway homepage, then zones

```
stories.upthebuzzard.com/        → Gateway: "Writing by Chris Gathercole"
stories.upthebuzzard.com/stories/     → Zone A
stories.upthebuzzard.com/pretensions/ → Zone B
```

- Neutral gateway page with links to both zones
- Each zone has its own identity
- More restructuring work, changes existing URLs

### Option 3: Zone B gets its own subdomain

```
stories.upthebuzzard.com/       → Zone A (unchanged)
articles.upthebuzzard.com/      → Zone B (separate repo)
```

- Cleanest separation but two repos to maintain
- Already discussed and deferred for now

### Recommendation: Option 1

Least disruptive. Existing URLs don't change. The key changes are:

1. **Custom layout for pretensions posts** — shows "Pretensions" branding, professional nav
2. **Pretensions landing page** — self-contained, professional tone, links to LinkedIn
3. **Pretensions nav bar** — links within pretensions + "Also: stories" link
4. **Homepage** — stays as-is but with a tasteful link to pretensions
5. **Zone C collections** — fold into the bottom of the stories homepage as "Also on this site"

## Implementation Sketch for Option 1

### Pretensions post layout (`_layouts/post-pretension.html` or conditional in `post.html`)

- Different site title in header: "Pretensions" or "Pretensions — Chris Gathercole"
- Top nav: Pretensions Home | LinkedIn | About | Stories →
- Cover image above title (already done)
- "Previously published on LinkedIn" (already done)
- Professional footer (no Moose & Goose in sight)

### Pretensions landing page (`_pretensions/index.md`)

- Brief professional intro
- Article listing with dates and excerpts
- LinkedIn profile link
- "Also by this author" link to stories site

### Stories homepage changes

- Current collection listing, minus Pretensions
- Zone C collections grouped separately at the bottom
- Small "Professional writing" link to /pretensions/

### Conditional logic

The `page.collection` value tells us which zone we're in. Key decision: do we use a separate layout, or conditionals in the existing layout?

- **Separate layout**: cleaner, but duplicates structure
- **Conditionals**: less duplication, but the layout gets more complex

A middle path: a shared `default` layout with a zone-aware `_includes/top-nav.html` that switches based on collection.

## Decisions

1. **Pretensions branding**: Same base styling (Rosario font, layout), different header text. Enough to feel intentional, not a different site.
2. **Porthole effect**: Drop it for Pretensions article pages. Clean background. Cover images provide the visual interest. Keep porthole on the Pretensions landing page.
3. **Name**: Keep "Pretensions".
4. **Homepage**: Stays "A Smattering of Stories" showing Zone A collections first. Small links at the bottom to Pretensions and Hobbies.
5. **Zone C**: Gets its own sub-landing page: "Hobbies" (Hifi, Games). Linked from the stories homepage.
6. **Zone D (Deprecated)**: Pages stay live at existing URLs but removed from homepage and navigation. Hard to find unless you have a direct link.
7. **Homepage title**: "A Smattering of Stories" stays. Stories FTW.
