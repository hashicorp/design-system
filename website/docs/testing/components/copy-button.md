---
title: Doc::CopyButton
---

**"Solid" variant**

<Doc::CopyButton @textToCopy="Yay!" @type="solid" />

**"Ghost" variant**

<Doc::CopyButton @textToCopy="With this we can show different text from what is actually copied ;)" @textToShow="--token-color-blue-palette-200" @type="ghost" />

<Doc::CopyButton @textToCopy="With this we can show different text from what is actually copied ;)" @textToShow={{false}} @type="ghost" />

**"Encoded" variant**

<Doc::CopyButton @textToCopy="%3CHds%3A%3AButton%20%40text%3D%22Button%22%20%7B%7Bon%20%22click%22%20this.action%7D%7D%20%2F%3E" @type="solid" @encoded={{true}} />
