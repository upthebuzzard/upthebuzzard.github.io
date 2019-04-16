---
layout: collection
title: Jeykll Notes
categories: []
permalink: /:collection/index.html
excerpt: >
  A collection of notes and observations from and aide-memoires for using Jekyll for the first time.
---
{% assign collection = site.collections | where:"label", page.collection | first %}
{{ collection.description }}

# Posts
{% assign sorted = collection.docs | where:"layout", "post" | sort: 'date' | reverse %}
{% for item in sorted %}
* [{{ item.title }}]({{ item.url }})
> {{ item.excerpt }}
{% endfor %}

# Aide-memoires
Look up source files for layouts from default theme
* ```bundle show minima```
   * where ```theme: minima``` is specified in \_config.yml
* via https://jekyllrb.com/docs/themes/
* can concatenate lists
* [Attribute List Definitions](https://kramdown.gettalong.org/syntax.html#attribute-list-definitions)
* if not -> unless

markdown spec
* https://kramdown.gettalong.org/syntax.html

{% raw %}
```handlebars
{% assign fruits = "apples, oranges, peaches, tomatoes" | split: ", " %}  
{% assign vegetables = "broccoli, carrots, lettuce, tomatoes" | split: ", " %}  
{% assign plants = fruits | concat: vegetables %}
```
{% endraw %}

# Issues
silent fails, e.g.
* misspelling a category name in \_config.yml so it doesn't agree with the folder name
* for some reason, can't make this work  

{% raw %}
```handlebars
    {% assign posts = site.documents | where_exp:"item", 'item.layout == "post" or item.layout == "story_post"' | sort: 'date' | reverse %}
```
{% endraw %}
