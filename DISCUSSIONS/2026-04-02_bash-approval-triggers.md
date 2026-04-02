# Claude Code Bash Approval Triggers

**Date:** 2026-04-02

## Problem

Claude Code has built-in safety heuristics that prompt "Do you want to proceed?" on certain bash command patterns. These can't be suppressed via settings ([open feature request](https://github.com/anthropics/claude-code/issues/30435)).

During the deploy ritual and general development, we hit these repeatedly on routine commands.

## Triggers

| Pattern | Example | Why it triggers |
|---------|---------|-----------------|
| `$(...)` command substitution | `git commit -m "$(cat <<'EOF' ...)"` | Safety heuristic flags subshell execution |
| Backticks `` `cmd` `` | `` echo `date` `` | Same as above (legacy substitution syntax) |
| Quotes inside `#` comments | `tr -d "'"` in a one-liner | "Can desync quote tracking" |
| `$'...'` ANSI-C quoting | `$'\n'` | Flagged as potential bypass |
| Unbalanced/unusual quotes | Complex string escaping | Quote tracking confusion |

These are **heuristic-based**, not permission-based — they fire even for allowlisted commands and have no "don't ask again" option.

## Workarounds We Use

1. **Multiple `-m` flags for commits** — avoids `$(cat <<'EOF')`:
   ```
   git commit -m "Title" -m "Body." -m "Co-Authored-By: ..."
   ```

2. **Claude-native tools instead of bash** — Glob, Grep, Read don't trigger any prompts. The deploy ritual's root-file check uses these instead of a complex bash one-liner.

3. **Simple bash commands** — push complexity into scripts or Claude's reasoning rather than cramming it into one command.

4. **Relative paths** — `RUBYOPT="-r ./_plugins/ruby34_compat.rb"` avoids `$(pwd)`.

## Alternative: PreToolUse Hook

A hook could auto-approve specific command patterns:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "./.claude/hooks/approve-safe-commands.sh"
          }
        ]
      }
    ]
  }
}
```

Not implemented — the simpler workarounds above are sufficient for now.

## Sources

- [GitHub Issue #30435: Allow suppressing bash safety heuristic prompts](https://github.com/anthropics/claude-code/issues/30435)
- [GitHub Issue #26796: Bash tool prompts for allowed commands](https://github.com/anthropics/claude-code/issues/26796)
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide.md)
