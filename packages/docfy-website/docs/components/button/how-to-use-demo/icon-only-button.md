---
order: 4
---

# Icon position

If you would like to create an icon-only button, set `@isIconOnly` to true. Note that you still have to define the `@text` value; it will be used as the `aria-label` attribute value on the `button` element.


```hbs template
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @isIconOnly=true />
```

__✍️ If you need to add a tooltip to an icon-only button, here is an example of how to do it in an accessible way: [Accessible Button Tooltip Pattern](https://codepen.io/melsumner/pen/bGGdmMV).__
