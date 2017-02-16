---
layout: page
title: Fragments
date: 2013-06-24 21:33
author: upthebuzzard
categories: []
permalink: /:collection/index.html
---
<p>
	{% assign sorted = (site[page.collection] | where:"layout", "post" | sort: 'date') %}
	{% for item in sorted %}
		<ul>
			<li>
				<a href="{{ item.url }}">{{ item.title }}</a>
			</li>
			<blockquote>{{ item.extract }}</blockquote>
		</ul>
	{% endfor %}
</p>

Currently favouring the hypothesis that the main obstacle to my writing significantly more than I do is that my handwriting and/or QWERTY typing are

(a) not fast enough to get it all down before it clogs up in the system, and

(b) often not practical for when the words start flowing, e.g. on a train.
Hence investigating chorded keyboards.

Hence pondering a nifty combo of tablet/smartphone with chorded keys round the back, and is that possibly a new idea?

Hence searching aroun<span class="text_exposed_show">d and finding it mentioned in a promo video. Boo.
</span>

<span class="text_exposed_show">Hence wondering if what I was doing was yak shaving or procrastination.</span>

I was looking up the difference between 'yak shaving' and procrastination when I found that 'cat waxing' is also a thing: <a href="https://johnpmurphy.net/2013/07/08/yak-shaving-vs-cat-waxing-a-difference-of-vital-importance/">https://johnpmurphy.net/2013/07/08/yak-shaving-vs-cat-waxing-a-difference-of-vital-importance/</a>


<p>
	Or <span class="rss-subscribe">subscribe <a href="feed.xml">via RSS</a></span>
</p>
