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

There was a fun project in 2016 [uncovering accidental haiku in FT articles](https://www.ft.com/content/372c5c3a-c657-11e6-8f29-9445cac8966f).

Here are some that I have tried.

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}
