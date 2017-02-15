---
layout: page
title: Jeykll Notes
author: upthebuzzard
categories: []
permalink: /:collection/index.html
---
{% assign collection = (site.collections | where:"label", page.collection | first %}
{{ collection.description }}

# Aide-memoires
Look up source files for layouts from default theme
* ```bundle show minima```
   * where ```theme: minima``` is specified in \_config.yml
* via https://jekyllrb.com/docs/themes/

# Notes
* having to build assorted basic functionality because using collections

# Issues
silent fails, e.g.
* misspelling a category name in \_config.yml so it doesn't agree with the folder name

# Posts
{% assign sorted = (collection.docs | where:"layout", "post" | sort: 'date') | reverse %}
{% for item in sorted %}
* [{{ item.title }}]({{ item.url }})

   ```{{ item.extract }}```
{% endfor %}

<span class="rss-subscribe">subscribe <a href="feed.xml">via RSS</a></span>
