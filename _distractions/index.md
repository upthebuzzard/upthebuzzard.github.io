---
layout: collection
title: Distractions
date: 2011-09-30 21:33
categories: []
permalink: /:collection/index.html
excerpt: >
  An assortment of links that were to be used as [ distraction \| bribery \| rewards ]\(_delete as appropriate_) for good bedtime behaviour.
---
An assortment of links that were to be used as [ distraction \| bribery \| rewards ]\(_delete as appropriate_) for good bedtime behaviour.

* [A Homemade Rocket Soars 37 km in 92 Seconds](http://www.popsci.com.au/technology/space/video-a-homemade-rocket-soars-37-km-in-92-seconds)
* [Angry Birds and football](http://www.youtube.com/watch?noredirect=1&amp;hl=en&amp;v=cVzW3OGq7kM&amp;gl=US)
* [A video camera attached to the end of a broadsword](http://www.youtube.com/watch?v=FaEZZ43WrTQ)
* [Jetlev FAIL and glorious recovery](http://www.youtube.com/watch?v=qRVspuAJyAY)
* [detailed scale drawings of lots of space craft from lots of different fictional universes](http://www.merzo.net/10mpp.htm)
* [penguins take to the air with a coat of bubbles](http://www.bbc.co.uk/blogs/wondermonkey/2011/07/penguins-take-to-the-air.shtml)
* [skydiving like you've never seen it before](http://www.youtube.com/watch?v=iVvRWVoHDb8)
* [an interesting puzzle game, refraction](http://games.cs.washington.edu/refraction/)
* [Star Wars](http://www.youtube.com/watch?v=IwgCu5CI0Ss) and [Toccata and fugue](http://www.youtube.com/watch?v=XKRj-T4l-e8), played on a Glass Harp (yep, just glasses partially filled with water)
* Toccata and fugue, played on an organ, [with the notes visualised](http://www.youtube.com/watch?v=ATbMw6X3T40)
* Tom Lehrer's [Elements](http://www.youtube.com/watch?v=SmwlzwGMMwc) song, [New Math](http://www.youtube.com/watch?v=Vetg7vWitTU) (there will be a test afterwards), and [Poisoning Pigeons in the Park](http://www.youtube.com/watch?v=yhuMLpdnOjY)
* The Sand Flea Jumping Robot really does [leap tall buildings with a single bound](http://www.youtube.com/watch?&amp;v=6b4ZZQkcNEo)
* [A DIY Portal gun pops wormholes all over the house](http://vimeo.com/43800150): Prepare to pick their chins up off the floor.
* [Fancy domino work](http://www.youtube.com/watch?v=8GWI0A9o_5E). Should be obvious after 10secs or so as to basically what is going on. Fancy domino work. But what is being built?
* [creative barcodes](http://www.darkroastedblend.com/2008/04/japanese-creative-barcodes.html). Very nice example of an opportunity for some creative art.

{% assign sorted = site[page.collection] | where:"layout", "post" | sort: 'date' | reverse %}
{% if sorted.size > 0 %}
  {% for item in sorted %}
* [{{ item.title }}]({{ item.url }})
> {{ item.excerpt }}
  {% endfor %}
{% endif %}
