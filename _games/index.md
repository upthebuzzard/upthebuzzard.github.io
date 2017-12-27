---
layout: collection
title: Notes on Games
date: 2017-06-03 10:45
categories: []
permalink: /:collection/index.html
---
Welcome!

Here we have a (small) assortment of newly-developed games. So far, they are all based on the premise of using standard playing cards to make something interesting and challenging.

{% assign totalWordCount = 0 %}
{% assign sorted = (site[page.collection] | where:"layout", "page" | sort: 'sequence') %}
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
  {% assign totalWordCount = totalWordCount | plus: wordCount %}
* [{{ item.title }}]({{ item.url }}) ({{ wordCount }} words)
> {{ item.excerpt }}
{% endfor %}

# Inspirations

## Non standard, standard-cards-only games
* [Lamarckian Poker](http://cheapass.com/free-games/poker-suite/) by CheapAss Games, which comes as part of a set of standard-cards-only games. <sub>([boardgamegeek](https://boardgamegeek.com/boardgame/3270/lamarckian-poker))</sub>

## Multi-layered use of cards
* [Race For The Galaxy](http://riograndegames.com/games.html?id=240)<sub>([boardgamegeek](https://boardgamegeek.com/boardgame/28143/race-galaxy))</sub>

## Synergies between cards
* Dominion <sub>([boardgamegeek](https://boardgamegeek.com/boardgame/36218/dominion))</sub>

## Interesting mechanics
* RoboRally <sub>([boardgamegeek](https://boardgamegeek.com/boardgame/18/roborally))</sub>
* Carcassonne <sub>([boardgamegeek](https://boardgamegeek.com/boardgame/822/carcassonne)</sub>

# Other reading
* [some US-centric words on game copyright, trademark, patents](https://boardgamegeek.com/thread/493249/mythbusting-game-design-and-copyright-trademarks-a)
   * These games are under Creative Commons (see [About](/about/)), BTW. Do please use, copy, and embellish, and let me know.
* the [BoardGameGeek](https://boardgamegeek.com/) site, which seems to be pretty much comprehensive board game resource.
