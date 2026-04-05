#!/bin/bash
# Generate 150px square thumbnails for the homepage gallery.
# Uses macOS sips (no ImageMagick needed).
# Reads image paths from _data/gallery.yml, outputs to assets/img/thumbnails/.
# Thumbnails are JPEG at 70% quality for small file sizes.

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
THUMB_DIR="$REPO_ROOT/assets/img/thumbnails"
GALLERY_FILE="$REPO_ROOT/_data/gallery.yml"
SIZE=150

mkdir -p "$THUMB_DIR"

# Extract src paths from gallery.yml
grep 'src:' "$GALLERY_FILE" | sed 's/.*src: //' | while IFS= read -r src; do
  full_path="$REPO_ROOT$src"
  # Flatten path to filename: replace / with _ and strip leading _
  thumb_name=$(echo "$src" | sed 's|^/assets/img/||; s|/|_|g')
  # Force .jpg extension for all thumbnails
  thumb_name="${thumb_name%.*}.jpg"
  thumb_path="$THUMB_DIR/$thumb_name"

  if [ -f "$thumb_path" ]; then
    echo "SKIP $thumb_name (exists)"
    continue
  fi

  if [ ! -f "$full_path" ]; then
    echo "MISS $src (not found)"
    continue
  fi

  # Scale so the shorter edge becomes SIZE (preserving aspect ratio), then
  # center-crop to a SIZE x SIZE square and write as JPEG. Everything is done
  # in one sips invocation writing to --out so we never modify in place --
  # sips cannot re-encode some formats (e.g. webp) in place on macOS.
  dims=$(sips -g pixelWidth -g pixelHeight "$full_path" 2>/dev/null)
  w=$(echo "$dims" | awk '/pixelWidth:/ {print $2}')
  h=$(echo "$dims" | awk '/pixelHeight:/ {print $2}')
  if [ "$w" -le "$h" ]; then
    sips --resampleWidth "$SIZE" --cropToHeightWidth "$SIZE" "$SIZE" \
      --setProperty format jpeg --setProperty formatOptions 70 \
      "$full_path" --out "$thumb_path" >/dev/null 2>&1
  else
    sips --resampleHeight "$SIZE" --cropToHeightWidth "$SIZE" "$SIZE" \
      --setProperty format jpeg --setProperty formatOptions 70 \
      "$full_path" --out "$thumb_path" >/dev/null 2>&1
  fi

  new_size=$(stat -f%z "$thumb_path")
  echo " OK  $thumb_name ($(( new_size / 1024 ))KB)"
done

echo "Done. Thumbnails in $THUMB_DIR"
