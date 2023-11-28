---
title: Scraping playground
---

# DOC Components

<!-- algolia-ignore-start -->
| Color | Usage |
|-------|-------|
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#32FFF7"}} /> Cyan | Property, url, or operator |
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#2D8EFF"}} /> Blue | Function, builtins |
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#FFA800"}} /> Orange | Strings, characters |
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#C76CFF"}} /> Purple | Booleans, numbers |
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#86FF13"}} /> Green | Keywords, class names, saving the world |
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#FF3B20"}} /> Red | Important items |
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#EFEFF1"}} /> White | Default color within the code block, also used for punctuation (`<`, `{ }`, `=`, etc) |
| <div class="doc-code-block-syntax-color-preview" {{style background-color="#B2B6BD"}} /> Gray | Used for comments across languages |
<!-- algolia-ignore-end -->


### Surface

Use for container and component backgrounds.

<!-- algolia-ignore-start -->
<div class="dummy-colors-list">
  {{#each this.colors.semantic.surface as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p class="dummy-paragraph">No tokens found for "semantic/surface" colors 🤷‍♀️</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->

### Border

Use for container and component borders. Neutral values can also be used for horizontal rules.

<!-- algolia-ignore-start -->
<div class="dummy-colors-list">
  {{#each this.colors.semantic.border as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p class="dummy-paragraph">No tokens found for “semantic/border” colors.</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->


<!-- content": "To add a logo to the \"header\" of the SideNav use the <div hds-side-nav-header-home-link>  sub-component.", -->

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}
