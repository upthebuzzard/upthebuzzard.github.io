---
layout: page
title: Hobbies
permalink: /hobbies
zone: C
---

A few other things I spend time on.

{% assign collections = site.collections | sort: 'sequence' %}
{% for collection in collections %}
  {% if collection.zone == "C" %}
    {% assign posts = site[collection.label] | where:"layout", "post" %}
* [{{ collection.title }}]({{ collection.label | relative_url }}) {% if posts.size > 0 %}[ {{ posts.size }} ]{% endif %}
> {{ collection.description }}

  {% endif %}
{% endfor %}

