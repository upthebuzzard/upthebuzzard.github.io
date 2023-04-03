---
layout: collection
title: Exploring 'Good Hifi On The Cheap'
date: 2023-04-03 16:50
categories: []
permalink: /:collection/index.html
excerpt: >
  Assorted thoughts and learnings on 'Good hifi on the cheap'
---

A life-long journey from ignorance to nice-but-cheap audio.

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}
