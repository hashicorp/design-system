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
