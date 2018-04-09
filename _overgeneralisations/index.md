---
layout: collection
title: Observations Based On Insufficient Evidence
date: 2017-08-09 22:59
categories: []
permalink: /:collection/index.html
---

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}  
{% endfor %}

<br>

Inspired by old-school bloggers who's mantra is that blogging helps them think, and aware that fretting overly much about building up a solid case based on copious evidence might act as a hindrance to writing anything down, and thus the thinking fails to happen, here are some thoughts with the default caveat of "yes, needs evidence". 
