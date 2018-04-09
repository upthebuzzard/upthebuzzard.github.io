---
layout: collection
title: Predicting the Present
date: 2013-06-24 21:33
categories: []
permalink: /:collection/index.html
---
So what are these stories about?

{% assign sorted = site[page.collection] | where:"layout", "post" | where: "categories","story" | sort: 'sequence' %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}

and some extrapolations

* [Emus all the way down ...](/emus_all_the_way_down)

## Found Foundation Myths

Working backwards from my own dribblings, I've decided what this is really all about is less predicting the future and more “predicting the present”, a phrase used (and possibly coined) by [Cory Doctorow](http://www.slate.com/articles/podcasts/future_tense/2013/05/cory_doctorow_joins_tim_wu_for_the_slate_podcast_stranger_than_fiction.html), who may (or may not) have borrowed it from [Bruce Sterling](http://en.wikipedia.org/wiki/Bruce_Sterling), about Science Fiction (which this sort of is).

There have been numerous great books in recent years about extrapolating the now:

* [Cory Doctorow](http://craphound.com/?cat=5)'s  “Little Brother” and “For The Win”
* [Daniel Suarez](http://thedaemon.com/index.html)'  “Daemon”
* [Neal Stephenson](http://www.nealstephenson.com/)'s  “Reamde”

and many more writings that will occur to me later, such as

* the excellent ["what if?"](http://what-if.xkcd.com/) series spin off from [xkcd](http://xkcd.com/)
* Scott Adams' [blog](http://www.dilbert.com/blog/)

And just at the last, another post hoc bit of rationalising: I now remember seeing a [TED talk by Elizabeth Gilbert](http://www.youtube.com/watch?v=86x-u-tz0MA), who described how many artists through history have referred to their creativity as if it were a real, living entity, with whims of its own. This works for me too, at least a little bit...

## But Why? How?

During an evening chat on the train home from a post-work do, a number of daft things were said, as per usual, but one topic struck a chord. French trains are wider than UK trains. Wouldn't it be funny if a French train made it through the Chunnel and started up standard UK track? It was daft, but running with it threw up loads of spin-off ideas, none of which quite caused the original topic to collapse under the weight of its own impossible silliness. Two nights later, the bulk of [Loading Gauge](2012-07-02-loading-gauge) was written and published on this blog. Time passed. Movie directors and book publishers failed to call.

And now, months (years?) later, there's another such torrent of tosh, [Evidence-based](2013-06-24-evidence-based), with another [one](2013-06-29-emus-all-the-way-down) (or maybe two) bubbling away in the background. So what's going on? Its not for the fame and adulation. Its not for the money.

A brief bit of introspection reveals the following.

When the muse came knocking again, I was very happy to let it in and go with it to see what happened. I had in fact been hoping it would call – only belatedly realised. Many ideas had come and gone, but nothing stuck or struck anything like a chord. And then idly playing with the entirely sensible evidence-based mantra espoused by [Ben Goldacre](http://www.badscience.net/about-dr-ben-goldacre/), the line went for a walk (borrowed from advice on how to draw) and kept on going. The muse was in the house.

Consistent advice across many art forms appears to be a variation of JFDI. Don't force it. Just do what you can do. Since I rant a lot, it seems a natural fit to take that kind of momentum-based approach to writing: extrapolating from some situations; deliberately mis-interpreting others; letting rip with pet peeves.

So I've been striving to get a full rant going and then keep it fueled for as long as possible. Taking a running jump at the topic and maintaining the momentum. When the wind (or muse) is in the right direction, the words just flow. Whether or not they are a good read, the process of writing them down is a pleasure.

It is a nice feeling to be writing flat out and not knowing where it is going. There is a joy in experiencing a massive pivot away from where you thought you were going. There is a sadness in having a lovely, polished phrase ready that no longer fits with how the story has gone.

It has been interesting keeping an eye on the process of writing.

The momentum thing has challenges. Since ideas bubble up all the time, is it better to stick with the current line/paragraph, or break the flow to jot down a brief note about the new and unrelated thought that has just formed? I'm thinking it is worth capturing the essence of the interrupting thoughts, but it is also best not to interfere with the flow when truly in the zone. A conundrum.

Is the writing process hampered by my two-fingered typing speed? Or does the thinking necessary to slow down/condense the words lead to better writing? Would dictation work better?

There is a distinct difference between the free-form capturing of ideas in a mindmap and the linear-ish discipline of writing out full paragraphs. Or is the paragraph writing actually linear? It seems to work in bursts either way.

The momentum thing feels a smidge like trying to solve a Sudoku puzzle in a hurry. There are times when you are stuck, or cannot properly deduce the next definitely correct number, so you take a punt and carry on, hoping it was a good choice. In Sudoku, if you have chosen the wrong number, you can still make what seems like progress for several more steps before you bump into a contradiction that means you must have made a mistake earlier. Until that bump, you are hopeful but worried that your construct might come crashing down, but you are still ok to go on a little further.
