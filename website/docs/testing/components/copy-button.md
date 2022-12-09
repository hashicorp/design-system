---
title: Doc::CopyButton
---

**"Solid" variant**

<Doc::CopyButton @textToCopy="Yay!" @type="solid" />

**"Ghost" variant**

<Doc::CopyButton @textToCopy="With this we can show different text from what is actually copied ;)" @textToShow="--token-color-blue-palette-200" @type="ghost" />

<Doc::CopyButton @textToCopy="With this we can show different text from what is actually copied ;)" @textToShow={{false}} @type="ghost" />
