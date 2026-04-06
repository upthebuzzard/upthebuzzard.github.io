---
layout: home
title: A Smattering of Stories
permalink: /stories
zone: A
---
<div class="homepage-columns">
<div class="homepage-text" markdown="1">

<header class="post-header">
  <p class="site-collection-description">{{ site.description }}</p>
{% include by-author.html %}
</header>

{% assign sorted = site.collections | sort: 'sequence' %}
<table class="collection-listing">
{% for collection in sorted %}
  {% if collection.label != "posts" and collection.zone == "A" %}
    {% assign posts = site[collection.label] | where:"layout", "post" %}
  <tr>
    <td class="collection-listing__name"><a href="{{ collection.label }}">{{ collection.title }}</a></td>
    <td class="collection-listing__count">{{ posts.size }}</td>
    <td class="collection-listing__desc">{{ collection.description }}</td>
  </tr>
  {% endif %}
{% endfor %}
</table>

</div>
<div class="homepage-gallery">
{% include gallery-frame.html groups="stories,predicting_the_present" %}
</div>
</div>
