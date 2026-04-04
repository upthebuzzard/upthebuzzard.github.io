# Commit Ritual

Make a commit on the current feature branch, with the user's explicit approval.

This ritual enforces the `CLAUDE.md` rule: **Always ask before committing — never run `git commit` without explicit user approval.** Approval is per-commit and never implied.

## Step 1: Confirm we are not on main

```
git branch --show-current
```

If the branch is `main`, stop: "Refuse to commit to main — switch to a feature branch first."

## Step 2: Show the full scope of the change

Run each of these, showing their output to the user:

```
git status
git diff --stat
git diff                  # unstaged changes
git diff --cached         # already-staged changes
```

If new files are present and not yet tracked, list their paths.

Never commit a file the user has not seen in this ritual. If the diff is very large, summarise it in a table (file, lines added, lines removed, one-line purpose) and offer to show any specific file in full.

## Step 3: Stage the files

Stage specific files by name. Never use `git add -A` or `git add .` — those risk including secrets, build output, or unrelated work.

List the files staged and ask the user to confirm the selection is correct.

## Step 4: Draft the commit message

Draft a commit message with:
- Short subject line (imperative, under 72 characters)
- Blank line
- Body paragraph(s) explaining the **why**, not just the **what**
- Closing `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` trailer

Show the proposed message to the user.

## Step 5: Ask for explicit approval

Ask the user a direct question, e.g. "Commit with this message?" or "Ready to commit?"

Valid approval responses: "yes", "y", "go", "commit", or a specific instruction to change something and then commit. Anything else (including silence, "maybe", "looks good" without explicit go-ahead, or discussion of unrelated topics) is **not approval** — wait.

If the user wants changes to the files or the message, make them and restart at step 2 or 4.

## Step 6: Commit

Only after approval, run `git commit` using multiple `-m` flags (one per paragraph) to avoid HEREDOC quoting issues. Do **not** use `--amend` unless the user explicitly asks.

If a pre-commit hook fails, do NOT use `--no-verify`. Fix the hook's complaint, restage, and return to step 5 for re-approval.

## Step 7: Report

Run `git status` and show the new commit's SHA and subject to the user. The ritual ends here — do not push, do not start a follow-on task.
