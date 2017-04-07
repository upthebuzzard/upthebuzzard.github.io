---
layout: collection
title: The Moose and Goose Stories
date: 2011-09-30 21:33
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

{% assign totalWordCount = 0 %}
{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'sequence') %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
  {% assign totalWordCount = totalWordCount | plus: wordCount %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words) {% if forloop.first %}<span style="color:#00ff00;"> &lt;-- START HERE</span>{% endif %}
> {{ item.excerpt }}
{% endfor %}

Total Word Count: {{ totalWordCount }} ...

### Sammy Seagull and Percy Penguin: The early years of industrial espionage

… [more to come](upcoming-moose-and-goose)

These stories all follow the same theme. There are no pictures. Imaginations are essential. Participation is encouraged, especially in the brainstorming sections (where ‘…’ means the audience is meant to contribute). Feedback is begged for.

There is no commercial printing of these stories (yet). They can be read out quite satisfactorily from a smartphone, or a tablet. In fact, field studies have shown that the gently glowing screen in a darkened room works really well, adding a sense of drama.
