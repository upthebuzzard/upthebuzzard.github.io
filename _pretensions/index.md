---
layout: collection
title: Pretensions
date: 2024-08-13 12:00
categories: []
permalink: /:collection/index.html
excerpt: >
  opinionated articles on product, tech, and strategy
---

<p class="text-center">
Articles on product strategy, technology, and organisational thinking.<br>
Some may be opinionated.<br>
Some may be AI-adjacent, because some bandwagons just have to be joined.<br>
Some were previously published on <a href="https://www.linkedin.com/in/chrisgathercole/">LinkedIn</a>.
</p>

<p class="text-center">by <a href="/pretensions/about">Chris Gathercole</a></p>

{% assign all_posts = site[page.collection] | where:"layout", "post" %}
{% assign topic_list = "" %}
{% for post in all_posts %}
  {% for topic in post.topics %}
    {% unless topic_list contains topic %}
      {% if topic_list != "" %}{% assign topic_list = topic_list | append: "|" %}{% endif %}
      {% assign topic_list = topic_list | append: topic %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign topics = topic_list | split: "|" | sort %}

{% for topic in topics %}
<h2 id="{{ topic | slugify }}">{{ topic }}</h2>

{% for item in all_posts %}
  {% if item.topics contains topic %}
  {% assign wordCount = item.content | number_of_words %}
### [{{ item.title }}]({{ item.url }})
<span class="post-meta">{{ item.date | date: "%B %Y" }} &middot; {{ wordCount }} words</span>

> {{ item.excerpt }}

  {% endif %}
{% endfor %}
{% endfor %}
