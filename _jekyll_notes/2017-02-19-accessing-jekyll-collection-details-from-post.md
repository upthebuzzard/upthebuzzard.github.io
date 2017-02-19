---
layout: post
title: Accessing Jekyll Collection details from post
date: 2017-02-15 19:42
author: upthebuzzard
comments: true
categories: []
extract: >
  somewhat clumsy idiom to locate collection object via name
---
So I want to access details of the collection from within a page (or post) in that collection.

Going straight for ```site[page.collection]``` gives the list of docs in the collection the page is part of (```page.collection``` just gives the collection _label_, i.e. how the collection is named in \_config.yaml ).

You need to scan the list of all collections for the one whose label matches yours, then you can access its details.

{% raw %}
```handlebars
{% assign collection = (site.collections | where:"label", page.collection | first %}
{{ collection.description }}
```
{% endraw %}
