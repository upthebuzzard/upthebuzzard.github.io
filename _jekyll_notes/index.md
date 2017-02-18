---
layout: collection
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
* can concatenate lists
* [Attribute List Definitions](https://kramdown.gettalong.org/syntax.html#attribute-list-definitions)

markdown spec
* https://kramdown.gettalong.org/syntax.html

{% raw %}
{% assign fruits = "apples, oranges, peaches, tomatoes" | split: ", " %}  
{% assign vegetables = "broccoli, carrots, lettuce, tomatoes" | split: ", " %}  
{% assign plants = fruits | concat: vegetables %}
{% endraw %}


# Notes

* having to build assorted basic functionality because using collections

# Issues
silent fails, e.g.
* misspelling a category name in \_config.yml so it doesn't agree with the folder name
* for some reason, can't make this work  

{% raw %}
    {% assign posts = site.documents | where_exp:"item", 'item.layout == "post" or item.layout == "story_post"' | sort: 'date' | reverse %}
{% endraw %}



# Posts
{% assign sorted = (collection.docs | where:"layout", "post" | sort: 'date') | reverse %}
{% for item in sorted %}
* [{{ item.title }}]({{ item.url }})
> {{ item.extract }}
{% endfor %}
