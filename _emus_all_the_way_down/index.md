---
layout: page
title: Emus All The Way Down
date: 2013-06-24 21:33
author: upthebuzzard
categories: []
permalink: /:collection/index.html
---
Starting with a <a title="Predicting The Present" href="/predicting_the_present/">Predicting The Present</a> story, <a title="Emus all the way down" href="/predicting_the_present/2013-06-29-emus-all-the-way-down/">EMUs all the way down</a>, and taking it a bit further, exploring some nooks and crannies.

Very slow progress. Is there a full-length novel in here somewhere? Not at the rate I'm going. But it appears I can write in bursts of about 1000 words if the immediate topic appeals. This marathon is a series of sprints. Trying to work it into shape.

Pieces so far:

## the main protagonist

who's there at the start (or one of the starts) and works out what happens at the end

<p>
	{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'sequence') %}
	{% for item in sorted %}
		<ul>
			<li>
				<a href="{{ item.url }}">{{ item.title }}</a>
			</li>
			<blockquote>{{ item.extract }}</blockquote>
		</ul>
	{% endfor %}
</p>


## contemporaneous, or possibly precursors


## glossary

* NPC : non playing character in a computer game, similar to an 'extra' in a film. Usually a very simple automaton, considered cannon (or sword) fodder, but sometimes there to help move the (paying) human-driven characters along with hints about what they should do next..</li>

<p>
	Or <span class="rss-subscribe">subscribe <a href="feed.xml">via RSS</a></span>
</p>
