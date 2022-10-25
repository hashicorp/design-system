<h1>Breadcrumb - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">The breadcrumb is a high-level UI element, so it's likely that it will be implemented once
    per application, and then never changed (apart from follow-up redesigns/improvements). Below we give a couple of
    examples to give a general overview and show how it works.</p>

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">A simple breadcrumb can be invoked using something like this:</p>

  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```
<!-- prettier-ignore-end -->

  
  

  <h4 class="dummy-h4">With routing parameters</h4>
  <p class="dummy-paragraph">In the example above, we have omitted a few parameters for clarity. In reality, each
    breadcrumb item is expected to be a link, so in order to work the correct
    <code>@route/@models/@model/@query</code>
    parameter needs to be passed too (they will depend on the context, of course):</p>

  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="My org" @icon="org" @route="index" />
  <Hds::Breadcrumb::Item @text="Consul" @icon="consul" @route="list" />
  <Hds::Breadcrumb::Item @text="my-consul-cluster" @route="detail.index" @model={{@cluster.id}} />
  <Hds::Breadcrumb::Item @text="Overview" @current={{true}} />
</Hds::Breadcrumb>
```
<!-- prettier-ignore-end -->

  
  

  <h4 class="dummy-h4">No wrapping</h4>
  <p class="dummy-paragraph">By default, the breadcrumb allows the item to wrap on multiple lines, if the container
    width is too small. If you don't want this to happen you have to pass the
    <code class="dummy-code">itemsCanWrap</code>
    parameter as
    <code class="dummy-code">false</code>, but keep in mind that the text will be automatically elliptized in this case,
    to fit the container:</p>

  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Breadcrumb itemsCanWrap={{false}}>
  [items here]
</Hds::Breadcrumb>
```
<!-- prettier-ignore-end -->

  
  

  <h4 class="dummy-h4">With truncation</h4>
  <p class="dummy-paragraph">It is also possible to collect and hide part of the breadcrumb tree under a "truncated"
    item, that will show the elements via "toggle":</p>

  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Breadcrumb>
  <Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="My org" @icon="org" @route="..." />
    <Hds::Breadcrumb::Item @text="Consul" @icon="consul" @route="..." />
    <Hds::Breadcrumb::Item @text="my-consul-cluster" @route="..." />
  </Hds::Breadcrumb::Truncation>
  <Hds::Breadcrumb::Item @text="Cluster details" @route="..." />
  <Hds::Breadcrumb::Item @text="Cluster sub-details" @current={{true}} />
</Hds::Breadcrumb>
```
<!-- prettier-ignore-end -->

  
  
</section>
