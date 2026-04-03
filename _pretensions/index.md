---
layout: collection
title: Pretensions
date: 2024-08-13 12:00
categories: []
permalink: /:collection/index.html
excerpt: >
  opinionated articles on product, tech, and strategy
---

Articles on product strategy, technology, and organisational thinking.\\
Some may be opinionated.\\
Some were previously published on [LinkedIn](https://www.linkedin.com/in/chrisgathercole/).

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
