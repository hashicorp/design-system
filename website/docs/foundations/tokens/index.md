---
title: Tokens
caption: Design tokens are used to share and standardize foundation styles.
description: Design tokens are used to share and standardize foundation styles.
previewImage: assets/illustrations/foundations/tokens.jpg
layout:
  sidecar: false
---

<section data-tab="Library">
  <Doc::Banner @type="warning">
    <p class="doc-markdown-p"><strong>Breaking changes</strong> <br> Major breaking changes to the tokens were released in `v7.0` of the components package and `v6.0` of the tokens package. <br> This list of tokens refers to the latest tokens. If you are using an older version, refer to the <a href="/whats-new/release-notes">documentation for your version</a>.</p>
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
