---
title: Icons
layout:
  sidecar: false
---

<section data-tab="Library">
  <Doc::IconsList
    @icons={{this.filteredIcons}}
    @onSelect={{this.selectIconSize}}
    @selectedIconSize={{this.selectedIconSize}}
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

