## How to use this component

The breadcrumb is an application-level UI element, so it's likely that it will be implemented once per application.

### Basic use

```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```

### With routing parameters

In the basic example a few parameters are omitted for clarity. In reality, each breadcrumb item is expected to be a link, in order to work, the correct `@route/@models/@model/@query` parameter needs to be passed to the breadcrumb container:

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

By default, the breadcrumb allows items to wrap on multiple lines if the container width is too small. If you don’t want this to happen, pass `false` to the `itemsCanWrap` parameter, but keep in mind that the text will be automatically replaced with an ellipsis to fit the container:

```handlebars
<Hds::Breadcrumb @itemsCanWrap={{false}}>
  [items here]
</Hds::Breadcrumb>
```

### With truncation

It is also possible to collect and hide part of the breadcrumb tree under a "truncated" item that will show the elements via "toggle":

```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="My org" @icon="org" @route="components" />
    <Hds::Breadcrumb::Item @text="Consul" @icon="consul" @route="components" />
    <Hds::Breadcrumb::Item @text="my-consul-cluster" @route="components" />
  </Hds::Breadcrumb::Truncation>
  <Hds::Breadcrumb::Item @text="Cluster details" @route="components" />
  <Hds::Breadcrumb::Item @text="Cluster sub-details" @current={{true}} />
</Hds::Breadcrumb>
```

!!! Info

It is not currently possible for a keyboard-only user to access truncated data. Keep this in mind when considering the truncation option in the breadcrumb.

!!!
