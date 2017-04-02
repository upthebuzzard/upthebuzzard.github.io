---
layout: post
title: Simple Site Search in Jekyll
date: 2017-04-02 13:00
categories: []
excerpt: >
  a hack which is not terribly efficient, and would not scale to large posts or to a large collection of posts, but is pleasingly Jekyll-y, albeit needing a smidge of javascript.
---
With the intent of adding keyword search across all the site content, whilst at the same time sticking with vanilla Jekyll (no extra plugins) so that it works when hosted by GitHub Pages, the first obvious step was to embed Google Search.

This was [straightforward](https://support.google.com/customsearch/answer/2630969?hl=en) and, a few minutes later, working. A search for "potato" found the correct results with no trouble. However, it also found an un-asked-for ad for potatoes courtesy of Google's main mission in life. Yuck. Failed at the very first use. Had enough of un-asked-for and/or inappropriate ads and/or pay-us-in-order-not-to-get-ads when using wordspress.com, so was not going to accept that when using Jekyll.

But Jekyll is a static site generator, so was there any alternative to embedding an external search engine?

Turns out, there was: [alexpearce.me/2012/04/simple-jekyll-searching](https://alexpearce.me/2012/04/simple-jekyll-searching/)

Alex Pearce's post describes a hack which is not terribly efficient, and would not scale to large posts or to a large collection of posts, but is pleasingly Jekyll-y, albeit needing a smidge of javascript. A working implementation of Alex P's idea can be seen [in this site](/search.html?q=alex+pearce), and the code for it is in this [pull request](https://github.com/upthebuzzard/upthebuzzard.github.io/commit/032cb89561d52826a32fb3fea0fe2074a4e991d7).

## How it works

The search mechanism involves three main steps:
1. create a json doc at build time containing all the searchable content and post details
2. a search form included (in the header) on every page that submits a GET request to the search result page, passing the search term(s) as query params
3. the search result page has some extra javascript, which fires up to
   * pull in the (possibly large) json doc _(this is the main inefficiency)_
   * extract the search params from the request url
   * scan the json and inject any matches into the display page

new files
 * \_includes/search.html
    * _(to be included in the header, and so be available on most pages)_
 * \_includes/search_results.html
    * _(to be included in the default layout only for the /search.html page)_
 * /search.html
    * _(the search result page which starts empty apart from some elements as placeholders)_
 * /search.json
    * _(fleshed out at build time with all the content)_

modified files
* \_sass/minima/\_layout.scss
   * _(a bit of styling for the search box)_
* \_layouts/default.html
   * _(include the search_results.html only for the /search.html page)_
* \_includes/header.html
   * _(include the search box for all pages)_

For details of the code, see the [pull request](https://github.com/upthebuzzard/upthebuzzard.github.io/commit/032cb89561d52826a32fb3fea0fe2074a4e991d7).

Regarding the /search.json file. It does get large, especially if you include all the posts' content, so this would obviously become untenable for large sites. However, GitHub Pages does seems to support "Accept-Encoding: gzip" so that helps stave off the inevitable reckoning for a bit longer.

You can check the response headers via [an online HTTP viewer](http://www.rexswain.com/httpview.html)
* set URL to http://stories.upthebuzzard.com/search.json, or your own such file
* set Accept-Encoding to gzip
