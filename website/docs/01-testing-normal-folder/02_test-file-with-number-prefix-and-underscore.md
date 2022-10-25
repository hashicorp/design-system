# Testing file number prefix and an underscore in both the markdown and the javascript file

## 🚨🚨 THIS DOES NOT WORK 😢 🚨🚨

- markdown file: `02_test-file-with-number-prefix-and-underscore.md`
- javascript file: `02_test-file-with-number-prefix-and-underscore.js`

🕵️ If the files (in particular the JS file) contain underscores, the backing class is not picked up by the compiler 😢

```html
Count: {{this.count}}

<button type="button" name="button" {{action "clickButton"}}>Click Me</button>
```
