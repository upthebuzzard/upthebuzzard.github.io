#!/bin/bash
# Local dev server for Jekyll site.

PORT=4000
PID=$(lsof -ti:$PORT 2>/dev/null)
if [[ -n "$PID" ]]; then
  echo "Killing process on port $PORT (PID $PID)..."
  kill "$PID"
  sleep 1
fi

bundle exec jekyll serve --port "$PORT" "$@"
