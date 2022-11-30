---
title: Test with inline Ember component
---

<DocNpmVersion class="doc-test-markdown-basic-styling" />

Ember component directly declared in the markdown "root"

<Doc::Badge>Hello!</Doc::Badge>

Different colors:

<Doc::Badge @color="neutral-light">neutral-light</Doc::Badge>
<Doc::Badge @color="neutral-dark">neutral-dark</Doc::Badge>
<Doc::Badge @color="highlight">highlight</Doc::Badge>
<Doc::Badge @color="success">success</Doc::Badge>
<Doc::Badge @color="warning">warning</Doc::Badge>
<Doc::Badge @color="critical">critical</Doc::Badge>


------

Ember component inside a `<div>`

<div>
    <Doc::Badge @color="neutral-dark">Hello!</Doc::Badge>
</div>

------

Ember component inside a markdown blockquote

> <Doc::Badge @color="neutral-dark">Hello!</Doc::Badge>

------

Ember component inside a markdown list

- <Doc::Badge @color="neutral-dark">Hello!</Doc::Badge>

------

Ember component inside a markdown table

| Lorem ipsum                                               |
|-----------------------------------------------------------|
| <Doc::Badge @color="neutral-dark">Hello!</Doc::Badge>                               |

Ember component inside an HTML table

<table>
    <tr>
        <td>
            <Doc::Badge @color="neutral-dark">Hello!</Doc::Badge>
        </td>
    </tr>
</table>
