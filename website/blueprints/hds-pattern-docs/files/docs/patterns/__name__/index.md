---
title: <%= columnizedModuleName %>
description: {Optional long description that appears in the cover}
caption: {Short description that appears in the cards}
status: released
previewImage: assets/illustrations/patterns/<%= kebabizedModuleName %>.jpg
navigation:
  hidden: true
  keywords: ['add', 'alternate', 'keywords', 'here']
---

<section data-tab="Guidelines">
  @include "partials/guidelines/overview.md"
  @include "partials/guidelines/guidelines.md"
</section>

<section data-tab="Specifications">
  @include "partials/specifications/anatomy.md"
</section>

<section data-tab="Accessibility">
  @include "partials/accessibility/accessibility.md"
</section>