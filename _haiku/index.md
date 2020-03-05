---
layout: collection
title: Haiku, and other poetry
date: 2020-03-04 20:45
categories: []
permalink: /:collection/index.html
excerpt: >
  Assorted works of haiku-ish poetry
---

Haiku are a highly condensed form of writing.

There is a lot more to it than the classic (English) fixation with 5-7-5 syllables, but that is the common starting point.

When it works, it can really work. The striving is the fun.

There was a fun project in 2016 [uncovering accidental haiku in FT articles](https://labs.ft.com/2016/07/finding-hidden-haiku/).

Here are some that I original ones have tried.

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}
