---
layout: post
title: Sort order of Jekyll Collections
date: 2017-02-15 11:00
author: upthebuzzard
comments: true
categories: []
extract: >
  add a sequence attribute to each collection and sort by that
---
Somewhat annoyingly, Jekyll's default list of collections is in alphabetical order of collection name.

So if your \_config.yml specifies

{% raw %}
```yaml
collections:
  moose_and_goose_stories:
    title: The Moose and Goose Stories
  grey_parrot_stories:
    title: The Grey Parrot Stories
  predicting_the_present:
    title: Predicting the Present
```
{% endraw %}

and you process the collections using the default ordering

{% raw %}
```handlebars
{% for collection in site.collections %}
  {% if collection.title %}
* {{ collection.title | escape }}
  {% endif %}
{% endfor %}
```
{% endraw %}

it will give you
* The Grey Parrot Stories
* The Moose and Goose Stories
* Predicting the Present

based on the g-m-p of the collection names, i.e. *not* the far more intuitive order of how they are listed in the \_config.yml.

This is my workaround - adding a *sequence* attribute to each collection

{% raw %}
```yaml
collections:
  moose_and_goose_stories:
    title: The Moose and Goose Stories
    sequence: 1
  grey_parrot_stories:
    title: The Grey Parrot Stories
    sequence: 2
  predicting_the_present:
    title: Predicting the Present
    sequence: 3
```
{% endraw %}

and modifying the processing to sort by sequence

(NB the use of an assign statement to set up the variable value, since you can't do it directly in the for statement.)

{% raw %}
```handlebars
{% assign collections = (site.collections | sort: 'sequence') %}
{% for collection in site.collections %}
  {% if collection.title %}
* {{ collection.title | escape }}
  {% endif %}
{% endfor %}
```
{% endraw %}

to give you
* The Moose and Goose Stories
* The Grey Parrot Stories
* Predicting the Present
