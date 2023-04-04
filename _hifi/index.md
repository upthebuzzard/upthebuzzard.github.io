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

{% assign collections = site.collections | sort: 'sequence' %}
{% for collection in collections %}
  {% if collection.label == page.collection %}
    {% if collection.reverse_posts %}
      {% assign reverse_collection_posts = true %}
    {% endif %}
  {% endif %}
{% endfor %}

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}

{% if reverse_collection_posts %}
  {% assign sorted = sorted | reverse %}
{% endif %}

{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}
