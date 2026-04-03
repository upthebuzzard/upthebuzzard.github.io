# CLAUDE.md

## Working Rules

- **Always capture discussions** — when research, analysis, or decisions happen in conversation, save them to `DISCUSSIONS/` without being asked.
- **Always commit to a branch, not main** — the only exception is the deploy ritual, which merges into main.
- **Always ask before committing** — never run `git commit` without explicit user approval.
- **Always ask before pushing** — never run `git push` without explicit user approval.
- **New files in the repo root must be excluded** — add them to the `_config.yml` exclude list so they don't get published to GitHub Pages.
- **Avoid Bash approval triggers** — Claude Code's safety heuristics prompt on `$(...)`, backticks, quotes inside `#` comments, and `$'...'`. To avoid unnecessary prompts:
  - Use multiple `-m` flags for commit messages (not `$(cat <<'EOF')`). E.g. `git commit -m "Title" -m "Body." -m "Co-Authored-By: ..."`
  - Use Claude-native tools (Glob, Grep, Read) instead of complex bash one-liners
  - Keep bash commands simple — push complexity into scripts or Claude's reasoning

## Project Overview

Jekyll static site for **stories.upthebuzzard.com** — a personal storytelling blog hosted on GitHub Pages. Contains children's stories, flash fiction, haiku, game notes, and more.

## Build & Serve

```bash
bundle exec jekyll serve          # local dev server at http://127.0.0.1:4000
bundle exec jekyll build          # build to _site/
```

Requires Ruby with Bundler. Dependencies managed via `Gemfile` (github-pages ~> 226, minima 2.5.1).

## Key Constraints

- **GitHub Pages only** — no custom Ruby plugins allowed. Only jekyll-feed, jekyll-sitemap, jekyll-redirect-from.
- **Theme**: minima 2.5.1 with custom overrides in `_layouts/`, `_includes/`, `_sass/`.
- **All content is CC BY-NC-SA 4.0 licensed.**

## Content Structure

11 collections defined in `_config.yml`, each in its own `_collectionname/` directory:

| Collection | Dir | Sequence | Notes |
|---|---|---|---|
| Moose & Goose | `_moose_and_goose_stories/` | 1 | Children's detective stories |
| Grey Parrot | `_grey_parrot_stories/` | 2 | Children's stories |
| Predicting the Present | `_predicting_the_present/` | 10 | Flash fiction / short stories |
| Emus All The Way Down | `_emus_all_the_way_down/` | 11 | Riffs on present-day stories |
| Fragments | `_fragments/` | 20 | Short writing fragments |
| Haiku | `_haiku/` | 25 | Poetry |
| Games | `_games/` | 30 | Game design notes |
| Overgeneralisations | `_overgeneralisations/` | 40 | Observations |
| Distractions | `_distractions/` | 90 | Curated links |
| Jekyll Notes | `_jekyll_notes/` | 100 | Technical notes |
| Hifi | `_hifi/` | 110 | Audio articles |

Collections with `reverse_posts: true` display newest first. The `sequence` field controls homepage ordering.

## Post Conventions

**Filename**: `YYYY-MM-DD-kebab-case-title.md` (some older posts omit the date prefix).

**Frontmatter template**:
```yaml
---
layout: post
title: Post Title Here
date: YYYY-MM-DD HH:MM
categories: [story]          # or [radio-script], [hifi], or []
sequence: 1                  # ordering within collection
excerpt: >
  A short description...
---
```

Optional frontmatter fields: `background_image_url`, `credits`, `related-posts`, `breaking-news-include`.

**Categories with special rendering**:
- `story` — appends "THE END" marker
- `radio-script` — uses custom `<radio-script>`, `<character>`, `<direction>`, `<speech>` tags

Each collection also has an `index.md` (layout: collection) as its landing page.

## Key Directories

- `_layouts/` — default, home, page, post, collection
- `_includes/` — ~31 template fragments (head, footer, top-nav, porthole, story_details, etc.)
- `_sass/minima/` — SCSS overrides for base, layout, syntax highlighting
- `assets/img/` — images organised by collection name
- `assets/js/` — ngramMarkov.js (text generation engine)
- `DISCUSSIONS/` — project discussions (excluded from Jekyll build)

## Rituals

When the user says **"deploy"**, read and follow the steps in `DISCUSSIONS/rituals/deploy.md`.

## Style Notes

- Font: Rosario (Google Fonts), 16px base
- Max content width: 800px
- Porthole effect: fixed background images that scroll with content
- Responsive breakpoints at 600px and 800px
