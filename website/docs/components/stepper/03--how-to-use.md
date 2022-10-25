<h1>Stepper Indicator Component - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">The stepper indicator is used to indicate the relational step number or value, helping the
    user maintain context in a multi-step flow or sequence. It should be used in larger stepper item patterns with an
    appropriate label, description, and visual language indicating directionality.</p>
  <p class="dummy-paragraph">There are two types of indicators,
    <code class="dummy-code">step</code>
    and
    <code class="dummy-code">task</code>
    which can be used in conjunction, or separately depending on hierarchical needs or requirements.</p>

  <h4 class="dummy-h4">Stepper::Step::Indicator</h4>
  <h5 class="dummy-h5">Basic use</h5>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="incomplete" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Step::Indicator @text="1" @status="incomplete" />

  <h5 class="dummy-h5">Adding interactivity</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="incomplete" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Step::Indicator @text="1" @status="incomplete" @isInteractive={{true}} />

  <h5 class="dummy-h5">Indicating status</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="progress" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Step::Indicator @text="1" @status="progress" @isInteractive={{true}} />

  <h5 class="dummy-h5">Indicating processing</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="processing" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Step::Indicator @text="1" @status="processing" @isInteractive={{true}} />

  <h5 class="dummy-h5">Rendering a complete step</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="complete" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Step::Indicator @text="1" @status="complete" @isInteractive={{true}} />

  <h4 class="dummy-h4">Stepper::Task::Indicator</h4>
  <h5 class="dummy-h5">Basic use</h5>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Task::Indicator @status="incomplete" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Task::Indicator @status="incomplete" />

  <h5 class="dummy-h5">Adding interactivity</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Task::Indicator @status="incomplete" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Task::Indicator @status="incomplete" @isInteractive={{true}} />

  <h5 class="dummy-h5">Indicating status</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Task::Indicator @status="progress" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Task::Indicator @status="progress" @isInteractive={{true}} />

  <h5 class="dummy-h5">Indicating processing</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Task::Indicator @status="processing" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Task::Indicator @status="processing" @isInteractive={{true}} />

  <h5 class="dummy-h5">Rendering a complete task</h5>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Stepper::Task::Indicator @status="complete" @isInteractive={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Stepper::Task::Indicator @status="complete" @isInteractive={{true}} />

</section>
