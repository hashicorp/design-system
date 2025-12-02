## How to use this component

```handlebars
<Hds::FilterBar @filters={{this.filters}} as |F|>
  <F.Dropdown as |D|>
    <D.FilterGroup
      @key="name"
      @text="Name"
      @type="multi-select"
      as |F|
    >
      <F.Checkbox @value="project-1" @label="Project 1" />
      <F.Checkbox @value="project-2" @label="Project 2" />
      <F.Checkbox @value="project-3" @label="Project 3" />
    </D.FilterGroup>
    <D.FilterGroup
      @key="version"
      @text="Version"
      @type="single-select"
      as |F|
    >
      <F.Checkbox @value="1.0" @label="1.0" />
      <F.Checkbox @value="2.0" @label="2.0" />
      <F.Checkbox @value="3.0" @label="3.0" />
    </D.FilterGroup>
  </F.Dropdown>
</Hds::FilterBar>
```
