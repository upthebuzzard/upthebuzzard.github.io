---
layout: collection
title: Notes on Games
date: 2017-06-03 10:45
categories: []
permalink: /:collection/index.html
---
Welcome!

* [Pouches of Destiny](pouches-of-destiny) - use a standard deck of playing cards to enter a world of garbage and marsupial desperation

<BR><BR>

<p/>{:.porthole}

{% assign totalWordCount = 0 %}
{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'sequence') %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
  {% assign totalWordCount = totalWordCount | plus: wordCount %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words) {% if forloop.first %}<span style="color:#00ff00;"> &lt;-- START HERE</span>{% endif %}
> {{ item.excerpt }}
{% endfor %}

{% if totalWordCount > 0 %}
Total Word Count: {{ totalWordCount }} ...
{% endif %}
