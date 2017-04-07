---
layout: collection
title: Emus All The Way Down
date: 2013-06-24 21:33
categories: []
permalink: /:collection/index.html
---
Starting with a [Predicting The Present](/predicting_the_present/) story, [Emus all the way down](/predicting_the_present/2013-06-29-emus-all-the-way-down.html), and taking it a bit further, exploring some nooks and crannies.

Very slow progress. Is there a full-length novel in here somewhere? Not at the rate I'm going. But it appears I can write in bursts of about 1000 words if the immediate topic appeals. This marathon is a series of sprints. Trying to work it into shape.

Pieces so far:

## the main protagonist

who's there at the start (or one of the starts) and works out what happens at the end

{% assign totalWordCount = 0 %}
{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'sequence') %}
{% for item in sorted %}
	{% unless item.categories contains 'tangential' %}
		{% assign wordCount = item.content | number_of_words %}
		{% assign totalWordCount = totalWordCount | plus: wordCount %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
	{% endunless %}
{% endfor %}

Total Word Count: {{ totalWordCount }} ...

## contemporaneous, or possibly precursors

{% assign sorted = (site[page.collection] | where:"layout", "post" | where_exp:"item", "item.categories contains 'tangential'" | sort: 'sequence') %}
{% for item in sorted %}
	{% assign wordCount = item.content | number_of_words %}
	{% assign totalWordCount = totalWordCount | plus: wordCount %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}

Total Word Count (including extras): {{ totalWordCount }}

## glossary

* NPC : non playing character in a computer game, similar to an 'extra' in a film. Usually a very simple automaton, considered cannon (or sword) fodder, but sometimes there to help move the (paying) human-driven characters along with hints about what they should do next..
