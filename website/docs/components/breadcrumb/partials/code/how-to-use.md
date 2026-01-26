## How to use this component

The Breadcrumb is an application-level UI element, so it’s likely to be implemented once per application.

### Basic use

A few parameters were omitted for clarity.

[[code-snippets/breadcrumb-basic]]

### With routing parameters

Add the correct `@route/@models/@model/@query` parameter to each Breadcrumb Item.

```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" @route="components" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" @route="components" />
  <Hds::Breadcrumb::Item
    @text="my-consul-cluster"
    @route="components"
    @model={{@cluster.id}}
  />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```

### No wrapping

By default, the Breadcrumb allows items to wrap on multiple lines if the container is too small. Pass `false` to the `@itemsCanWrap` parameter to avoid wrapping.

[[code-snippets/breadcrumb-no-wrap]]

### Truncation

#### With dropdown 

It’s possible to hide part of the Breadcrumb tree under a "truncated" item that shows the elements on "toggle".

[[code-snippets/breadcrumb-dropdown]]

#### Width-based truncation

By setting `@itemsCanWrap` to `false`, it is possible to constrain the text to one-line and truncate it if it does not fit the available space. 

!!! Warning

**Accessibility alert**

The text will automatically truncate and be replaced with an ellipsis to fit within the container. Please be aware there are [serious accessibility concerns](/components/breadcrumb?tab=accessibility) with using this feature.
!!!

[[code-snippets/breadcrumb-truncation]]
