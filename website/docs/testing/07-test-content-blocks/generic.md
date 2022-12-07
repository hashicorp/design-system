---
title: Test with "content blocks" in markdown / HTML / Ember
---

Simple content block

!!! Alert

This is a paragraph

This is a test

> This is a blockquote

- This is
- A list

!!!

Lorem ipsum dolor

!!! Alert
This is another content block
!!!

Lorem ipsum dolor

------

This instead is the normal Ember component

<Doc::Banner>Doc banner</Doc::Banner>

Lorem ipsum test dolor

------

With mixed content

!!! Alert

This is a badge

<Doc::Badge>Hello!</Doc::Badge>

This is an inline badge <Doc::Badge>Hello!</Doc::Badge>

> This is a blockquote

- This is
- A list

!!!
