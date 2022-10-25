<h1>Tabs Component - How to use</h1>

<section data-section="how-to-use">
  
  <h4 class="dummy-h4">Basic use</h4>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Tabs as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab>Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3</T.Panel>
</Hds::Tabs>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Tabs as |T|>
    <T.Tab>One</T.Tab>
    <T.Tab>Two</T.Tab>
    <T.Tab>Three</T.Tab>

    <T.Panel>Content 1</T.Panel>
    <T.Panel>Content 2</T.Panel>
    <T.Panel>Content 3</T.Panel>
  </Hds::Tabs>

  <h4 class="dummy-h4">With a custom starting tab</h4>
  <p class="dummy-paragraph">
    Optionally, you can set a custom starting tab to display on page load. (By default the first tab is selected.)
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Tabs as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab @isSelected={{true}}>Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3, I am displayed on page load.</T.Panel>
</Hds::Tabs>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Tabs as |T|>
    <T.Tab>One</T.Tab>
    <T.Tab>Two</T.Tab>
    <T.Tab @isSelected={{true}}>Three</T.Tab>

    <T.Panel>Content 1</T.Panel>
    <T.Panel>Content 2</T.Panel>
    <T.Panel>Content 3, I am displayed on page load.</T.Panel>
  </Hds::Tabs>

  <h4 class="dummy-h4">With optional Count and Icon</h4>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Tabs as |T|>
  <T.Tab @count="5">One</T.Tab>
  <T.Tab @icon="download">Two</T.Tab>
  <T.Tab>Three</T.Tab>

  <T.Panel>Content 1</T.Panel>
  <T.Panel>Content 2</T.Panel>
  <T.Panel>Content 3!</T.Panel>
</Hds::Tabs>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Tabs as |T|>
    <T.Tab @count="5">One</T.Tab>
    <T.Tab @icon="download">Two</T.Tab>
    <T.Tab>Three</T.Tab>

    <T.Panel>Content 1</T.Panel>
    <T.Panel>Content 2</T.Panel>
    <T.Panel>Content 3!</T.Panel>
  </Hds::Tabs>

  <h4 class="dummy-h4">Pass in a function that gets called when a tab is clicked</h4>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Tabs @onClickTab={{this.logClickedTab}} as |T|>
  <T.Tab>One</T.Tab>
  <T.Tab>Two</T.Tab>
  <T.Tab>Three</T.Tab>

  <T.Panel>Content one</T.Panel>
  <T.Panel>Content two</T.Panel>
  <T.Panel>Content three</T.Panel>
</Hds::Tabs>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Tabs @onClickTab={{this.logClickedTab}} as |T|>
    <T.Tab>One</T.Tab>
    <T.Tab>Two</T.Tab>
    <T.Tab>Three</T.Tab>

    <T.Panel>Content 1</T.Panel>
    <T.Panel>Content 2</T.Panel>
    <T.Panel>Content 3</T.Panel>
  </Hds::Tabs>
</section>
