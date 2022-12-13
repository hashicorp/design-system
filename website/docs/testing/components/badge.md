---
title: Doc::Badge
layout:
  sidecar: false
---

**Basic badge**

<Doc::Badge>Hello!</Doc::Badge>

-----

**Badge "types"**

<Doc::Badge @type="neutral">neutral</Doc::Badge>
<Doc::Badge @type="information">information</Doc::Badge>
<Doc::Badge @type="success">success</Doc::Badge>
<Doc::Badge @type="warning">warning</Doc::Badge>
<Doc::Badge @type="critical">critical</Doc::Badge>
<Doc::Badge @type="outlined">outlined</Doc::Badge>

------

**Badge inside a `<div>`**

<div>
    <Doc::Badge @type="information">Hello!</Doc::Badge>
</div>

------

**Badge inside a markdown paragraph**

This is a paragraph that contains the <Doc::Badge @type="information">badge</Doc::Badge> as inline element

------

**Badge inside a markdown blockquote**

> <Doc::Badge @type="information">Hello!</Doc::Badge>

------

**Badge inside a markdown list**

- <Doc::Badge @type="information">Hello!</Doc::Badge>

------

**Badge inside a markdown table**

| Lorem ipsum                                               |
|-----------------------------------------------------------|
| <Doc::Badge @type="information">Hello!</Doc::Badge>                               |

**Badge inside an HTML table**

<table>
    <tr>
        <td>
            <Doc::Badge @type="information">Hello!</Doc::Badge>
        </td>
    </tr>
</table>
