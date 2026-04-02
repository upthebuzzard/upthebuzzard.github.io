# GitHub Pages: Classic vs Actions Deployment

**Date:** 2026-04-02

## Current State

- GitHub Pages is **still fully supported**, not deprecated
- Two deployment modes now exist: **Classic** (branch-based) and **Actions** (workflow-based)
- This site uses Classic mode with the `github-pages` gem (~> 226), which pins Jekyll 3.9.2, activesupport 6.0.6.1, and ~80 other gems
- 6 Dependabot alerts (all activesupport) are unfixable under Classic because the `github-pages` gem pins the version

## Why Migrate to Actions

- **Resolve Dependabot alerts** — activesupport goes away entirely (it's pulled in by gems we don't use)
- **Jekyll 4.x** — significantly faster builds, template caching, incremental builds
- **Control our own gems** — no longer locked to whatever `github-pages` bundles
- **Custom plugins** — could use them in future (currently blocked by Classic mode)
- **Remove ruby34_compat shim** — Jekyll 4 + newer Liquid don't call taint methods

## Migration Plan

### Files to create/modify

| File | Action |
|------|--------|
| `.github/workflows/pages.yml` | Create — Actions workflow using `ruby/setup-ruby` + `bundle exec jekyll build` |
| `Gemfile` | Rewrite — drop `github-pages`, add `jekyll ~> 4.4` + plugins directly |
| `Gemfile.lock` | Delete and regenerate with `bundle install` |
| `_config.yml` | Add `.github` to exclude list |
| `_plugins/ruby34_compat.rb` | Can remove (no longer needed, but harmless to keep) |

### Repo settings change

Settings > Pages > Build and deployment > Source: change from "Deploy from a branch" to "GitHub Actions"

### Workflow file (Option B — full control)

```yaml
name: Deploy Jekyll site to Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.4'
          bundler-cache: true
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

### New Gemfile

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "minima", "~> 2.5"
gem "jekyll-sass-converter", "~> 2.0"  # avoid Dart Sass migration for now

gem "webrick"
gem "csv"
gem "bigdecimal"
gem "base64"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-redirect-from"
end
```

## Sass Gotcha

Jekyll 4.3+ ships with `jekyll-sass-converter` 3.x (Dart Sass), which deprecates:
- `/` for division — our SCSS uses `$spacing-unit / 2` extensively
- `@import` — used in `_sass/minima.scss` and `assets/main.scss`
- `darken()`/`lighten()` — used in several SCSS files

**Mitigation:** Pin `jekyll-sass-converter ~> 2.0` to keep the old Sass engine. Migrate SCSS later.

Affected files:
- `_sass/minima/_base.scss` (lines 42, 120, 180-181)
- `_sass/minima/_layout.scss` (lines 167, 179, 185-186, 190-221)
- `_sass/minima.scss` (lines 16-17)

## Compatibility (all confirmed OK)

- **minima 2.5.1** — declares `jekyll >= 3.5, < 5.0`
- **jekyll-feed** — declares `jekyll >= 3.7, < 5.0`
- **jekyll-sitemap** — declares `jekyll >= 3.7, < 5.0`
- **jekyll-redirect-from** — declares `jekyll >= 3.3, < 5.0`
- **kramdown / kramdown-parser-gfm** — compatible
- **All layouts, includes, content** — no breaking changes

## Notes

- Jekyll 4 `exclude:` list is additive to defaults (which already exclude `Gemfile`, `Gemfile.lock`, `vendor/`, `node_modules/`)
- `JEKYLL_ENV: production` in the workflow matches what Classic mode does implicitly
- `baseurl` is `""` so the `--baseurl` flag from `configure-pages` is safe
- The deploy ritual's monitoring step will need updating — Actions deployments use a different API than the classic Pages builds API

## Sources

- [GitHub Docs: Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub starter-workflows: jekyll.yml](https://github.com/actions/starter-workflows/blob/main/pages/jekyll.yml)
- [Jekyll Docs: Upgrading from 3.x to 4.x](https://jekyllrb.com/docs/upgrading/3-to-4/)
- [Switching from Classic to Actions-based deployment](https://officialaptivi.wordpress.com/2026/03/08/switching-github-pages-deployment-from-classic-to-actions-based-deployment/)
- [Sass: Breaking Change — Slash as Division](https://sass-lang.com/documentation/breaking-changes/slash-div/)
