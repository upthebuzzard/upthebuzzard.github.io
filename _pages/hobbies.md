---
layout: page
title: Hobbies
permalink: /hobbies
zone: C
---

<div class="homepage-columns">
<div class="homepage-text" markdown="1">

A few other things I spend time on.

{% assign collections = site.collections | sort: 'sequence' %}
<table class="collection-listing">
{% for collection in collections %}
  {% if collection.zone == "C" %}
    {% assign posts = site[collection.label] | where:"layout", "post" %}
  <tr>
    <td class="collection-listing__name"><a href="{{ collection.label | relative_url }}">{{ collection.title }}</a></td>
    <td class="collection-listing__count">{{ posts.size }}</td>
    <td class="collection-listing__desc">{{ collection.description }}</td>
  </tr>
  {% endif %}
{% endfor %}
</table>

</div>
<div class="homepage-gallery">
{% include gallery-frame.html groups="hobbies" %}
</div>
</div>
