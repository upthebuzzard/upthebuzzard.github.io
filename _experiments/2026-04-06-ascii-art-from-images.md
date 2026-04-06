---
layout: post
title: ASCII Art from Images
date: 2026-04-06 10:00
categories: []
sequence: 1
excerpt: >
  Converting a public domain engraving of King Canute into ASCII art using ascii-image-converter. Braille mode at 80 columns was the sweet spot.
---

*Vibe-coded with [Claude](https://claude.ai/)*

A quick experiment converting images to ASCII art using [`ascii-image-converter`](https://github.com/TheZoraiz/ascii-image-converter), a Go command-line tool.

## The source images

The subject: a classic engraving of King Canute rebuking his courtiers — the "commanding the tides" scene. A public domain illustration from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Canute_rebukes_his_courtiers.png), with multiple figures, flowing robes, waves, and detailed crosshatching.

<img src="/assets/img/experiments/canute-rebukes-courtiers.png" alt="Canute rebukes his courtiers — public domain engraving" style="max-width: 200px;">

A high-contrast version, pre-processed to boost the engraving's tonal range before conversion:

<img src="/assets/img/experiments/canute-rebukes-courtiers-hicontrast.png" alt="Canute rebukes his courtiers — high-contrast version" style="max-width: 200px;">

## The tool

[ascii-image-converter](https://github.com/TheZoraiz/ascii-image-converter) by TheZoraiz. Not available in Homebrew — requires Go:

```
go install github.com/TheZoraiz/ascii-image-converter@latest
```

Key flags:
- `-W` — output width in columns
- `-b` — Braille mode (Unicode Braille characters, each encoding a 2x4 dot grid — roughly 8x the effective resolution of standard ASCII)
- `-m` — custom character ramp (e.g. `-m " .:-=+*#%@"`)
- `--negative` — inverts the brightness mapping

## Gallery of approaches

<table>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>1. Standard ASCII, 80 columns</strong><br><br>
<code>ascii-image-converter canute.png -W 80</code><br><br>
Muddy <code>*#+=</code> soup, barely readable.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-ascii-80.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>2. Standard ASCII, 80 columns, --negative</strong><br><br>
<code>ascii-image-converter canute.png -W 80 --negative</code><br><br>
Brighter but still muddy — the limited character set can't resolve detail.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-ascii-80-neg.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>3. Standard ASCII, 120 columns</strong><br><br>
<code>ascii-image-converter canute.png -W 120</code><br><br>
More detail but still a dense <code>#*+</code> texture. Hard to make out subjects.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-ascii-120.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>4. Standard ASCII, 120 columns, --negative</strong><br><br>
<code>ascii-image-converter canute.png -W 120 --negative</code><br><br>
Inverted version — slightly more legible but still limited by the character set.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-ascii-120-neg.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>5. Custom character ramp, 120 columns</strong><br><br>
<code>ascii-image-converter canute.png -W 120 -m " .:-=+*#%@"</code><br><br>
Identical output to #3 — the default ramp already covers the brightness range well enough.
</td>
<td style="padding: 10px; vertical-align: middle; text-align: center;">
<em>Output identical to #3</em>
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>6. High-contrast ASCII, 80 columns</strong><br><br>
<code>ascii-image-converter canute_hicontrast.png -W 80</code><br><br>
Pre-processed source with boosted contrast. The ASCII rendering is punchier but still limited by the character set.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-hicontrast-ascii-80.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>7. Braille, 80 columns</strong><br><br>
<code>ascii-image-converter canute.png -W 80 -b</code><br><br>
Dramatic improvement over standard ASCII — the 2x4 dot grid captures fine detail. But the brightness mapping is inverted for this source image.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-braille-80.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>8. Braille, 80 columns — the winner ⭐</strong><br><br>
<code>ascii-image-converter canute.png -W 80 -b --negative</code><br><br>
The <code>--negative</code> flag corrects the brightness for this dark-on-light engraving, producing a natural positive rendering: filled dots for the ink strokes, empty space for the paper.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-braille-80-pos.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>9. Braille, 120 columns</strong><br><br>
<code>ascii-image-converter canute.png -W 120 -b</code><br><br>
More resolution but dark areas saturate into solid blocks. Still inverted.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-braille-120.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>10. Braille, 160 columns</strong><br><br>
<code>ascii-image-converter canute.png -W 160 -b</code><br><br>
Too wide — dark areas collapse into solid blocks. Diminishing returns past 120 columns. Still inverted.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-braille-160.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>11. High-contrast Braille, 80 columns (positive)</strong><br><br>
<code>ascii-image-converter canute_hicontrast.png -W 80 -b --negative</code><br><br>
High-contrast source with Braille and corrected brightness. Bolder strokes but loses some of the engraving's subtlety.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-hicontrast-braille-80-pos.html %}
</td>
</tr>
</table>

## Further experiments

Exploring additional flags and image pre-processing to see if we can beat the Braille 80 winner.

<table>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>12. Braille 80, dithered (positive)</strong><br><br>
<code>ascii-image-converter canute.png -W 80 -b --negative --dither</code><br><br>
Dithering adds noise to simulate tonal gradation in the binary on/off braille dots.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-braille-80-dither-pos.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>13. Braille 80, threshold 160 (positive)</strong><br><br>
<code>ascii-image-converter canute.png -W 80 -b --negative --threshold 160</code><br><br>
Higher threshold — more dots lit, producing a darker/denser result.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-braille-80-thresh160-pos.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>14. Braille 80, threshold 192 (positive)</strong><br><br>
<code>ascii-image-converter canute.png -W 80 -b --negative --threshold 192</code><br><br>
Even higher threshold — the densest variant.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-braille-80-thresh192-pos.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>15. Complex ASCII, 80 columns</strong><br><br>
<code>ascii-image-converter canute.png -W 80 -c</code><br><br>
Extended character set with more tonal levels than the default ramp.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-complex-80.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>16. Complex ASCII, 80 columns, --negative</strong><br><br>
<code>ascii-image-converter canute.png -W 80 -c --negative</code><br><br>
Extended character set with inverted brightness.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-complex-80-neg.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>17. Edge-detected, Braille 80 (positive)</strong><br><br>
Source pre-processed with Pillow edge detection, then:<br>
<code>ascii-image-converter canute_edges.png -W 80 -b --negative</code><br><br>
Isolates the engraving's line work before conversion.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-edges-braille-80-pos.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>18. Equalized, Braille 80 (positive)</strong><br><br>
Source pre-processed with histogram equalization, then:<br>
<code>ascii-image-converter canute_equalized.png -W 80 -b --negative</code><br><br>
Spreads the tonal range evenly across the histogram.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-equalized-braille-80-pos.html %}
</td>
</tr>
<tr>
<td style="vertical-align: top; padding: 10px; min-width: 200px;">
<strong>19. Autocontrast, Braille 80 (positive)</strong><br><br>
Source pre-processed with aggressive autocontrast (10% cutoff), then:<br>
<code>ascii-image-converter canute_autocontrast.png -W 80 -b --negative</code><br><br>
Stretches contrast by clipping the lightest and darkest 10%.
</td>
<td style="padding: 10px;">
{% include ascii-art/canute-autocontrast-braille-80-pos.html %}
</td>
</tr>
</table>

## What we learned

**Braille mode is the clear winner for detailed images.** Each Braille character encodes a 2x4 dot grid, giving roughly 8x the effective resolution of a single ASCII character. This makes an enormous difference for images with fine detail like engravings.

**The `--negative` flag is essential for dark-on-light source images.** The default brightness mapping produces an inverted rendering — use `--negative` to get the natural positive result where filled dots represent the ink strokes.

**Width matters.** Too narrow and you lose detail; too wide and dark areas saturate into solid blocks. For a 500px-wide source image, 80 Braille columns was the sweet spot.

**Engravings are ideal subjects.** The crosshatching technique used in traditional engravings maps naturally to Braille dot patterns — both represent tone through density of marks. Photographs with smooth gradients would likely fare worse.

**ASCII art is context-hungry.** When vibe-coding this article, the large pre blocks of ASCII art counted as text in the LLM's context window, burning through it fast and triggering repeated session compactions. The fix was to keep the art in separate files and assemble the article with a shell script, avoiding loading the content into the conversation.
