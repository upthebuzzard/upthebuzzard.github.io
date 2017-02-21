---
layout: post
title: Handling multiple authors in Jekyll
date: 2017-02-21 22:00
categories: []
excerpt: >
  is quite simple, but requires a few handlebars
---
There are numerous post out there about how to handle multiple authors in a basic Jekyll blog, e.g. this one [which expresses it quite well](https://blog.sorryapp.com/blogging-with-jekyll/2014/02/06/adding-authors-to-your-jekyll-site.html).

The basic gist is:

* create a data file of authors and their bios, \_data/authors.yml,
   * which you can access via `site.data.authors`
* or add that data to \_config.yml (which will be getting kinda crowded),
   * and access it via `site.authors`
* specify `author: author_id_xyz` in the front matter of a post
* in the post layout, given the author id, look up the author details and add them to the post

So far, so good.

But what if you want to have a page per author, listing their posts?

This too is quite straightforward:

* create a new \_layout/author.html,
   * which reads the author id from the page object and writes out the details
   * loops over all site posts,
      * filtering down to just those which specify this author id,
      * and writes out the list.
* create a stub page for each author which specifies the author id in the front matter
   * in the \_posts folder, or an author-specific folder, or even a [collection](https://jekyllrb.com/docs/collections/) of authors

Ideally, you'd want to auto-generate the stubs of the author pages directly from the list of authors in the data list above. For an author, e.g. `i_am_legume`, you'd just need a stub page called, say, \_/authors/i_am_legume.md, containing

{% raw %}
```jekyll
---
layout: author
author: i_am_legume
---
```
{% endraw %}

and the author layout would do the rest.

If you were feeling brave, in the author layout you could probably read the author id from the file name and not even need to specify it in the front matter.

Generating these stub files automatically is in fact possible using a plugin called a  [generator](https://jekyllrb.com/docs/plugins/#generators), some roll-yer-own ruby code you can include and run with the jekyll build step. This is doable, but not trivial. The main gotcha, however, is that Github _disable custom plugins for security reasons_ so that's a no-no for me.

Instead, it seems the only practical option is to manually create a stub page for each new author by hand, whenever you add a new author to the data list.

Which is gently icky, but not too much of a burden, all things considered.

## Multiple authors per post

With only a minor tweak, you could enable multiple authors per post. Replace the `author` attribute of each post with `authors` and make it a list, as with `categories`. Adjust the logic in the \_layout/author.html and \_layout/post.html files accordingly.

{% raw %}
```jekyll
---
layout: author
authors: [i_am_legume, i_am_ikea, i_am_will_i_am]
---
```
{% endraw %}

You could embellish the \_layout/author.html page to have an extra section for any co-authors.
