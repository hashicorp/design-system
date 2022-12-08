---
title: Test with "Do/Dont" content blocks
---

## Do/Dont blocks

Lorem ipsum dolor

!!! Do
This is a paragraph
- This is
- A list
!!!

Lorem ipsum dolor

!!! Dont
This is a paragraph
- This is
- A list
!!!

With a normal code "snippet" inside

!!! Do
```
var foo = "bar";
```
!!!

With a normal code "block" inside

!!! Dont
```handlebars
<Hds::Button @text="Hello world!" />
```
!!!
