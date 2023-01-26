## How to use this component

The Breadcrumb is an application-level UI element, so it’s likely to be implemented once per application.

### Basic use

!!! Info

A few parameters were omitted for clarity.
!!!

```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```

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

!!! Warning

The text will automatically truncate and be replaced with an ellipsis to fit within the container. However, this may result in the text being unavailable to keyboard-only users and, thus, is not WCAG-conformant.
!!!

```handlebars
<Hds::Breadcrumb @itemsCanWrap={{false}}>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```

### With truncation

It’s possible to hide part of the Breadcrumb tree under a "truncated" item that shows the elements on "toggle".

!!! Warning

The text will automatically truncate and be replaced with an ellipsis to fit within the container. However, this may result in the text being unavailable to keyboard-only users and, thus, is not WCAG conformant.
!!!

```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" @route="components" />
  <Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Consul" @icon="consul" @route="components" />
    <Hds::Breadcrumb::Item @text="my-consul-cluster" @route="components" />
    <Hds::Breadcrumb::Item @text="Cluster details" @route="components" />
  </Hds::Breadcrumb::Truncation>
  <Hds::Breadcrumb::Item @text="Cluster sub-details" @current={{true}} />
</Hds::Breadcrumb>
```
