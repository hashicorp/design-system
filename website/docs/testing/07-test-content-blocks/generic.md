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

With mixed content (markdown + HTML + Ember component)

!!! Alert

This is a badge

<Doc::Badge>Hello!</Doc::Badge>

This is an inline badge <Doc::Badge>Hello!</Doc::Badge>

> This is a blockquote

- This is
- A list
- With some <code>inline code</code>

!!!
