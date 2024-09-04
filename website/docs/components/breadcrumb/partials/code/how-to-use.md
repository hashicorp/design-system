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

```handlebars
<Hds::Breadcrumb @itemsCanWrap={{false}}>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```

### Truncation

#### With dropdown 

It’s possible to hide part of the Breadcrumb tree under a "truncated" item that shows the elements on "toggle".

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
#### Width-based truncation

By setting `@itemsCanWrap` to `false`, it is possible to constrain the text to one-line and truncate it if it does not fit the available space. 

!!! Warning

The text will automatically truncate and be replaced with an ellipsis to fit within the container. Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.

!!!

```handlebars
<Hds::Breadcrumb @itemsCanWrap={{false}}>
  <Hds::Breadcrumb::Item @text="Level one with a very long string" @icon="org" />
  <Hds::Breadcrumb::Item @text="Level two with a very long string" @icon="folder" />
  <Hds::Breadcrumb::Item @text="Level three with a very long string" />
  <Hds::Breadcrumb::Item @text="Level four with a very long string" />
  <Hds::Breadcrumb::Item @text="Level five with a very long string" />
  <Hds::Breadcrumb::Item @text="Current with a very long string" @current={{true}} />
</Hds::Breadcrumb>
```
