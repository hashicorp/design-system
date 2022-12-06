---
title: More complex code
---


----------------

A simple inline code snippet `var foo = "bar";` like this.

----------------

A simple code block.

```
var foo = "bar";
```

A code block with syntax declaration.

```javascript
var foo = "bar";
```

A long code block.

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```javascript
var foo = "The same thing is true for code with syntax highlighting. A single line of code should horizontally scroll if it is really long.";
```

---

GitHub code block with <code>handlebars</code> syntax attribute.

```handlebars
<Hds::Button @text="Hello world!" {{on "click" this.noop }} />
```

GitHub code block with <code>handlebars</code> + <code>data-execute=false</code> attributes.

```handlebars{data-execute=false}
<Hds::Button @text="Hello world!" {{on "click" this.noop }} />
```

