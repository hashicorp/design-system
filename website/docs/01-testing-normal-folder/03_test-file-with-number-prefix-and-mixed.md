# Testing file number prefix and an underscore in the markdown file name and dash in the javascript file name

## 🤔🤔 THIS (STRANGELY) WORKS ❓ 🤔🤔

- markdown file: `03_test-file-with-number-prefix-and-mixed.md`  - 👉👉👉 **`03_`** - underscore
- javascript file: `03-test-file-with-number-prefix-and-mixed.js` - 👉👉👉 **`03-`** - dash

🕵️ Seems that even if the Markdown has an underscore, as much as the JS file has only dashes it works 🤷‍♂️

```html
Count: {{this.count}}

<button type="button" name="button" {{action "clickButton"}}>Click Me</button>
```
