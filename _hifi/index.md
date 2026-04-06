---
layout: collection
title: Exploring 'Good Hifi On The Cheap'
date: 2023-04-03 16:50
categories: []
permalink: /:collection/index.html
excerpt: >
  A life-long journey from ignorance to nice-but-cheap audio.
---

The missteps are (it turns out) the fun steps. 

{% assign collections = site.collections | sort: 'sequence' %}
{% for collection in collections %}
  {% if collection.label == page.collection %}
    {% if collection.reverse_posts %}
      {% assign reverse_collection_posts = true %}
    {% endif %}
  {% endif %}
{% endfor %}

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' %}

{% if reverse_collection_posts %}
  {% assign sorted = sorted | reverse %}
{% endif %}

<table class="pretensions-listing">
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
  <tr>
    <td class="pretensions-listing__title"><a href="{{ item.url }}">{{ item.title }}</a></td>
    <td class="pretensions-listing__meta">
      {{ item.date | date: "%B %Y" }}<br>
      {{ wordCount }} words
    </td>
    <td class="pretensions-listing__excerpt">{{ item.excerpt }}</td>
  </tr>
{% endfor %}
</table>
