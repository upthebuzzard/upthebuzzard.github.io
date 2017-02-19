---
layout: post
title: Creating an RSS feed for a single Jekyll Collection
date: 2017-02-15 13:00
author: upthebuzzard
comments: true
categories: []
extract: >
  look up the collection via the page param and don't forget about the spurious newlines
---
Creating a generic rss feed template, specific to the current Jekyll collection.

My jekyll collection, _jekyll_notes_, is specified in `_config.yml`, and all the collection-related posts and pages will be in the folder `_jekyll_notes`:

{% raw %}
```yaml
collections:
...
  jekyll_notes:
    output: true
    title: Jekyll Notes
    title_singular: A Jekyll Note
    description: a collection of notes and observations from and aide-memoires for using Jekyll for the first time.
    sequence: 100
...
```
{% endraw %}

Create a file called `_jekyll/feed.xml`

{% raw %}
```jekyll
---
layout: null
---
{% include collection_feed.xml %}
```
{% endraw %}

and create the file, `_includes/collection_feed.xml`

{% raw %}
```xml
<?xml version="1.0" encoding="UTF-8"?>
{% assign collection_name = page.collection %}{%
assign collection = (site.collections | where:"label", collection_name | first %}{%
assign posts = (site[collection_name] | where:"layout", "post" | sort: 'date')
%}<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xml:lang="{{ site.lang }}">
    <channel>
        <title>{{ collection.title }}</title>
        <link>{{ site.url }}</link>
        <copyright>All rights reserved.</copyright>
        <description>{{ collection.description }}</description>
        <atom:link href="{{ page.url | absolute_url }}" rel="self" type="application/rss+xml" />
        {% for post in posts limit:20 %}
            <item>
                <title>{{ post.title | xml_escape }}</title>
                <description>{{ post.extract | xml_escape }}</description>
                <pubDate>{{ post.date | date_to_rfc822 }}</pubDate>
                <link>{{ post.url | absolute_url }}</link>
                <guid isPermaLink="true">{{ post.url | absolute_url }}</guid>
            </item>
        {% endfor %}
    </channel>
</rss>
```
{% endraw %}

The handlebars code
* obtains the collection of the current page (which is available via the param `page`, automatically passed through via the {%raw%}`{% include collection_feed.xml %}`{%endraw%} in the feed.xml file)
* looks up the full details of the collection,
* gets the list of all documents in that collection
   * which are of `layout: post`,
* sorts them by date,
* and then constructs the RSS feed of the most recent ones.

### spurious newlines breaks the XML spec

NB, because the handlebar processing has side-effects and leaves newlines in the rendered file, naively writing the handlebar code as

{% raw %}
```handlebars
{% assign collection_name = page.collection %}
{% assign collection = (site.collections | where:"label", collection_name | first %}
{% assign posts = (site[collection_name] | where:"layout", "post" | sort: 'date') %}
```
{% endraw %}

... will create an invalid RSS file.

Instead, doing the least-worst mangling of the code as follows

{% raw %}
```xml
<?xml version="1.0" encoding="UTF-8"?>
{% assign collection_name = page.collection %}{%
assign collection = (site.collections | where:"label", collection_name | first %}{%
assign posts = (site[collection_name] | where:"layout", "post" | sort: 'date')
%}<rss version="2.0"
```
{% endraw %}

... leaves it more or less as easy to read, but importantly *not* dropping spurious newlines into the XML output.
