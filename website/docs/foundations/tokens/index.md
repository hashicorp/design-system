---
title: Tokens
caption: Design tokens are used to share and standardize foundation styles.
description: Design tokens are used to share and standardize foundation styles.
previewImage: assets/illustrations/foundations/tokens.jpg
layout:
  sidecar: false
---

<section data-tab="Library">

  <Doc::Banner @type="information">
    <p class="doc-markdown-p"><strong>Note</strong>: the tokens below refer to the version 7.0 or above of the components package (version 6.0 or above of the tokens package). If you are using an older version, refer to the correct <a href="/whats-new/release-notes">documentation for your version</a></p>
  </Doc::Banner>

  <!-- algolia-ignore-start -->
  <Doc::TokensList
    @groupedTokens={{this.filteredGroupedTokens}}
    @searchQuery={{this.searchQuery}}
    @searchTokens={{this.searchTokens}}
  />
  <!-- algolia-ignore-end -->
</section>

<section data-tab="Code">
  @include "partials/code/how-to-use.md"
</section>
