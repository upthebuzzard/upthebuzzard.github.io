---
layout: home
title: Welcome
zone: site
---

<div class="homepage-columns">
<div class="homepage-text" markdown="1">

Welcome to this eclectic collection of collections of writing, by Chris Gathercole.

Initially to share bedtime stories I and my children improvised, this site expanded to include more strands of fiction, assorted musings, and some hobbyist content. A recent shift has been to accommodate professional, LinkedIn-y posts about strategy and AI.

The eclecticism is itself something of an experiment. See the [colophon](/colophon) page for more details on how AI figures in all this (hint: only in the site code generation, and in the research for the LinkedIn articles).

If you'd like to go further, here are the main areas:

## [Stories & Creative Writing](/stories)

{% assign sorted = site.collections | sort: 'sequence' %}
{% for collection in sorted %}
{% if collection.label != "posts" and collection.zone == "A" %}
* [{{ collection.title }}]({{ collection.label }}) — {{ collection.description }}
{% endif %}
{% endfor %}

## [Professional Articles](/pretensions/)

Opinionated articles on product, tech, and strategy. aka 'Pretensions'.

{% for post in site.pretensions %}
{% if post.layout == "post" %}
* [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}

## [Hobbies](/hobbies)

{% assign sorted_hobbies = site.collections | sort: 'sequence' %}
{% for collection in sorted_hobbies %}
{% if collection.label != "posts" and collection.zone == "C" %}
* [{{ collection.title }}]({{ collection.label }}) — {{ collection.description }}
{% endif %}
{% endfor %}

</div>
<div class="homepage-gallery">
{% include gallery-frame.html %}
</div>
</div>
