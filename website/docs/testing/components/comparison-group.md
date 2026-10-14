---
title: Doc::Carbonization::ComparisonGroup
layout:
  sidecar: false
---

**Basic comparison group**

<Doc::Carbonization::ComparisonGroup as |CG|>
  <CG.Item @context="default">
    <Doc::Placeholder @text="default" @height="100" @background="transparent" />
  </CG.Item>
  <CG.Item @context="light">
    <Doc::Placeholder @text="light" @height="100" @background="transparent" />
  </CG.Item>
  <CG.Item @context="dark">
    <Doc::Placeholder @text="dark" @height="100" @background="transparent" />
  </CG.Item>
</Doc::Carbonization::ComparisonGroup>

-----

**Item "contexts"**

Themes:

<Doc::Carbonization::ComparisonGroup as |CG|>
  {{#each (array "default" "light" "dark" "system") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @height="100" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

Modes:

<Doc::Carbonization::ComparisonGroup as |CG|>
  {{#each (array "cds-g0" "cds-g10" "cds-g90" "cds-g100") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @height="100" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

-----

**Comparison group "display"**

Grid (default):

<Doc::Carbonization::ComparisonGroup @display="grid" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @width="100" @height="100" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

Flex:

<Doc::Carbonization::ComparisonGroup @display="flex" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @width="100" @height="100" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

-----

**Comparison group "layout"**

Grid + row (default):

<Doc::Carbonization::ComparisonGroup @display="grid" @layout="row" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @height="60" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

Grid + column:

<Doc::Carbonization::ComparisonGroup @display="grid" @layout="column" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @height="60" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

Flex + row:

<Doc::Carbonization::ComparisonGroup @display="flex" @layout="row" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @width="100" @height="60" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

Flex + column:

<Doc::Carbonization::ComparisonGroup @display="flex" @layout="column" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @width="100" @height="60" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

-----

**Comparison group with top label**

Via `@label` argument:

<Doc::Carbonization::ComparisonGroup @label="Lorem ipsum dolor" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Doc::Placeholder @text={{context}} @height="60" @background="transparent" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

Via `<:label>` named block:

<Doc::Carbonization::ComparisonGroup>
  <:label>Lorem <code>ipsum</code> dolor</:label>
  <:default as |CG|>
    {{#each (array "default" "light" "dark") as |context|}}
      <CG.Item @context={{context}}>
        <Doc::Placeholder @text={{context}} @height="60" @background="transparent" />
      </CG.Item>
    {{/each}}
  </:default>
</Doc::Carbonization::ComparisonGroup>

-----

**Comparison group with HDS components as content**

<Doc::Carbonization::ComparisonGroup @label="Hds::Button" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Hds::Button @text="Button" />
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

<Doc::Carbonization::ComparisonGroup @label="Focus ring helpers" @display="flex" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <div class="hds-focus-ring-box-shadow-action">
        <Doc::Placeholder @text="action" @width="100" @height="60" @background="transparent" />
      </div>
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>
