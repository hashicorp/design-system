---
title: <%= columnizedModuleName %>
description: {Optional long description that appears in the cover}
caption: {Short description that appears in the cards}
status: released
links:
  figma: {link to the "<%= columnizedModuleName %>" page in the components Figma library}
  github: {link to the "<%= columnizedModuleName %>" component's folder in the GitHub repo}
hidden: true
previewImage: assets/illustrations/components/<%= kebabizedModuleName %>.jpg
keywords: ['add', 'alternate', 'keywords', 'here']
---

<section data-tab="Guidelines">
  @include "partials/guidelines/overview.md"
  @include "partials/guidelines/guidelines.md"
</section>

<section data-tab="Code">
  @include "partials/code/how-to-use.md"
  @include "partials/code/component-api.md"
  <!-- @include "partials/code/showcase.md" -->
</section>

<section data-tab="Specifications">
  @include "partials/specifications/anatomy.md"
  @include "partials/specifications/states.md"
</section>

<section data-tab="Accessibility">
  @include "partials/accessibility/accessibility.md"
</section>