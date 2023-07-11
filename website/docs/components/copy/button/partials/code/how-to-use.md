## How to use this component

The basic invocation requires text and clipboardTarget to be passed:

```handlebars
<p id="clipboardTarget">
  This is the text that the button will copy.
</p>
<Hds::Copy::Button @text="Copy" @clipboardTarget="#clipboardTarget" />
```

### Icon-only

```handlebars
<p id="clipboardTarget2">
  This is the text that the button will copy.
</p>
<Hds::Copy::Button @text="Copy" @isIconOnly={{true}}
@clipboardTarget="#clipboardTarget2" />
```

### Sizes

The component supports small and medium sizes (medium is the default):

```handlebars
<p id="clipboardTarget">
  This is the text that the button will copy.
</p>
<Hds::Copy::Button @text="Copy" @size="small" 
@clipboardTarget="#clipboardTarget" />
```

