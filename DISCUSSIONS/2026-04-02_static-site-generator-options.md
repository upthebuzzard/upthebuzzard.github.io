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

## More "Out There" Options

### Performance extremists

#### Zola (Rust)

- **Migration effort:** Medium — Tera templates (Jinja2-like), not Liquid
- **Pros:** Single binary, zero dependencies, benchmarks 4x faster than Hugo in some tests, Sass built-in, shortcodes, taxonomies
- **Cons:** Smaller ecosystem than Hugo, Tera template syntax is different from Liquid
- **Good fit if:** Want maximum speed with a simpler tool than Hugo
- [Zola](https://www.getzola.org/)

### Paradigm breakers

#### Hakyll (Haskell)

- **Migration effort:** High — configuration is a Haskell program (xmonad-style DSL)
- **Pros:** Compile-time guarantees, powerful functional composition of build rules, very precise control over the build pipeline
- **Cons:** Requires Haskell knowledge, steep learning curve, small community
- **Good fit if:** You think in functional composition and want type-checked site builds
- [Hakyll](https://jaspervdj.be/hakyll/)

#### Soupault (OCaml)

- **Migration effort:** High — completely different mental model
- **Pros:** Works by rewriting HTML element trees instead of templates. Write plain HTML, Soupault manipulates the DOM. Extensible with Lua plugins. Single binary.
- **Cons:** Very niche, small community, requires rethinking how you author content
- **Good fit if:** You're tired of template languages entirely and want to work with HTML as a data structure
- [Soupault](https://soupault.app/)

#### Scroll (Custom language)

- **Migration effort:** Very high — a whole new markup language, not Markdown
- **Pros:** Purpose-built for scientific publishing, novel approach to structured content
- **Cons:** Tiny ecosystem, non-standard markup, experimental
- **Good fit if:** Scientific content and you want something radically different
- [Scroll](https://scroll.pub/)

### Niche but interesting

#### seite (Rust)

- AI-native SSG with built-in MCP server and Claude Code integration
- Very new, worth watching

## Reframing: Content-First, Least Friction

The real pain points aren't about which SSG to use:

1. **Toolchain rot** — the build broke, content was hostage to infrastructure. Reduced to editing via GitHub GUI.
2. **Content vs plumbing** — want to write stories, not maintain Ruby/Node/Go toolchains.
3. **Interactive bits frozen** — mashup pages (n-gram Markov from `search.json`) are stale because touching anything felt risky.
4. **Arcane knowledge barrier** — Liquid templates, SCSS, Jekyll internals shouldn't be prerequisites for writing.

Note: the mashup pages are pure client-side JavaScript (`ngramMarkov.js` + `search.json`) — they're actually decoupled from Jekyll and would work with any SSG or hosted platform.

### Layer 1: Fix the toolchain rot (keep SSG)

Move to GitHub Actions + Jekyll 4 (or Hugo/Zola as a single binary that can't rot). Still Markdown files in a repo. **Doesn't change the content authoring experience.**

### Layer 2: Add a CMS layer on top of an SSG

Keep the SSG but add a visual editor for content:

- **[CloudCannon](https://cloudcannon.com)** — built specifically for Jekyll/Hugo/Eleventy. Visual editor, understands collections, nice UI for frontmatter. From $55/month.
- **[TinaCMS](https://tina.io)** — visual on-page editing, stores content as Markdown in Git. Free for local dev, $25/month for cloud.
- **[JekyllPad](https://www.jekyllpad.com/)** — lightweight CMS layer specifically for Jekyll + GitHub Pages.
- **[Decap CMS](https://decapcms.org/)** — free, open source, but no longer actively maintained.

These mean: edit content in a web UI, it commits Markdown to the repo, the SSG builds it. Adds a dependency on the CMS service.

### Layer 3: Markdown-native publishing (ditch the SSG)

- **[Quartz](https://quartz.jzhao.xyz/)** — turns a folder of Markdown into a website. Designed for "second brain" / knowledge base publishing. Minimal config, very content-focused.
- **[Obsidian Publish](https://obsidian.md/publish)** — if you use Obsidian for writing, one-click publish. $8/month.
- **Bear Blog**, **Mataroa**, **Write.as** — ultra-minimal hosted Markdown blogs. Zero maintenance.

### Layer 4: Hosted CMS platforms

- **[Ghost](https://ghost.org)** — beautiful writing-focused CMS, self-hosted or $9/month. Markdown editor, memberships, newsletters. Writing experience is excellent.
- **Substack** / **Buttondown** — if the writing is the thing and you don't care about surrounding site structure.

## Jekyll 4: Honest Assessment

### Reasons to hesitate

- **Maintenance mode, not active development.** Last release was [4.4.1 in Jan 2025](https://jekyllrb.com/news/2025/01/29/jekyll-4-4-1-released/). PRs and issues aren't addressed promptly. The lead developer hasn't been active. It works, but it's not going anywhere new.
- **Dependency management is still the #1 complaint.** 56% of support tickets trace to dependency issues. Jekyll 4 + Actions gives more control, but you're still in Ruby/Bundler land where gem version conflicts are a way of life.
- **Sass migration deferred, not avoided.** Pinning `jekyll-sass-converter ~> 2.0` works for now, but v2 will eventually stop being maintained. The SCSS migration is kicked down the road.
- **Template caching can break plugins.** Jekyll 4 caches parsed templates. Not an issue for current plugins (feed, sitemap, redirect-from), but limits future options.
- **Still Ruby.** The toolchain that rotted is the same toolchain, just newer. Ruby version changes will continue to break things over time.

### Reasons it's still fine

- Migration from current setup is trivially small
- The site is simple enough that Jekyll's limitations don't matter
- Content format (Markdown + YAML frontmatter) is universal — easy to migrate away later
- It genuinely works and is stable

### The key insight

Jekyll 4 is the **lowest-risk next step**, but it doesn't solve the underlying problem: you're still coupled to a Ruby toolchain that requires maintenance. If the goal is "never be in this situation again," the stronger moves are:

- **Hugo** — single Go binary, zero dependency chain, can't rot
- **A CMS layer** — so you can edit content even when the build is broken

## Recommendation

**Short term:** Jekyll 4 + GitHub Actions fixes the rot. Lowest friction right now — you already know the content format.

**Medium term:** Add **CloudCannon** (built for Jekyll, understands collections, visual frontmatter editing) — or migrate to **Hugo** + CloudCannon (Hugo is a single binary that won't rot).

**If starting fresh:** **Quartz** or **Ghost** would give the least-friction writing experience. But migrating 11 collections of existing content is non-trivial.

**The priority order should be:** fix the build first (Jekyll 4 + Actions), then decide whether to layer a CMS on top or migrate further. Each step is independent.

## Sources

- [Hugo vs Jekyll vs Eleventy: SSG Comparison 2026](https://dasroot.net/posts/2026/03/hugo-vs-jekyll-vs-eleventy-static-site-generators/)
- [Top 5 Static Site Generators in 2026](https://kinsta.com/blog/static-site-generator/)
- [7 Best Jekyll Alternatives 2026](https://themefisher.com/best-jekyll-alternatives)
- [Top 12 SSGs in 2026](https://hygraph.com/blog/top-12-ssgs)
- [Jamstack SSG Directory](https://jamstack.org/generators/)
- [Hakyll](https://jaspervdj.be/hakyll/)
- [Soupault](https://soupault.app/)
- [Rust SSGs: Performance and Ecosystem](https://dasroot.net/posts/2026/02/static-site-generators-rust-performance-ecosystem-use-cases/)
- [Hugo vs Publish vs Saga](https://www.loopwerk.io/articles/2026/hugo-vs-publish-vs-saga/)
- [TinaCMS](https://tina.io)
- [CloudCannon](https://cloudcannon.com)
- [Best CMS for Hugo 2026](https://statichunt.com/blog/best-cms-for-hugo-websites)
- [Git-Based Headless CMS 2026](https://statichunt.com/blog/git-based-headless-cms)
- [CMS for GitHub Pages 2026](https://www.jekyllpad.com/blog/cms-github-pages)
- [Quartz](https://quartz.jzhao.xyz/)
- [Ghost](https://ghost.org)
- [Is the Jekyll project dead?](https://talk.jekyllrb.com/t/is-the-jekyll-project-dead/6820)
- [Has Jekyll development stalled?](https://talk.jekyllrb.com/t/has-jekyll-development-stalled/8478)
- [Jekyll endoflife.date](https://endoflife.date/jekyll)
- [Upgrading from 3.x to 4.x](https://jekyllrb.com/docs/upgrading/3-to-4/)
- [Migrating GitHub Pages Jekyll to v4](https://tech.findmypast.com/migrating-github-pages-jekyll-to-v4/)
