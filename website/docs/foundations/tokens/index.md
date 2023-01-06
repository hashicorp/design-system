---
title: Tokens
caption: Design tokens are provided as CSS custom properties and used to share and standardize foundation styles.
description: Design tokens are provided as CSS custom properties and used to share and standardize foundation styles.
previewImage: assets/illustrations/foundations/tokens.jpg
---

<section data-tab="Library">
  <Doc::TokensList
    @groupedTokens={{this.filteredGroupedTokens}}
    @searchQuery={{this.searchQuery}}
    @searchTokens={{this.searchTokens}}
  />
</section>

<section data-tab="Code">
  @include "partials/code/how-to-use.md"
</section>
