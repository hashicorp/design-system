---
title: Icons
layout:
  sidecar: false
caption: Icons can be used to support and enhance meaning and can be useful in calling out information.
description: Icons can be used to support and enhance meaning and can be useful in calling out information. They should not be used as a substitue for meaningful text content and accessible text should always be included for non-decorative uses.
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

