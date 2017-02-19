---
layout: post
title: Creating an RSS feed to combine all Jekyll Collections
date: 2017-02-15 13:00
author: upthebuzzard
comments: true
categories: []
extract: >
  look up the collection via the page param and don't forget about the spurious newlines
---
Creating a generic rss feed template, to serve up all the posts in all the Jekyll collections.

All the jekyll collections are specified in `_config.yml`, and all the collection-related posts and pages will be in the respective collection folders, where the collection name (aka label) is prefixed by an underscore.

Create the top-level rss file, `feed.xml`

{% raw %}
```jekyll
---
layout: null
---
{% include all_feed.xml %}
```
{% endraw %}

and create the file, `_includes/all_feed.xml`

{% raw %}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xml:lang="{{ site.lang }}">
  <channel>
    <title>{{ site.title }} by {{ site.author }}</title>
    <link>{{ site.url }}</link>
    <copyright>All rights reserved.</copyright>
    <description>{{ site.description }}</description>
    <atom:link href="{{ page.url | absolute_url }}" rel="self" type="application/rss+xml" />
      {% assign posts = site.documents | where:"layout", "post" | sort: 'date' | reverse %}{%
      for post in posts limit:10 %}{%
        assign collection_prefix = "" %}{%
        if post.collection != "posts" %}{%
          assign collection = (site.collections | where:"label", post.collection | first %}{%
          capture collection_prefix %}{{ collection.title_singular }} - {% endcapture %}{%
          endif
        %}<item>
          <title>{{ collection_prefix }}{{ post.title | xml_escape }}</title>
          <description>{{ post.extract | xml_escape }}</description>
          <pubDate>{{ post.date | date_to_rfc822 }}</pubDate>
          <link>{{ post.url | absolute_url }}</link>
          <guid isPermaLink="true">{{ post.url | absolute_url }}</guid>
        </item>
      {% endfor
  %}</channel>
</rss>
```
{% endraw %}

The handlebars code
* gets the list of all documents
   * which are of `layout: post`,
* sorts them by date,
* and then constructs the RSS feed of the most recent ones
* prefixing each post title with `collection.title_singular`, the title of the collection it is from as specified in \_config.yml.

It is worth noting that this particular setup grabs *all* posts, i.e. those in collections and any 'unaffiliated' posts which are not part of a collection. Such unaffiliated posts are in fact considered to be in the default collection called 'posts', behind the scenes. Hence the logic, `if post.collection != "posts"`, which ensures we don't attempt to prefix their titles with their home collection details.

### spurious newlines breaks the XML spec

see [the earlier post](2017-02-19-rss-feed-for-a-jekyll-collection.html) about not emitting spurious newlines.
