---
layout: post
title: Using Jekyll Collections
date: 2017-02-15 19:42
categories: []
excerpt: >
  Using Jekyll Collections allows for rich structures, but means re-building a bunch of what would have been default functionality for vanilla posts and pages.
---
Using [Jekyll Collections](https://jekyllrb.com/docs/collections/) allows for rich site structures without needing to hack about with categories and tags, but it does mean re-building a few aspects of what would have been default functionality if you just had plain old posts and pages.

That said, it is easy to do so:

* create a new collection layout to list all the posts in the collection
* create a new [collection-specific RSS](2017-02-19-rss-feed-for-a-jekyll-collection.html) include file
* create a new [all-collections RSS](2017-02-19-rss-feed-for-all-jekyll-collections.html) include file
* modify the header nav to list all the collections
* modify the home index page to list collections

The main gotchas (well, annoyances, really) are:

* normal, unaffiliated posts are, it turns out, in a collection called 'posts', so bear that in mind when you try and list *all* collections
* annoyingly, Jekyll seems to ignore the order you specify the categories in the config file, defaulting to alphabetical, so something like [the sequence trick](2017-02-19-sort-order-of-jekyll-collections.html) (and see below) is needed to impose your choice of ordering.
* when you are in a page or a post which is in a collection (i.e. is in the collection folder), the Jekyll `page` object has a `collection` attribute, `page.collection`. This refers to the _name_ of the collection, aka the `label`, [rather than the details of the collection](2017-02-19-accessing-jekyll-collection-details-from-a-post.html).

Define the collections in \_config.yml, e.g.

{% raw %}
```yml
collections:
  grey_parrot_stories:
    output: true
    title: The Grey Parrot Stories
    title_singular: A Grey Parrot Story
    description: a collection of stories about the (too) clever grey parrot
    sequence: 2
    background_image_url: /assets/P1070812-H800.JPG
  jekyll_notes:
    output: true
    title: Jekyll Notes
    title_singular: A Jekyll Note
    description: a collection of notes and observations from and aide-memoires for using Jekyll for the first time.
    sequence: 100
    background_image_url: /assets/img/jekyll-notes/JekyllAndHydeWikipedia.jpg
    ...etc
```
{% endraw %}

Create a new layout, in \_layouts/collection.html, for the index page of a collection. Simply clone the page.html that is already there (from the default minima theme, as specified in \_config.yml, located by running `bundle show minima` on the command line) and add a section to link to the [collection-specific RSS feed](2017-02-19-rss-feed-for-a-jekyll-collection) if there are any posts in that collection.

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

It is left up to the collection's index page whether or not to list all the posts, e.g. here's an example \_jekyll_notes/index.md

{% raw %}
```jekyll
---
layout: collection
title: Jeykll Notes
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
```
{% endraw %}

You can create a site-wide nav of all the collections and top-level pages, by amending the \_includes/header.html file to list the collections (sorted by their sequence attribute - which is why this was specified in the \_config.yml) and then any top-level pages (i.e. their layout is 'page'). In this case, the top level index.md file is of type 'home' so is not included.

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

Because I have quite a few collections, the default behaviour to list all of them in the header was looking messy, so the \_sass/minima/\_layout.scss file was tweaked to always display the nav via the 'hamburger' view by commenting out the media query that only triggered the hamburger view for small screens:

{% raw %}
```css
// @include media-query($on-palm) {
```
{% endraw %}
