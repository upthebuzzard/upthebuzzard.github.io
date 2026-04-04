# AI Authorship Disclosure: Gemini Feedback

**Date**: 2026-04-03
**Participants**: Claude (assessment), Gemini 2.5 Pro (feedback)
**Input**: The full `2026-04-02_ai-authorship-disclosure.md` discussion document

---

## Gemini Feedback

### 1. Completeness gaps identified

Two additions to the research:

**Google E-E-A-T perspective**: Google rewards high-quality content regardless of how it's produced; their concern is low-quality content at scale. A disclosure statement detailing *how* AI was used could strengthen the "Trustworthiness" signal — framing disclosure as a quality signal, not just an ethical obligation.

**U.S. Copyright Office stance**: Work generated entirely by AI is not copyrightable by a human. But work containing AI-generated material sufficiently modified by a human author *can* be copyrighted. This reinforces the VH3/VH2 boundary and gives a legal incentive to always remain in the "author" role.

### 2. Assessment of the six proposed approaches

| Approach | Gemini's verdict | Key failure mode |
|----------|-----------------|------------------|
| Do nothing | Untenable long-term | AI-assisted post detected → author seen as deceptive; silence is no longer neutral |
| Site-wide statement | Good foundation, insufficient alone | Feels like a blanket legal disclaimer for posts with meaningful AI involvement |
| Per-post frontmatter | Core mechanism, not complete solution | Without display element, only a note for the author; definition of "assistance" may drift |
| Tiered visual indicators | Overkill | Visual clutter, requires legend, may date quickly |
| Colophon | Excellent for philosophy/tools, not for per-post disclosure | Low visibility — most readers never see it |
| **Combination** | **Clearly the best** | Could be over-engineered if the tagging system is too complex |

### 3. Navigating the disclosure paradox

Key reframing: **Don't just disclose, describe.**

- Instead of clinical "This post was AI-assisted", use: "I used an AI assistant to help structure this article and check my grammar, much like a second pair of eyes."
- For fiction: "The initial concept came from a brainstorming session with an AI, but every word on the page is mine."
- Leverage the back-catalogue — 10+ years of verified human writing is a "trust bank"
- Focus on quality — the Reuters study shows readers primarily distrust *bad writing*, not AI use per se

### 4. Infrastructure vs. content distinction

**Verdict: essential and meaningful.**

- Tools used to build/deliver a publication are almost never disclosed at content level (nobody credits Microsoft Word or InDesign)
- Claude assistance with Jekyll templates/SCSS/scripts is infrastructure, not content authorship
- Belongs on a `/colophon` page, not on individual posts
- The Simon Willison and Steve Messer examples are the correct model

### 5. Practical recommendation

A concrete, low-friction plan:

**Step 1: Create a `/colophon` page** with four sections:
1. **Philosophy** — brief statement of approach to AI tools and transparency
2. **Threshold definition** — using the "did AI produce content in the final work?" test
3. **Historical record** — state explicitly that all posts before ~Jan 2026 were written without generative AI. Publication date serves as the tag.
4. **Infrastructure note** — mention Jekyll, GitHub Pages, Claude for theme/code assistance

**Step 2: Per-post frontmatter** for new content only:
```yaml
ai_assistance:
  level: editing  # none | editing | drafting | ideation
  note: "I used Claude to help refine the structure and proofread the final draft."
```

**Step 3: Conditional footer display** — render the note in post footer only when AI played a meaningful role, labelled "Process Note" or "Making Of" (not "AI Disclosure"), with a link to `/colophon`.

**Key principles:**
- No touching old posts — let publication date speak for them
- One new page (`/colophon`)
- Simple, optional YAML field on new posts
- Human-readable note in footer, not a badge or warning
- "Process Note" framing rather than "AI Disclosure"

---

## Assessment of Feedback

Gemini's feedback is practical, well-reasoned, and largely aligns with the direction the original research was heading. Key takeaways:

**The strongest contribution is the reframing from "disclosure" to "process note."** This is a genuinely useful shift. "AI Disclosure" sounds defensive and legalistic; "Process Note" or "Making Of" sounds like a natural part of the creative colophon. It changes the emotional register from confession to craft transparency.

**The combination approach endorsement is sound.** Colophon for philosophy + per-post metadata for specifics is the right architecture. The structured frontmatter (`level` + `note`) is cleaner than the simpler `ai_assisted: true/false` proposed in the original research — the free-text `note` field is where the "describe, don't just disclose" principle lives.

**The copyright angle is a useful addition** that the original research underweighted. The USCO position gives a concrete legal reason to stay in the "author" role, beyond the ethical and trust arguments.

**The E-E-A-T point is interesting but secondary.** For a personal blog that isn't SEO-dependent, this is nice-to-know rather than actionable.

**The "do nothing is untenable" position is debatable.** For a personal blog with no commercial stake and an EU creative/artistic exemption, "do nothing" remains a defensible choice — especially if the author never actually uses AI for content. But Gemini's point about "disclosure debt" is valid: it's easier to establish the convention *before* you need it than to retrofit it after.

**What's missing from the feedback:** No discussion of how this interacts with the zone system. Zone B (Pretensions) targets professional readers who may have stronger expectations around AI disclosure than Zone A (Stories) readers. The colophon/process-note approach works for both, but the tolerance for AI assistance likely differs by audience.

**Bottom line:** The `/colophon` page + per-post `ai_assistance` frontmatter + "Process Note" footer label is the right approach. It's low-friction, honest, future-proof, and tonally appropriate for a personal creative blog. The main decision is when to build it — now (before any AI-assisted content exists, establishing the convention cleanly) or later (when the first AI-assisted post is ready to publish).

---

## Decision: Colophon as DRY Includes (2026-04-04)

### The pattern

A single `/colophon.md` page describing the full creative process, structured as reusable `_includes/` sections — same pattern as `copyright.html` and `credits.html` already used on this site.

### Three self-contained includes

| Include | Content | Used on |
|---------|---------|---------|
| `_includes/colophon-fiction.html` | How the stories, fragments, poetry, games, and hifi content are made | `/colophon.md`, `/about.md` |
| `_includes/colophon-pretensions.html` | How the professional articles are researched and written | `/colophon.md`, `/_pretensions/about.md` |
| `_includes/colophon-site.html` | How the site itself is built (Jekyll, GitHub Pages, Claude for code/templates), AI process-note convention, per-post `ai_assistance` frontmatter approach | `/colophon.md`, `/about.md`, `/_pretensions/about.md` |

### Page composition

- **`/colophon.md`** — all three sections (the full picture)
- **`/about.md`** — fiction + site sections
- **`/_pretensions/about.md`** — pretensions + site sections

### Rationale

- **DRY**: Each section written once, included where relevant
- **Cross-zone visibility**: Pretensions readers see both the professional process *and* the site infrastructure. Stories readers see both the creative process *and* the site infrastructure. Anyone curious gets the full colophon with all three.
- **"Process Note" not "AI Disclosure"**: The colophon framing treats AI tools as part of the creative toolchain, not a confession. Tonally consistent with the IndieWeb colophon tradition (Simon Willison, Steve Messer examples).
- **Future-proof**: When AI-assisted content is published, the per-post `ai_assistance` frontmatter renders a "Process Note" in the post footer linking to `/colophon`. The convention is already established before it's needed.
