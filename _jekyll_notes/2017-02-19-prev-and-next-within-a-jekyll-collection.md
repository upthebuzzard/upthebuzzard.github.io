---
layout: post
title: Creating previous and next links within a Jekyll Collection
date: 2017-02-19 15:00
comments: true
categories: []
excerpt: >
  If you use Collections in Jekyll, you lose some of the default plumbing that 'just works' for normal posts etc. One such piece of plumbing is the idea of the previous and next posts within a collection.
---
If you use Collections in Jekyll, you lose some of the default plumbing that 'just works' for normal posts etc. One such piece of plumbing is the idea of the previous and next posts within a collection.

In short, do [this](https://gist.github.com/budparr/3e637e575471401d01ec) by [budparr](https://gist.github.com/budparr).

Tweaking budparr's code a bit,

create a file called, say, `_includes/prevnext.html`

{% raw %}
```jekyll
{% if page.collection %}
  {% assign posts = (site[page.collection] | where:"layout", "post" | sort: 'date') %}

  {% if posts.size > 1 %}
    {% assign prevurl = posts.last.url %}
    {% assign nexturl = posts.first.url %}
  {% endif %}

  {% for links in posts %}
    {% if links.title == page.title %}
      {% unless forloop.first %}
        {% assign prevurl = prev.url %}
      {% endunless %}
      {% unless forloop.last %}
        {% assign next = posts[forloop.index] %}
        {% assign nexturl = next.url %}
      {% endunless %}
    {% endif %}
    {% assign prev = links %}
  {% endfor %}

  <p>
      {% if posts.size > 1 %}
        {% if prevurl %}<a href="{{prevurl}}" class="prev">PREV</a>{% endif %}
        {% if nexturl %}<a href="{{nexturl}}" class="nxt">NEXT</a>{% endif %}
      {% endif %}
  </p>
{% endif %}

```
{% endraw %}

Then if you include it in a page (or post) within a collection, {%raw%}`{% include prevnext.html %}`{%endraw%}, you'll have PREV and NEXT linking to the appropriate 'neighbouring' posts in that collection.

The handlebars code
* gets the collection of the page where the include is taking place
* gets all the posts in that collection
* sets up prevurl and nexturl to work even when there are only two posts
* locates the current post in the list of posts
* loops over the posts to calc the prev/next of the current post
* displays the PREV and NEXT links if there are at least two posts
