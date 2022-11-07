# Testing file under a folder with a name that contains an underline

## 🚨🚨 THIS DOES NOT WORK 😢 🚨🚨

- parent folder: `02_testing-folder_with_underscore`

🕵️ If the folder contain underscores, the backing class is not picked up by the compiler 😢

```html
Count: {{this.count}}

<button type="button" name="button" {{action "clickButton"}}>Click Me</button>
```
