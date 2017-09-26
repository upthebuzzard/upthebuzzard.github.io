---
layout: collection
title: Notes on Games
date: 2017-06-03 10:45
categories: []
permalink: /:collection/index.html
---
Welcome!

{% assign totalWordCount = 0 %}
{% assign sorted = (site[page.collection] | where:"layout", "page" | sort: 'sequence') %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
  {% assign totalWordCount = totalWordCount | plus: wordCount %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}

<BR><BR>

<p/>{:.porthole}
