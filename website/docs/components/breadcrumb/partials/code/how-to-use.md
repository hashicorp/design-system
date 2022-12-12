The breadcrumb is a high-level UI element, so it's likely that it will be implemented once per application, and then never changed (apart from follow-up redesigns/improvements). Below we give a couple of examples to give a general overview and show how it works.

#### Basic use

A simple breadcrumb can be invoked using something like this:

```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```

#### With routing parameters

In the example above, we have omitted a few parameters for clarity. In reality, each breadcrumb item is expected to be a link, so in order to work the correct `@route/@models/@model/@query` parameter needs to be passed too (they will depend on the context, of course):

```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" @route="components" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" @route="components" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" @route="components" @model={{@cluster.id}} />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```

#### No wrapping

By default, the breadcrumb allows the item to wrap on multiple lines, if the container width is too small. If you don't want this to happen you have to pass the `itemsCanWrap` parameter as `false`, but keep in mind that the text will be automatically elliptized in this case, to fit the container:

```handlebars
<Hds::Breadcrumb itemsCanWrap={{false}}>
  [items here]
</Hds::Breadcrumb>
```

#### With truncation

It is also possible to collect and hide part of the breadcrumb tree under a "truncated" item, that will show the elements via "toggle":

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