# AI Authorship Disclosure: Emerging Norms and Practical Approaches

**Date:** 2026-04-02

## Context

This site has content spanning from 2011 to the present. With LLMs becoming mainstream from late 2022 onwards (ChatGPT launched November 2022), the content naturally falls into three categories:

1. **Pre-LLM** — written before LLMs existed in any usable form. Could not have been written by an LLM. (All posts before ~2023.)
2. **LLM-era, human-only** — written after LLMs became available, but without any LLM assistance. (Currently all recent posts.)
3. **LLM-assisted** — primarily written by the author, with LLM assistance for editing, ideation, or drafting. (None yet, but anticipated.)

The question: how to acknowledge this provenance in a way that's honest, low-friction, and doesn't feel performative or defensive?

Below is research into how others are handling this, followed by open questions specific to this site.

---

## 1. How Individual Bloggers and Writers Are Disclosing AI Assistance

### Emerging Conventions

There is no single standard yet, but several patterns are crystallising:

**Per-post disclosure (most common for bloggers):**
- A short statement within the first two paragraphs or at the end of the post
- Example: "This story was written with the assistance of an AI writing program."
- Some writers use a two-tier approach: a brief inline note plus a linked page with fuller details about their tools, guardrails, and review process

**Site-wide AI policy page:**
- A dedicated page (often linked from the footer, like "AI Policy" or "Editorial Guidelines") describing the writer's general approach to AI tools
- Joanna Penn (The Creative Penn) lists all AI tools she uses and puts detailed AI usage notes behind her Patreon paywall
- Source: [The Creative Penn - AI](https://www.thecreativepenn.com/tag/ai/)

**Visual indicators / icons:**
- Some Substack writers use emoji-based indicators per post:
  - Brain icon = entirely human-written
  - Pencil icon = human-written with AI support for editing/research
- Each article ends with a short statement explaining the AI's role
- Source: [Substack Writers at Work - AI Disclosure Policy](https://www.substackwritersatwork.com/p/2025-ai-disclosure-policy-transparency-substack)

**Tiered disclosure (distinguishing levels of AI involvement):**
- "AI-generated" = majority created by AI with minimal human editing
- "AI-assisted" = human-authored, AI used for editing, research, brainstorming, grammar
- Most platforms and writers agree that basic grammar/spell-check does not require disclosure
- Source: [Brafton - 5 AI Disclaimer Examples](https://www.brafton.com/blog/ai/ai-disclaimer-example/)

### Practical Disclosure Language Examples

From news organisations (Trusting News sample language):
- "Artificial Intelligence assisted us in transcribing the audio from our interviews with sources."
- "We used Artificial Intelligence to draft the content of this newsletter/social post/story."
- "We relied on AI to suggest headlines based on the content of our reporting."
- Source: [Trusting News - Sample Language for AI Disclosure](https://trustingnews.org/ai-resource-sample-language-to-include-in-ai-use-disclosures/)

From Medium's guidance:
- "This story was written with the assistance of an AI writing program."
- Source: [Medium AI Content Policy](https://help.medium.com/hc/en-us/articles/22576852947223-Artificial-Intelligence-AI-content-policy)

### The Disclosure Paradox

Research from a 2025 study ("What Shapes Writers' Decisions to Disclose AI Use?", arXiv:2505.20727) found that writers are far less likely to disclose or credit AI compared to human collaborators. A related study ("Penalizing Transparency?", arXiv:2507.01418) found that people who disclose using AI are trusted less than those who stay silent -- even though disclosure is widely seen as the ethical choice.

This creates a perverse incentive against transparency. The researchers identified three categories of factors shaping disclosure decisions:
1. **Procedural** -- how the AI was used (contribution type, amount, who initiated)
2. **Social** -- audience expectations and likely judgments
3. **Personal** -- individual values, self-efficacy, demographics

Sources:
- [What Shapes Writers' Decisions to Disclose AI Use?](https://arxiv.org/abs/2505.20727)
- [Penalizing Transparency?](https://arxiv.org/abs/2507.01418)

---

## 2. Metadata Standards for AI-Generated or AI-Assisted Content

### Schema.org

As of 2026, there is **no dedicated schema.org vocabulary for marking content as AI-generated or AI-assisted**. The focus has been on using existing structured data (JSON-LD) for AI search visibility rather than provenance signalling. No "AIContent" or "aiGenerated" property exists in the schema.org specification.

### Creative Commons: CC Signals

Creative Commons has developed a new framework called **CC Signals** -- a social and technical tool for signalling preferences about how content can be reused by machines (including AI training).

Key details:
- Paper prototype released end of June 2025
- Alpha launch targeted for November 2025
- Designed for "machine and human readability"
- Not mediated through copyright or CC licenses -- governed by a social contract
- Aimed at dataset holders and large collections, not individual blog posts
- Source: [Introducing CC Signals](https://creativecommons.org/2025/06/25/introducing-cc-signals-a-new-social-contract-for-the-age-of-ai/)

CC Signals addresses the *input* side (whether your content can be used to train AI) rather than the *output* side (whether your content was written with AI assistance). These are complementary but distinct concerns.

### Amazon KDP

Amazon's Kindle Direct Publishing has the most concrete commercial standard:
- During book setup, authors must declare whether AI-generated text, images, or translations appear in the final work
- "Assisting role" uses (editing, brainstorming, grammar checking) do not require disclosure
- If AI produced words/images/translations that appear in the published work, disclosure is required
- Source: [KDP AI Disclosure Rules 2025](https://www.brandonrohrbaugh.com/blog/kdp-ai-disclosure-rules-2025-explained)

### EU AI Act (Article 50)

The EU AI Act introduces mandatory labelling requirements for AI-generated content:
- Providers of generative AI must ensure outputs are marked in a **machine-readable format** and detectable as AI-generated
- Deployers must clearly inform users when content is AI-generated
- Exception: "evidently artistic, creative, satirical, or fictional" content requires only "minimal and non-intrusive" disclosure
- **Timeline: these obligations become applicable on 2 August 2026**
- A Code of Practice on marking and labelling is being finalised (due June 2026)
- Sources:
  - [EU AI Act Article 50](https://artificialintelligenceact.eu/article/50/)
  - [AI Labeling Requirement Starting in 2026](https://weventure.de/en/blog/ai-labeling)
  - [EU Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)

The creative/artistic exemption is particularly relevant for a storytelling blog.

---

## 3. C2PA / Content Credentials

### What It Is

The Coalition for Content Provenance and Authenticity (C2PA) provides an open technical standard for documenting the origin and edit history of digital content. Content Credentials function like a "nutrition label" for digital content.

### How It Works

- Metadata is cryptographically signed and embedded in the file
- Records creation tool, modifications, and whether AI was involved
- Supports images, video, audio, and documents (including text)
- Verified across platforms via a chain of trust
- Source: [C2PA](https://c2pa.org/)

### 2025-2026 Adoption

- **Hardware:** Samsung Galaxy S25 and Google Pixel 10 integrate C2PA signing in native camera apps -- bringing the standard to consumer devices
- **AI providers:** OpenAI, Google DeepMind, and Meta participate in C2PA
- **Platforms:** LinkedIn, Meta products, and various broadcast organisations support verification
- **Conformance Program:** Launched to establish accountability; spec version 2.1 adds stricter tamper resistance
- Source: [The State of Content Authenticity in 2026](https://contentauthenticity.org/blog/the-state-of-content-authenticity-in-2026)

### Known Limitations

- **Metadata stripping:** Most platforms that reprocess files (compression, resizing, format conversion) strip C2PA metadata
- **Voluntary adoption:** No requirement to use it
- **Text content gap:** While technically supported for documents, C2PA adoption has been overwhelmingly focused on images and video. There is no practical ecosystem for applying Content Credentials to blog posts or HTML content
- **Proves provenance, not truth:** Certifies the history of content, not its accuracy or quality
- Source: [C2PA in 2026: Does the Standard Actually Work?](https://truescreen.io/articles/c2pa-standard-history-limitations/)

### Relevance to a Personal Blog

C2PA is currently **not practical for a static site / blog post context**. It is designed for binary assets (images, video, PDFs) rather than HTML pages served from a static site generator. There is no Jekyll plugin or GitHub Pages integration. It could theoretically apply to images used on the site, but the ecosystem is not there for text content.

---

## 4. Platform Policies: Medium, Substack, WordPress

### Medium

- **AI-generated content** (majority AI-created with minimal editing): must be disclosed within the first two paragraphs; excluded from the Partner Program paywall; receives "Network Only" distribution (followers only, no algorithmic boost)
- **AI-assisted content** (outlining, grammar, spell-check, fact-checking): no disclosure required
- **AI-generated images**: must be captioned identifying them as AI-generated
- Source: [Medium AI Content Policy](https://help.medium.com/hc/en-us/articles/22576852947223-Artificial-Intelligence-AI-content-policy)

### Substack

- **No AI-specific policy at all.** Substack is deliberately hands-off
- Writers build their own subscriber bases, so there is no shared revenue pool that AI content could dilute
- Individual creators are self-organising around disclosure norms (see Section 1 above)
- Source: [Substack Writers at Work - AI Disclosure](https://www.substackwritersatwork.com/p/2025-ai-disclosure-policy-transparency-substack)

### WordPress

- Published comprehensive **AI Guidelines** in February 2026 with five core principles:
  1. **Contributor accountability** for AI-assisted work
  2. **Mandatory disclosure** of meaningful AI assistance
  3. GPL licensing compatibility
  4. Comprehensive licensing beyond code to all assets
  5. Quality focus over volume (combating "AI slop")
- **Trivial AI assistance** (variable name suggestions, import reordering) does not require disclosure
- **Meaningful AI assistance** (code logic, documentation structure, test design, creative decisions) requires disclosure
- Source: [WordPress AI Guidelines 2026](https://almcorp.com/blog/wordpress-ai-guidelines-2026-complete-framework/)

### Summary Table

| Platform | Policy exists? | AI-generated disclosure | AI-assisted disclosure | Monetisation impact |
|----------|---------------|------------------------|----------------------|-------------------|
| Medium | Yes | Required (first 2 paragraphs) | Not required | Excluded from paywall |
| Substack | No | Writer's choice | Writer's choice | None |
| WordPress | Yes (Feb 2026) | Required | Required if "meaningful" | N/A (self-hosted) |
| Amazon KDP | Yes | Required at setup | Not required | None stated |

---

## 5. Thoughtful Essays on Ethics/Aesthetics of AI in Creative Writing

### Key Academic Work

**"What Shapes Writers' Decisions to Disclose AI Use?"** (2025, CHIWORK Workshop)
- Writers disclose AI use far less than human collaboration
- Social pressure and audience judgment are major deterrents
- The type and amount of AI contribution affects willingness to disclose
- Source: [arXiv:2505.20727](https://arxiv.org/abs/2505.20727)

**"Penalizing Transparency? How AI Disclosure and Author Demographics Shape Human and AI Judgments About Writing"** (2025)
- Disclosing AI use leads to lower trust ratings from readers
- Creates a paradox: ethical behaviour (disclosure) is punished
- Source: [arXiv:2507.01418](https://arxiv.org/abs/2507.01418)

**"Full Disclosure, Less Trust? How the Level of Detail about AI Use in News Writing Affects Readers' Trust"** (2026)
- Examines whether more detailed disclosure helps or hurts trust
- Source: [arXiv:2601.09620](https://arxiv.org/html/2601.09620v1)

**"Literary Writing and Ethical Issues in the Era of Artificial Intelligence"** (2025, SAGE Journals)
- Explores copyright ambiguity around AI authorship
- Questions whether prompting constitutes creative contribution
- Source: [SAGE Journals](https://journals.sagepub.com/doi/10.1177/14727978251337920)

### Practitioner Perspectives

**Jane Friedman** (publishing industry authority) maintains an AI and Publishing FAQ for writers, distinguishing between acceptable and problematic AI uses in trade publishing:
- Source: [Jane Friedman - AI and Publishing FAQ](https://janefriedman.com/ai-and-publishing-faq-for-writers/)

**Joanna Penn** (The Creative Penn) openly discusses AI in her workflow and always discloses usage, listing all tools used:
- Source: [The Creative Penn - AI](https://www.thecreativepenn.com/tag/ai/)

**Neil Clarke** (Clarkesworld Magazine editor) wrote about how AI submissions forced changes to their submission process -- a significant moment in the sci-fi publishing world:
- Source: [How AI Submissions Changed Our Process](https://neil-clarke.com/how-ai-submissions-have-changed-our-submissions-process/)

### The Core Tension

A Reuters Institute study (2025) found that 71% of readers say they trust content less when they suspect AI wrote it -- but that distrust is primarily triggered by generic phrasing and lack of original insight, not by AI use per se. This suggests that the quality and distinctiveness of the writing matters more than the tool used.

The emerging consensus in the creative writing world appears to be:
- **Transparency is ethically right** but comes with a trust penalty
- **The spectrum matters** -- there is a vast difference between "AI wrote this" and "I used AI to check my grammar"
- **Authenticity of voice** is what readers actually care about
- **No standard has won yet** -- each writer/platform is figuring it out independently

---

## Possible Approaches for This Site

These are options to consider, not recommendations:

1. **Do nothing** -- most personal blogs have no AI disclosure. The creative/artistic exemption in the EU AI Act suggests minimal obligation for fiction/storytelling.

2. **Site-wide statement** -- an "About / How I Write" page or section describing the role (if any) of AI tools in the creative process. Linked from the footer.

3. **Per-post frontmatter** -- a YAML field like `ai_assisted: true/false` or `ai_role: "editing"` that could optionally render a disclosure line on posts where AI was used.

4. **Tiered visual indicators** -- icons or labels distinguishing "fully human", "AI-assisted editing", "AI-assisted drafting" etc.

5. **Colophon approach** -- treat it like a traditional colophon (the "this site was built with Jekyll" note), mentioning AI tools alongside other tools used in the creative process.

6. **Combination** -- site-wide policy page + per-post metadata for posts where AI played a meaningful role.

---

## Open Questions for This Site

### What problem are we solving?

Is this about:
- **Reader trust** — letting readers know the voice they're reading is genuinely human?
- **Personal integrity** — wanting to be transparent about how things were made?
- **Historical record** — distinguishing what was written in a pre-LLM world from what came after?
- **Future-proofing** — establishing a convention now before AI-assisted posts exist, so it doesn't look defensive when they appear?

These lead to different designs. If it's about historical record, date-based inference might be enough. If it's about personal integrity, per-post metadata makes more sense.

### The three categories revisited

| Category | Approximate date range | Current count | Needs tagging? |
|----------|----------------------|---------------|----------------|
| Pre-LLM | 2011–2022 | ~100+ posts | Could infer from date |
| LLM-era, human-only | 2023–present | A handful | Explicit or inferred? |
| LLM-assisted | Future | None yet | Definitely explicit |

**Tension:** If we infer "pre-LLM" from date, we avoid touching old posts. But the cutoff is fuzzy (GPT-3 existed in 2020, ChatGPT launched Nov 2022, but most people's "LLM era" started in 2023). And some posts in 2023+ might use LLMs for the *site infrastructure* (this Jekyll migration, for example) without any LLM involvement in the *creative writing*.

### What counts as "LLM-assisted"?

This is the hardest question, but it turns out several frameworks have emerged. They converge on similar boundaries.

**The VerifiedHuman 5-level spectrum** ([verifiedhuman.info](https://www.verifiedhuman.info/human-ai-spectrum)):

| Level | Name | Description |
|-------|------|-------------|
| VH5 | Entirely human | Every word by the human. Spell-check/word processors fine. |
| VH4 | Human-written, AI-enhanced | All words by the human. AI used only for research, outlining, brainstorming, fact-checking. |
| VH3 | Human-led, AI-assisted | AI may have generated draft material, but the writer "substantially transformed" it. |
| VH2 | AI-led, human-directed | AI generated most text. Human provided prompts and edited, but didn't substantially transform. |
| VH1 | Entirely AI-generated | AI generated text from prompts with no meaningful human writing. |

They propose a gut-check: the **Five-Word Principle** — "If you cannot change five consecutive words from an AI draft without breaking the meaning, you have not made the work your own."

**The SAM Spectrum** (Reed Hepler, [Substack](https://reedhepler.substack.com/p/the-human-ai-collaboration-spectrum)): Manuscript (100% human) → Artifact (50-75% human, genuine partnership) → gap zone → Slop (0-25% human, copy-paste).

**AI Labels** ([ailabels.org](https://ailabels.org/)): Three tiers — Made by Humans / Made by Humans with AI / Made Primarily by AI. Excludes spell-check and pre-generative-AI tools from the definition.

**Where the disclosure threshold is settling** — remarkably consistent across frameworks:

Does **not** require disclosure:
- Spell-checking, grammar tools (even AI-powered ones like Grammarly)
- Brainstorming and idea generation
- Research assistance, fact-checking
- Outlining and structure planning

**Does** require disclosure:
- AI-drafted text that appears in the final work, even if edited
- AI-generated images used in the final work
- Substantial passages where AI wrote the first draft

**Grey zone:**
- AI-suggested rewrites of specific sentences
- AI-generated draft paragraphs heavily rewritten in the author's voice
- Using AI to generate options that the author selects from

The practical dividing line most frameworks converge on: **Did AI produce content that appears in the final work, or did AI only help you produce your own content?**

Traditional publishing analogy: spell-checker → no disclosure (never disclosed). Research assistant → no disclosure. Developmental editor → acknowledgement but not co-credit. Ghostwriter → disclosure arguably needed. Co-author → always credited.

### Site infrastructure vs. content

This site's *code* (templates, SCSS, deployment scripts) was written with significant Claude assistance. The *content* (stories, poems, fragments) was not. Should infrastructure assistance be disclosed? It feels categorically different — nobody discloses that they used an IDE with autocomplete to write their blog's CSS.

### Display considerations

- **Prominence:** Should this be visible in the post header (where readers see it first) or in the footer metadata (where details live)?
- **Default state:** Should the absence of a tag mean "human-written" (opt-in disclosure) or should all posts declare their status (opt-in for everything)?
- **Tone:** Clinical ("AI Disclosure: None") vs. conversational ("Written the old-fashioned way") vs. invisible-unless-present?
- **Machine-readable:** Should there be structured metadata (for search engines, future standards) even if nothing is visibly displayed?

### The "over-declaring" risk

Putting "100% human-written" on every old post could feel:
- Performative — protesting too much
- Dated — will look quaint in five years when everyone uses AI tools
- Misleading — implies that AI-written content is suspect

The lightest touch might be the most dignified: say nothing on old posts, disclose meaningfully on new posts where AI played a real role, and have a site-wide statement for anyone who cares to look.

---

## 6. Visual & UX Approaches to Displaying AI Authorship (Research)

This section collects concrete examples of how websites visually indicate AI involvement, focusing on personal blogs, indie publications, and creative writing sites rather than enterprise content marketing.

### 6.1 Badge/Label Systems

#### Not By AI (notbyai.fyi)

The most established "human-made" badge system. Offers three badge types:

- **Writer badges:** "Written by Human, Not By AI" (also "Authored", "Created", "Researched", "Scripted")
- **Artist badges:** "Painted by Human, Not By AI" (also "Drawn", "Animated", "Designed", "Composed", "Crafted")
- **Producer badges:** "Produced by Human, Not By AI" (also "Filmed", "Arranged", "Developed", "Narrated", "Performed")

Visual design: rectangular badges available in white-on-dark and dark-on-white variants. Minimum display height of 42px. Recommended for "less visible" placement like a website footer, to avoid visually competing with content.

Implementation is a simple linked image tag:
```html
<a href="https://notbyai.fyi">
  <img src="written-by-a-human-not-by-ai-white.svg"
       alt="Written by a Human, Not by AI">
</a>
```

Operates on a "90% rule" -- at least 90% of the content must be human-created. Available in 30+ languages. Over 2,000 sites in their gallery.

Key observation: this is an **opt-in "human" label** rather than an opt-in "AI" label. It labels the default (human-written) rather than the exception (AI-assisted). This arguably gets the default state backwards for a site where most content is human-written.

- Source: [Not By AI](https://notbyai.fyi/)
- Source: [Not By AI - How It Works](https://notbyai.fyi/how-it-works)
- Source: [Not By AI - Usage Guidelines](https://notbyai.fyi/help/guidelines)

#### No-AI Icon (no-ai-icon.com)

A simpler alternative: free SVG/PNG badges with transparent backgrounds stating "100% human-made content." Available for free, colour-customisable to match site design. Terms require linking to a statement page and prohibit use on pages with AI-generated content.

- Source: [No-AI Icon](https://no-ai-icon.com/)

#### VerifiedHuman (verifiedhuman.info)

A more structured certification system with a 5-level "Human-AI Spectrum" framework:

- Certifies people, not content ("like Fair Trade does for coffee")
- Only levels VH3 and above qualify for the VerifiedHuman mark
- Covers writers, visual artists, musicians, voice actors (8 categories)
- The framework answers: "Who led the creative process?"
- Distinguishes between AI generating raw material (draft copy, image options) vs. the creator substantially transforming and integrating those elements

The key insight is treating AI involvement as a **spectrum** rather than binary. However, the Wix-based site makes it hard to extract the exact level definitions.

- Source: [VerifiedHuman Human-AI Spectrum](https://www.verifiedhuman.info/human-ai-spectrum)

### 6.2 The Colophon Approach

Several personal sites use their colophon page -- a traditional "how this site was made" page -- to mention AI tools alongside other tools, normalising them rather than spotlighting them.

#### Simon Willison (simonwillison.net / tools.simonwillison.net)

The most sophisticated example found. Willison's approach has several layers:

1. **Site-level statement:** "The tools on tools.simonwillison.net were mostly built using AI-assisted programming"
2. **Per-item "AI generated" badge:** Individual tools are labelled with a visible badge
3. **Linked transcripts:** Commit messages link directly to the LLM conversation transcripts that produced the code
4. **Model-specific attribution:** Names the exact model used (e.g. "descriptions generated using Claude Haiku 4.5")
5. **Embedded metadata:** Each generated description includes `<!-- Generated from commit: [hash] -->` comments for tracking

He describes this approach as "slop adjacent" but justifies it pragmatically -- he would never manually document 78 experimental tools, and the documentation genuinely helps him.

This is notable because it goes beyond binary disclosure to **full provenance** -- you can trace exactly which parts were AI-generated and verify it against the original conversation. It treats AI involvement as a fact to document rather than a confession to make.

- Source: [Adding AI-generated descriptions to my tools collection](https://simonwillison.net/2025/Mar/13/tools-colophon/)
- Source: [tools.simonwillison.net colophon](https://tools.simonwillison.net/colophon)

#### visitmy.website (Steve Messer)

Uses a Jekyll-based colophon page divided into sections: Writing, Publishing, Design, Sustainability, Privacy. Mentions `jekyll_ai_related_posts` (which uses OpenAI's embeddings API) as a tool in the Publishing section, alongside non-AI tools like iA Writer and NetNewsWire. The AI tool is mentioned matter-of-factly as infrastructure rather than flagged as a disclosure.

This is the **colophon-as-tool-list** approach -- AI is just another tool mentioned alongside the text editor and RSS reader.

- Source: [visitmy.website colophon](https://visitmy.website/colophon/)

#### IndieWeb colophon pattern

The IndieWeb community has a well-established colophon convention. A colophon is "a page or section (typically in a footer) of a site that describes how the site is made, with what tools." Many IndieWeb personal sites have `/colophon` pages, though most predate the AI disclosure question.

Notable examples with colophon pages (not necessarily AI-related):
- daringfireball.net/colophon/
- zeldman.com/colophon/
- boffosocko.com/about/colophon/
- artlung.com/colophon/
- garrettdimon.com/colophon
- jamesg.blog (wrote about the practice of writing a colophon)

- Source: [IndieWeb - colophon](https://indieweb.org/colophon)
- Source: [Writing a Colophon - James' Coffee Blog](https://jamesg.blog/2020/09/25/writing-a-colophon)

### 6.3 C2PA Content Credentials Icon (Progressive Disclosure)

The C2PA standard's visual approach offers a design pattern worth noting even though it is not directly applicable to blog text:

**The "CR" icon:** A minimalist pin containing the letters "CR" -- designed to be etched into media. Design criteria:
- Conveys trust
- Indicates the presence of more information
- Immediately and universally understood
- Simple and flexible across multiple contexts and backgrounds

**Progressive disclosure model:**
- **L1 (Initial indicator):** A lightweight, persistent cue (the CR icon). Unobtrusive to surrounding content but builds user familiarity through consistency.
- **L2 (Summary view):** Clicking reveals a "digital nutrition label" sidebar showing creator, creation date/location, tools used, edit history.
- **L3 (Full manifest):** Complete cryptographic provenance chain.

This three-layer model is a useful UX pattern for any disclosure system: show a small persistent signal, allow click-through to a summary, link to full details. It respects user attention while making information accessible.

- Source: [C2PA - Introducing Official Content Credentials Icon](https://spec.c2pa.org/post/contentcredentials/)
- Source: [C2PA UX Recommendations](https://spec.c2pa.org/specifications/specifications/2.2/ux/UX_Recommendations.html)
- Source: [Behind the design: Adobe Content Authenticity app](https://adobe.design/stories/process/behind-the-design-adobe-content-authenticity-app)

### 6.4 Platform Label Designs

Major platforms have converged on similar visual patterns:

**Common placement:** Near the byline or below the content, not in the title. Meta uses "Made with AI" or "AI info" labels. X/Twitter added a "Made with AI" toggle during posting.

**Research on label design dimensions** (from CHI 2025 paper on labeling synthetic content):
1. **Sentiment:** Warning-tone vs. neutral-tone labels
2. **Icon and colour:** Warning icons cause alarm fatigue; neutral icons balance visibility with UX
3. **Position:** Byline-adjacent vs. footer vs. overlay
4. **Level of detail:** Simple text ("Made with AI") vs. detailed explanation

The research found that neutral labels like "Made with AI" or "AI info" performed better than warning-style labels. Matching the label to the site's existing design system makes it feel like a feature rather than a warning.

- Source: [CHI 2025 - Labeling Synthetic Content](https://dl.acm.org/doi/full/10.1145/3706598.3713171)
- Source: [Indicator - Guide to AI Labels](https://indicator.media/p/the-indicator-guide-to-ai-labels)

### 6.5 Default State: Label Everything or Only Label AI?

Three strategies observed in the wild:

**1. Label only AI-assisted content (opt-in disclosure):**
- Most common approach for personal blogs
- Nothing appears on human-written posts; a note appears only when AI was involved
- Risk: absence of label is ambiguous -- does it mean "human-written" or "author didn't bother to label"?
- Used by: Medium, most Substack writers, WordPress guidelines

**2. Label everything (universal declaration):**
- Every post declares its status: "Human-written", "AI-assisted", "AI-generated"
- Most informative but also most burdensome
- Risk: feels performative on old posts; creates maintenance burden
- Used by: VerifiedHuman framework, Amazon KDP (at submission time)

**3. Label only human content (reverse opt-in):**
- Used by Not By AI and No-AI Icon
- Assumes AI is the default; human creation is the exception worth highlighting
- Risk: increasingly uncomfortable framing as AI use becomes normalised
- Works best for communities that see "human-made" as a selling point

For a personal storytelling blog with a back catalogue of 100% human-written content, **strategy 1 (label only AI-assisted content)** appears most natural. It avoids touching old posts, keeps the burden minimal, and the label only appears when there is something meaningful to disclose.

### 6.6 Placement: Header vs. Footer vs. Tooltip

**Header/byline placement:**
- Maximum visibility; reader sees it before reading
- Used by news organisations (Reuters, AP)
- Risk: can feel like an apology or warning before the reader even engages
- Example language: "By [Author], with AI assistance for research"

**Footer/endnote placement:**
- Reader encounters it after reading (and judging the content on its merits)
- Most common for personal blogs and creative writing
- Can be combined with a site-wide policy link
- Example language: "This post was drafted with assistance from Claude. All editorial decisions are mine."

**Tooltip/hover approach:**
- A small icon (like the C2PA "CR" pin) that reveals details on hover
- Minimal visual footprint; information on demand
- CSS-only implementation possible (using `data-` attributes and `content: attr(data-text)`)
- Risk: invisible on mobile (no hover); easy to miss entirely
- No established examples found specifically for AI disclosure on personal blogs, but the pattern is well-understood in web design

**Recommendation for creative writing:** Footer placement feels most appropriate. Creative writing should be encountered on its own terms first. The disclosure is metadata about the making process, not a content warning.

### 6.7 Maggie Appleton's "Dark Forest" Perspective

Maggie Appleton's influential essay "The Expanding Dark Forest and Generative AI" addresses the broader problem of proving humanness online. Her five strategies are relevant context for any disclosure system:

1. **Triangulate objective reality** -- reference embodied experiences, specific local knowledge, sensory details
2. **Demonstrate original, critical thinking** -- synthesise diverse sources in ways machines cannot yet replicate
3. **Develop creative language quirks** -- neologisms, jargon, ingroup dialects, memes-of-the-moment
4. **Institutional verification** -- she mockups a "certified human" badge system but dismisses it as "fraught with problems, susceptible to abuse, and ultimately impractical"
5. **Physical meetups** -- meeting people offline remains the most reliable verification

Her scepticism about badge-based verification is notable: the very thing that makes a badge simple (binary yes/no) is what makes it inadequate for the spectrum of human-AI collaboration. Writing that is authentically human proves itself through voice and specificity, not through a badge.

- Source: [Maggie Appleton - The Dark Forest and Generative AI](https://maggieappleton.com/ai-dark-forest)

### 6.8 Synthesis: What This Means for a Jekyll Site

Several patterns emerge that are relevant to implementing this on a Jekyll static site:

**Frontmatter-driven approach:** Jekyll's YAML frontmatter is the natural place to store per-post AI metadata. A field like `ai_involvement: none | editing | co-writing | generated` could drive conditional rendering in the post layout.

**Implementation sketch (Liquid template):**
```liquid
{% if page.ai_involvement and page.ai_involvement != "none" %}
<p class="ai-disclosure">
  {{ page.ai_disclosure_note }}
</p>
{% endif %}
```

**Colophon page:** A `/colophon` or `/how-i-write` page listing tools (text editor, Jekyll, AI tools if used) fits the IndieWeb convention and requires no per-post changes.

**CSS badge:** If a visual indicator is desired, a small CSS-only badge (no external dependencies, no JavaScript) could be styled to match the site's Rosario-font aesthetic. Something understated -- a small label in the post metadata area alongside the date and category.

**The "default is human" convention:** On a personal storytelling blog, the default assumption is that the author wrote it. Only posts with meaningful AI involvement need explicit disclosure. This avoids retrofitting labels onto the entire back catalogue.

**Machine-readable metadata:** For future-proofing, the frontmatter field is already machine-readable (YAML). If a standard emerges, the data is there to be surfaced.
