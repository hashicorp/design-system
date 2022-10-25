<h1>Card component - How to use</h1>

<section data-section="how-to-use">
  

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">Invocation of the component would look something like this:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Card::Container @level="mid" @hasBorder={{true}}>[Your content here]</Hds::Card::Container>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Card::Container @level="mid" @hasBorder={{true}}>[Your content here]</Hds::Card::Container>
  <p class="dummy-paragraph"><em>Notice: as you can see the layout of the card itself, and its content, is left to the
      consumer of the component. The
      <code class="dummy-code">Hds::Card::Container</code>
      is nothing more than a block container – a
      <code class="dummy-code">&lt;div&gt;</code>
      – that provides styling for the elevation, border and backgroung. Sizing of the card, internal padding, and
      content alignment, are all left to the consumer of the component.</em>
  </p>
  <p class="dummy-paragraph">In this example we apply custom classes to control the layout of the card and its content:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<div class="my-custom-class-to-set-the-card-layout">
  <Hds::Card::Container @level="mid" @hasBorder={{true}}>
    <div class="my-custom-class-to-set-the-content-layout">
      [Your content here]
    </div>
  </Hds::Card::Container>
</div>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="dummy-card-how-to-custom-layout">
    <div class="my-custom-class-to-set-the-card-layout">
      <Hds::Card::Container @level="mid" @hasBorder={{true}}>
        <div class="my-custom-class-to-set-the-content-layout">
          [Your content here]
        </div>
      </Hds::Card::Container>
    </div>
  </div>
  <p class="dummy-paragraph">In this case we've added an external element that wraps the card, with a custom class that
    controls the width of the wrapper itself (but could also be a CSS
    <code class="dummy-code">flex</code>
    or
    <code class="dummy-code">grid</code>
    container, for example) and an internal element that wraps the content and applies padding around it (resulting in
    visual internal padding for the card) and aligns the text to the center.
  </p>

  <h4 class="dummy-h4">Interactive states</h4>
  <p class="dummy-paragraph">At the moment there are not specifications or recommended ways for how the card component
    should behave when used for interactive elements. This is something we will work on in the future. Despite this,
    some products have implemented designs that provide visual feeback to the user interacting with a card by changing
    the elevation style (on
    <code class="dummy-code">:hover</code>
    or
    <code class="dummy-code">:active</code>).</p>
  <p class="dummy-paragraph">As a stopgap measure, we have introduced two specific arguments
    <code class="dummy-code">@levelHover</code>
    and
    <code class="dummy-code">@levelActive</code>
    to allow users to declare the specific "level" they want to use for each of these interactive states.
  </p>
  <p class="dummy-paragraph">In the following example the card transitions between these elevation
    <em>mid → high → mid</em>
    depending on these interation states
    <em>rest → hover → active</em>:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<div class="my-custom-class-to-set-the-card-layout">
  <Hds::Card::Container @level="mid" @levelHover="high" @levelActive="mid" @hasBorder={{true}}>
    <div class="my-custom-class-to-set-the-content-layout">
      [Your content here]
    </div>
  </Hds::Card::Container>
</div>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="dummy-card-how-to-custom-layout">
    <div class="my-custom-class-to-set-the-card-layout">
      <Hds::Card::Container @level="mid" @levelHover="high" @levelActive="mid" @hasBorder={{true}}>
        <div class="my-custom-class-to-set-the-content-layout">
          [Your content here]
        </div>
      </Hds::Card::Container>
    </div>
  </div>
  <p class="dummy-paragraph">🚨<strong>Important</strong>:
    <em>this is just an example and not a recommendation: if you have any doubt about which level to use for the
      different states, please speak with your product designer or with the HDS team.</em></p>
</section>
