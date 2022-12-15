---
title: With Ember components
---

# Test with inline Ember component

Ember component directly declared in the markdown "root"

<Doc::NpmVersion class="doc-test-markdown-basic-styling" />

------

Ember component inside a `<div>`

<div>
    <Doc::NpmVersion class="doc-test-markdown-basic-styling" />
</div>

------

Ember component inside a markdown blockquote

> <Doc::NpmVersion class="doc-test-markdown-basic-styling" />

------

Ember component inside a markdown list

- <Doc::NpmVersion class="doc-test-markdown-basic-styling" />

------

Ember component inside a markdown table

| Lorem ipsum                                               |
|-----------------------------------------------------------|
| <Doc::NpmVersion class="doc-test-markdown-basic-styling" /> |

Ember component inside an HTML table

<table>
    <tr>
        <td>
            <Doc::NpmVersion class="doc-test-markdown-basic-styling" />
        </td>
    </tr>
</table>
