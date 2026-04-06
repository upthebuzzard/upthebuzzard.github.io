---
layout: post
title: "Vibe-Coding: I don't think that means what you think it means"
date: 2026-03-15 12:00
categories: []
topics: [AI,Vibe-Coding,Strategy]
sequence: 12
excerpt: >
  Vibe-coding 'officially' means pair-programming with an LLM, but the
  implications for orgs are so profound that it is better thought of as
  Vibe-Process-Engineering. What it is not, is just devs working a bit faster.
cover_image: /assets/img/pretensions/vibe-coding-monolith.png
cover_image_caption: "A monolithic gray stone block shattering from the inside to reveal a flowing river of neon liquid data."
---

Vibe-coding [[wikip](https://en.wikipedia.org/wiki/Vibe_coding)] 'officially' means pair-programming with an LLM, where the human expresses the 'vibe' in natural language, and the LLM implements it in code. But the implications for orgs are so profound, so beneficial, so scary, with immediate consequences for almost all business processes, that it is better thought of in terms of Vibe-Process-Engineering. Perhaps Vibe-Org-ing? (ok, no, maybe not. Still seeking a better term). What it is not, is _just_ devs working a bit faster

tl;dr  We can keep our existing staff and achieve far, far more with them if, and it's an enormous, I-fear-the-worst if, we can get the old ways out of the way and think of new ways. We can know more, understand more, and make better-informed decisions across the entire org. We can do more, and achieve more. How we accelerate is in our control. We have the tools. We can take small steps, but so very many of them and so quickly. The scary part is how rapid the progress could be.

What follows includes a mix of unfair, unfounded, wild over-generalisation, [Citation needed], and [Anecdote Alert!], but a pivotal moment is upon us.

Watching the performative nonsense scrolling past (on LI mostly, TBF, which is a low bar), the hair-rending, ritual chest-beating, doom-laden bon mots about the end of human developers, and related dogmatic declarations, etc etc, aargh. I so want to join in. To be clear, yes, we/they may all be doomed - the societal impact alone of these reflex mass redundancies and hiring freezes is likely to be devastating, even without the emergence of our AI overlords (who I, for one, welcome…[[wikip](https://en.wikipedia.org/wiki/Portal:The_Simpsons/Character_quote/37)]  I read scifi - I know things.)

But, until then, consider this moment for what it could easily be: an excellent opportunity to tear us from the Matrix of consensual hallucination regarding corporate dev work. Yes, very much like Neo (albeit with less tubing [[yout](https://www.youtube.com/watch?v=rChuqcbdf4U)]). Let's take the red pill together [[wikip](https://en.wikipedia.org/wiki/Red_pill_and_blue_pill)].

I have had years of frustrations with the 'old' ways of doing things. Formal processes gaining pre-eminence, self-identifying as strategy. But, OMFG, a more apposite label was *anti*-strategic.

#### The 'old' ways. Listing a few of the symptoms, and associated concepts. Exhausting, but not exhaustive:

The Velocity Tax:

* Agonisingly slow decision-making processes. Monthly? Quarterly? Annually? \<swoon>.
* Daily Standups. Jira. pro forma Product/Project Managers. "When will it be ready?" still being demanded.
* Customer Research needed before deciding where to place a button and choose its colour.
* Rituals forgetting the original problem they were fixing.
* Sub-processes doing Waterfall, like layout-design-then-dev, amidst alleged Agile.
* The very existence of a PMO, and OKRs.
* Human bottlenecks all the way through all business processes, desperately trying to slow things down whilst claiming the aim was to speed things up.

The Innovation Tax:

* YAGNI - "you ain't gonna need it" [[wiki](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)]. Or, don't build anything if there is no direct, immediate use for it. Whatever good sense there might have been in that line of reasoning, it has been lost in its malignant misapplication.
* Parochial Product Prioritisation - Truly there has never been a more terrifying harbinger of relentlessly wrong-headed decision making. If it were mere prioritisation, that would be fine, even necessary. But, the blinkered approach is a massive own goal. When there are 100 options, we might pick the top 10. Rank those. Only tell the good folk in, say, Tech, about the top one. Hide all the others. Oh, and BTW, we do not start working on that one until it is validated. Done once, it's "focus". Any more often than that, and it's "throwing away all the info and context you need to make actual strategic choices".
* Siloed Product teams 'owning' capabilities. "Yes, I agree, you would clearly benefit from accessing what could be a really useful resource for you and other teams, but good luck busting into our own monster backlog. That is not how we are incentivised. The answer is no, in case there is any doubt."
* Niche audience? Forget it. "We go after the majority first and then … still not the minorities."

The Quality Tax:

* The Org's formal Prioritisation Process, where apples compete with oranges:
    * "Shall we tackle the buildup of cruft" meets "But we need a new page now", and loses.
    * "Here's a 'thing' which could help us in the medium term" meets "But we need a new page now", and loses, even when the same 'thing' keeps cropping up as an enabler for ever more features.
* Tech Debt - a misnomer. Should have been called Product Debt. Or Procedural Debt. That debt-shaming put Tech in an invidious position.
* Bikeshedding [[wikip](https://en.wikipedia.org/wiki/Law_of_triviality)] - "Let's argue about the trivial thing we might have a chance of understanding."

The Agency Tax:

* Tech waiting for direction from Product (and not getting it). "Do not dare work on anything we (Product) have not prioritised." Basically, the opposite of synergy.
* Fear of wasted effort. A most heinous crime. Get it right first time, or else. "Yes, yes, agile is all about it being ok to fail, as long as we learn. But don't."
* "Be wary of the HIPPO [[citation](https://www.productfocus.com/in-defence-of-the-hippo/)], for their opinion must be resisted sternly with Product process. Who do they think they are, having original thoughts outside of the formal Product process?"

I feel better now, thank you. That was cathartic. Moving on.

To be slightly fair (and I know much of the above is unfair), this striving for tight control was due to the need by humans to herd humans, because humans, as every human knows, are a contrary bunch, not often prone to spontaneous synergy. And good humans were doing their damndest to keep on top of things and keep those other pesky humans making progress.

In fact, let's be fairer than that.

#### The _actual_ in-play issues leading to the above litany of woes were quite reasonable things to be worried about:

Physics:

* Conway's Law [[wikip](https://en.wikipedia.org/wiki/Conway%27s_law)] - communication/reporting lines, team structures, hierarchies, all have direct technical, architectural consequences.
* "Business Processes resist change" [[origin](https://bobmorris.biz/clayton-b-christensen-a-book-review-by-bob-morris#:~:text=The%20processes%20that%20are%20such%20strengths%20can%20be%20crushing%20liabilities)] - a force of nature. Perhaps the strongest one. No avoiding physics.
* Actual humans only have so much time in the day, so info _has_ to be summarised and filtered all the time, in multiple places, for it to be usable.

Pressure:

* People management can easily become all-consuming, displacing strategic thinking.
* There is a great deal of glossy-looking 'best practice' dictating how an org should comport itself in complex projectry. What is a CxO to do but go along with it?
* When projects take so long, the pressures to deliver, perform, and justify, are immense.

Complexity:

* To understand what everyone is working on, when everything is moving.
* Misunderstandings in the multi-dimensional, multiply-concurrent game of broken telephone that is the ever-giving joy of corporate life.
* Projects, not just people, are complex and fickle beasts, prone to mood swings and random violence.

History:

* What came before Product, Agile (and before that, Scrum!) was in many ways much much worse.
* Legacy is a killer.

#### We are now in a different world. Specifically, a vibe-coded, process-busting one.

This is not the world where we "give it all to a swarm of agents and hope for the best and then realise it doesn't work out well". No. There is a name for that kind of world with the current level of agent maturity in a legacy org, and it is "Stupid". So let's not go to that world. Leave it for the early adopters, bless. [Very keen to see how well this statement ages - Ed]

We are in a world where (hyperbole alert, caveat emptor, etc, but yeah, kinda this if we are not stupid about it):

"Definitely Do Not" becomes "Definitely Do":

* We can now implement a fully-working POC ([wikip](https://en.wikipedia.org/wiki/Proof_of_concept)) in less than the time it would have taken to be told not to. 10 of them. The 'cost' in cost/benefit no longer means what it used to. The waste is in the old processes, not the POC.
* "And then productionise it" is not a laughably naive approach. Pile in with all your expertise around what 'productionising' means, and introspectively vibe-iterate it into a robust, repeatable CICD-tastic process.
* We can build a big thing, learn from it, then throw it away, all before lunch. And actually mean it. No-one's nose out of joint.
* Going after niche audiences? Stopping this flagrant misuse of time and resources used to be Product's main function. Now? Go for it. Niche of 1? Yes, of course. Crazy not to.

"Can't" becomes "Can"

* We can design for the general case from the get go.
* We can fix *all* the cruft, and not let it build up ever again. We can have cruft alerts as a pre-commit hook. No more cruft. Well, not quite true, but close enough.
* On this, refactor all the time. No stale code. No stale processes.
* We can document *all* the things. Not just tedious, ritual boilerplate grind that is out of date the moment it is written. But actual, voluminous, informative, verifiable, useful, uptodate documentation. Remember, the documentation is no longer for or by humans. It is for the humans' documentation understander/summariser/explainer.
* We can explore and/or do *all* the things the Product Owner was dreaming of and, this is crucial, so much more. The rest of the 'maybe' list previously not shared with the team? On it.
* Actual CICD [[wikip](https://en.wikipedia.org/wiki/CI/CD)] - when it works well, you know how good things could be. If you are worried about it, and you should be, pile in with your vibe+brain power+expertise and iterate until you have it awesome.
* We can spend as much time and effort as we like pre-emptively looking for trouble, baking in resilient processes and checks and balances.
* We can model user behaviour to any level of fidelity we care to. Sorry, but we can.

Empowerment:

* Individual developers, and/or clear thinkers generally, are now personally empowered to spin up speculative POCs to such a degree that the game has qualitatively changed. In fact, it is a whole new game, with new rules and possibilities and consequences we are only beginning to stumble onto.
* Human expertise is still worth a great deal.
    * But it is less in the doing, and more in the guiding (and introspecting - see below).
* The boss, any boss, anywhere in the org, can get an up-to-the-second overview of any aspect of the entirety of work being done across the org, its impact, status, direction, issues. Drill down into any details. Ask any questions. Idle curiosity is fine. Shape the report for maximum scan efficacy. A nice 20-minuter for the train journey home. Done and done and done, in seconds.
* Anyone with a clearly expressed itch can scratch it. (By which I mean an idea for a thingy). Certainly don't go live with it, but POC freely.

"Danger, Will Robinson" [[wikip](https://en.wikipedia.org/wiki/Lost_in_Space#:~:text=The%20catchphrase%20%22-,Danger%2C%20Will%20Robinson,-!%22%20originates%20with%20the)]:

* The attack surface for hacking, infiltration, and general badness being visited upon us has expanded massively in scope and tricksiness.
* Zero day bugs [[wikip](https://en.wikipedia.org/wiki/Zero-day_vulnerability)] still exist, and they too are scarily complicated and subtle in the AI world.
* Our users may not be human (although we may have suspected this for a long while…)
* Our (non human) users will be proficient at finding every wrinkle and loophole in our online serving.
* Also, looking at Clawdbot [[wikip](https://en.wikipedia.org/wiki/OpenClaw)], our nonhuman users might be gibbering fools for a while.
* Ironically, as a nuclear winter blights the job prospects of new IT grads and interns, we have at our disposal the best, situated, one-to-one teaching tools ever, by a huge margin. The motivated over-achiever has access to rocket fuel.
* We have a very worrying single (ish) point of failure in our dependency on an LLM provider. When Claude is down, the highly leveraged development crashes to a halt. It becomes time to hand-craft cheesy haiku, counting syllables on our fingers [[LI](https://www.linkedin.com/feed/update/urn:li:activity:7432480639376961536?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7432480639376961536%2C7432488876604030976%29&replyUrn=urn%3Ali%3Acomment%3A%28activity%3A7432480639376961536%2C7432490287693869056%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287432488876604030976%2Curn%3Ali%3Aactivity%3A7432480639376961536%29&dashReplyUrn=urn%3Ali%3Afsd_comment%3A%287432490287693869056%2Curn%3Ali%3Aactivity%3A7432480639376961536%29)].
* And vibe coding costs! Very nice now, but so so heavily subsidised [[redd](https://www.reddit.com/r/BetterOffline/comments/1rnjoq2/anthropic_estimated_to_lose_as_much_as_5000_for/#:~:text=Anthropic%20estimated%20to%20lose%20as%20much%20as%20$5%2C000%20for%20$200%20Claude%20Code%20plan,-We're%20starting&text=According%20to%20a%20person%20familiar,the%20company's%20compute%20spend%20patterns.&text=Cursor%20also%20subsidizes%20some%20users,is%20targeted%20at%20larger%20organizations.)]. How might that play out?
* Human Bottlenecks are about to be overwhelmed [[wikip](https://en.wikipedia.org/wiki/King_Cnut_and_the_tide)]. There will be harsh words exchanged, hackles raised, heels dug in. But, really, deal with it. Focus your efforts on these key stages. Make them better and more effective than ever before. Hard to argue with better.

Revisiting the "let's be even fairer" sections:

* Physics: Given that, to a first approximation, everyone can do everything now, perhaps we have at last got a way around Conway's Law, as well as the only so many hours in the day thing? That just leaves "Business Processes resist change" as perhaps the last stalwart defender against progress. In the final heat death of the universe, as no physicist has ever hypothesised, the last remaining structures could well be business processes. [Citation needed].
* Pressure+Complexity: out with the old, and in with the new. This is us stepping into a complex, fast-moving future. Bravery and clear thinking are needed. Clarity is available on demand, though, so it's an informed step.
* History: we can make new rituals. We can fix all the legacy.

#### Key principles

"Verbose is the new tl;dr":

* Do not summarise it for the boss. Give the boss everything, as wordy as you like. Wordier. The boss will shape their own summary as the very last step in the flow.
* Premature summarisation, along with premature trimming of option lists, are the new wrong.
* Data Loss is the new gotcha. As is Data-not-collecting.
* Everything in plain text. It will be useful.
* Capture and/or log everything, including the vibe-chat logs. This is not an invasion of privacy - it is a goldmine of process nuggets.
* Copious, comprehensive commit logs. Pull Request? Write an essay. Or rather, your vibe tooling writes it all. It loves it, and is good at it.
* If you must make a slide deck, *then* you should massively summarise, unless you hate humans.

"Strategy becomes actually strategic":

* Set the direction. Where are we going, and why, and how? Radical transparency. This is how you steer projects.
* If you have a good, clearly stated strategy, you and everyone else can make accurate judgement calls about whether an idea is compatible, or consequential, perhaps worth a 5min spike at the very least.
* You can track strategy alignment across the whole company, folding in every in-flight initiative.
* The 'Situational Awareness' aspect of a good strategy, truly understanding the internal state and capabilities of your org, is now easily achievable. Imagine: actually knowing what is actually going on in your own org, without worrying about multiple layers of obfusticating spin. Crazy talk no longer.
* You can have continual, automated health checks on all aspects of the strategy and its application.

"Fractional Seniors" (new term):

* Like "Fractional CTO", but for Senior Engineer, Senior Dev Ops, Senior Product, Senior Designer, Senior Business Analyst, Senior Project Manager, Senior [ROLE].
* No team is too small that it can't benefit from and justify a suite of Fractional Seniors.
* For the recalcitrant Senior "I write my own code" Engineer. Well done you, but only in your own time, please. Your expertise is far more useful informing, steering, and protecting the org, guiding the less senior, reviewing the vibed processes, thinking bigger picture. 'Fractional' you is more useful than one of you. This is a you-multiplier.
* By defining and refining your expertise into usable directives, you can bake essence-of-you into the daily approach taken by everyone in your fractional hierarchy. It's like you are here, there, and everywhere all the time. The ghost in the ghost in the machine.
* You can generate reports on how well your directives are working, misfiring, being overlooked, etc. Introspect, and refine.
* If you are worried about overwhelming certain quality gates, or human bottlenecks, such as code review, approvals, etc, there's a clue in there. It's the words 'human' and 'bottleneck'. Your worries are valid but need to be addressed sensibly. Pour all of your best practice into those quality gates *via vibe-coding*. You can have as much coverage, resilience, quality, robustness, consistency baked into those quality gates as you want. Start on them *before* letting the vibe-alanche reach there via all the 10x wannabes.

"Do use Jira (and the like)":

* They are not inherently evil, soul-sucking systems where hope goes to die. Well, they are and always have been, *when humans use them*. But when wielded effectively via APIs in the new, vibe-coded world, as part of the text-heavy, vibed process, they are highly effective and useful systems for keeping the org on track. Tracking intent and progress, as intended.
* Yes, you could vibe-code your own project management suite, and perhaps you will, but Jira works and is quite good at it, and is available for immediate integration via API (and MCP!) into your newly vibed-up processes.
* Step one on a new project: get Claude (or your vibe tool of choice, etc etc) to pull in the project spec via a jira ticket. From that point on, each commit (which now has decent messaging and a checklog) also triggers a similarly informative ticket update. Effortless, comprehensive, useful.

"Plain Text All The Things"

* Use 3rd party systems, but do not get locked into them. Having all config, content, and data in plain text is your main defense against vendor lock-in.
* Do not edit any files yourself - ask your vibe coding tool of choice to do it. This is a biggie.

"Continuous Introspection"

* for relentless, massively effective, rapid process improvement.
* You human! Be the adult in the relationship. Be mindful. Notice repeated mistakes. Meta-mistakes. Raise them, discuss them, resolve them.
* Discuss, re-discuss, what-if, fan out, fan in, go round the houses. Search for prior/current art.
    * Capture it all in persisted discussion docs, with changelogs.
    * Ask Claude to summarise the thinking for Gemini, and then respond to Gemini's response, and back and forth. So far, diminishing returns kick in around the 3rd iteration in, but the benefits are solid. [Anecdote Alert!]
    * And then, plan and do.

#### Key Key Principles:

* Vibe-coding is demanding (not just enabling) a root and branch rethink of org processes and organisation. The possibilities are frightening and amazing.
* Capture everything in verbose plain text, and summarise at the last moment.
* Relentless introspection and iteration, for massive improvements and learning.
* Fractional Seniors, for best use of your best people.
* You can now make good use of your never-meant-for-humans systems (like Jira).
* Steer via strategy. Radical transparency FTW.
* Coordination of all this is initially new and hard, but worthwhile, and soon easy. Get your best brains onto it ASAP.

Ending on a repeat of the tl;dr, because I was struggling to round this off.

tl;dr  We can keep our existing staff and achieve far, far more with them if, and it's an enormous, I-fear-the-worst if, we can get the old ways out of the way and think of new ways. We can know more, understand more, and make better-informed decisions across the entire org. We can do more, and achieve more. How we accelerate is in our control. We have the tools. We can take small steps, but so very many of them and so quickly. The scary part is how rapid the progress could be.

<br>

---

#### Maybe, but:

* What about having meetings for the benefit of human contact?
* Who watches the Vibe-coders?
* What of your AI-enhanced gatekeepers when the AI is down?
* This is all way too glib. You are glossing over so many important details.
* If you don't read all the code being written, you can't know about all the implicit choices being made, and their consequences.
* Code review takes time and needs to be done properly.
* "any boss, anywhere in the org" can see everything. What about data security? Data management? Access controls?
* Costs?
* 'Apposite', 'recalcitrant', 'comport itself in complex projectry', … really?
* Do we still do daily standups?
* What about sprints in general?
* OKRs? No?
* Really? Keep Jira?
* …
