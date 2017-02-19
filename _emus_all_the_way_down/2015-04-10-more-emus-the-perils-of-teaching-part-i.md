---
layout: post
title: The Perils of Teaching, Part I
date: 2015-04-10 00:43
author: upthebuzzard
categories: [story]
excerpt: >
  It's unlikely they will dip their algorithmic snouts into the metaphorical trough of mostly unprocessed swill we call the training data and emerge chewing on some nuggets of goodness.
sequence: 6
---
"The reason why we can't just throw our new NPCbots at all this lovely data to learn how to emote their way through this complex world we've made is simple. Well, no, more like it's subtle. These learning algorithms are not magic. It's unlikely they will dip their algorithmic snouts into the metaphorical trough of mostly unprocessed swill we call the training data and emerge chewing on some nuggets of goodness", declared Eli.

Chel pinged back, "What are you on about? Algorithmic snouts? You were, allegedly, trying to explain why you are already a week late on your energetically-expressed assurances to, and I quote, inject some brains into the veins of the walking dead we call NPCs, with no progress in sight.

I guess the main warning sign was the time you spent crafting a MohammedAli-esque bit of pre-fight trash talk, rather than actually guesstimating how long it might realistically take to do."

Unruffled, Eli intoned, "You can't hurry art. And this is more than that. It is ground-breaking art. This is Picasso feeling his way out of his Blue Period into what would become the art-world-shattering, vastly different way of looking at things, called cubism."

"So, you don't know what you are doing?"

"Yes. I mean no. I know how to go about finding what to do, and I was trying to explain before you attacked me with those hideous, project manager-y, suck the life force from your creative practitioners, demands for delivery dates. Process over progress, or else."

"Except, and I don't want to put your creative nose out of joint with some harsh, unfeeling, project manager-y pointing out of the blinding obvious, there doesn't seem to have been any tangible progress."

"You need to view progress as maintaining positivity in the face of repeated setbacks, or holding on to the vision while early efforts muddy the waters. Or, here's a good one, letting me explain what I am trying to do, and why I am spending so much time on, and forgive the air quotes, not making tangible progress."

"I don't wish to add any further pressure to your, again, air quotes, explanation, but you have just claimed to be on a par with Picasso and likened me to a vampire. The floor is yours."

"My thanks, milady. To continue.

Perhaps a real world example of what we are battling with, might help."

"Does it involve pigs, Picasso, or vampires?"

"No."

"Already this is a better explanation than your first effort."

"To keep trying to continue.

In the early days of neural networks. Are you aware of neural networks, and how they work?"

"Is it strictly necessary to this explanation?"

"It would help, but I can park that for the nonce.

So some keen practitioners of this relatively new, sexy bit of AI algorithmage, were sponsored with a bit of US army research money to come up with ways to spot camouflaged tanks hiding in dense woodland. They were given a bunch of photos of woodland, some containing a hidden tank, and some not. An assortment of tanks and woodland. I don't know how many photos they had, but lets say 1000."

"1000. Where would they get 1000 photos of tanks in forests from?"

"Well, from the army, who was sponsoring the project, obviously. OK, say it was 300."

"Now its 300. Are you making this story up?"

"No, I was told this story recently by an impeccable source, and I am nearly sure it is for real. The details can be tweaked for clarity whilst retaining the underlying poetical truth of what I am trying to explain to you. Say 300 photos. OK?"

"I've got all afternoon. I've got good stamina. You can't outlast me. I _will_ see the end of this explanation. 300 photos, of tanks in forests. Go."

"Of tanks in forests, and no tanks in forests. Say half and half.

They scanned in all the photos and fed some of them to their big research computer running a neural network."

"Why some of them? Surely you'd want to use as much of the data, the photos, as you could?"

"Yes, that is a surprisingly good question. It gives me the confidence to continue with this explanation, and possibly go a bit deeper into the technicalities, because you are paying attention and thinking, and that is good."

"So we can add condescension to the list now."

"I meant it in an encouraging way. If you use all your data (in this case, the photos) in the training of your AI thingy, and it learns to get all of the answers right, how can you check how good it is?"

"Well, if it gets all the answers right, surely its pretty good?"

"That may be so, that it is pretty good, but quite possibly something else has happened, called over-fitting. This is where the AI thingy has picked up on some quirks in the training data and learned to spot the quirks, rather than learned the general principles underlying things. If you try the over-fitted AI thingy on new data, with different quirks, it could be completely useless.

What you want to happen, i.e. to learn the general principles underlying the data that can be applied to any future data that might come its way, is different from what has actually happened, i.e. it has spotted some quirks in the slice of data it was given and not generalised at all."

"Give me a quirk."

"Um, ok, making one up. Say the photos of tanks in a forest show an even number of leaves slightly more often than they show odd numbers of leaves. That is a completely spurious correlation. It has nothing to do with whether there is a tank there or not. But the AI thingy has picked up on it because it sort of works for that subset of images of tanks in forests. So, it counts the leaves and ends up being able to correctly identify when the image does or does not contain a tank. This will not scale to all possible pictures of forests with and without tanks. The odd/even thing will balance out, and the AI thingy will get it, probably get it, so wrong almost all the time, that it is no better than random, a coin toss."

"That's a good quirk. But can't you just tell the AI thingy to not count the leaves?"

"Yes, you can, if you knew that was a possible quirk. But there are infinitely many possible quirks. You cannot list them all, and code your AI thingy to avoid all quirks. Quirks are baked into the universe."

"So, how do you avoid quirk-fitting?"

"You can't. You can however try to minimise the likelihood of it happening, and set things up so you can possibly spot when it has happened.

Coming back to the 300 photos, they shuffled them, and split them into two sets, a training set of, say, 200, and a test set of the remaining 100. They trained on the 200, until the AI thingy settled down to some reasonably accurate classifications of the photos into tank or no tank. They then tested the trained AI thingy on the test set, and got similarly accurate classifications of tank and no tank.

The art, the knack, of doing this well, is to find the effective sizes of training sets, test sets, ensuring you shuffle them but select a statistically representative sample, what is reasonable for considering it accurate enough, how long to keep on training, and any number of other aspects of these experiments. It is more art than science to find the right balance of all these.

Anyway, from that, they could be fairly sure that the AI thingy had not got hung up on some quirks in the 200, and had generalised enough so what it had learned also applied to the unseen 100. This was good. I imagine there was much cider drunk and possibly some high fiving. Maybe not cider. This was in the states. What do postgrad students drink there? Buds?"

"OK, I get it, you need time to find the right balance."

"That is true, but we have not reached the crux of the example."

"That is a shame. I suppose you will be continuing."

"With your permission.

The next day, flush with the success of day 1, the team gathered again. Day 1 had been the entry level version of the AI thingy. They hadn't really been trying. Now that they had a better understanding of how to drive it, to find the right balance so to speak, they went to town and cranked it up to 11."

"Why 11?"

"Nigel, guitarist?"

"Who?"

"No, Spinal Tap. Its out on video now."

"Are we straying from the path to explanation?"

"They added in all the latest neural network bells and whistles they could think of to create a super-AI thingy. This was going to be awesome. Whereas version 1 was 75% accurate, this new one was going for 90-something% accurate. It was going to be great. They could already hear the applause at the next AI conference, not to mention the extra Army research dollars which would no doubt be pouring their way.

So, they ran the newly super-duper-ised AI thingy on the 200 training photos. It took quite a bit longer than before, because it was doing way more clever stuff. And it got to be reasonably accurate, and stubbornly refused to do any better than that. In fact, it was exactly the same reasonably accurate as before, down to which specific photos it got right and wrong.

This was worrying, but perhaps they had not sufficiently embellished the neural network, or perhaps they had overdone it and hindered as well as helped. They unpicked the changes and started adding them one by one, looking for improved accuracy, which never came. No matter what they did with the neural network, it never exceeded the initial, reasonably accurate performance.

Somewhat downhearted, the team still had some good news to report to their Army sponsors, since reasonably accurate was still better than the Army had been able to achieve on any of their own projects. The team presented their findings, and the spec of the initial, fully trained, version 1 of the neural network, to the army. The army were suitably effusive in their praise, and replicated the neural network in their own computer team, and tested it on some new photos they had recently taken of tanks and not tanks. And it performed awfully. Worse in fact than if it has been tossing a coin.

The follow-up meeting was very tense. The army were trying not to accuse the team of blatant fraud, but it was what they thought had been going on. The team was gutted. They took some of the new photos and confirmed for themselves that version 1 of the AI thingy was hopeless.

And now, its that moment I threatened might happen, but I have every confidence you are good for it."

"Which moment? I'm not giving up you know. I'm sacrificing all my remaining meetings today so I can hear through to the end of this alleged explanation."

"Ah, the joys of having a captive audience."

"Not so joyful being the captive audience."

"Tish. Anyway, the team faced a similar situation. They needed to dig into the guts of their neural network to try and understand what was going on.

Neural networks are, at the heart, a rats nest of sequences of numbers. It is really hard work to disentangle the strands to work out how it is doing its thing and which pieces are doing what. The image is fed in at one end, split up into subsections. The subsections are further sub-divided into sub-sub-sections. Then sub-sub-sub-sections, and probably a few more subs, before the little itty bitty pieces"

"Condescension alert".

"until the tiny fragments of the original image are measured for some characteristic or other, like the ratio of brown to green pixels. Then those measurements are combined with a bit of logic sprinkled in, and then those combinations are further combined and again and again until out pops the answer, its a tank, or it isn't.

The team teased all this out from the numbers and were, to cut a very long story short, able to work out how the version 1 AI thingy was achieving its 75% accuracy."

"This is cutting it short? You mean there's a long play version?"

"Ssh. We are so close. Don't lose the faith."

"Ssh? Oh this had better be so good."

"The way the version 1 AI thingy was achieving its 75% was, cue drum roll, looking at the brightness of sub-sub-sub-sections of the image, and sort of calculating the average brightness of all those sections, and if they were, on average, brighter than some level, saying there was no tank, and if they were, on average, dimmer than that level, saying there was a tank."

"Eh? That doesn't make sense. You said they had avoided quirks by splitting out the data and the performance on the test photos was proof they'd avoided the quirks. And 75%? How could they achieve that accuracy just off the brightness of the photo. Weren't they a mixture?"

"Yes, the photos they'd received from the army were a mixture, different tanks, different woodland, different weather conditions. On just those photos of yes-there's-a-tank, the version 1 AI thingy scored roughly 50%. It was a coin toss, basically. But the version 1 AI thingy scored 100% on the photos of no tanks."

"You said all the photos came from the army, and they were a mix of tanks and no tanks."

"No I didn't. Did I? Maybe I left a bit out. Sorry. Doesn't change the plot or the conclusion. The army provided photos of tanks in woodlands, and the team sourced their own photos of no tanks in woodlands. They were combined to create a mixed set of equal numbers of tank and no-tank photos.

Version 1 AI thingy did no better than random on the army photos, of tanks, and totally correct on the non-army photos, the ones of no tanks."

"So, the team's photos were over-exposed compared to the army photos?"

"Possibly, but it was even simpler than that. The student tasked with procuring photos of forests with no tanks, using the expensive lab SLR, had only gone out in good weather, on sunny days, to take the pictures. Because why wouldn't you want to take the nicest photos you could? So all the no tank photos were of forests on a sunny day, and the army photos of tanks were sun-agnostic.

Version 1 AI thingy had learned to identify sunny days.

There were no other signals or patterns in the training photos, as broken down into sub-sub-sub pieces by the neural network, that were even remotely as potent as average brightness of the leaves. No amount of tweaking and embellishing would divert the neural network from heading straight for this massive quirk in the data.

The performance on the test set was just as good because they were drawn from the same superset of photos."

"So, what you're saying, your explanation, is that we can't hope to get anywhere because there will always be quirks. That this approach is doomed. That you are going to have to suck it up and apologise for trashing the current NPC approach because your evolution approach is just not going to work. So this is, in fact, more of an apology than an explanation?"

"No. No. No. Well, yes to the first point. There will always be quirks. But fail, give up, no. Never. That is not the point of what I hope has been a learning experience for both of us.

The point is, it is worth spending a great deal of effort checking and massaging the training data, checking its provenance. Is it representative? Does it come from multiple sources? Are the sources in fact distinct, or do they in turn get their stuff from shared sources. What is the learning thingy actually learning? There's not much of the I in AI as yet, except in the ability of learning algorithms to be eerily contrary and willful in not learning what the sponsor wants them to learn.

If we skip the data prep, we run the very real risk of wasting even more time haring off up assorted cul-de-sacs of quirk-ridden confusion, making the opposite of progress."

"Right, we get there at last. And I have the strapline to put in my progress report on project 'inject some brains into the veins', and that is we are in fact making progress by, and I will quote, 'avoiding the assorted cul-de-sacs of quirk-ridden confusion'.

Could you not have said 'preparing the data is taking longer than planned'?"

"Well, yes, but would you have accepted it at face value? Would you have been able to defend to the Uncles?  Would you have been hesitant to ask me again soon why things are delayed? I think not. This gives me at least another week before you will work up the courage to ask again."
