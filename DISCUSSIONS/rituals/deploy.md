# Deploy Ritual

Merge the current feature branch into main, push, and monitor until the site is live.

## Step 1: Pre-flight checks

Run each check. If any fails, stop and report the problem.

- [ ] **Not on main** — get the current branch name. If it's `main`, stop: "Nothing to deploy — already on main."
- [ ] **Clean working tree** — run `git status`. If there are uncommitted changes or untracked files, stop: tell the user to commit or stash first.
- [ ] **Displaced pages** — any `.md` file at the repo root other than `index.md`, `404.md`, `README.md`, `CHANGELOG.md`, or `CLAUDE.md` is displaced: it belongs in `_pages/`. List the offenders (Bash: `ls -1 *.md 2>/dev/null | grep -vx -e index.md -e 404.md -e README.md -e CHANGELOG.md -e CLAUDE.md`) and stop: tell the user which files to move into `_pages/`. (CHANGELOG.md and CLAUDE.md are meta/developer docs already excluded from the Jekyll build.)
- [ ] **Root files allowed** — list non-dot, non-underscore entries in the repo root (Bash: `ls -1 | grep -v '^[._]'`). Every entry must be in the exclude list from `_config.yml` OR in this known-infrastructure list: `Gemfile`, `Gemfile.lock`, `CNAME`, `favicon.ico`, `feed.xml`, `manifest.json`, `robots.txt`, `browserconfig.xml`, `googlefefc3e230be2bb45.html`, `404.md`, `index.md`, `README.md`, `assets`. Any other entry is a problem — stop and tell the user. (Displaced `.md` files have already been caught by the previous check.)
- [ ] **HTTPS URL** — use Grep to check that the `url:` field in `_config.yml` uses `https://`, not `http://`.
- [ ] **Jekyll build** — run `bundle exec jekyll build --quiet`. If it fails, stop and show the errors.

- [ ] **Gallery freshness** — find the commit SHA of the last change to `_data/gallery.yml` (`git log -1 --format=%H -- _data/gallery.yml`), then list image files added since that SHA under `assets/img/` excluding `assets/img/thumbnails/` (`git diff --name-only --diff-filter=A <sha>..HEAD -- 'assets/img/'`). Filter out any paths already present as `src:` entries in `_data/gallery.yml`. If any candidates remain, show the list to the user and ask: "Add these to the gallery before deploying, skip them, or abort?" If they choose to add, follow `update-gallery.md` then resume this ritual from the top. If skip, proceed. If abort, stop.

- [ ] **Dependabot alerts** — run `gh api repos/upthebuzzard/upthebuzzard.github.io/dependabot/alerts --jq '.[] | select(.state == "open")'` to check for open security alerts. If there are any, report them in a table (number, severity, package, summary). Ask the user to acknowledge before proceeding. If new alerts have appeared (i.e. alerts not previously dismissed or known), stop and investigate.

Report: "Pre-flight checks passed" with a summary of branch name and alert count.

## Step 2: Merge into main

Run these commands sequentially, stopping on any error:

```
git fetch origin main
git checkout main
git pull origin main
git merge <feature-branch>
```

If the merge has conflicts, stop: tell the user to resolve conflicts and try again.

Report: "Merged `<branch>` into main."

## Step 3: Push

**Ask the user to confirm before pushing.**

```
git push origin main
```

Report: "Pushed to origin/main."

## Step 4: Monitor deployment

Capture the pushed commit's full 40-char SHA with `git rev-parse HEAD` — do **not** hardcode or fabricate a SHA in the poll loop, and do **not** expand a 7-char short SHA into a made-up 40-char hash. Then poll the GitHub Actions workflow runs API every 10 seconds for up to 5 minutes:

```
EXPECTED=$(git rev-parse HEAD)
gh api repos/upthebuzzard/upthebuzzard.github.io/actions/runs?branch=main&per_page=1 --jq '.workflow_runs[0]'
```

Look for a run where:
- The `head_sha` field equals `$EXPECTED` (full 40-char match)
- The `status` field is `"completed"` and `conclusion` is `"success"`

If `conclusion` is anything other than `"success"`, stop and report the failure with the run URL (`html_url`).

When the run succeeds, report:
- Site URL: https://stories.upthebuzzard.com
- Commit SHA (short)
- Build timestamp from the `updated_at` field

If 5 minutes pass with no successful run, report timeout and give the user the manual check command.
