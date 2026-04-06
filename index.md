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
<table class="homepage-listing homepage-listing--2col">
{% for collection in sorted %}
{% if collection.label != "posts" and collection.zone == "A" %}
  <tr>
    <td class="homepage-listing__name"><a href="{{ collection.label }}">{{ collection.title }}</a></td>
    <td class="homepage-listing__desc">{{ collection.description }}</td>
  </tr>
{% endif %}
{% endfor %}
</table>

## [Professional Articles](/pretensions/)

Opinionated articles on product, tech, and strategy. aka 'Pretensions'.

{% assign pretensions_posts = site.pretensions | where:"layout", "post" | sort: "date" | reverse %}
<table class="homepage-listing homepage-listing--1col">
{% for post in pretensions_posts %}
  <tr>
    <td class="homepage-listing__name"><a href="{{ post.url }}">{{ post.title }}</a></td>
  </tr>
{% endfor %}
</table>

## [Hobbies](/hobbies)

{% assign sorted_hobbies = site.collections | sort: 'sequence' %}
<table class="homepage-listing homepage-listing--2col">
{% for collection in sorted_hobbies %}
{% if collection.label != "posts" and collection.zone == "C" %}
  <tr>
    <td class="homepage-listing__name"><a href="{{ collection.label }}">{{ collection.title }}</a></td>
    <td class="homepage-listing__desc">{{ collection.description }}</td>
  </tr>
{% endif %}
{% endfor %}
</table>

</div>
<div class="homepage-gallery">
{% include gallery-frame.html %}
</div>
</div>
