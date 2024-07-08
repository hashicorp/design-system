---
title: Doc::Badge
layout:
  sidecar: false
---

**Basic badge**

<Doc::Badge @type="information">Hello!</Doc::Badge>

-----

**Badge "types"**

<Doc::Badge @type="neutral">neutral</Doc::Badge>
<Doc::Badge @type="information">information</Doc::Badge>
<Doc::Badge @type="success">success</Doc::Badge>
<Doc::Badge @type="warning">warning</Doc::Badge>
<Doc::Badge @type="critical">critical</Doc::Badge>

Inverted versions:

<Doc::Badge @type="neutral-inverted">neutral-inverted</Doc::Badge>
<Doc::Badge @type="information-inverted">information-inverted</Doc::Badge>
<Doc::Badge @type="success-inverted">success-inverted</Doc::Badge>
<Doc::Badge @type="warning-inverted">warning-inverted</Doc::Badge>
<Doc::Badge @type="critical-inverted">critical-inverted</Doc::Badge>

-----

**Badge "sizes"**

Large (default):

<Doc::Badge @type="neutral">neutral</Doc::Badge>
<Doc::Badge @type="information">information</Doc::Badge>
<Doc::Badge @type="success">success</Doc::Badge>
<Doc::Badge @type="warning">warning</Doc::Badge>
<Doc::Badge @type="critical">critical</Doc::Badge>
<br />
<Doc::Badge @type="neutral-inverted">neutral-inverted</Doc::Badge>
<Doc::Badge @type="information-inverted">information-inverted</Doc::Badge>
<Doc::Badge @type="success-inverted">success-inverted</Doc::Badge>
<Doc::Badge @type="warning-inverted">warning-inverted</Doc::Badge>
<Doc::Badge @type="critical-inverted">critical-inverted</Doc::Badge>

Medium:

<Doc::Badge @type="neutral" @size="medium">neutral</Doc::Badge>
<Doc::Badge @type="information" @size="medium">information</Doc::Badge>
<Doc::Badge @type="success" @size="medium">success</Doc::Badge>
<Doc::Badge @type="warning" @size="medium">warning</Doc::Badge>
<Doc::Badge @type="critical" @size="medium">critical</Doc::Badge>
<br />
<Doc::Badge @type="neutral-inverted" @size="medium">neutral-inverted</Doc::Badge>
<Doc::Badge @type="information-inverted" @size="medium">information-inverted</Doc::Badge>
<Doc::Badge @type="success-inverted" @size="medium">success-inverted</Doc::Badge>
<Doc::Badge @type="warning-inverted" @size="medium">warning-inverted</Doc::Badge>
<Doc::Badge @type="critical-inverted" @size="medium">critical-inverted</Doc::Badge>

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
