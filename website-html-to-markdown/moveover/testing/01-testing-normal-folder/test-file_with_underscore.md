---
title: Testing file a filename that contains an underscore character
---

## 🚨🚨 THIS DOES NOT WORK 😢 🚨🚨

- markdown file: `test-file_with_underscore.md`
- javascript file: `test-file_with_underscore.js`

🕵️ If the files (in particular the JS file) contain underscores, the backing class is not picked up by the compiler 😢

```html
Count: {{this.count}}

<button type="button" name="button" {{action "clickButton"}}>Click Me</button>
```
