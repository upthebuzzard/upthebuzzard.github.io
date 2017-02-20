---
layout: post
title: An experiment with parallax scrolling in Jekyll posts
date: 2017-02-19 18:00
comments: true
categories: []
excerpt: >
  A brief experiment with how to add a simple view within a scrolling Jekyll collection post onto a fixed image 'behind' it.
---
A brief experiment with how to add a simple view within a scrolling Jekyll collection post onto a fixed image 'behind' it. NB, nothing particular to do with collections, will work in a standard post.

The key phrases are:
* CSS background-attachment
   * which won't work on mobile browsers
* parallax scrolling
* hard to include markdown code rendered within markdown without creating a plugin/gem to do it (ugh)
* [Attribute List Definitions](https://kramdown.gettalong.org/syntax.html#attribute-list-definitions)
   * or, modifying the css properties of an html element within markdown (in this case, a <p> tag)

<p/>{: .porthole}

Create a file, `_includes/porthole.html`

{% raw %}
```jekyll
<style>
  .porthole {
    width: 100%;
    height: 100px;
    background-attachment: fixed;
    background-repeat: no-repeat;
    position: relative;
    background-size: cover;
    background-image: url({{ site.default_collection_background_image_url }});
    {% assign background_image_url = site.default_collection_background_image_url %}
    {% if page.collection %}
      {% assign collection = (site.collections | where:"label", page.collection | first) %}
      {% if collection.background_image_url %}
        {% assign background_image_url = collection.background_image_url %}
      {% endif %}
    {% endif %}
    {% if page.background_image_url %}
      {% assign background_image_url = page.background_image_url %}
    {% endif %}
    {% if background_image_url %}
      background-image: url({{ background_image_url }});
    {% endif %}
  }
</style>
```
{% endraw %}

<p/>{: .porthole}

and include it in `_includes/default.html`

{% raw %}
```jekyll
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "en" }}">

{% include head.html %}
{% include porthole.html %}

  <body>
  ...
```
{% endraw %}

<p/>{: .porthole}

add a `background_image_url` to your collection spec in `_config.yml` referencing an image in your `/assets` folder (or in the front matter of an individual post), e.g.

{% raw %}
```
jekyll_notes:
  output: true
  title: Jekyll Notes
  title_singular: A Jekyll Note
  description: a collection of notes and observations from and aide-memoires for using Jekyll for the first time.
  sequence: 100
  background_image_url: /assets/JekyllAndHydeWikipedia.jpg
```
{% endraw %}

and include the porthole as `<p/>{: .porthole}` in any posts (markdown or html) as often as you like, e.g.

{% raw %}
```markdown
The key phrases are:
* CSS background-attachment
   * which won't work on mobile browsers
* parallax scrolling
* hard to include markdown code rendered within markdown without creating a plugin/gem (ugh)
* [Attribute List Definitions](https://kramdown.gettalong.org/syntax.html#attribute-list-definitions)
   * or, modifying the css properties of an html element within markdown (in this case, a <p> tag)

<p/>{: .porthole}

Create a file, `_includes/porthole.html`
```
{% endraw %}

You can adjust the size of the porthole by changing the default css width and height in `_includes/porthole.html`, or on a case by case basis by overriding the css style,

e.g. `<p/>{:.porthole style="width:50%;height:200px;"}`

<p/>{:.porthole style="width:50%;height:200px;"}

With thanks to [Wikipedia](https://en.wikipedia.org/wiki/Strange_Case_of_Dr_Jekyll_and_Mr_Hyde) for the demo image.
