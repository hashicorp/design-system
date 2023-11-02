---
title: Scraping playground
---

<!-- NOTICE: you can explore the AST three using this web page:  -->

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

----------------

This is a normal paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat elit, lacinia at magna eget, porttitor lobortis nulla.

Text can be **bold**, _italic_, or ~~strikethrough~~, and can contain emoji like 👋 🙂 🚨 🚀.

Inline [links](https://github.com) should be styled according to the design specifications.

----------------

# Problematic use cases to fix

## HTML tags inside a "paragraph"

_How do we avoid the `<(/)code>` word be indexed, but return only the "ipsum" string within it?_

Lorem <code>ipsum</code> dolor.

----------------

----------------

A simple image

![](http://placekitten.com/g/300/200/)

----------------

| What      | Follows         |
|-----------|-----------------|
| A table   | A header        |
| A table   | A header        |
| A table   | A header        |

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |
| `inline code` | can be added  |   too |
