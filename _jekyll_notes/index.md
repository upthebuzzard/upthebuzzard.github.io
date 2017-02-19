---
layout: collection
title: Jeykll Notes
author: upthebuzzard
categories: []
permalink: /:collection/index.html
---
{% assign collection = (site.collections | where:"label", page.collection | first %}
{{ collection.description }}

# Posts
{% assign sorted = (collection.docs | where:"layout", "post" | sort: 'date') %}
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

# Notes for posts

* having to build assorted basic functionality because using collections- DONE
* naff default sort order of collections - DONE
* allowing a simple include in a markdown post file without creating a plugin/gem (because Windows and Github) or using the capture thing (as asked here: http://stackoverflow.com/questions/7226076/in-jekyll-is-there-a-concise-way-to-render-a-markdown-partial): using Attribute List Definitions (kramdown) <p/>{:.porthole}. (which does not work on mobile - boooo), can change size via styles <p/>{:.porthole style="height:50px;"}
* creating a collection-specific rss feed, including not inserting format-busting spaces via the handlebars - DONE
* creating a rss feed of all collections posts and *not* the unaffiliated posts (which are in a collection called 'posts'), could have looped over all collections and concatenated the lists of posts - DONE
* creating PREV and NEXT links for posts *within* a collection (via https://gist.github.com/budparr/3e637e575471401d01ec) - DONE
* creating a 404 page
