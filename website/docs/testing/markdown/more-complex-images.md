---
title: More complex images
---

A simple small image (using markdown syntax).

![Captions improve user experience by adding context to images. They should be clear, concise, and visually distinct with proper styling like background colors, padding, and rounded corners. Effective captions enhance readability and engagement.](/assets/testing/small_cat.png)
<Doc::ImageCaption @text="Captions improve user experience by adding context to images. They should be clear, concise, and visually distinct with proper styling like background colors, padding, and rounded corners. Effective captions enhance readability and engagement."/>

A larger image (using markdown syntax).

![](/assets/testing/big_cat.png)

A larger image (using markdown syntax) scaled down to a specific size (uses a [custom syntax](https://github.com/showdownjs/showdown/wiki/Showdown-Options#parseimgdimensions)).

![a scaled down kitten image](/assets/testing/big_cat.png =120x120)

An image with alt text and title (using markdown syntax).

![each alt text should be unique](/assets/testing/small_cat.png "this is a kitten")

An image with alt text and title (using markdown syntax) **and** size.

![a nice kitten for you](/assets/testing/big_cat.png =120x120 "this is a kitten")


An reference style image with alt text and title (using markdown syntax) **and** size.

![Example of kitten image with a alt and a title][cat]

[cat]: /assets/testing/small_cat.png =250x250  "Optional title attribute"

--------

Some images declared as inline `<img>` HTML.

<img width="400" alt="kitten here in this image" src="/assets/testing/small_cat.png">
