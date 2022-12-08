---
title: Icons
layout:
  sidecar: false
---

<section id="section-library">
  <Doc::IconsList
    @icons={{this.filteredIcons}}
    @onSelect={{this.selectIconSize}}
    @searchQuery={{this.searchQuery}}
    @searchIcons={{this.searchIcons}}
  />
</section>

<section id="section-code" data-markdown="1">
  @include "partials/engineering-guidelines.md"
</section>

<section id="section-guidelines" data-markdown="1">
  @include "partials/design-guidelines.md"
</section>

<section id="section-contributing" data-markdown="1">
  @include "partials/contributing.md"
</section>
