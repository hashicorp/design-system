# Auto Execution of Code Blocks

Field Guide is designed so that you can quickly write some Markdown to document
your addon. This means that it supports the normal Markdown way of documenting
code blocks:

```
This is a code block
```

but as it is designed to easily demonstrate your html or your Ember Templates
that you are providing with this addon, so if you use `html` or `handlebars`
languages for your code blocks they will become "self-executing"

```html
<h2>The demo</h2>
<p>you will see what this looks like and then the code that created it underneath</p>
```

If you look at the source for this file you will see that you didn't need to
duplicate the code for the demo and the code-block, which means that it is
impossible to get out of sync and much easier for you to write your
documentation.

```handlebars
<h2>The Ember Demo</h2>

<p>you can use HTML here too because it is valid Ember! but you can also use components: </p>

<ColorPallet
  @color="#E04E39"
  @name="Brand"
  @variable="--color-brand"
  @class-name="bg-brand"
  @textClasses={{array 'field-guide-small' 'field-guide-medium' 'field-guide-large'}}
  @textColorClasses={{array 'field-guide-default' 'field-guide-white'}}
/>
```

If you wanted to still make use of HTML syntax highlighting but you didn't want
it to auto-execute you can force it to suppress the demo with the `data-execute`
attribute:

```html{data-execute=false}
<h2>The non-demo</h2>
<p>this one will only show you the code</p>
```
