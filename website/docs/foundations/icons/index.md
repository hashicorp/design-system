---
title: Icons
layout:
  sidecar: false
caption: Icons can be used to support and enhance meaning...
---

<section data-tab="Library">
  <Doc::IconsList
    @icons={{this.filteredIcons}}
    @onSelect={{this.selectIconSize}}
    @searchQuery={{this.searchQuery}}
    @searchIcons={{this.searchIcons}}
  />
</section>

<section data-tab="Code">
  @include "partials/engineering-guidelines.md"
</section>

<section data-tab="Guidelines">
  @include "partials/design-guidelines.md"
</section>

