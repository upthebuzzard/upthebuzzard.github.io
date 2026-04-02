# Static Site Generator Options Beyond Jekyll

**Date:** 2026-04-02

## Context

Moving from Classic GitHub Pages to Actions-based deployment opens up the choice of any static site generator, not just Jekyll. This site is a content-focused blog with Markdown posts, Liquid templates, custom SCSS, and 11 collections.

## Options

### Jekyll 4 (Ruby)

- **Migration effort:** Low — existing templates, layouts, includes all work as-is
- **Pros:** Minimal changes, familiar workflow, keep all existing content
- **Cons:** Still Ruby, moderate build speed, ecosystem less active than it was
- **Sass gotcha:** Need to pin `jekyll-sass-converter ~> 2.0` or migrate SCSS division syntax
- See `2026-04-02_github-pages-actions-migration.md` for full migration details

### Hugo (Go)

- **Migration effort:** Medium — all templates must be rewritten from Liquid to Go templates
- **Pros:** Blazing fast (sub-1ms per page, thousands of pages in seconds), single binary with no runtime dependencies, very active ecosystem
- **Cons:** Go template syntax is less intuitive than Liquid, no Ruby knowledge transfers, all `_includes/` and `_layouts/` need rewriting
- **Good fit if:** Build speed matters and you're willing to invest in the template rewrite

### Eleventy (JavaScript/Node)

- **Migration effort:** Medium — supports Liquid templates natively, so many templates transfer with minor tweaks
- **Pros:** Flexible (multiple template languages), understands Liquid, fast builds, active community
- **Cons:** Node.js dependency, config is JavaScript-based, some Liquid/Jekyll extensions won't exist
- **Good fit if:** Want modern tooling but smoother migration than Hugo

### Astro (JavaScript/Node)

- **Migration effort:** High — very different paradigm (islands architecture, component-based)
- **Pros:** Ships zero JavaScript to browser by default, modern web standards, supports React/Vue/Svelte components
- **Cons:** Overkill for a pure content site, steep learning curve, all templates need complete rewrite
- **Good fit if:** You wanted interactive components (this site doesn't need them)

### Bridgetown (Ruby)

- **Migration effort:** Low-Medium — spiritual successor to Jekyll, keeps the Ruby/Markdown workflow
- **Pros:** Stays in Ruby-land, modernised developer experience, active development, plugin system
- **Cons:** Smaller community than Hugo/Eleventy, still Ruby dependency
- **Good fit if:** Want to modernise but stay close to Jekyll's philosophy

## Recommendation

**Jekyll 4** is the pragmatic choice — minimal migration effort, everything works, and it solves the immediate problems (pinned dependencies, Dependabot alerts, build control).

A move to **Hugo** or **Eleventy** would only make sense if there's appetite for a larger rewrite, driven by wanting faster builds or a different development experience.

## Sources

- [Hugo vs Jekyll vs Eleventy: SSG Comparison 2026](https://dasroot.net/posts/2026/03/hugo-vs-jekyll-vs-eleventy-static-site-generators/)
- [Top 5 Static Site Generators in 2026](https://kinsta.com/blog/static-site-generator/)
- [7 Best Jekyll Alternatives 2026](https://themefisher.com/best-jekyll-alternatives)
- [Top 12 SSGs in 2026](https://hygraph.com/blog/top-12-ssgs)
- [Jamstack SSG Directory](https://jamstack.org/generators/)
