---
title: Icons
layout:
  sidecar: false
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

<section data-tab="Contributing">
  @include "partials/contributing.md"
</section>
