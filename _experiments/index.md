---
layout: collection
title: Experiments
date: 2026-04-06 10:00
categories: []
permalink: /:collection/index.html
excerpt: >
  Tinkering with tools, techniques, and ideas — write-ups of things tried, what worked, what didn't.
---

Tinkering with tools, techniques, and ideas — write-ups of things tried, what worked, what didn't.

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}

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
