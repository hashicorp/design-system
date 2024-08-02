---
title: Scraping playground
---

<!-- NOTICE: you can explore the AST three using this web page: https://astexplorer.net/#/gist/0a92bbf654aca4fdfb3f139254cf0bad/d17d8e55bb73f34847d7a88aadb787a0e5fbc9f6 -->

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

# Images

A simple image

![](http://placekitten.com/g/300/200/)

Image with alt text

![Hello cats!](http://placekitten.com/g/300/200/)

Image with alt text and custom size

![Hello cats!](http://placekitten.com/g/300/200/ =770x*)

----------------

# Tables

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


----------------

# Banners

!!! Info

Lorem ipsum

!!!

!!! Warning

Lorem ipsum
!!!

----------------

# HTML

<div class="div-class">
  <p><span class="span-class">Hello</span> world</p>
</div>

----------------

# DOC Components

<Doc::Content::HdsPrinciples />

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>

<Doc::WcagList @criteriaList={{array "1.1.1" "1.2.3"}} />

<Doc::A11ySupport />

<Doc::VarsList @items="AAA" />

<Doc::TokensList
  @groupedTokens="AAA"
  @searchQuery="BBB"
  @searchTokens="CCC"
/>

<Doc::ComponentApi as |C|>
  <C.Property @name="<:toggle>" @type="named block">
    A named block that works as “toggle” for the `AccordionItem`.
  </C.Property>
  <C.Property @name="type" @required="true" @type="enum" @values={{array "page" "inline" "compact"}}>
    Sets the type of alert.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "highlight" "success" "warning" "critical"}} @default="neutral">
    Sets the color scheme for `background`, `border`, `title`, and `description`, which **cannot** be overridden.<br/><br/>`color` results in a default `icon`, which **can** be overridden.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[G].Error>" @type="yielded component">
    Container that yields its content inside the “error” block at group level. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API check the [`Form::Error`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the `Error` element is automatically generated.
    <Doc::ComponentApi as |C|>
      <C.Property @name="<[E].Message>" @type="yielded component">
        If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>
