---
order: 3
---

# Icon position

By default, if you define an icon, it is placed before the text. If you would like to position the icon after the text, define `@iconPosition`:


```hbs template
<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" />
```
