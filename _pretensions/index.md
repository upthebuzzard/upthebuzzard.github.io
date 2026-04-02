---
layout: collection
title: Pretensions
date: 2024-08-13 12:00
categories: []
permalink: /:collection/index.html
excerpt: >
  opinionated articles on product, tech, and strategy
---

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}
