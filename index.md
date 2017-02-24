---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---
An eclectic mixture of stories, ranging from a bedtime-crowd-sourced children's detective series to assorted surreal-ish, near-future musings, and some other stuff, and some notes on using Jekyll (to create this site).

<h2 class="page-heading">Collections</h2>

{% assign sorted = (site.collections | sort: 'sequence') %}
{% for collection in sorted %}
  {% if collection.label != "posts" %}
    {% assign posts = (site[collection.label] | where:"layout", "post") %}
* [{{ collection.title }}]({{ collection.label }}) {% if posts.size > 0 %}[ {{ posts.size }} ]{% endif %}
> {{ collection.description }}

  {% endif %}
{% endfor %}

<p/>{:.porthole style="height:50px;"}
