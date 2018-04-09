---
layout: post
title: "Generating 'in the style of' texts"
date: 2017-04-14 22:04
categories: []
excerpt: >
  riffing on the simple site search, re-using the data for auto-generate of pseudo-stories.
---
The previous [Simple Site Search post](/jekyll_notes/2017-04-02-simple-site-search-in-jekyll.html) resulted in a large JSON file containing all the texts of the posts from across the site. This is good raw material for ... something.

> The tyres a big flapping of wings and the heat from inside its tummy.

Cue n-grams and Markov Chains. A fairly common toy challenge with collections of texts is to ingest all the texts and auto-generate text 'in the style of' them, using words and phrases from the texts, re-arranged randomly, but still retaining something of the essence of the original texts. Among many posts returned by Google, [this one](http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains) did an ok job of explaining the main steps.

> Ah yes she said in surprise before dressing the bed with sheets of red card and lay them.

## Examples

{% assign collections = site.collections | sort: 'sequence' %}
{% for collection in collections %}
  {% assign collection_pages = site[collection.label] | where:"layout", 'auto-generated' %}
  {% if collection_pages.size > 0 %}
    {% assign relurl = collection.label | relative_url | append: '/generated.html' %}
* _in the style of_ &nbsp; [{{ collection.title | escape }}]({{ relurl }})
  {% endif %}
{% endfor%}

## How it works

* the site-wide JSON file is too broad, so set up a collection-specific one, e.g. [/_emus_all_the_way_down/search.json](https://github.com/upthebuzzard/upthebuzzard.github.io/blob/master/_emus_all_the_way_down/search.json)
* and a collection-specific page to display the auto-generated text, e.g.  [/_emus_all_the_way_down/generated.html](https://github.com/upthebuzzard/upthebuzzard.github.io/blob/master/_emus_all_the_way_down/generated.html)
* which in turn uses a new layout [/_layouts/auto-generated.html](https://github.com/upthebuzzard/upthebuzzard.github.io/blob/master/_layouts/auto-generated.html), which
   * sets up a couple of placeholder HTML elements (for the title and body of the auto-generated text)
   * pulls in the javascript, [/assets/js/ngramMarkov.js](https://github.com/upthebuzzard/upthebuzzard.github.io/blob/master/assets/js/ngramMarkov.js), which processes the texts and generates the 'in the style of' text from them
   * and includes the javascript, [/_includes/auto-generated.js](https://github.com/upthebuzzard/upthebuzzard.github.io/blob/master/_includes/auto-generated.js), which downloads the collection's texts, invokes the ngramMarkov code, and injects the results into the page's placeholder elements.

> Too long to make someone there a very strong french accent is that moose.

The code [/assets/js/ngramMarkov.js](https://github.com/upthebuzzard/upthebuzzard.github.io/blob/master/assets/js/ngramMarkov.js) was written to explore/play with the idea rather than be particularly efficient.

* for each text
   * do a bit of pre-processing to 'rescue' common phrases such as 'i.e.'
   * split it into sentences on '.'
   * for each sentence
      * split it into words (allowing them to contain apostrophes)
      * record (and count)
         * the start and end words explicitly
         * all the individual words,
         * the pairs of words,
         * the triples of words
         * (you could just keep going for the larger tuples, but they result in 'locking' the generated texts into almost exact replicas of the originals)

This data structure is then used to construct random sentences.

> Then cut open the still warm chips to insert some of the tower very clearly but the children loved it.

* starting with a word from the list of words known to have started sentences in the original texts
* look for the known pairs of words which have that word as the first of the pair, choosing randomly if there is a choice, biased towards the more common choices. This gives us our second word.
* choose one of the known triples of words which have those first two words. This gives us our third word.
* for subsequent generated words, choose one of the known triples of words which have the last two generated words, and so on.
* every so often, look in the pairs of words rather than the triples, even if there is a triple which matches
* grab one of the individual words if no pair or triple fits
* when nearing the target length of the sentence, keep an eye out for a word known to have ended a sentence in the original texts. If you happen to generate one, end the generated sentence with it. If you reach the maximum sentence length without finding a known ending word, start the sentence again from scratch a few times.
   * (this particular heuristic has resulted in a significant increase in the 'rightness' of the generated sentences)

> They crush grapes with their lack of work on this particular monday morning moose.
