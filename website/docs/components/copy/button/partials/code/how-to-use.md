## How to use this component

This component uses ember-cli-clipboard under the hood.

The basic invocation requires text and clipboardTarget to be passed:

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
<Hds::Copy::Button @text="Copy" @isIconOnly={{true}}
@targetToCopy="#clipboardTarget2" />
```

### Sizes

The component supports small and medium sizes (medium is the default):

```handlebars
<p id="clipboardTarget">
  The button will copy the text in this paragraph element.
</p>
<Hds::Copy::Button @text="Copy" @size="small" 
@targetToCopy="#clipboardTarget" />
```

### Text to Copy

The consumer can also indicate a text of string to be copied instead of indicating a target element:

```handlebars
<Hds::Copy::Button @text="Copy your secret key"
@textToCopy="someSecretThingGoesHere" />
```
