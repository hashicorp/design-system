TASK:

You are an expert developer using ember.js . You are creating pages to compare the differences in design system components between the Helios Design System (HDS) of the `@hashicorp/design-system-components` package and the Carbon Design System web components package, and then aligning the Helios design system components to the Carbon design system components visually using design tokens.

This document provides steps for migrating a Helios Design System (HDS) component to have the same visual language as the Carbon Design System. The ultimate goal is to translate one design language, HDS/Helios, to another design language, IBM Carbon.

Note: The below instructions use `{component-name}` to indicate where the component name provided in any prompts should be used. For mapping purposes this is how the name would look for various formats.
- `component-name` - kebab case
- `componentName` - camel case
- `Component Name` - plain text case

**Important** Do not perform any actions after reading the below content. Acknowledge you have received the below instructions and wait for further instructions. Future prompts will provide you with the component name to use in the below steps, and other information.

## Terminology
- Carbonization / carbonized - the process of converting an HDS component to a Carbon design system look and feel

## Background Information

### Helios Design System
- Helios Design System (HDS) documentation: https://helios.hashicorp.design/

### Carbon Design System
I. Carbon Design System fidelity:

Before generating code, call the attached Carbon MCP server `code_search` used in the web components library. Retrieve variants, required props, and
Storybook links. Then call `docs_search` for usage guidance, tokens, accessibility requirements, and content patterns. Map all visual and structural decisions to Carbon tokens (spacing, color, type, motion). Use only tokens explicitly present in the MCP tool results, with no ad-hoc values.

II. Use "high reasoning":

- Plan the implementation step-by-step (structure, imports, accessibility, token
  usage).
- Cross-check component usage with `code_search` and guidance from
  `docs_search`.
- Anticipate compile/runtime errors and preemptively resolve them.
- Only then output the final, build-ready code once all reasoning steps are
  complete.

III. Token and cost conservation:

- After calling `code_search` or `docs_search`, do not restate or summarize
  results—this increases token usage.
- After tool calls, simply state: **"Received the necessary context."**

IV. Fully accessible & WCAG 2.2 compliant:

- From `docs_search`, obtain accessibility and content patterns.
- Apply WCAG 2.2 and Carbon accessibility guidance: keyboard support, logical
  focus order, visible focus, screen reader roles/states, name/role/value
  semantics, adequate hit targets, error messaging, and reduced-motion
  fallbacks.
- Use valid color contrast via Carbon tokens only.

V. NON-NEGOTIABLES:

- Use `code_search` + `docs_search` first, then write code
- Tokens must match `docs_search` guidance; no arbitrary values
- Props and variants must exist per `code_search`
- Only Carbon tokens; minimal overrides
- WCAG 2.2 baked in from the beginning
- No Tailwind or utility frameworks
- All required Carbon SCSS imports included
- Imports must resolve and code must run on first attempt

## Relevant files

@packages/components/hds/styles/components - Folder inside the components package which contains all component styles

@tokens/src/products/shared/ - Folder inside the tokens package which contains component JSON tokens

@showcase/app/components/page-carbonization/components - Folder which contains all of the example pages for a component’s carbonization testing

## Showcase set up

**Prompt information**
- `component-name` - the name of the component to be carbonized

I. Add a page to the @showcase application to use in testing the carbonization of the component.

In @showcase/app/router.ts under the `page-carbonization` header add a new route in the format `this.route(component-name)`

```
this.route('components', function () {
  this.route(‘coponent-name’);
});
```

II. In @showcase/app/templates/index.gts under the "Carbonization" and "Components" header add a new link to the new page.

```
<li>
  <LinkTo @route="page-carbonization.components.component-name">
    Component Name
  </LinkTo>
</li>
```

III. In @showcase/app/templates/page-carbonization/components create a new file with the name `component-name.gts` and add the following code:
```
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ComponentNameCarbonizationIndex from 'showcase/components/page-carbonization/components/badge-count';

const PageCarbonizationComponentsComponentName: TemplateOnlyComponent = <template>
  <ComponentNameCarbonizationIndex />
</template>;

export default PageCarbonizationComponentsComponentName;
```

IV: In @showcase/app/components/page-carbonization/components create a new folder with the name of the component in kebab case. Inside this folder create a new file called `index.gts`. Using other carbonization components as a reference create the structure of the file. Note: At this moment do not add any content inside the template.

Stop here and wait for further confirmation to continue.

## Adding Content to the Carbonization page

**Prompt information**
- `HdsComponentName` - the name of the HDS component
- `cds-component-name` - the name of the Carbon component in kebab case

Goal: Display relevant examples of the HDS and carbon components in the @showcase/app/components/page-carbonization/components/component-name/index.gts file. The HDS component should be display all of its variants which result in visual changes such as color, size, etc.

I. Import the Carbon web component

In the @showcase/app/index.html file add the following script tag to the `head`.
```
<script type="module" src="https://1.www.s81c.com/common/carbon/web-components/version/v2.48.0/cds-component-name.min.js"></script>
```

II. Add examples to the carbonization page

Find examples to be displayed from the code fragments of each component under @showcase/app/components/page-components/component-name in the `sub-sections` and `code-fragments` folders.

To decide which examples to include on the carbonization page consider the following criteria:
- Include examples that result in visual variations such as "Vartiants" or "Sizes".
- Include examples of "States" that show the component under different "default", "hover, "active", or "focus" states.

**Note:** The `mock-state-selector` argument can be used to show different states on HDS components. For example, `mock-state-selector="hover"` will show the component in the hover state. This is not available on the Carbon components. Use a placeholder `<pre>TODO: add static image here</pre>` in place of the carbon component in these examples.

In the @showcase/app/components/page-components/components/component-name/index.gts file perform the following actions:
1. Import the `ShwCarbonizationComparisonGrid` component if not done so already.
2. Use the `ShwCarbonizationComparisonGrid` component to display the examples of the HDS and Carbon components. using the following template.

```
<ShwCarbonizationComparisonGrid>
  <:theming>
    <!-- HDS component examples go here -->
  </:theming>
  <:reference>
    <!-- Carbon examples go here -->
  </:reference>
</ShwCarbonizationComparisonGrid>
```
3. Add the `ShwCarbonizationComparisonGrid` component to the page for each example of the HDS component that results in a visual change. For example, if the HDS component has a `size` property that changes the visual size of the component, then add a `ShwCarbonizationComparisonGrid` component for each size variant.
4. Inside each instance of the `ShwCarbonizationComparisonGrid` component, add the HDS component example to the `theming` slot and the Carbon component example to the `reference` slot.

**Important** To find relevant Carbon component code examples follow previous guidance on the `code_search` and `docs_search` commands.

Stop here and wait for further confirmation to continue.

## Adding component level tokens and aligning visual styles

Goal: Align the carbon themed version of the HDS component to the carbon component for visual aspects such as color, typography, spacing, and layout. Add component level tokens to the HDS component to achieve this alignment.

I. In @packages/tokens/src/products/shared create a new file called `component-name.json`.

II. Determine the visual differences between the HDS and carbon components.

Review the HDS component styles in @packages/components/styles/components and the Carbon component styles using `docs_search` and `code_search`.

Catagorize differences in the following areas
  - Color (background-color, color, border-color)
  - Typography (font-size, font-family, line-height, letter-spacing)
  - Spacing (padding, margin)
  - Shadows (box-shadow)
  - Borders (border, border-width)

Ignore all svgs and `HdsIcon` differences as these will be handled separate from this process.

III. Create component level tokens for the HDS component to align with the Carbon component.

**Important** Follow Design Tokens Community Group (DTCG) formatting rules for all component token values. See https://www.designtokens.org/tr/drafts/format/ for more information.

### Token formatting

A component level token should follow the following formats:

Typography format
```
"name": {
  "$type": "font-size",
  "$value": "13",
  "unit": "px",
  "$modes": {
    "default": "13",
    "cds-g0": "12",
    "cds-g10": "12",
    "cds-g90": "12",
    "cds-g100": "12"
  }
},
```

Color format
```
"name": {
  "$type": "color",
  "$value": "{color.foreground.primary}",
  "$modes": {
    "default": "{color.foreground.primary}",
    "cds-g0": "{carbon.themes.tagTokens.tagColorGray.white}",
    "cds-g10": "{carbon.themes.tagTokens.tagColorGray.g10}",
    "cds-g90": "{carbon.themes.tagTokens.tagColorGray.g90}",
    "cds-g100": "{carbon.themes.tagTokens.tagColorGray.g100}"
  }
},
```

Spacing format
```
"large": {
  "$type": "dimension",
  "$value": "8",
  "unit": "px",
  "$modes": {
    "default": "8",
    "cds-g0": "12",
    "cds-g10": "12",
    "cds-g90": "12",
    "cds-g100": "12"
  }
}
```
### Token nomenclature

Token names should following the nomenclature of `component.semantic.property.sub-property` where:
- `component` is the component name
- `semantic` is the semantic meaning of the token
  - page, foreground, surface, border, typogrpahy, spacing etc.
- `property` is the property of the semantic meaning
  - width, height, margin, padding, color, background, border, font-size, font-weight, etc.
- `sub-property` is the optional sub-property of the property
  - top, bottom, left, right, x, y, etc.

IV: Update component styles to leverage new token variables

In @packages/components/styles/components/component-name.scss update the component styles to leverage the new token variables. For example:

If you created a token `button.foreground.color` the corresponding CSS variable would be `--token-button-foreground-color`. You would use this variable in your component styles like so:

```scss
.hds-button {
  color: var(--token-button-foreground-color);
}
```

Use the `hds-apply-only-if-carbon` mixin to apply styles only if the Carbon theme is active. For example:
```
@use "../mixins/carbonization" as *;

.hds-button {
  @include hds-apply-only-if-carbon() {
    transition: none;
  }
}
```

NON-NEGOTIABLES:
- Only use this mixin to add styles that can not be added through the component level CSS variables.
- Do not add comments to the tokens json

Stop here and wait for further confirmation to continue.
