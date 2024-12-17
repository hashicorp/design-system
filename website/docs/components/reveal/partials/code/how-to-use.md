## How to use this component

The Reveal component renders a button that triggers the display of additional content. The additional content can consist of either plain text or HTML and can include interactive elements such as links.

```handlebars
<Hds::Reveal @text="Toggle me">
  Additional content
</Hds::Reveal>
```

### Text when open

You can display different text on the toggle button when the `Reveal` is open.

```handlebars
<Hds::Reveal @text="Open me" @textWhenOpen="Close me">
  Additional content
</Hds::Reveal>
```

### Open

Set `isOpen` to `true` to display the content on page load instead of initially hiding it.

```handlebars
<Hds::Reveal @text="Toggle me" @isOpen={{true}}>
  Additional content
</Hds::Reveal>
```