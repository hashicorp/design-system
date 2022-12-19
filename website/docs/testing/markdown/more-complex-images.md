---
title: More complex images
---

A simple small image (using markdown syntax).

![](/assets/testing/small_cat.png)

A larger image (using markdown syntax).

![](/assets/testing/big_cat.png)

A larger image (using markdown syntax) scaled down to a specific size (uses a [custom syntax](https://github.com/showdownjs/showdown/wiki/Showdown-Options#parseimgdimensions)).

![](/assets/testing/big_cat.png =120x120)

An image with alt text and title (using markdown syntax).

![a nice kitten for you](/assets/testing/small_cat.png "this is a kitten")

An image with alt text and title (using markdown syntax) **and** size.

![a nice kitten for you](/assets/testing/big_cat.png =120x120 "this is a kitten")


An reference style image with alt text and title (using markdown syntax) **and** size.

![Alt text][cat]

[cat]: /assets/testing/small_cat.png =250x250  "Optional title attribute"

--------

Some images declared as inline `<img>` HTML.

<img width="400" alt="kitten" src="/assets/testing/small_cat.png">

<img width="1200" alt="kitten" src="http://placekitten.com/g/1200/800/">
