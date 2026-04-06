---
layout: collection
title: Pretensions
date: 2024-08-13 12:00
categories: []
permalink: /:collection/index.html
excerpt: >
  opinionated articles on product, tech, and strategy
---
<div class="homepage-columns">
<div class="homepage-text" markdown="1">

<p class="text-center">
Articles on product strategy, technology, and organisational thinking.<br>
Some may be opinionated.<br>
Some may be AI-adjacent, because some bandwagons just have to be joined.<br>
Some were previously published on <a href="https://www.linkedin.com/in/chrisgathercole/">LinkedIn</a>.
</p>

<p class="text-center">by <a href="/pretensions/about">Chris Gathercole</a></p>

</div>
<div class="homepage-gallery">
{% include gallery-frame.html groups="pretensions" %}
</div>
</div>

{% assign all_posts = site[page.collection] | where:"layout", "post" | sort: "date" | reverse %}

<table class="pretensions-listing">
{% for item in all_posts %}
  {% assign wordCount = item.content | number_of_words %}
  <tr>
    <td class="pretensions-listing__title"><a href="{{ item.url }}">{{ item.title }}</a></td>
    <td class="pretensions-listing__excerpt">{{ item.excerpt }}</td>
    <td class="pretensions-listing__meta">
      {{ item.date | date: "%B %Y" }}<br>
      {{ wordCount }} words
      {% if item.topics %}<br>
      {% for topic in item.topics %}<span class="pretensions-listing__topic">{{ topic }}</span>{% unless forloop.last %} {% endunless %}{% endfor %}
      {% endif %}
    </td>
  </tr>
{% endfor %}
</table>
