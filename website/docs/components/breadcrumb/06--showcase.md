---
title: Breadcrumb
category: components
component: breadcrumb
section: showcase
---


<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Variants</h4>

  <p class="dummy-paragraph">text only</p>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" />
    <Hds::Breadcrumb::Item @text="Level two" />
    <Hds::Breadcrumb::Item @text="Level three" />
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Level five" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>

  <p class="dummy-paragraph">with icons</p>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" @icon="org" />
    <Hds::Breadcrumb::Item @text="Level two" @icon="folder" />
    <Hds::Breadcrumb::Item @text="Level three" />
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Level five" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>

  <p class="dummy-paragraph">with truncation</p>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" />
    <Hds::Breadcrumb::Item @text="Level two" />
    <Hds::Breadcrumb::Truncation>
      <Hds::Breadcrumb::Item @text="Sub-level one" />
      <Hds::Breadcrumb::Item @text="Sub-level two with a very long string that we may want to trim somehow" />
      <Hds::Breadcrumb::Item @text="Sub-level with icon" @icon="org" />
      <Hds::Breadcrumb::Item @text="Another sub-level with icon" @icon="folder" />
    </Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Level five" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>

  <h4 class="dummy-h4">States</h4>

  <p class="dummy-paragraph">default</p>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" @icon="org" />
    <Hds::Breadcrumb::Item @text="Level two" @icon="folder" />
    <Hds::Breadcrumb::Truncation>
      <Hds::Breadcrumb::Item @text="Sub-level one" />
      <Hds::Breadcrumb::Item @text="Sub-level two with a very long string that we may want to trim somehow" />
      <Hds::Breadcrumb::Item @text="Sub-level with icon" @icon="org" />
      <Hds::Breadcrumb::Item @text="Another sub-level with icon" @icon="folder" />
    </Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Level five" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>

  <p class="dummy-paragraph">hover</p>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" @icon="org" mock-state-value="hover" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Level two" @icon="folder" mock-state-value="hover" mock-state-selector="a" />
    <Hds::Breadcrumb::Truncation mock-state-value="hover" mock-state-selector="button">
      <Hds::Breadcrumb::Item @text="Sub-level one" />
      <Hds::Breadcrumb::Item @text="Sub-level two with a very long string that we may want to trim somehow" />
      <Hds::Breadcrumb::Item @text="Sub-level with icon" @icon="org" />
      <Hds::Breadcrumb::Item @text="Another sub-level with icon" @icon="folder" />
    </Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Level four" mock-state-value="hover" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Level five" mock-state-value="hover" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} mock-state-value="hover" mock-state-selector="a" />
  </Hds::Breadcrumb>

  <p class="dummy-paragraph">active</p>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" @icon="org" mock-state-value="active" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Level two" @icon="folder" mock-state-value="active" mock-state-selector="a" />
    <Hds::Breadcrumb::Truncation mock-state-value="active" mock-state-selector="button">
      <Hds::Breadcrumb::Item @text="Sub-level one" />
      <Hds::Breadcrumb::Item @text="Sub-level two with a very long string that we may want to trim somehow" />
      <Hds::Breadcrumb::Item @text="Sub-level with icon" @icon="org" />
      <Hds::Breadcrumb::Item @text="Another sub-level with icon" @icon="folder" />
    </Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Level four" mock-state-value="active" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Level five" mock-state-value="active" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} mock-state-value="active" mock-state-selector="a" />
  </Hds::Breadcrumb>

  <p class="dummy-paragraph">focus</p>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" @icon="org" mock-state-value="focus" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Level two" @icon="folder" mock-state-value="focus" mock-state-selector="a" />
    <Hds::Breadcrumb::Truncation mock-state-value="focus" mock-state-selector="button">
      <Hds::Breadcrumb::Item @text="Sub-level one" />
      <Hds::Breadcrumb::Item @text="Sub-level two with a very long string that we may want to trim somehow" />
      <Hds::Breadcrumb::Item @text="Sub-level with icon" @icon="org" />
      <Hds::Breadcrumb::Item @text="Another sub-level with icon" @icon="folder" />
    </Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Level four" mock-state-value="focus" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Level five" mock-state-value="focus" mock-state-selector="a" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} mock-state-value="focus" mock-state-selector="a" />
  </Hds::Breadcrumb>

  <h4 class="dummy-h4">Truncation options</h4>

  <p class="dummy-paragraph">with long strings / items can wrap (default)</p>
  <div class="dummy-breadcrumb-max-width-container-large">
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @text="Level one with a very long string" @icon="org" />
      <Hds::Breadcrumb::Item @text="Level two with a very long string" @icon="folder" />
      <Hds::Breadcrumb::Item @text="Level three with a very long string" />
      <Hds::Breadcrumb::Item @text="Level four with a very long string" />
      <Hds::Breadcrumb::Item @text="Level five with a very long string" />
      <Hds::Breadcrumb::Item @text="Current with a very long string" @current={{true}} />
    </Hds::Breadcrumb>

  </div>

  <p class="dummy-paragraph">with long strings / items can't wrap (text is elliptized)</p>
  <div class="dummy-breadcrumb-max-width-container-large">
    <Hds::Breadcrumb @itemsCanWrap={{false}}>
      <Hds::Breadcrumb::Item @text="Level one with a very long string" @icon="org" />
      <Hds::Breadcrumb::Item @text="Level two with a very long string" @icon="folder" />
      <Hds::Breadcrumb::Item @text="Level three with a very long string" />
      <Hds::Breadcrumb::Item @text="Level four with a very long string" />
      <Hds::Breadcrumb::Item @text="Level five with a very long string" />
      <Hds::Breadcrumb::Item @text="Current with a very long string" @current={{true}} />
    </Hds::Breadcrumb>
  </div>

  <p class="dummy-paragraph">with max-width on single item</p>
  <div class="dummy-breadcrumb-max-width-container-large">
    <Hds::Breadcrumb @itemsCanWrap={{false}}>
      <Hds::Breadcrumb::Item @text="Level one" @icon="org" />
      <Hds::Breadcrumb::Item @text="Level two" @icon="folder" />
      <Hds::Breadcrumb::Item @text="Level three" />
      <Hds::Breadcrumb::Item @text="Level four with a very long string" @maxWidth="180px" />
      <Hds::Breadcrumb::Item @text="Level five" />
      <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
    </Hds::Breadcrumb>
  </div>

  <p class="dummy-paragraph">with "truncation" element</p>
  <div class="dummy-breadcrumb-sample-with-truncation-dropdown">
    <Hds::Breadcrumb>
      <Hds::Breadcrumb::Item @text="Level one" />
      <Hds::Breadcrumb::Item @text="Level two" />
      <Hds::Breadcrumb::Truncation>
        <Hds::Breadcrumb::Item @text="Level three" />
        <Hds::Breadcrumb::Item @text="Level four with a long string that can span multiple lines" />
        <Hds::Breadcrumb::Item @text="Level five with icon" @icon="dashboard" />
        <Hds::Breadcrumb::Item @text="Level six with icon" @icon="database" />
      </Hds::Breadcrumb::Truncation>
      <Hds::Breadcrumb::Item @text="Level seven" />
      <Hds::Breadcrumb::Item @text="Level eight" />
      <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
    </Hds::Breadcrumb>
  </div>

</section>
