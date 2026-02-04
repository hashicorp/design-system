---
title: Doc::CopyButton
---

**"Solid" variant**

| Variant      | Primary                                                                                                                                                                    | Secondary                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic        | <Doc::CopyButton @type="solid" @color="primary" @textToCopy="Yay!" />                                                                                                      | <Doc::CopyButton @type="solid" @color="secondary" @textToCopy="Yay!" />                                                                                                      |
| Icon only    | <Doc::CopyButton @type="solid" @color="primary" @textToCopy="Yay!" @isIconOnly={{true}} />                                                                                 | <Doc::CopyButton @type="solid" @color="secondary" @textToCopy="Yay!" @isIconOnly={{true}} />                                                                                 |
| Custom text  | <Doc::CopyButton @type="solid" @color="primary" @textToCopy="Yay!" @textToShow="Primary" />                                                                                | <Doc::CopyButton @type="solid" @color="secondary" @textToCopy="Yay!" @textToShow="Secondary" />                                                                              |
| Encoded text | <Doc::CopyButton @textToCopy="%3CHds::Button%20@text=%22Button%22%20%7B%7Bon%20%22click%22%20this.action%7D%7D%20/%3E" @type="solid" @color="primary" @encoded={{true}} /> | <Doc::CopyButton @textToCopy="%3CHds::Button%20@text=%22Button%22%20%7B%7Bon%20%22click%22%20this.action%7D%7D%20/%3E" @type="solid" @color="secondary" @encoded={{true}} /> |

---

**"Code" variant**

| Variant      | Code                                                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic        | <Doc::CopyButton @textToCopy="--token-color-blue-palette-200" @type="code" />                                                                                    |
| Custom text  | <Doc::CopyButton @textToCopy="With this we can show different text from what is actually copied ;)" @textToShow="--token-color-blue-palette-200" @type="code" /> |
| Encoded text | <Doc::CopyButton @textToCopy="%3CHds::Button%20@text=%22Button%22%20%7B%7Bon%20%22click%22%20this.action%7D%7D%20/%3E" @type="code" @encoded={{true}} />         |
