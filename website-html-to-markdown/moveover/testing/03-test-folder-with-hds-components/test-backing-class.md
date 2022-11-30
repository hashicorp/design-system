---
title: Test of different ways to use the JS backing class
---


```handlebars
<pre>this.test = {{this.test}}</pre>
```

```handlebars
<pre>this.myColors = {{this.myColors}}</pre>
```

```handlebars
<pre>this.COLORS = {{this.COLORS}}</pre>
```

```handlebars
<pre>this.STATES = {{this.STATES}}</pre>
```

```html
Count: {{this.count}}

<button type="button" name="button" {{action "clickButton"}}>Click Me</button>
```

```handlebars
<button type="button" name="button" {{on "click" this.altClickButton1 }}>altClickButton1</button>
```

```handlebars
<Hds::Button @text="altClickButton1" {{on "click" this.altClickButton1 }} />
```

```handlebars
<Hds::Button @text="noop" {{on "click" this.noop }} />
```
