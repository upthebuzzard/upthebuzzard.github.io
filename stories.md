---
layout: home
title: A Smattering of Stories
zone: A
---
<header class="post-header">
  <p class="site-collection-description">{{ site.description }}</p>
{% include by-author.html %}
</header>

<h2 class="page-heading">Collections</h2>

{% assign sorted = site.collections | sort: 'sequence' %}
{% for collection in sorted %}
  {% if collection.label != "posts" and collection.zone == "A" %}
    {% assign posts = site[collection.label] | where:"layout", "post" %}
* [{{ collection.title }}]({{ collection.label }}) {% if posts.size > 0 %}[ {{ posts.size }} ]{% endif %}
> {{ collection.description }}

  {% endif %}
{% endfor %}
