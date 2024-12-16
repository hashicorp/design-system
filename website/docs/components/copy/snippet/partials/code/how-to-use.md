## How to use this component

The basic invocation requires `textToCopy` to be passed:

```handlebars
<Hds::Copy::Snippet @textToCopy="e4rt-yg80-39kt" />
```

### Color

There are two available colors for the component: `primary` and `secondary`. The default is `primary`.

```handlebars
<Hds::Copy::Snippet @textToCopy="e4rt-yg80-39kt"
@color="secondary" />
```

### Full-width

This indicates that the component should take up the full-width of the parent container. It’s set to `false` by default.

```handlebars
<Hds::Copy::Snippet @textToCopy="e4rt-yg80-39kt" @isFullWidth={{true}} />
```

### Truncation

When set to `true`, this constrains text to one-line and truncates it if it does not fit the available space.

Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.

```handlebars
<div class="doc-copy-snippet-demo-constrain-width">
  <Hds::Copy::Snippet
    @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r with a bunch of other long text that should force truncation if truncation is set to true"
    @isTruncated={{true}}
  />
</div>
```
