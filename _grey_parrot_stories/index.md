---
layout: collection
title: The Grey Parrot Stories
date: 2011-09-30 21:33
categories: []
permalink: /:collection/index.html
---
The Grey Parrot stories [emerged along with](/moose_and_goose_stories/a-brief-history-of-moose-and-goose) the [Moose &amp; Goose stories](/moose_and_goose_stories), but it was clear they were a different kettle of fish. More suited to a younger audience, 3yo-6yo say, they came about after a news item showed a talking grey parrot who seemed to be too clever by half.

_Animals with big questions go to the grey parrot for answers,  
and they do get answers,  
but soon wish they had never asked ..._  

These are short stories for kids, to be read aloud by a grown up at bedtime. They all follow the same theme. There are no pictures. Imaginations are essential. Participation is encouraged.

<p/>{:.porthole}

{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'date') | reverse %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}
