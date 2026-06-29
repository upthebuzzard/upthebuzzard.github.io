---
layout: collection
title: Notes on Games
date: 2017-06-03 10:45
categories: []
permalink: /:collection/index.html
excerpt: >
  Here we have a (small) assortment of newly-developed games. Initially based on the premise of using standard playing cards to make something interesting and challenging, this expanded to encompass 'found' (aka, 'whatever you have available') pieces. 
---
Welcome!

Here we have a (small) assortment of newly-developed games. Initially based on the premise of using standard playing cards to make something interesting and challenging, this expanded to encompass 'found' (aka, 'whatever you have available') pieces. 

{% assign totalWordCount = 0 %}
{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}

<table class="pretensions-listing">
{% for item in sorted %}
  {% assign wordCount = item.content | number_of_words %}
  {% assign totalWordCount = totalWordCount | plus: wordCount %}
  <tr>
    <td class="pretensions-listing__title"><a href="{{ item.url }}">{{ item.title }}</a></td>
    <td class="pretensions-listing__meta">
      {{ item.date | date: "%B %Y" }}<br>
      {{ wordCount }} words
    </td>
    <td class="pretensions-listing__excerpt">{{ item.excerpt }}</td>
  </tr>
{% endfor %}
</table>

# Games You Can Make On The Spot

If we expand 'found' to include beer mats or, less pleasing but still practical, torn up pieces of paper and a pen, or yes, standard playing cards, you can construct a working version of [Skull](https://boardgamegeek.com/boardgame/92415/skull). The artwork on an official set is gorgeous, but if you are caught without one, you can still make do. The game play is simple and quick, but the nuances of who is faking it this time, or going for it, or nervous, or spotting the moment to pounce, ... magnificent.

A paper and pen, you say? Well, there is a really rather good word game which can be spun up in no time. Can accommodate any number of players, from 2 to many, but is at its sharpest for 2. Will write up the details soon.

Not even pen and paper? Never fear, there is another word game which is even more accommodating of more players. In fact is better with many. Excellent for car journeys, since the driver can also participate. Some overlaps with the dynamics of Skull, if you squint a bit. Will write up the details soon.

# Design Inspirations

<table class="games-inspirations">
  <tr>
    <td class="games-inspirations__category">Non standard, standard-cards-only games</td>
    <td class="games-inspirations__items"><a href="http://cheapass.com/free-games/poker-suite/">Lamarckian Poker</a> by CheapAss Games, which comes as part of a set of standard-cards-only games. <sub>(<a href="https://boardgamegeek.com/boardgame/3270/lamarckian-poker">boardgamegeek</a>)</sub></td>
  </tr>
  <tr>
    <td class="games-inspirations__category">Multi-layered use of cards</td>
    <td class="games-inspirations__items"><a href="http://riograndegames.com/games.html?id=240">Race For The Galaxy</a> <sub>(<a href="https://boardgamegeek.com/boardgame/28143/race-galaxy">boardgamegeek</a>)</sub></td>
  </tr>
  <tr>
    <td class="games-inspirations__category">Synergies between cards</td>
    <td class="games-inspirations__items">Dominion <sub>(<a href="https://boardgamegeek.com/boardgame/36218/dominion">boardgamegeek</a>)</sub></td>
  </tr>
  <tr>
    <td class="games-inspirations__category">Interesting mechanics</td>
    <td class="games-inspirations__items">RoboRally <sub>(<a href="https://boardgamegeek.com/boardgame/18/roborally">boardgamegeek</a>)</sub><br>Carcassonne <sub>(<a href="https://boardgamegeek.com/boardgame/822/carcassonne">boardgamegeek</a>)</sub></td>
  </tr>
  <tr>
    <td class="games-inspirations__category">Multiple uses of core pieces</td>
    <td class="games-inspirations__items"><a href="https://www.looneylabs.com/games/pyramid-arcade">Pyramid Arcade</a> by Loony Labs, based on a common set of coloured plastic pyramids. In particular, the stellar variant that works for me is <a href="https://boardgamegeek.com/boardgame/14634/homeworlds">HomeWorlds</a>, a mind-blowingly intriguing, 2-player 'thinkie' game, available separately. So good.</td>
  </tr>
</table>

# Other reading
* [some US-centric words on game copyright, trademark, patents](https://boardgamegeek.com/thread/493249/mythbusting-game-design-and-copyright-trademarks-a)
   * These games are under Creative Commons (see [About](/about)), BTW. Do please use, copy, and embellish, and let me know.
* the [BoardGameGeek](https://boardgamegeek.com/) site, a comprehensive board game resource.
