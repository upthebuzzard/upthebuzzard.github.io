---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---
{% assign sorted = (site.collections | sort: 'sequence') %}
{% for collection in sorted %}
  {% if collection.label != "posts" %}
    {% assign posts = (site[collection.label] | where:"layout", "post") %}
* [{{ collection.title }}]({{ collection.label }}) {% if posts.size > 0 %}[ {{ posts.size }} ]{% endif %}
> {{ collection.description }}

  {% endif %}
{% endfor %}

<p/>{:.porthole style="height:50px;"}
