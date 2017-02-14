---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---
{% for collection in site.collections %}
  {% if collection.label != "posts" %}
* [{{ collection.title }}]({{ collection.label }})
  {% endif %}
{% endfor %}
