#!/bin/bash
# Deploy ritual: merge feature branch into main, push, and monitor GitHub Pages build.
set -euo pipefail

REPO_OWNER="upthebuzzard"
REPO_NAME="upthebuzzard.github.io"
SITE_URL="https://stories.upthebuzzard.com"
POLL_INTERVAL=10
TIMEOUT=300  # 5 minutes

# --- Colours ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m' # No colour

info()  { echo -e "${BOLD}$*${NC}"; }
ok()    { echo -e "${GREEN}✓ $*${NC}"; }
warn()  { echo -e "${YELLOW}⚠ $*${NC}"; }
fail()  { echo -e "${RED}✗ $*${NC}"; exit 1; }

# ============================================================
# 1. Pre-flight checks
# ============================================================
info "\n=== Pre-flight checks ==="

# Must be in a git repo
git rev-parse --is-inside-work-tree &>/dev/null || fail "Not inside a git repository."

# Get current branch
BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null) || fail "Cannot determine current branch (detached HEAD?)."
[[ "$BRANCH" == "main" ]] && fail "Already on main — nothing to merge. Switch to a feature branch first."
ok "On branch: $BRANCH"

# Working tree must be clean
if ! git diff --quiet || ! git diff --cached --quiet; then
    fail "Working tree is dirty. Commit or stash your changes first."
fi
if [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
    fail "Untracked files present. Commit or remove them first."
fi
ok "Working tree is clean"

# --- Gotcha: unexcluded root files ---
# Collect non-underscore, non-dot files/dirs in the repo root that should be excluded
EXCLUDE_LIST=$(awk '/^exclude:/{found=1; next} found && /^[[:space:]]*-/{print; next} found{exit}' _config.yml | sed 's/.*- *//' | tr -d '"' | tr -d "'")

root_issues=()
# Files/dirs that are legitimate site content — not needing exclusion
SITE_CONTENT="Gemfile Gemfile.lock index.md about.md assets favicon.ico 404.md 404.html CNAME README.md"
SITE_CONTENT="$SITE_CONTENT browserconfig.xml feed.xml manifest.json search.html search.json"
SITE_CONTENT="$SITE_CONTENT googlefefc3e230be2bb45.html"

for f in $(ls -1 | grep -v '^\.' | grep -v '^_'); do
    # Skip known site content that Jekyll should process/publish
    if echo "$SITE_CONTENT" | tr ' ' '\n' | grep -qx "$f"; then
        continue
    fi
    # Check if it's in the exclude list
    if ! echo "$EXCLUDE_LIST" | grep -qx "$f"; then
        root_issues+=("$f")
    fi
done

if [[ ${#root_issues[@]} -gt 0 ]]; then
    fail "Root files not in _config.yml exclude list: ${root_issues[*]}\nAdd them to the exclude list before deploying."
fi
ok "All root files accounted for in exclude list"

# --- Gotcha: http:// in _config.yml url field ---
if grep -E '^\s*url:' _config.yml | grep -q 'http://'; then
    fail "Site URL in _config.yml uses http:// — should be https://"
fi
ok "Site URL uses https"

# --- Build check ---
info "\nBuilding site to verify..."
if bundle exec jekyll build --quiet; then
    ok "Jekyll build succeeded"
else
    fail "Jekyll build failed — fix errors before deploying."
fi

# ============================================================
# 2. Pull-merge-push
# ============================================================
info "\n=== Merge & push ==="

info "Fetching origin/main..."
git fetch origin main

info "Switching to main..."
git checkout main
git pull origin main
ok "main is up to date"

info "Merging $BRANCH into main..."
if ! git merge "$BRANCH"; then
    warn "Merge conflicts detected. Resolve them and try again."
    exit 1
fi
ok "Merged $BRANCH into main"

# Confirm before pushing
echo ""
read -r -p "Push to main? [y/N] " response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    warn "Push aborted. You're on main with the merge committed — run 'git push origin main' when ready."
    exit 0
fi

git push origin main
ok "Pushed to origin/main"

# ============================================================
# 3. Monitor deployment
# ============================================================
info "\n=== Monitoring GitHub Actions deployment ==="

COMMIT_SHA=$(git rev-parse HEAD)
info "Watching for commit ${COMMIT_SHA:0:7}..."

elapsed=0
while (( elapsed < TIMEOUT )); do
    # Get the latest workflow run for the pages workflow on main
    run_json=$(gh api "repos/$REPO_OWNER/$REPO_NAME/actions/runs?branch=main&per_page=1" --jq '.workflow_runs[0]' 2>/dev/null || true)

    if [[ -n "$run_json" ]]; then
        run_sha=$(echo "$run_json" | jq -r '.head_sha // empty')
        run_status=$(echo "$run_json" | jq -r '.status // empty')
        run_conclusion=$(echo "$run_json" | jq -r '.conclusion // empty')

        if [[ "$run_sha" == "$COMMIT_SHA" ]]; then
            if [[ "$run_status" == "completed" ]]; then
                if [[ "$run_conclusion" == "success" ]]; then
                    run_time=$(echo "$run_json" | jq -r '.updated_at // empty')
                    echo ""
                    ok "Site is live!"
                    info "  URL:    $SITE_URL"
                    info "  Commit: ${COMMIT_SHA:0:7}"
                    info "  Built:  $run_time"
                    exit 0
                else
                    run_url=$(echo "$run_json" | jq -r '.html_url // empty')
                    fail "Workflow failed ($run_conclusion): $run_url"
                fi
            else
                printf "\r  ⏳ Workflow status: %-12s (%ds elapsed)" "$run_status" "$elapsed"
            fi
        else
            printf "\r  ⏳ Waiting for workflow to start... (%ds elapsed)" "$elapsed"
        fi
    else
        printf "\r  ⏳ Waiting for workflow info...     (%ds elapsed)" "$elapsed"
    fi

    sleep "$POLL_INTERVAL"
    (( elapsed += POLL_INTERVAL ))
done

echo ""
warn "Timed out after ${TIMEOUT}s. Check manually:"
info "  gh run list --repo $REPO_OWNER/$REPO_NAME --limit 1"
info "  $SITE_URL"
exit 1
