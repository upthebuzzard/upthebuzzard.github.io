# Changelog

## 2026-04-02 — Deploy Ritual Script (branch: local-dev-setup)

- Added `deploy.sh` — deploy ritual that merges feature branch into main, pushes, and monitors GitHub Pages build
  - Pre-flight checks: clean working tree, Jekyll build, unexcluded root files, https URL
  - Confirms before pushing to main
  - Polls GitHub Pages builds API until site is live (5 min timeout)
- Excluded `deploy.sh` from Jekyll build in `_config.yml`

## 2026-04-02 — Local Dev Setup (branch: local-dev-setup)

- Added `webrick`, `csv`, `bigdecimal`, `base64` gems to Gemfile for Ruby 3.4 compatibility
- Added `_plugins/ruby34_compat.rb` — taint method shim for Ruby 3.4
- Added `serve.sh` — wrapper script for local dev server
- Regenerated `Gemfile.lock` for Bundler 4.0.9 / Ruby 3.4.1
- Added `CLAUDE.md` with project overview, conventions, and working rules
- Added `DISCUSSIONS/` folder for project notes
- Added `CHANGELOG.md`
- Excluded `DISCUSSIONS/`, `CLAUDE.md`, `serve.sh`, `CHANGELOG.md` from Jekyll build
