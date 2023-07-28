## How to use this component

The basic invocation requires `text` and `targetToCopy` to be passed:

```handlebars
<p id="clipboardTarget">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @targetToCopy="#clipboardTarget" />
```

### Icon-only

```handlebars
<p id="clipboardTarget2">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @isIconOnly={{true}} @targetToCopy="#clipboardTarget2" />
```

### Sizes

The component supports `small` and `medium` sizes (`medium` is the default):

```handlebars
<p id="clipboardTarget3">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @size="small" @targetToCopy="#clipboardTarget3" />
```

### Full-width

This indicates that the component should take up the full-width of the parent container. It’s set to `false` by default.

```handlebars
<p id="clipboardTarget4">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @targetToCopy="#clipboardTarget4" @isFullWidth={{true}} />
```

### Text to Copy

The consumer can also indicate a string to be copied instead of indicating a target element:

```handlebars
<Hds::Copy::Button @text="Copy your secret key" @textToCopy="someSecretThingGoesHere" />
```
