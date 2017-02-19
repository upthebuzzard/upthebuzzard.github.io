---
layout: post
title: Using Jekyll Collections
date: 2017-02-15 19:42
author: upthebuzzard
comments: true
categories: []
excerpt: >
  Using Jekyll Collections allows for rich structures, but means re-building a bunch of what would have been default functionality for vanilla posts and pages.
---
Using Jekyll Collections allows for rich structures, but means re-building a bunch of what would have been default functionality for vanilla posts and pages.

That said, it is easy to do so.

Created a new layout, in \_layouts/collection.html, for the index page of a collection. Simply cloned the page.html that was already there (from the default minima theme) and added a section to link to the collection-specific rss feed if there are any posts. It is left up to the collection's index page whether or not to list all the posts.

{% raw %}
```jekyll
---
layout: default
---
<article class="post">

  <header class="post-header">
    <h1 class="post-title">{{ page.title | escape }}</h1>
  </header>

  <div class="post-content">
    {{ content }}
  </div>

</article>

{% assign collection_name = page.collection %}
{% assign collection = (site.collections | where:"label", collection_name | first %}
{% assign posts = (site[collection_name] | where:"layout", "post") %}
{% if posts.size > 0 %}
<h3>The collection also available</h3>

...<a href="feed.xml" class="rss-subscribe">via RSS</a>
{% endif %}
```
{% endraw %}

Created a site-wide nav of all the collections and top-level pages, by amending the \_includes/header.html file to list the collections (sorted by their sequence attribute) and then any top-level pages (i.e. their layout is 'page'). In this case, the top level index.md file is of type 'home' so is not included.

{% raw %}
```jekyll
<div class="trigger">
  {% assign collections = (site.collections | sort: 'sequence') %}
  {% for collection in collections %}
    {% if collection.title %}
    <a class="page-link" href="{{ collection.label | relative_url }}">{{ collection.title | escape }}</a>
    {% endif %}
  {% endfor %}

  {% for my_page in site.pages %}
    {% if my_page.title and my_page.layout == 'page' %}
    <a class="page-link" href="{{ my_page.url | relative_url }}">{{ my_page.title | escape }}</a>
    {% endif %}
  {% endfor %}
</div>
```
{% endraw %}

Because I have quite a few collections, the default behaviour to list all them in the header was looking messy, so the \_sass/minima/\_layout.scss file was tweaked to always display the nav via the 'hamburger' view by commenting out the media query that only triggered the hamburger view for small screens:

```css
// @include media-query($on-palm) {
```
