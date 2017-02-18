---
layout: collection
title: Fragments
date: 2013-06-24 21:33
author: upthebuzzard
categories: []
permalink: /:collection/index.html
---

{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'date') %}
{% for item in sorted %}
* [{{ item.title }}]({{ item.url }})
> {{ item.extract }}  
{% endfor %}

<br>

## Currently favoured hypothesis

... is that the main obstacle to my writing significantly more than I do is that my handwriting and/or QWERTY typing are

(a) not fast enough to get it all down before it clogs up in the system, and

(b) often not practical for when the words start flowing, e.g. on a train.
Hence investigating chorded keyboards.

Hence pondering a nifty combo of tablet/smartphone with chorded keys round the back, and is that possibly a new idea?

Hence searching around and finding it mentioned in a promo video. Boo.

Hence wondering if what I was doing was yak shaving or procrastination.

I was looking up the difference between 'yak shaving' and procrastination when I found that 'cat waxing' is also [a thing](https://johnpmurphy.net/2013/07/08/yak-shaving-vs-cat-waxing-a-difference-of-vital-importance/).
