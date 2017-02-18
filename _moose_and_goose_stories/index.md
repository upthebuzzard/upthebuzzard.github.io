---
layout: collection
title: The Moose and Goose Stories
date: 2011-09-30 21:33
author: upthebuzzard
categories: []
permalink: /:collection/index.html
---
Welcome!

Here are some short bedtime stories for kids,
roughly in the age range of 4-11 (yes, yes, such a large suggested age range may not seem much use, but different ages get different things out of the stories), or younger ones [over here](/grey_parrot_stories/), to be read aloud by a grown up to help with the occasional long word.
The stories are [available for free](/about/), and are ad-free, but please Please _PLEASE_ give me some feedback (good or bad, anonymously, briefly, verbosely, doesn't matter,  just let me know).

There is a [potted history](a-brief-history-of-moose-and-goose) of how Moose &amp; Goose came to be, but all you really need to know is:

{% include_relative door_sign_include.html %}

And so, to the stories. <em>There are tricky problems to solve</em>...

<p/>{:.porthole}

{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'sequence') %}
{% for item in sorted %}
* [{{ item.title }}]({{ item.url }}){% if forloop.first %}<span style="color:#00ff00;"> &lt;-- START HERE</span>{% endif %}
> {{ item.extract }}
{% endfor %}
