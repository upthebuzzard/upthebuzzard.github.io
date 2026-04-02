# Deploy Ritual

Merge the current feature branch into main, push, and monitor until the site is live.

## Step 1: Pre-flight checks

Run each check. If any fails, stop and report the problem.

- [ ] **Not on main** — get the current branch name. If it's `main`, stop: "Nothing to deploy — already on main."
- [ ] **Clean working tree** — run `git status`. If there are uncommitted changes or untracked files, stop: tell the user to commit or stash first.
- [ ] **Root files excluded** — use Glob to list root files (`*` in repo root), then Read `_config.yml` to get the exclude list. Compare non-dot, non-underscore root files against the exclude list and known site content files (`Gemfile`, `Gemfile.lock`, `index.md`, `about.md`, `assets`, `favicon.ico`, `404.md`, `404.html`, `CNAME`, `README.md`, `browserconfig.xml`, `feed.xml`, `manifest.json`, `search.html`, `search.json`, `googlefefc3e230be2bb45.html`). Any file in neither list is a problem — stop and tell the user.
- [ ] **HTTPS URL** — use Grep to check that the `url:` field in `_config.yml` uses `https://`, not `http://`.
- [ ] **Jekyll build** — run `bundle exec jekyll build --quiet`. If it fails, stop and show the errors.

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

Get the HEAD commit SHA. Then poll the GitHub Actions workflow runs API every 10 seconds for up to 5 minutes:

```
gh api repos/upthebuzzard/upthebuzzard.github.io/actions/runs?branch=main&per_page=1 --jq '.workflow_runs[0]'
```

Look for a run where:
- The `head_sha` field matches the pushed SHA
- The `status` field is `"completed"` and `conclusion` is `"success"`

If `conclusion` is anything other than `"success"`, stop and report the failure with the run URL (`html_url`).

When the run succeeds, report:
- Site URL: https://stories.upthebuzzard.com
- Commit SHA (short)
- Build timestamp from the `updated_at` field

If 5 minutes pass with no successful run, report timeout and give the user the manual check command.
