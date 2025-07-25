# @hashicorp/design-system-components

## 4.21.1

[4.20.1 documentation](https://hds-website-4-20-1.vercel.app/)

### Patch Changes


`AdvancedTable` - Removed `ember-math-helpers` dev dependency


<small class="doc-whats-new-changelog-metadata">[#3043](https://github.com/hashicorp/design-system/pull/3043)</small>

<div class="doc-whats-new-changelog-separator"></div>


`Form::RadioCard` - Fixed styling bug where hover styles were visible when disabled


<small class="doc-whats-new-changelog-metadata">[#3000](https://github.com/hashicorp/design-system/pull/3000)</small>

<div class="doc-whats-new-changelog-separator"></div>

Make `@ember/string` a peerDependency to allow consuming apps to choose to use `3.x` or `4.x`. This unblocks apps that need `4.x` for vite compatibility, while retaining `3.x` support as well for older apps.

<small class="doc-whats-new-changelog-metadata">[#3028](https://github.com/hashicorp/design-system/pull/3028) - Thanks [@RobbieTheWagner](https://github.com/RobbieTheWagner) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>


`Form::SuperSelect` - fix type for the `@resultCountMessage` argument so it can accept a string or a function.


<small class="doc-whats-new-changelog-metadata">[#3008](https://github.com/hashicorp/design-system/pull/3008)</small>

<div class="doc-whats-new-changelog-separator"></div>


`AppSideNav::List::Link` - Applied transparent background to the element to avoid overlapping with previous item's focus ring


<small class="doc-whats-new-changelog-metadata">[#3032](https://github.com/hashicorp/design-system/pull/3032)</small>

<div class="doc-whats-new-changelog-separator"></div>


`AdvancedTable` - Make the `@hasResizableColumns` argument optional for the `ThSort` component.


<small class="doc-whats-new-changelog-metadata">[#3051](https://github.com/hashicorp/design-system/pull/3051)</small>

<div class="doc-whats-new-changelog-separator"></div>


`PopoverPrimitive` - Updated type of the `anchoredPositionOptions` object in the `setUpPrimitivePopover` modifier to include `arrowSelector` from the `hds-anchored-position` modifier.


<small class="doc-whats-new-changelog-metadata">[#3005](https://github.com/hashicorp/design-system/pull/3005)</small>

<div class="doc-whats-new-changelog-separator"></div>


`AppSideNav::List::Link` - Removed extra transparent border and background when rendered as a `<button>` element



`SideNav::List::Link` - Removed extra transparent border when rendered as a `<button>` element


<small class="doc-whats-new-changelog-metadata">[#3026](https://github.com/hashicorp/design-system/pull/3026)</small>

<div class="doc-whats-new-changelog-separator"></div>


`Tag` - Fixed a performance issue when many tags are present on a page caused by the ResizeObserver


Dependencies - Added `tracked-built-ins`

<small class="doc-whats-new-changelog-metadata">[#3033](https://github.com/hashicorp/design-system/pull/3033) - Thanks [@meirish](https://github.com/meirish) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>


`AppSideNav::Panel` - Fixed issue causing the focus ring of the first and last items within the Panel to be cut off


<small class="doc-whats-new-changelog-metadata">[#3045](https://github.com/hashicorp/design-system/pull/3045)</small>

<div class="doc-whats-new-changelog-separator"></div>


`AppHeader` - return `close` callback to the `:globalActions` and `:utilityActions` named blocks so the menu actions can be hidden programmatically when the component is in a mobile view.


<small class="doc-whats-new-changelog-metadata">[#3031](https://github.com/hashicorp/design-system/pull/3031)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Layout::Flex` - Fixed issue in which `gap` value was improperly inherited by nested `Flex` components, added "0" as a supported `gap` value.

`Layout::Grid` - Fixed issue in which `gap` & `columnMinWidth` values were improperly inherited by nested `Grid` components, added "0" as a supported `gap` value.

<small class="doc-whats-new-changelog-metadata">[#2987](https://github.com/hashicorp/design-system/pull/2987)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.21.0

[4.21.0 documentation](https://hds-website-4-21-0.vercel.app/)

### Minor Changes

`Form` - Added `Form` component and related sub-components for form layout

<small class="doc-whats-new-changelog-metadata">[#2898](https://github.com/hashicorp/design-system/pull/2898)</small>

<div class="doc-whats-new-changelog-separator"></div>

Added `ember-math-helpers` dependency.

`AdvancedTable` - Added `hasResizableColumns` argument. When `true`, allows the table's columns to be resized with both a click-and-drag and a keyboard interface.

<small class="doc-whats-new-changelog-metadata">[#2849](https://github.com/hashicorp/design-system/pull/2849)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppHeader` - Refactored the Home Link, removed the `@ariaLabel` argument, added `@text` (should replace `@ariaLabel`) and `@isIconOnly` arguments.

<small class="doc-whats-new-changelog-metadata">[#2951](https://github.com/hashicorp/design-system/pull/2951)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::KeyValueInputs` - Added component and related sub-components.

<small class="doc-whats-new-changelog-metadata">[#2911](https://github.com/hashicorp/design-system/pull/2911)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Layout::Grid` - Added @columnWidth to set "fixed" width for columns

<small class="doc-whats-new-changelog-metadata">[#2976](https://github.com/hashicorp/design-system/pull/2976)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Form::FileInput` - Added `@id` and `@ariaDescribedBy` arguments to `Form::FileInput::Base`.

`Form::Legend` - Added `@id` argument.

`Form::Label` - Added `@hiddenText` argument, which adds visually hidden text inside the label.

`Form::MaskedInput` - Added `@ariaDescribedBy` argument to `Form::MaskedInput::Base`.

`Form::Select` - Added `@id` and `@ariaDescribedBy` arguments to `Form::Select::Base`.

`Form::TextInput` - Added `@id` and `@ariaDescribedBy` arguments to `Form::TextInput::Base`.

`Form::Textarea` - Added `@id` and `@ariaDescribedBy` arguments to `Form::Textarea::Base`.

<small class="doc-whats-new-changelog-metadata">[#2911](https://github.com/hashicorp/design-system/pull/2911)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::SuperSelect` - Enhanced display of grouped options when only selected options are shown in the `SuperSelect::Multiple`

<small class="doc-whats-new-changelog-metadata">[#2948](https://github.com/hashicorp/design-system/pull/2948)</small>

<div class="doc-whats-new-changelog-separator"></div>

Upgraded: `@nullvoxpopuli/ember-composable-helpers` from 5.2.10 to 5.2.11

<small class="doc-whats-new-changelog-metadata">[#2954](https://github.com/hashicorp/design-system/pull/2954) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.12.0

## 4.20.2

[4.20.2 documentation](https://hds-website-4-20-2.vercel.app/)

### Patch Changes

Upgraded the following dependencies:

- `@embroider/addon-shim` from `1.9.0` to `1.10.0`
- `@embroider/macros` from `1.16.12` to `1.18.0`
- `@nullvoxpopuli/ember-composable-helpers` from `5.2.9` to `5.2.10`
- `ember-concurrency` from `4.0.2` to `4.0.4`
- `ember-power-select` from `8.6.2` to `8.7.1`

<small class="doc-whats-new-changelog-metadata">[#2952](https://github.com/hashicorp/design-system/pull/2952)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Button` - added missing types to the barrel export file

`Layout::Flex` - added missing types to the barrel export file

`Layout::Grid` - added missing types to the barrel export file

<small class="doc-whats-new-changelog-metadata">[#2943](https://github.com/hashicorp/design-system/pull/2943)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Modal` - Reverted changes introduced in [#2846](https://github.com/hashicorp/design-system/pull/2846) and [#2902](https://github.com/hashicorp/design-system/pull/2902) related to the click behavior outside the modal when dismissing is disabled

<small class="doc-whats-new-changelog-metadata">[#2964](https://github.com/hashicorp/design-system/pull/2964)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.11.1

## 4.20.1

[4.20.1 documentation](https://hds-website-4-20-1.vercel.app/)

### Patch Changes

`AdvancedTable` - Fixed a bug that prevented the `model` from updating when the argument changes

<small class="doc-whats-new-changelog-metadata">[#2919](https://github.com/hashicorp/design-system/pull/2919)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Stepper::Nav` - Updated signature to use `WithBoundArgs` instead of `ComponentLike` for contextual components to resolve linting issues

<small class="doc-whats-new-changelog-metadata">[#2936](https://github.com/hashicorp/design-system/pull/2936)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Accordion` - Set `aria-controls` of `Accordion::Item::Button` to `contentId` from `DisclosurePrimitive` for a11y improvements with toggled content

`DisclosurePrimitive` - Changed DOM structure of content section and exposed `contentId` for a11y improvements with toggled content

`Reveal` - Set `aria-controls` of `Reveal::Toggle` to `contentId` from `DisclosurePrimitive` for a11y improvements with toggled content

<small class="doc-whats-new-changelog-metadata">[#2643](https://github.com/hashicorp/design-system/pull/2643)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::Field` - Fixed focus order a11y issue for helper text links with `@layout` of `flag`

<small class="doc-whats-new-changelog-metadata">[#2915](https://github.com/hashicorp/design-system/pull/2915)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.20.0

[4.20.0 documentation](https://hds-website-4-20-0.vercel.app/)

### Minor Changes

`CodeBlock` - Added height toggle control, which is present when a `maxHeight` is set and code content height exceeds the `maxHeight` value

<small class="doc-whats-new-changelog-metadata">[#2826](https://github.com/hashicorp/design-system/pull/2826)</small>

<div class="doc-whats-new-changelog-separator"></div>

`breakpoints` - Added responsive breakpoint values and helpers for responsiveness

<small class="doc-whats-new-changelog-metadata">[#2848](https://github.com/hashicorp/design-system/pull/2848)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Pagination` - Replaced custom breakpoint (`1000px`) with standard `lg` (`1088px`) breakpoint

`Stepper::Nav` - Replaced custom breakpoint (`550px`) with standard `sm` (`480px`) breakpoint

`AppHeader` - Removed usage of `--hds-app-desktop-breakpoint` CSS variable and relied on the `@breakpoint` argument for override of mobile behavior

`AppSideNav` - Removed usage of `--hds-app-desktop-breakpoint` CSS variable, added `@breakpoint` argument, and relied on it for override of mobile behavior

<small class="doc-whats-new-changelog-metadata">[#2859](https://github.com/hashicorp/design-system/pull/2859)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`CodeBlock` - Updated signature to use `WithBoundArgs` instead of `ComponentLike` for contextual components to resolve linting issues

<small class="doc-whats-new-changelog-metadata">[#2925](https://github.com/hashicorp/design-system/pull/2925)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppHeader` - Fixed import path for `hds-breakpoints`

`AppSideNav` - Fixed import path for `hds-breakpoints`

<small class="doc-whats-new-changelog-metadata">[#2886](https://github.com/hashicorp/design-system/pull/2886) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppSideNav` - Fixed bug where scrolling was blocked when the `AppSideNav` was expanded on desktop views. Also fixed bug which allowed user to focus links that were visually hidden.

<small class="doc-whats-new-changelog-metadata">[#2869](https://github.com/hashicorp/design-system/pull/2869)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Time` - Fixed type error where the `TooltipButton` text could be undefined.

<small class="doc-whats-new-changelog-metadata">[#2877](https://github.com/hashicorp/design-system/pull/2877)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppSideNav` - Fixed component types for `AppSideNav::Portal` and `AppSideNav::Portal::Target` to no longer require `@target` or `@name`.

`SideNav` - Fixed component types for `SideNav::Portal` and `SideNav::Portal::Target` to no longer require `@target` or `@name`.

<small class="doc-whats-new-changelog-metadata">[#2908](https://github.com/hashicorp/design-system/pull/2908)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::Label` - Forced the `for` HTML attribute to be converted to a string

<small class="doc-whats-new-changelog-metadata">[#2863](https://github.com/hashicorp/design-system/pull/2863)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Added `@maxHeight` argument, which sets the max height of the Advanced Table and automatically adds a sticky header to it. Also updated the container styles to constrain the Advanced Table width to the parent's width.

<small class="doc-whats-new-changelog-metadata">[#2865](https://github.com/hashicorp/design-system/pull/2865)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Fixed issues with line numbers when line wrapping is present and when the number of lines changes dynamically; line highlighting when the Code Block is hidden from view initially such as when used inside a Tabs component; and line highlighting when hasLineNumbers is false.

<small class="doc-whats-new-changelog-metadata">[#2856](https://github.com/hashicorp/design-system/pull/2856)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Modal` - Fixed bug with click event listener not properly removed

<small class="doc-whats-new-changelog-metadata">[#2902](https://github.com/hashicorp/design-system/pull/2902)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Stepper::Nav` - Fixed issue in Safari with text alignment on interactive steps

<small class="doc-whats-new-changelog-metadata">[#2909](https://github.com/hashicorp/design-system/pull/2909)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Added arguments `@ariaLabel`, `@ariaLabelledBy`, and `@ariaDescribedBy`. Added screen-reader only copy for highlighted lines.

`hds-clipboard` - Prevent screen-reader only text (text with the `sr-only` class) from being copied to the clipboard.

<small class="doc-whats-new-changelog-metadata">[#2879](https://github.com/hashicorp/design-system/pull/2879)</small>

<div class="doc-whats-new-changelog-separator"></div>

Introduce the `hds-resolve-link-to-component` utility to correctly resolve the LinkTo component when `@isRouteExternal` is set on `HdsBreadcrumbItem` or `HdsInteractive`. Consumers are now required to install `ember-engines` when `@isRouteExternal` is `true`.

<small class="doc-whats-new-changelog-metadata">[#2867](https://github.com/hashicorp/design-system/pull/2867) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Layout::Flex` - Added missing export of component/subcomponent

`Layout::Grid` - Added missing export of component/subcomponent

<small class="doc-whats-new-changelog-metadata">[#2883](https://github.com/hashicorp/design-system/pull/2883)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.11.0

## 4.19.0

### Minor Changes

[4.19.0 documentation](https://hds-website-4-19-0.vercel.app/)

Use luxon 3.x

<small class="doc-whats-new-changelog-metadata">[#2839](https://github.com/hashicorp/design-system/pull/2839) - Thanks [@RobbieTheWagner](https://github.com/RobbieTheWagner) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Updated focus ring colors in interactive elements to fix a11y color contrast issues

`CodeEditor` - Updated focus ring colors in interactive elements to fix a11y color contrast issues

`SideNav` - Updated focus ring colors in interactive elements to fix a11y color contrast issues

<small class="doc-whats-new-changelog-metadata">[#2819](https://github.com/hashicorp/design-system/pull/2819)</small>

<div class="doc-whats-new-changelog-separator"></div>

Update ember-stargate to 0.5.0

<small class="doc-whats-new-changelog-metadata">[#2840](https://github.com/hashicorp/design-system/pull/2840) - Thanks [@RobbieTheWagner](https://github.com/RobbieTheWagner) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Deprecated the `SideNav` component. Use the `AppSideNav` component in combination with the `AppHeader` component as a replacement.

<small class="doc-whats-new-changelog-metadata">[#2837](https://github.com/hashicorp/design-system/pull/2837)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppHeader` - Formally published the `AppHeader` component.

<small class="doc-whats-new-changelog-metadata">[#2837](https://github.com/hashicorp/design-system/pull/2837)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppSideNav` - Formally published the `AppSideNav` component.

<small class="doc-whats-new-changelog-metadata">[#2837](https://github.com/hashicorp/design-system/pull/2837)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SuperSelect` - Updated the design to improve the experience when many items are selected.

<small class="doc-whats-new-changelog-metadata">[#2824](https://github.com/hashicorp/design-system/pull/2824)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Tag` - Updated structure to prevent inheritance overrides for font styles

<small class="doc-whats-new-changelog-metadata">[#2835](https://github.com/hashicorp/design-system/pull/2835)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Modal` - Fixed issue where conditionally disabling ability to dismiss the `Modal` breaks click outside to dismiss.

<small class="doc-whats-new-changelog-metadata">[#2846](https://github.com/hashicorp/design-system/pull/2846)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Updated Radio and Checkbox list items font weight to match other list items.

<small class="doc-whats-new-changelog-metadata">[#2854](https://github.com/hashicorp/design-system/pull/2854)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Modal` - Fixed issue with focus trap when modal is displayed inline.

<small class="doc-whats-new-changelog-metadata">[#2834](https://github.com/hashicorp/design-system/pull/2834)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.18.2

[4.18.2 documentation](https://hds-website-4-18-2.vercel.app/)

### Patch Changes

`AdvancedTable` - Improved accessibility by removing usage of `aria-expanded="mixed"` and moving the caption outside of the element with `role="grid"`.

<small class="doc-whats-new-changelog-metadata">[#2811](https://github.com/hashicorp/design-system/pull/2811)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Fixed styling issues with the sticky column and scroll indicators.

<small class="doc-whats-new-changelog-metadata">[#2821](https://github.com/hashicorp/design-system/pull/2821)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` - Added the value and `EditorView` instance as arguments for the `onLint` callback. Added the `EditorView` instance as an argument to the `onInput` callback.

`CodeEditor` - Added the value and `EditorView` instance as arguments for the `onLint` callback. Added the `EditorView` instance as an argument to the `onInput` callback.

<small class="doc-whats-new-changelog-metadata">[#2825](https://github.com/hashicorp/design-system/pull/2825)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.18.1

[4.18.1 documentation](https://hds-website-4-18-1.vercel.app/)

### Minor Changes

`Time` - Increase spacing above the dotted text decoration underline, that appears on the interactive variant, to 2px from the default.

`RichTooltip` - Increase spacing above the dotted text decoration underline to 2px from the default.

<small class="doc-whats-new-changelog-metadata">[#2745](https://github.com/hashicorp/design-system/pull/2745)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` modifier - Add `extraKeys` argument which supports custom keybinding

`CodeEditor` - Add `@extraKeys` argument which supports custom keybinding

<small class="doc-whats-new-changelog-metadata">[#2776](https://github.com/hashicorp/design-system/pull/2776)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Stepper::List` - Added `Stepper::List` component and related sub-components

`Stepper::Navigation` - Added `Stepper::Navigation` component and related sub-components

<small class="doc-whats-new-changelog-metadata">[#2714](https://github.com/hashicorp/design-system/pull/2714)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Layout::Flex` - Added `Flex` and `Flex::Item` components

<small class="doc-whats-new-changelog-metadata">[#2751](https://github.com/hashicorp/design-system/pull/2751)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` modifier - Add `cspNonce` argument and automate nonce detection

`CodeEditor` - Add `cspNonce` argument and automate nonce detection

<small class="doc-whats-new-changelog-metadata">[#2755](https://github.com/hashicorp/design-system/pull/2755)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Added `@hasStickyFirstColumn` argument and shadows to indicate to users that it is possible to scroll.

<small class="doc-whats-new-changelog-metadata">[#2770](https://github.com/hashicorp/design-system/pull/2770)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` modifier - Added `isLintingEnabled` and `onLint` named arguments. Linting is supported for the JSON language.

`CodeEditor` - Added `@isLintingEnabled` and `@onLint` arguments that are passed to the `hds-code-editor` modifier

Dependencies - Added `@codemirror/lint`

<small class="doc-whats-new-changelog-metadata">[#2715](https://github.com/hashicorp/design-system/pull/2715)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Added `onCopy` argument which accepts a callback function that will be invoked when the "copy" action succeeds.

<small class="doc-whats-new-changelog-metadata">[#2803](https://github.com/hashicorp/design-system/pull/2803)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Layout::Grid` - Added `Grid` and `Grid::Item` components

<small class="doc-whats-new-changelog-metadata">[#2756](https://github.com/hashicorp/design-system/pull/2756)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Added an expand all button to `AdvancedTable`s with nested rows and changed the structure of the component so now nested rows are always in the DOM, even when they are not visible. To add the expand all button, add `isExpandable: true` to the desired column in the `@columns` argument.

<small class="doc-whats-new-changelog-metadata">[#2688](https://github.com/hashicorp/design-system/pull/2688)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` modifier - Add language syntax highlighting support for Markdown

`CodeEditor` - Add language syntax highlighting support for Markdown

Dependencies - added @codemirror/lang-markdown

<small class="doc-whats-new-changelog-metadata">[#2740](https://github.com/hashicorp/design-system/pull/2740)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Card` - Add `tag` argument to choose between using a `div` tag (the default) or an `li` tag

<small class="doc-whats-new-changelog-metadata">[#2787](https://github.com/hashicorp/design-system/pull/2787)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

Fixed multiple loading of flight icons in engines

<small class="doc-whats-new-changelog-metadata">[#2799](https://github.com/hashicorp/design-system/pull/2799) - Thanks [@RobbieTheWagner](https://github.com/RobbieTheWagner) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Conditionally set `aria-labelledby` attribute for toggle button based on if `@ariaLabel` argument is provided.

<small class="doc-whats-new-changelog-metadata">[#2788](https://github.com/hashicorp/design-system/pull/2788)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Refactored component to use a more declarative style

<small class="doc-whats-new-changelog-metadata">[#2768](https://github.com/hashicorp/design-system/pull/2768)</small>

<div class="doc-whats-new-changelog-separator"></div>

Upgraded `prismjs` from `1.29.0` to `1.30.0`

<small class="doc-whats-new-changelog-metadata">[#2760](https://github.com/hashicorp/design-system/pull/2760)</small>

<div class="doc-whats-new-changelog-separator"></div>

Added `@embroider/util` dependency

Updated `MaskedInput`, `TextInput`, and `Textarea` to use `ensure-safe-component` helper

<small class="doc-whats-new-changelog-metadata">[#2728](https://github.com/hashicorp/design-system/pull/2728) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Always set the select checkbox column width to `min-content` so it does not grow when the `AdvancedTable` is narrower than the container

<small class="doc-whats-new-changelog-metadata">[#2761](https://github.com/hashicorp/design-system/pull/2761)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Updated the icons used in `th-button-expand` component to match designs.

<small class="doc-whats-new-changelog-metadata">[#2777](https://github.com/hashicorp/design-system/pull/2777)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` - Attached `EditorView` instance to the modified element on instantiation

`CodeEditor` - Attached `EditorView` instance to the editor element (`.hds-code-editor__editor`)

<small class="doc-whats-new-changelog-metadata">[#2779](https://github.com/hashicorp/design-system/pull/2779)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Textarea` - Fix issue with bottom margin on charcount so that a top margin is instead added to the error message, if one exists, following it

<small class="doc-whats-new-changelog-metadata">[#2783](https://github.com/hashicorp/design-system/pull/2783)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.10.0

## 4.17.1

[4.17.1 documentation](https://hds-website-4-17-1.vercel.app/)

### Minor Changes

`Tag` - Truncated any text that is longer than about 20 characters, and added a tooltip with the full text when truncation occurs

`Tag` - Added `@tooltipPlacement` argument

<small class="doc-whats-new-changelog-metadata">[#2655](https://github.com/hashicorp/design-system/pull/2655)</small>

<div class="doc-whats-new-changelog-separator"></div>

`MaskedInput` - Added support for externally controlled content masking

<small class="doc-whats-new-changelog-metadata">[#2716](https://github.com/hashicorp/design-system/pull/2716)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Badge` - Updated foreground and background colors to improve contrast for a11y

`BadgeCount` - Updated foreground color of neutral variant to improve contrast for a11y

<small class="doc-whats-new-changelog-metadata">[#2695](https://github.com/hashicorp/design-system/pull/2695)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Added `@copyButtonText` argument to `CodeBlock` and `@text` argument to the `CodeBlock::CopyButton` subcomponent to customize the `aria-label` of the Copy Button. The default label is still "Copy".

`CodeEditor` - Added `@copyButtonText` argument to customize the `aria-label` of the Copy Button. The default label is still "Copy".

<small class="doc-whats-new-changelog-metadata">[#2696](https://github.com/hashicorp/design-system/pull/2696)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` modifier - Added language syntax highlighting support for JavaScript and Rego

`CodeEditor` - Added language syntax highlighting support for JavaScript and Rego

Dependencies - added @codemirror/lang-javascript

<small class="doc-whats-new-changelog-metadata">[#2684](https://github.com/hashicorp/design-system/pull/2684)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Time` - Updated visual style to display a dotted underline when the `hasTooltip` argument is true

`RichTooltip` - Fixed Safari bug causing the dotted underline style not to display

<small class="doc-whats-new-changelog-metadata">[#2725](https://github.com/hashicorp/design-system/pull/2725)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-code-editor` modifier - Added `hasLineWrapping` named argument that sets line wrapping behavior within the code editor.

`CodeEditor` - Added `@hasLineWrapping` argument that is passed to the `hds-code-editor` modifier

<small class="doc-whats-new-changelog-metadata">[#2712](https://github.com/hashicorp/design-system/pull/2712)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Time` - Fixed type declarations

`CodeEditor` - Added missing `@lezer/highlight` dependency

<small class="doc-whats-new-changelog-metadata">[#2700](https://github.com/hashicorp/design-system/pull/2700) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-tooltip` - Changed structure of tooltip content to add a wrapper that is always in the DOM and set `aria-controls` on trigger elements for a11y improvements with toggled content

`Tooltip` - Changed structure of tooltip content to add a wrapper that is always in the DOM and set `aria-controls` on button for a11y improvements with toggled content

<small class="doc-whats-new-changelog-metadata">[#2648](https://github.com/hashicorp/design-system/pull/2648)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CopyButton` - Fixed issue preventing copying of empty string and zero number values

`CopySnippet` - Fixed issue preventing copying of empty string and zero number values

<small class="doc-whats-new-changelog-metadata">[#2685](https://github.com/hashicorp/design-system/pull/2685)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeEditor` - Fixed import path for `HdsCodeEditorModifierSignature`

<small class="doc-whats-new-changelog-metadata">[#2681](https://github.com/hashicorp/design-system/pull/2681)</small>

<div class="doc-whats-new-changelog-separator"></div>

Swapped unmaintained `ember-composable-helpers` with `@nullvoxpopuli/ember-composable-helpers`

<small class="doc-whats-new-changelog-metadata">[#2493](https://github.com/hashicorp/design-system/pull/2493) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

Migrated our tooling from yarn to pnpm and updated our JavaScript compiler configuration

Updated `decorator-transforms` from `1.2.1` to `2.3.0`

<small class="doc-whats-new-changelog-metadata">[#2671](https://github.com/hashicorp/design-system/pull/2671) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Refactored keyboard navigation to a new modifier `hds-advanced-table-cell` for reusability, and disabled default behavior for arrow keys in focused cells.

<small class="doc-whats-new-changelog-metadata">[#2659](https://github.com/hashicorp/design-system/pull/2659)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Removed unused `updateAriaLabel` function and event listener

<small class="doc-whats-new-changelog-metadata">[#2690](https://github.com/hashicorp/design-system/pull/2690)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tooltip` - Removed style import from Tippy.js, copied arrow positioning styles into component styles

<small class="doc-whats-new-changelog-metadata">[#2726](https://github.com/hashicorp/design-system/pull/2726)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.16.0

[4.16.0 documentation](https://hds-website-4-16-0.vercel.app/)

### Minor Changes

`Table` - Updated the visual design of `Table` cells by adding borders, making them more distinguishable when spanning rows or columns.

<small class="doc-whats-new-changelog-metadata">[#2588](https://github.com/hashicorp/design-system/pull/2588)</small>

<div class="doc-whats-new-changelog-separator"></div>

Added global tokens for border radius

<small class="doc-whats-new-changelog-metadata">[#2595](https://github.com/hashicorp/design-system/pull/2595)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeEditor` - Added new CodeMirror 6 supported code editor component

`hds-code-editor` modifier - Added new code editor modifier which converts the element it is applied to into a CodeMirror 6 code editor

<small class="doc-whats-new-changelog-metadata">[#2573](https://github.com/hashicorp/design-system/pull/2573)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SuperSelect` - Added `searchFieldPosition="before-options"` to fix a11y issue in `Multiple` component

<small class="doc-whats-new-changelog-metadata">[#2612](https://github.com/hashicorp/design-system/pull/2612)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AdvancedTable` - Added `AdvancedTable` component and related sub-components

Add `tabbable` as a dependency.

<small class="doc-whats-new-changelog-metadata">[#2615](https://github.com/hashicorp/design-system/pull/2615)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

Upgraded the following dependencies:

- `@ember/render-modifiers` from `2.0.5` to `2.1.0`
- `@ember/addon-shim` from `1.8.7` to `1.9.0`
- `clipboard-polyfill` from `4.1.0` to `4.1.1`
- `decorator-transforms` from `1.1.0` to `1.2.1`
- `ember-a11y-refocus` from `4.1.3` to `4.1.4`
- `ember-element-helper` from `0.8.5` to `0.8.6`
- `ember-focus-trap` from `1.1.0` to `1.1.1`
- `ember-modifier` from `4.1.0` to `4.2.0`
- `ember-power-select` from `8.2.0` to `8.6.2`
- `sass` from `1.69.5` to `1.83.0`

<small class="doc-whats-new-changelog-metadata">[#2625](https://github.com/hashicorp/design-system/pull/2625)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Fixed the `aria-labels` for select row and select all checkboxes so they do not change based on the state of the checkbox.

<small class="doc-whats-new-changelog-metadata">[#2596](https://github.com/hashicorp/design-system/pull/2596)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Breadcrumb` - Implemented `aria-controls` in `Breadcrumb::Truncation` for a11y improvements with toggled content from `PopoverPrimitive`

`Dropdown` - Implemented `aria-controls` in `Dropdown::Toggle::Button` for a11y improvements with toggled content from `PopoverPrimitive`

`PopoverPrimitive` - Implemented `aria-controls` in toggle element for a11y improvements with toggled content

`RichTooltip` - Removed explicitly setting `aria-controls` in `RichTooltip::Toggle` as it is now set through the `PopoverPrimitive`

<small class="doc-whats-new-changelog-metadata">[#2639](https://github.com/hashicorp/design-system/pull/2639)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - Implement `aria-controls` in tab for a11y improvements with toggled content

<small class="doc-whats-new-changelog-metadata">[#2637](https://github.com/hashicorp/design-system/pull/2637)</small>

<div class="doc-whats-new-changelog-separator"></div>

Shifted our supported version of Node.js from `16* || >= 18` to `>=18`

<small class="doc-whats-new-changelog-metadata">[#2619](https://github.com/hashicorp/design-system/pull/2619)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Fixed `z-index` bug which caused the focus ring of the toggle icon to not be visible when the component was nested in a container.

<small class="doc-whats-new-changelog-metadata">[#2638](https://github.com/hashicorp/design-system/pull/2638)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@2.3.0
- @hashicorp/flight-icons@3.9.0

## 4.15.0

[4.15.0 documentation](https://hds-website-4-15-0.vercel.app/)

### Minor Changes

`Time` - Added Time component, Time service, and related libraries (`luxon` 2.x or 3.x and `ember-concurrency`)

<small class="doc-whats-new-changelog-metadata">[#2515](https://github.com/hashicorp/design-system/pull/2515)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Exposed the index of the `@each` loop over the `@model` as `rowIndex`

<small class="doc-whats-new-changelog-metadata">[#2554](https://github.com/hashicorp/design-system/pull/2554)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Dropdown` - Fixed an issue with the `ToggleIcon` to make the focus ring visible on mouse click

<small class="doc-whats-new-changelog-metadata">[#2574](https://github.com/hashicorp/design-system/pull/2574)</small>

<div class="doc-whats-new-changelog-separator"></div>

`PageHeader` - Fixed issue with extra space below title when no metadata is present

<small class="doc-whats-new-changelog-metadata">[#2581](https://github.com/hashicorp/design-system/pull/2581)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Alert` - Removed default color applied to the `hds-alert__text` container (text color is applied via `@color` argument)

<small class="doc-whats-new-changelog-metadata">[#2598](https://github.com/hashicorp/design-system/pull/2598)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Fixed `ResizeObserver`-related errors in tests
`RichTooltip` - Fixed `ResizeObserver`-related errors in tests

Upgraded `@floating-ui/dom` to `1.6.12`

<small class="doc-whats-new-changelog-metadata">[#2550](https://github.com/hashicorp/design-system/pull/2550)</small>

<div class="doc-whats-new-changelog-separator"></div>

Fixed deprecated Sass syntax (`map-get` replaced with `map.get` and `@import` with `@use`)

<small class="doc-whats-new-changelog-metadata">[#2594](https://github.com/hashicorp/design-system/pull/2594)</small>

<div class="doc-whats-new-changelog-separator"></div>

`IconTile` - Updated visual design of `IconTile` to make it distinguishable from secondary `IconButton`.

<small class="doc-whats-new-changelog-metadata">[#2555](https://github.com/hashicorp/design-system/pull/2555)</small>

<div class="doc-whats-new-changelog-separator"></div>

Aligned private properties of the HDS modifiers to follow a standardized notation

- `hds-anchored-position`
- `hds-register-event`
- `hds-tooltip`

<small class="doc-whats-new-changelog-metadata">[#2583](https://github.com/hashicorp/design-system/pull/2583)</small>

<div class="doc-whats-new-changelog-separator"></div>

Aligned private class properties to follow a standardized notation

- `Accordion`
- `Alert`
- `AppHeader`
- `AppSideNav`
- `CodeBlock`
- `Copy::Button`
- `Copy::Snippet`
- `DisclosurePrimitive`
- `Dropdown`
- `Flyout`
- `Form::SuperSelect`
- `Form::TextInput`
- `Icon`
- `Modal`
- `Pagination::Compact`
- `Pagination::Numbered`
- `PopoverPrimitive`
- `Reveal`
- `Table`
- `Tabs`

<small class="doc-whats-new-changelog-metadata">[#2562](https://github.com/hashicorp/design-system/pull/2562)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@2.2.2
- @hashicorp/flight-icons@3.8.0

## 4.14.0

[4.14.0 documentation](https://hds-website-4-14-0.vercel.app/)

### Minor Changes

`Dropdown` - Added `@matchToggleWidth` argument

<small class="doc-whats-new-changelog-metadata">[#2530](https://github.com/hashicorp/design-system/pull/2530)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-clipboard` - Added `clipboard-polyfill` to support product usage in non-secure environments; this impacts `Copy::Button`, `Copy::Snippet`, `CodeBlock`, and `MaskedInput`

<small class="doc-whats-new-changelog-metadata">[#2525](https://github.com/hashicorp/design-system/pull/2525)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`SideNav` - Made a11y related improvements including:

- Changed `List::Title` to h3 & added visually hidden h2 to AppSideNav
- Replaced aria-label for `ToggleButton` with aria-labelledby and aria-expanded

<small class="doc-whats-new-changelog-metadata">[#2536](https://github.com/hashicorp/design-system/pull/2536)</small>

<div class="doc-whats-new-changelog-separator"></div>

Fixed instances where arguments are passed into tracked properties at declaration:

- `MaskedInput`
- `TextInput`
- `Pagination::Compact`
- `Pagination::Numbered`
- `SideNav`
- `Table`
- `Table::ThSelectable`
- `Tabs`

<small class="doc-whats-new-changelog-metadata">[#2488](https://github.com/hashicorp/design-system/pull/2488)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Fixed bug with hidden panels sometimes causing unnecessary overflow scrolling

<small class="doc-whats-new-changelog-metadata">[#2535](https://github.com/hashicorp/design-system/pull/2535)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Fixed the height of the chevron in `ToggleButton`

<small class="doc-whats-new-changelog-metadata">[#2522](https://github.com/hashicorp/design-system/pull/2522)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.13.1

### Patch Changes

`Hds::Flyout`

- Fixed error in `Description` and `Body` subcomponents, caused by not passing the `args` argument from the constructor to `super`

`Hds::Modal`

- Fixed error in `Body` subcomponent, caused by not passing the `args` argument from the constructor to `super`

<small class="doc-whats-new-changelog-metadata">[#2511](https://github.com/hashicorp/design-system/pull/2511)</small>

<div class="doc-whats-new-changelog-separator"></div>

Export TypeScript signatures for all components and modifiers

<small class="doc-whats-new-changelog-metadata">[#2499](https://github.com/hashicorp/design-system/pull/2499) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Alert` - Removed `role="alert"` and `aria-live="polite"` attributes from Alerts with color set to "neutral" or "highlight"

<small class="doc-whats-new-changelog-metadata">[#2500](https://github.com/hashicorp/design-system/pull/2500)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.13.0

[4.13.0 documentation](https://hds-website-4-13-0.vercel.app/)

### Minor Changes

`Modal` - Added `@returnFocusTo` argument to control where the browser focus is returned once the modal is closed

`Flyout` - Added `@returnFocusTo` argument to control where the browser focus is returned once the flyout is closed

<small class="doc-whats-new-changelog-metadata">[#2497](https://github.com/hashicorp/design-system/pull/2497)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Added `@lineNumberStart` option to set custom starting number for line numbering

<small class="doc-whats-new-changelog-metadata">[#2467](https://github.com/hashicorp/design-system/pull/2467)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SuperSelect::Multiple` - Added `@resultCountMessage` argument to enable override

<small class="doc-whats-new-changelog-metadata">[#2502](https://github.com/hashicorp/design-system/pull/2502)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Dropdown`

- Fixed content being preserved in the DOM when closed
- Removed the `@isOpen` yielded argument
- Added `@preserveContentInDom` to optionally control rendering of the content

<small class="doc-whats-new-changelog-metadata">[#2490](https://github.com/hashicorp/design-system/pull/2490)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Modal` - Fixed `isDismissDisabled` functionality
`Flyout` - Removed `isDismissDisabled` from signature (not an actual argument)

<small class="doc-whats-new-changelog-metadata">[#2485](https://github.com/hashicorp/design-system/pull/2485)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SuperSelect` - Update the the default state of selected list items to `Foreground` / `Primary` to match other list items and the `Dropdown`.

<small class="doc-whats-new-changelog-metadata">[#2479](https://github.com/hashicorp/design-system/pull/2479)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SuperSelect::Multiple` - Fixed placeholder style and layout

<small class="doc-whats-new-changelog-metadata">[#2473](https://github.com/hashicorp/design-system/pull/2473)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Update the color of the text and icons in the selected state checkmark list item to match the styling of the ListItems (`Radio` and `Checkbox`).

<small class="doc-whats-new-changelog-metadata">[#2464](https://github.com/hashicorp/design-system/pull/2464)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Decoupled the display of line numbers from `highlightLines`

<small class="doc-whats-new-changelog-metadata">[#2474](https://github.com/hashicorp/design-system/pull/2474)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Fixed dropdown content not being preserved when interacted with

<small class="doc-whats-new-changelog-metadata">[#2506](https://github.com/hashicorp/design-system/pull/2506)</small>

<div class="doc-whats-new-changelog-separator"></div>

Upgraded `ember-style-modifier` to `4.4.0`

<small class="doc-whats-new-changelog-metadata">[#2482](https://github.com/hashicorp/design-system/pull/2482)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.7.0

## 4.12.0

[4.12.0 documentation](https://hds-website-4-12-0.vercel.app/)

### Minor Changes

`Dropdown` - Made the `isOpen` state available in the yielded block

<small class="doc-whats-new-changelog-metadata">[#2443](https://github.com/hashicorp/design-system/pull/2443)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`IconTile` - Fixed `@color` argument type signature

<small class="doc-whats-new-changelog-metadata">[#2452](https://github.com/hashicorp/design-system/pull/2452)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Interactive` - Aligned types with `LinkTo`

<small class="doc-whats-new-changelog-metadata">[#2455](https://github.com/hashicorp/design-system/pull/2455)</small>

<div class="doc-whats-new-changelog-separator"></div>

`DialogPrimitive` - Fixed issue with `box-sizing` inheritance

`Modal`/`Flyout` - Updated `box-sizing` inheritance via `DialogPrimitive` fix

<small class="doc-whats-new-changelog-metadata">[#2442](https://github.com/hashicorp/design-system/pull/2442)</small>

<div class="doc-whats-new-changelog-separator"></div>

Upgraded `eslint-plugin-ember` to `12.2.0`

`AppFooter`, `AppFrame`, `SideNav` - refactored subcomponents to use `TemplateOnlyComponent` instead of empty classes.

<small class="doc-whats-new-changelog-metadata">[#2427](https://github.com/hashicorp/design-system/pull/2427)</small>

<div class="doc-whats-new-changelog-separator"></div>

`RadioCard`

- Fixed selected border colors to match Figma and interactive states.
- Updated icon, label, and description colors to use `disabled-foreground` when
  the `RadioCard` is disabled.

<small class="doc-whats-new-changelog-metadata">[#2445](https://github.com/hashicorp/design-system/pull/2445)</small>

<div class="doc-whats-new-changelog-separator"></div>

`MaskedInput` - Changed textarea `scrollbar-width` to "thin" to reduce overlap with toggle button.

`CodeBlock` - Changed textarea `scrollbar-width` to "thin" to reduce overlap with copy button.

<small class="doc-whats-new-changelog-metadata">[#2444](https://github.com/hashicorp/design-system/pull/2444)</small>

<div class="doc-whats-new-changelog-separator"></div>

Removed `ember-keyboard` dependency

<small class="doc-whats-new-changelog-metadata">[#2460](https://github.com/hashicorp/design-system/pull/2460)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - Fixed signatures for subcomponents

<small class="doc-whats-new-changelog-metadata">[#2448](https://github.com/hashicorp/design-system/pull/2448)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Fixed signatures for subcomponents

<small class="doc-whats-new-changelog-metadata">[#2449](https://github.com/hashicorp/design-system/pull/2449)</small>

<div class="doc-whats-new-changelog-separator"></div>

`BadgeCount` - updated the type of the `text` argument to allow numbers

`TooltipButton` - made the default value for the `placement` argument `'top'` and fixed the type definition

`TooltipButton` - made the `extraTippyOptions` argument optional and allowed to be a partial object

<small class="doc-whats-new-changelog-metadata">[#2447](https://github.com/hashicorp/design-system/pull/2447)</small>

<div class="doc-whats-new-changelog-separator"></div>

`DialogPrimitive` - added a guard so the yielded close function is always defined

<small class="doc-whats-new-changelog-metadata">[#2453](https://github.com/hashicorp/design-system/pull/2453)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::SideNav` - Fixed a couple of bugs where SideNav would remain inert when no longer minimized (or would not be inert when minimized)

<small class="doc-whats-new-changelog-metadata">[#2431](https://github.com/hashicorp/design-system/pull/2431) - Thanks [@DingoEatingFuzz](https://github.com/DingoEatingFuzz) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Button` - aligned type names to convention

<small class="doc-whats-new-changelog-metadata">[#2457](https://github.com/hashicorp/design-system/pull/2457)</small>

<div class="doc-whats-new-changelog-separator"></div>

Fixed issue with icon sprite not initiated

<small class="doc-whats-new-changelog-metadata">[#2433](https://github.com/hashicorp/design-system/pull/2433) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.11.0

[4.11.0 documentation](https://hds-website-4-11-0.vercel.app/)

### Minor Changes

`Hds::Table`

- Added `@selectableColumnKey` argument which enables sorting by row selection state and specifies the corresponding selection state key.

`Hds::Table::Tr`

- Added `@selectableColumnKey` argument which enables sorting by row selection state and specifies the corresponding selection state key.
- Added `@sortBySelectedOrder` argument which determines the state of the sort button in the selected item column.
- Added `@onClickSortBySelected` argument which is the callback for the sort button in the selected item column.

`Hds::Table::ThSelectable`

- Added `@onClickSortBySelected` argument which is the callback for the sort button in the selected item column.
- Added `@sortBySelectedOrder` argument which determines the state of the sort button in the selected item column.

<small class="doc-whats-new-changelog-metadata">[#2387](https://github.com/hashicorp/design-system/pull/2387)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`SideNav`: remove usage of `Ember.testing` because it is deprecated.

<small class="doc-whats-new-changelog-metadata">[#2403](https://github.com/hashicorp/design-system/pull/2403)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CopyButton` - Updated icon colors to match interactive states of the component.

`CopySnippet` - Prevent the color from adhering to interactive states when
status is `success` or `error`.

`Stepper` - Updated to use semantic token over palette token in
`Stepper::Indicator::Step`.

<small class="doc-whats-new-changelog-metadata">[#2419](https://github.com/hashicorp/design-system/pull/2419)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown`, `RadioCard`, `SuperSelect`, `Stepper`, `Table` - Fixed optional arguments in signatures

<small class="doc-whats-new-changelog-metadata">[#2421](https://github.com/hashicorp/design-system/pull/2421)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown::Toggle::Chevron` - fix subcomponent signature

`hds-clipboard` modifier - extend error when copy action fails

<small class="doc-whats-new-changelog-metadata">[#2418](https://github.com/hashicorp/design-system/pull/2418)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Pagination::Compact` & `Hds::Pagination::Numbered`

- Added assertion and more strict typing to ensure that a routing argument (`@model`, `@models`, or `@route`) are present when using `@onPageChange` to control routing.

<small class="doc-whats-new-changelog-metadata">[#2400](https://github.com/hashicorp/design-system/pull/2400)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.6.0

## 4.10.0

[4.10.0 documentation](https://hds-website-4-10-0.vercel.app/)

### Minor Changes

`SuperSelect` - Converted components to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2356](https://github.com/hashicorp/design-system/pull/2356)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Added a default value of "#hds-main" for `a11yRefocusSkipTo`
`AppHeader` - Changed default value of `a11yRefocusSkipTo` from "#main" to "#hds-main"
`AppFrame::Main` - Added id with default value of "hds-main" which `a11yRefocusSkipTo` points to

<small class="doc-whats-new-changelog-metadata">[#2399](https://github.com/hashicorp/design-system/pull/2399)</small>

<div class="doc-whats-new-changelog-separator"></div>

simplify components reexports and add types reexports

- update `HdsCard` reexport to reflect correct component name `HdsCardContainer`

<small class="doc-whats-new-changelog-metadata">[#2320](https://github.com/hashicorp/design-system/pull/2320) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppHeader`:

- Hide the closed menu content in mobile view using CSS instead of conditionally rendering/not rendering the menu content.
- Add `NavigationNarrator` with associated arguments to provide a "skip link".

<small class="doc-whats-new-changelog-metadata">[#2306](https://github.com/hashicorp/design-system/pull/2306)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Accordion`: Added `@titleTag` argument

`Alert`: Added `@tag` argument to `[A].Title`

`ApplicationState`: Updated the `@titleTag` argument to only accept `"div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"`

`CodeBlock`: Added `@tag` argument to `[CB].Title`

`DialogPrimitive`: Added `@titleTag` argument to `DialogPrimitive::Header`

<small class="doc-whats-new-changelog-metadata">[#2353](https://github.com/hashicorp/design-system/pull/2353)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Pagination` - Converted component to Typescript

<small class="doc-whats-new-changelog-metadata">[#2174](https://github.com/hashicorp/design-system/pull/2174)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::SideNav::Header::IconButton` - Deprecate the component. Use the [`Hds::Button` component](/components/button) with `isIconOnly` set to `true` as a replacement.

<small class="doc-whats-new-changelog-metadata">[#2354](https://github.com/hashicorp/design-system/pull/2354)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown::ListItem::Interactive`

- Adds a yielded block.
- Yields the `Hds::Badge` component.
- Deprecates the `@text` argument.

New codemod: `v4/dropdown-list-item-interactive`

- Converts `Dropdown::ListItem::Interactive` `@text` arguments to content within a yielded block.

<small class="doc-whats-new-changelog-metadata">[#2347](https://github.com/hashicorp/design-system/pull/2347)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Flyout`: Changed the HTML element wrapping the tagline and title from a `<div>` to a `<h1>`

`Modal`: Changed the HTML element wrapping the tagline and title from a `<div>` to a `<h1>`

<small class="doc-whats-new-changelog-metadata">[#2358](https://github.com/hashicorp/design-system/pull/2358)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - added `@enableCollisionDetection` and `@isOpen` arguments

`Dropdown`, `Breadcrumb::Truncation` - replaced `MenuPrimitive` with `PopoverPrimitive`

`MenuPrimitive` - marked as deprecated and will be removed in the next major version

<small class="doc-whats-new-changelog-metadata">[#2309](https://github.com/hashicorp/design-system/pull/2309)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppFrame`:

- Modified sticky/fixed position to turn off when viewport height is under 480px in height
- Refactored styles to make `AppFrame` responsible for sticky/fixed layout of `SideNav` and `AppHeader`

`AppHeader`:

- Styled inoperable actions as disabled (which occurs when the `SideNav` is expanded in mobile view)

`SideNav`:

- Removed the `withAppHeader` option as it is no longer needed.

<small class="doc-whats-new-changelog-metadata">[#2299](https://github.com/hashicorp/design-system/pull/2299)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Converted component and sub-components to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2297](https://github.com/hashicorp/design-system/pull/2297)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`DismissButton`, `RadioCard::Group`, `RichTooltip::Toggle` - Type safety fixes

<small class="doc-whats-new-changelog-metadata">[#2401](https://github.com/hashicorp/design-system/pull/2401)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` & `AppHeader` - Fixed styling issue to prevent `Button` and `Dropdown` nested within another `Dropdown` from inheriting dark theme.

<small class="doc-whats-new-changelog-metadata">[#2359](https://github.com/hashicorp/design-system/pull/2359)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppHeader` - Fixed issue with mobile menu to prevent tabbing to hidden content and hiding it from assistive technology when closed.

<small class="doc-whats-new-changelog-metadata">[#2351](https://github.com/hashicorp/design-system/pull/2351)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Breadcrumb`: fix background hover color for `Breadcrumb::Truncation`

<small class="doc-whats-new-changelog-metadata">[#2397](https://github.com/hashicorp/design-system/pull/2397)</small>

<div class="doc-whats-new-changelog-separator"></div>

Update `ember-a11y-refocus` to `4.1.3`

<small class="doc-whats-new-changelog-metadata">[#2352](https://github.com/hashicorp/design-system/pull/2352)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Accordion`: changed the default name of the `Accordion` item toggles. Now, they are labelled by the content in the `Accordion` title.

<small class="doc-whats-new-changelog-metadata">[#2383](https://github.com/hashicorp/design-system/pull/2383)</small>

<div class="doc-whats-new-changelog-separator"></div>

`BadgeCount`: updated the color tokens to use palette tokens.

<small class="doc-whats-new-changelog-metadata">[#2392](https://github.com/hashicorp/design-system/pull/2392)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Badge`: update the color tokens to use palette tokens.

<small class="doc-whats-new-changelog-metadata">[#2393](https://github.com/hashicorp/design-system/pull/2393)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Stepper::Indicator::Task`: Updated palette tokens to use semantic tokens.

<small class="doc-whats-new-changelog-metadata">[#2390](https://github.com/hashicorp/design-system/pull/2390)</small>

<div class="doc-whats-new-changelog-separator"></div>

Migrated all internal instances of `FlightIcon` to `Hds::Icon`

<small class="doc-whats-new-changelog-metadata">[#2339](https://github.com/hashicorp/design-system/pull/2339)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@2.2.1

## 4.9.0

[4.9.0 documentation](https://hds-website-4-9-0.vercel.app/)

### Minor Changes

`Icon` - Added component:

`Hds::Icon` is meant to replace usage of the `FlightIcon` component from `ember-flight-icons`.

- Displays `block` by default. (`FlightIcon` displays `inline-block` by default)
- Exposes a set of predefined "foreground" colors via the `@color` argument

<small class="doc-whats-new-changelog-metadata">[#2207](https://github.com/hashicorp/design-system/pull/2207)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock`: Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2313](https://github.com/hashicorp/design-system/pull/2313)</small>

<div class="doc-whats-new-changelog-separator"></div>

`TooltipButton`: Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2317](https://github.com/hashicorp/design-system/pull/2317)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.8.0

[4.8.0 documentation](https://hds-website-4-8-0.vercel.app/)

### Minor Changes

`AppHeader` - Added new component.

`SideNav` - Added new `withAppHeader` option.

<small class="doc-whats-new-changelog-metadata">[#2161](https://github.com/hashicorp/design-system/pull/2161)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Converted component to TypeScript

`MenuPrimitive` - Converted component to TypeScript

`TooltipModifier` - Converted modifier to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2272](https://github.com/hashicorp/design-system/pull/2272)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Breadcrumb` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2304](https://github.com/hashicorp/design-system/pull/2304)</small>

<div class="doc-whats-new-changelog-separator"></div>

`ApplicationState`:

- Spacing and alignment updates
- New `@align` (`left` (default), `center`) argument for aligning content
- Added new yielded `Media` child component

`ApplicationState::Header`:

- The header now supports an optional `@titleTag` argument that can override the default title element (`div`)

`ApplicationState::Footer`:

- The footer now yields `Button` and `Dropdown` components as well as `LinkStandalone`
- The visual separator has been removed to modernize the component’s visual look

<small class="doc-whats-new-changelog-metadata">[#2274](https://github.com/hashicorp/design-system/pull/2274)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SegmentedGroup` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2094](https://github.com/hashicorp/design-system/pull/2094)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

Add explicit `ember-get-config` dependency for use in the icon sprite initializer

<small class="doc-whats-new-changelog-metadata">[#2283](https://github.com/hashicorp/design-system/pull/2283)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@2.2.0

## 4.7.0

[4.7.0 documentation](https://hds-website-4-7-0.vercel.app/)

### Minor Changes

`FileInput`, `MaskedInput`, `Select`, `TextInput`, `Textarea` - Converted to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2244](https://github.com/hashicorp/design-system/pull/2244)</small>

<div class="doc-whats-new-changelog-separator"></div>

Loads the `hds-icon` sprite in the `components` package, and ensures it is only loaded once.

<small class="doc-whats-new-changelog-metadata">[#2198](https://github.com/hashicorp/design-system/pull/2198)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::TextInput` - added support for `"month"`, `"week"`, and `"tel"` input types

<small class="doc-whats-new-changelog-metadata">[#2251](https://github.com/hashicorp/design-system/pull/2251)</small>

<div class="doc-whats-new-changelog-separator"></div>

`DialogPrimitive` - Added set of utility "dialog" sub-components to act as primitives for `Modal` and `Flyout` (and to be used as standalone subcomponents if needed)

`Modal` - Replaced internal subcomponents to use the `DialogPrimitive` components.

`Flyout` - Replaced internal subcomponents to use the `DialogPrimitive` components.

<small class="doc-whats-new-changelog-metadata">[#2211](https://github.com/hashicorp/design-system/pull/2211)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Modal`: Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2258](https://github.com/hashicorp/design-system/pull/2258)</small>

<div class="doc-whats-new-changelog-separator"></div>

Converted form primitives to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2217](https://github.com/hashicorp/design-system/pull/2217)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Checkbox`, `Radio`, `RadioCard`, `Toggle` - Converted components to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2240](https://github.com/hashicorp/design-system/pull/2240)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Flyout`: Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2264](https://github.com/hashicorp/design-system/pull/2264)</small>

<div class="doc-whats-new-changelog-separator"></div>

`DialogPrimitive` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2249](https://github.com/hashicorp/design-system/pull/2249)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Badge`: updated `@text` argument type to include numbers.

<small class="doc-whats-new-changelog-metadata">[#2270](https://github.com/hashicorp/design-system/pull/2270)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.5.0
- @hashicorp/ember-flight-icons@5.1.3

## 4.6.0

[4.6.0 documentation](https://hds-website-4-6-0.vercel.app/)

### Minor Changes

`PopoverPrimitive` - Converted to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2105](https://github.com/hashicorp/design-system/pull/2105)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-register-event` (internal modifier) - Converted to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2103](https://github.com/hashicorp/design-system/pull/2103)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-anchored-position` (internal modifier) - Converted to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2104](https://github.com/hashicorp/design-system/pull/2104)</small>

<div class="doc-whats-new-changelog-separator"></div>

`RichTooltip` - Converted to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2106](https://github.com/hashicorp/design-system/pull/2106)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Accordion` - added `@forceState`, `@onClickToggle` arguments
`Accordion` - added `close` function to `<:content>`

<small class="doc-whats-new-changelog-metadata">[#2147](https://github.com/hashicorp/design-system/pull/2147)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Accordion` - added `@size`, `@type`, and `@isStatic` arguments. While previously equivalent to `large` the default `Accordion` size is now `medium`; use `@size="large"` to maintain the original appearance.

<small class="doc-whats-new-changelog-metadata">[#2156](https://github.com/hashicorp/design-system/pull/2156)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

Removed `popover-polyfill` dependency and instantiating code

<small class="doc-whats-new-changelog-metadata">[#2214](https://github.com/hashicorp/design-system/pull/2214)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.5.3

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@5.1.2

## 4.5.2

**🚨 Caution: This version has been deprecated 🚨**

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@5.1.1

## 4.5.1

**🚨 Caution: This version has been deprecated 🚨**

### Patch Changes

Fixed syncing of `<F.Error />` ids to the `aria-describedby` attribute

<small class="doc-whats-new-changelog-metadata">[#2177](https://github.com/hashicorp/design-system/pull/2177) - Thanks [@fivetanley](https://github.com/fivetanley) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.5.0

**🚨 Caution: This version has been deprecated 🚨**

[4.5.0 documentation](https://hds-website-4-5-0.vercel.app/)

### Minor Changes

`SideNav` - Adds option to exclude query params from route transition/focus management

<small class="doc-whats-new-changelog-metadata">[#2158](https://github.com/hashicorp/design-system/pull/2158)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2168](https://github.com/hashicorp/design-system/pull/2168)</small>

<div class="doc-whats-new-changelog-separator"></div>

`ApplicationState` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2155](https://github.com/hashicorp/design-system/pull/2155)</small>

<div class="doc-whats-new-changelog-separator"></div>

`PageHeader` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2160](https://github.com/hashicorp/design-system/pull/2160)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2102](https://github.com/hashicorp/design-system/pull/2102)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Alert` - Fixed typo in `HdsAlertTypes`

<small class="doc-whats-new-changelog-metadata">[#2154](https://github.com/hashicorp/design-system/pull/2154)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown::Toggle::Icon` - Fixed inconsistencies with `Button` including:

- Added missing text color
- Reduced icon sizes

<small class="doc-whats-new-changelog-metadata">[#2178](https://github.com/hashicorp/design-system/pull/2178)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@5.1.0

## 4.4.1

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@5.0.3

## 4.4.0

[4.4.0 documentation](https://hds-website-4-4-0.vercel.app/)

### Minor Changes

Added re-export entries for TypeScript components

<small class="doc-whats-new-changelog-metadata">[#2129](https://github.com/hashicorp/design-system/pull/2129) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`CopyButton` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2100](https://github.com/hashicorp/design-system/pull/2100)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CopySnippet` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2100](https://github.com/hashicorp/design-system/pull/2100)</small>

<div class="doc-whats-new-changelog-separator"></div>

`hds-clipboard` - Converted modifier to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2120](https://github.com/hashicorp/design-system/pull/2120)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

Template Registry - Removed redundant entries

<small class="doc-whats-new-changelog-metadata">[#2127](https://github.com/hashicorp/design-system/pull/2127)</small>

<div class="doc-whats-new-changelog-separator"></div>

Fix missing TypeScript `declaration`

<small class="doc-whats-new-changelog-metadata">[#2122](https://github.com/hashicorp/design-system/pull/2122) - Thanks [@aklkv](https://github.com/aklkv) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::BadgeCount` - Fixed typo in template registry declaration

<small class="doc-whats-new-changelog-metadata">[#2124](https://github.com/hashicorp/design-system/pull/2124)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.3.0

[4.3.0 documentation](https://hds-website-4-3-0.vercel.app/)

### Minor Changes

Added `hds-register-event` modifier (for internal use)

<small class="doc-whats-new-changelog-metadata">[#2017](https://github.com/hashicorp/design-system/pull/2017)</small>

<div class="doc-whats-new-changelog-separator"></div>

Published type declarations

<small class="doc-whats-new-changelog-metadata">[#2004](https://github.com/hashicorp/design-system/pull/2004) - Thanks [@natmegs](https://github.com/natmegs) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tag` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2089](https://github.com/hashicorp/design-system/pull/2089)</small>

<div class="doc-whats-new-changelog-separator"></div>

`IconTile` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2033](https://github.com/hashicorp/design-system/pull/2033)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SuperSelect` - added components for single and multiple selection based on [PowerSelect](https://ember-power-select.com/)

<small class="doc-whats-new-changelog-metadata">[#2022](https://github.com/hashicorp/design-system/pull/2022)</small>

<div class="doc-whats-new-changelog-separator"></div>

`BadgeCount` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2088](https://github.com/hashicorp/design-system/pull/2088)</small>

<div class="doc-whats-new-changelog-separator"></div>

`DisclosurePrimitive` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2025](https://github.com/hashicorp/design-system/pull/2025) - Thanks [@WenInCode](https://github.com/WenInCode) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

Added `hds-anchored-position` modifier (for internal use)

<small class="doc-whats-new-changelog-metadata">[#2020](https://github.com/hashicorp/design-system/pull/2020)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppFooter` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2096](https://github.com/hashicorp/design-system/pull/2096)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Stepper::Step::Indicator` - Converted to TypeScript
`Stepper::Task::Indicator` - Converted to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2115](https://github.com/hashicorp/design-system/pull/2115)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Badge` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#1991](https://github.com/hashicorp/design-system/pull/1991) - Thanks [@chris-hut](https://github.com/chris-hut) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Accordion` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2101](https://github.com/hashicorp/design-system/pull/2101)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - Added support for trailing icon in `ListItem::Interactive` subcomponent

<small class="doc-whats-new-changelog-metadata">[#2042](https://github.com/hashicorp/design-system/pull/2042)</small>

<div class="doc-whats-new-changelog-separator"></div>

`PopoverPrimitive` - Added low-level (internal) headless component to provide anchoring, collision detection, and popover functionalities.

`RichTooltip` - Added component to provide tooltips that can contain more complex and structured content.

<small class="doc-whats-new-changelog-metadata">[#2069](https://github.com/hashicorp/design-system/pull/2069)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppFrame` - converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2098](https://github.com/hashicorp/design-system/pull/2098)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Toast` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2023](https://github.com/hashicorp/design-system/pull/2023) - Thanks [@WenInCode](https://github.com/WenInCode) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Reveal` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2097](https://github.com/hashicorp/design-system/pull/2097)</small>

<div class="doc-whats-new-changelog-separator"></div>

`ButtonSet` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2099](https://github.com/hashicorp/design-system/pull/2099)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Separator` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2114](https://github.com/hashicorp/design-system/pull/2114)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Alert::Description` - Fixed typo in `template-registry.ts` file declaration

<small class="doc-whats-new-changelog-metadata">[#2090](https://github.com/hashicorp/design-system/pull/2090)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown::ListItem::Checkmark` - Fixed issue with leading icon spacing

<small class="doc-whats-new-changelog-metadata">[#2084](https://github.com/hashicorp/design-system/pull/2084)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tooltip` - Fixed max-width applied to the "bubble" (it was `304px`, now is `280px` per design specs)

<small class="doc-whats-new-changelog-metadata">[#2050](https://github.com/hashicorp/design-system/pull/2050)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Alert`, `Badge`, `BadgeCount`, `Button`, `Card::Container`, `DisclosurePrimitive`, `DismissButton`, `IconTile`, `Interactive`, `Link::Inline`, `Link::Standalone`, `Tag`, `Text` - Standardized class names and signatures

<small class="doc-whats-new-changelog-metadata">[#2108](https://github.com/hashicorp/design-system/pull/2108)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Re-mapped class-name variable to color-blue

<small class="doc-whats-new-changelog-metadata">[#2027](https://github.com/hashicorp/design-system/pull/2027)</small>

<div class="doc-whats-new-changelog-separator"></div>

Fixed default export warnings by preventing `types.js` files from being reexported

<small class="doc-whats-new-changelog-metadata">[#2030](https://github.com/hashicorp/design-system/pull/2030) - Thanks [@WenInCode](https://github.com/WenInCode) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - Fixed issue with z-index of the active tab "indicator"

<small class="doc-whats-new-changelog-metadata">[#2085](https://github.com/hashicorp/design-system/pull/2085)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@5.0.2

## 4.2.0

[4.2.0 documentation](https://hds-website-4-2-0.vercel.app/)

### Minor Changes

`Link::Inline` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2013](https://github.com/hashicorp/design-system/pull/2013) - Thanks [@WenInCode](https://github.com/WenInCode) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Card` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#1997](https://github.com/hashicorp/design-system/pull/1997) - Thanks [@valeriia-ruban](https://github.com/valeriia-ruban) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Link::Standalone` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#2010](https://github.com/hashicorp/design-system/pull/2010) - Thanks [@WenInCode](https://github.com/WenInCode) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Text` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#1984](https://github.com/hashicorp/design-system/pull/1984) - Thanks [@natmegs](https://github.com/natmegs) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Alert` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#1990](https://github.com/hashicorp/design-system/pull/1990) - Thanks [@WenInCode](https://github.com/WenInCode) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Modal`, `Flyout` - Fixed flaky tests by running `@ember/test-waiters` in all environments

<small class="doc-whats-new-changelog-metadata">[#2011](https://github.com/hashicorp/design-system/pull/2011) - Thanks [@fivetanley](https://github.com/fivetanley) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.1.2

### Patch Changes

This version is a re-release of `@hashicorp/design-system-components@4.1.1` containing the missing pre-compiled CSS

<div class="doc-whats-new-changelog-separator"></div>

## 4.1.1

**🚨 Caution: This version is missing the pre-compiled CSS 🚨**

You can still use this version if you import styles as Sass and don't require `design-system-components.css`

### Patch Changes

`Flyout` - Fixed issue with Sass operators failing in old versions of Sass

<small class="doc-whats-new-changelog-metadata">[#1994](https://github.com/hashicorp/design-system/pull/1994)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.1.0

[4.1.0 documentation](https://hds-website-4-1-0.vercel.app/)

### Minor Changes

`DismissButton` - Converted component to TypeScript

<small class="doc-whats-new-changelog-metadata">[#1980](https://github.com/hashicorp/design-system/pull/1980) - Thanks [@WenInCode](https://github.com/WenInCode) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

Added image error handling to `Dropdown::Toggle::Icon`

<small class="doc-whats-new-changelog-metadata">[#1906](https://github.com/hashicorp/design-system/pull/1906) - Thanks [@cbfx](https://github.com/cbfx) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

Enable glint

<small class="doc-whats-new-changelog-metadata">[#1976](https://github.com/hashicorp/design-system/pull/1976) - Thanks [@natmegs](https://github.com/natmegs) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

Upgraded ember-truth-helpers from 3.1.1 to 4.0.3

<small class="doc-whats-new-changelog-metadata">[#1976](https://github.com/hashicorp/design-system/pull/1976) - Thanks [@natmegs](https://github.com/natmegs) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

Added missing aria-label support to copy-snippet component.

<small class="doc-whats-new-changelog-metadata">[#1963](https://github.com/hashicorp/design-system/pull/1963)</small>

<div class="doc-whats-new-changelog-separator"></div>

Removed `dialog-polyfill` dependency

<small class="doc-whats-new-changelog-metadata">[#1977](https://github.com/hashicorp/design-system/pull/1977)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@2.1.0
- @hashicorp/ember-flight-icons@5.0.1

## 4.0.0

[4.0.0 documentation](https://hds-website-4-0-0.vercel.app/)

### Major Changes

Converted Ember packages to v2 addon format.

To migrate, update Sass configuration in `ember-cli-build.js` to include the paths for `ember-flight-icons` and `design-system-components`:

```js
sassOptions: {
  precision: 4,
  includePaths: [
    './node_modules/@hashicorp/design-system-tokens/dist/products/css',
    './node_modules/@hashicorp/ember-flight-icons/dist/styles',
    './node_modules/@hashicorp/design-system-components/dist/styles',
  ],
},
```

Alternatively, you can import the CSS by adding this configuration in `ember-cli-build.js`.

```js
app.import(
  "node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components.css"
);
```

<small class="doc-whats-new-changelog-metadata">[#1872](https://github.com/hashicorp/design-system/pull/1872)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::CharacterCount` - refactored the component, removing `onInsert` callback and adding use `@value` argument

To migrate:

- for standalone `Form::CharacterCount` instances, you must pass in a `@value` argument representing the value of the referenced input
- when used as a contextual component `F.CharacterCount` in `Form::[MaskedInput|TextInput|Textarea]::Field` make sure the form control is updating the associated `@value` on input (usually using `on "input" (fn this.updateValue)` function)

<small class="doc-whats-new-changelog-metadata">[#1896](https://github.com/hashicorp/design-system/pull/1896) - Thanks [@meirish](https://github.com/meirish) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Multiple updates to the main component and its subcomponents:

- Updated table headers to support tooltips
- Updated visual treatment and location of the "sort" button in the table headers
- Refactored CSS code to simplify usage of `hds-table`-related class names

`Table::ThSort`:

- Added support for tooltip via the `@tooltip` argument
- Updated visual treatment and location of the "sort" button
- Updated DOM structure of the `<th>` content
- Remove class `hds-table__th-sort--button-content`
- Replaced class `hds-table__th-sort` with classes `hds-table__th` + `hds-table__th--sort`
- Replaced class `hds-table__th-sort--text--[left|center|right]` with `hds-table__th--align-[left|center|right]`
- Renamed `onClick` callback to `onClickSort`

`Table::Th`:

- Added support for tooltip via the `@tooltip` argument
- Updated DOM structure of the `<th>` content
- Replaced class `hds-table__th--text-[left|center|right]` with `hds-table__th--align-[left|center|right]`

`Table::Td`:

- Replaced class `hds-table__td--text-[left|center|right]` with `hds-table__td--align-[left|center|right]`

To migrate run the codemod `v4/table` (see [readme file](https://github.com/hashicorp/design-system/tree/main/packages/codemods/transforms/v4/table))

<small class="doc-whats-new-changelog-metadata">[#1860](https://github.com/hashicorp/design-system/pull/1860)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Pagination` - Removed handling of query parameters from `onPageSizeChange` function for `Pagination::Numbered`

_Unfortunately, it's not possible to cover this breaking change with a codemod. Consumers should review their usage of the `onPageSizeChange` callback and, if necessary, implement the persistence of the "page number" and "page size" values via query parameters themselves._

<small class="doc-whats-new-changelog-metadata">[#1913](https://github.com/hashicorp/design-system/pull/1913)</small>

<div class="doc-whats-new-changelog-separator"></div>

Renamed namespaced contextual components as follows:

- `Alert::Link::Standalone` to `Alert::LinkStandalone`
- `ApplicationState::Footer::Link::Standalone` to `ApplicationState::Footer::LinkStandalone`
- `Form::Checkbox::Group::Checkbox::Field` to `Checkbox::Group::CheckboxField`
- `Form::Radio::Group::Radio::Field` to `Form::Radio::Group::RadioField`
- `Form::Toggle::Group::Toggle::Field` to `Form::Toggle::Group::ToggleField`
- `Toast::Link::Standalone` to `Toast::LinkStandalone`

<small class="doc-whats-new-changelog-metadata">[#1884](https://github.com/hashicorp/design-system/pull/1884)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Minor Changes

`Table` - Added multi-select functionality

<small class="doc-whats-new-changelog-metadata">[#1859](https://github.com/hashicorp/design-system/pull/1859)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - Added `@size` argument with new "large" size variant

<small class="doc-whats-new-changelog-metadata">[#1937](https://github.com/hashicorp/design-system/pull/1937)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Dropdown` - Fixed dropdown list missing an accessible name when Checkmark items were passed in

<small class="doc-whats-new-changelog-metadata">[#1910](https://github.com/hashicorp/design-system/pull/1910)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Flyout` - Reduced gap between Flyout and edge of screen from `40px` to half of the minimized SideNav width in medium view

<small class="doc-whats-new-changelog-metadata">[#1957](https://github.com/hashicorp/design-system/pull/1957)</small>

<div class="doc-whats-new-changelog-separator"></div>

Removed `ember-deep-tracked` dependency that was not used

<small class="doc-whats-new-changelog-metadata">[#1950](https://github.com/hashicorp/design-system/pull/1950)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Fixed issue with navigation elements remaining interactive when minimized

<small class="doc-whats-new-changelog-metadata">[#1909](https://github.com/hashicorp/design-system/pull/1909)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@5.0.0
- @hashicorp/design-system-tokens@2.0.0

## 3.6.0

[3.6.0 documentation](https://hds-website-3-6-0.vercel.app/)

### Minor Changes

_Since this is an update brand colors and product icons, we consider this a `minor` version release_

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@1.11.0
- @hashicorp/ember-flight-icons@4.1.0

## 3.5.0

[3.5.0 documentation](https://hds-website-3-5-0.vercel.app/)

### Minor Changes

`IconTile` - updated component adding support for `vault-radar` product

<small class="doc-whats-new-changelog-metadata">[#1904](https://github.com/hashicorp/design-system/pull/1904)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`SideNav::List::Title`, `SideNav::List::BackLink`, `SideNav::List::Link`: fixed issue with long text strings without spaces not wrapping

<small class="doc-whats-new-changelog-metadata">[#1899](https://github.com/hashicorp/design-system/pull/1899)</small>

<div class="doc-whats-new-changelog-separator"></div>

Added `hds-` prefix to Sass variables for component styles (where missing).

<small class="doc-whats-new-changelog-metadata">[#1903](https://github.com/hashicorp/design-system/pull/1903)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - removed `@cached` decorator and the associated `ember-cached-decorator-polyfill`

<small class="doc-whats-new-changelog-metadata">[#1905](https://github.com/hashicorp/design-system/pull/1905)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Fixed the default token color in the syntax highlighting theme.

<small class="doc-whats-new-changelog-metadata">[#1893](https://github.com/hashicorp/design-system/pull/1893)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@1.10.0
- @hashicorp/ember-flight-icons@4.0.6

## 3.4.1

### Patch Changes

`Modal` - Removed `close` event listener on destroy
`Flyout` - Removed `close` event listener on destroy

<small class="doc-whats-new-changelog-metadata">[#1887](https://github.com/hashicorp/design-system/pull/1887)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Fixed issues with dynamic content, compile warning, and line number alignment

<small class="doc-whats-new-changelog-metadata">[#1853](https://github.com/hashicorp/design-system/pull/1853)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SegmentedGroup` - Fixed issue with border-radius of single child element being overridden

<small class="doc-whats-new-changelog-metadata">[#1892](https://github.com/hashicorp/design-system/pull/1892)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 3.4.0

### Minor Changes

`Button` - Added `@isInline` argument

<small class="doc-whats-new-changelog-metadata">[#1854](https://github.com/hashicorp/design-system/pull/1854)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Added support for `baseline` vertical alignment

<small class="doc-whats-new-changelog-metadata">[#1861](https://github.com/hashicorp/design-system/pull/1861)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`AppFooter` - Changed visual alignment from right-aligned to centered.

<small class="doc-whats-new-changelog-metadata">[#1867](https://github.com/hashicorp/design-system/pull/1867)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tooltip` - Fixed issue with text alignment, which was inherited from the parent container (now it's always left aligned).

<small class="doc-whats-new-changelog-metadata">[#1869](https://github.com/hashicorp/design-system/pull/1869)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - Fixed subcomponents' backing-class names

<small class="doc-whats-new-changelog-metadata">[#1883](https://github.com/hashicorp/design-system/pull/1883)</small>

<div class="doc-whats-new-changelog-separator"></div>

`AppFooter` - Updated default accessibility URL to <https://hashicorp.com/accessibility>

<small class="doc-whats-new-changelog-metadata">[#1811](https://github.com/hashicorp/design-system/pull/1811)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::Fieldset` as consumed by `Form::Checkbox::Group`, `Form::Radio::Group`, `Form::RadioCard::Group`, and `Form::Toggle::Group` - Changed spacing between `legend` and content from 4px to 8px

<small class="doc-whats-new-changelog-metadata">[#1856](https://github.com/hashicorp/design-system/pull/1856)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@4.0.5

## 3.3.0

### Minor Changes

`Form::CharacterCount` - Added new component
`Form::Field` - Added `CharacterCount` contextual component
`Form::MaskedInput::Field` - Added `CharacterCount` contextual component
`Form::TextInput::Field` - Added `CharacterCount` contextual component
`Form::Textarea::Field` - Added `CharacterCount` contextual component

<small class="doc-whats-new-changelog-metadata">[#1802](https://github.com/hashicorp/design-system/pull/1802)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Button` - Updated DOM structure to contain only `span` elements

`Dropdown` - Updated button elements DOM structure to contain only `span` elements

`Link::Standalone` - Updated DOM structure to contain only `span` elements

<small class="doc-whats-new-changelog-metadata">[#1840](https://github.com/hashicorp/design-system/pull/1840)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 3.2.0

### Minor Changes

`CodeBlock` - Added language support for Ruby syntax

<small class="doc-whats-new-changelog-metadata">[#1834](https://github.com/hashicorp/design-system/pull/1834)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Updated `@columns` object to support `isVisuallyHidden` argument

- `Table::Th` - Updated to support `isVisuallyHidden` argument

<small class="doc-whats-new-changelog-metadata">[#1819](https://github.com/hashicorp/design-system/pull/1819)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`SideNav` - Reduced the width of `SideNav::ToggleButton`

<small class="doc-whats-new-changelog-metadata">[#1807](https://github.com/hashicorp/design-system/pull/1807)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@4.0.4

## 3.1.2

### Patch Changes

`AppFooter` – Fixed predefined statuses by replacing `critical` with `outage` and prevented `statusIconColor` from being overridden by `status`

<small class="doc-whats-new-changelog-metadata">[#1790](https://github.com/hashicorp/design-system/pull/1790)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Fixed visible scrollbar in collapsed SideNav when scroll bar is set to be always visible

<small class="doc-whats-new-changelog-metadata">[#1786](https://github.com/hashicorp/design-system/pull/1786)</small>

<div class="doc-whats-new-changelog-separator"></div>

`CodeBlock` - Fixed `@hasLineWrapping` style to make long strings wrap when they overflow the container

<small class="doc-whats-new-changelog-metadata">[#1798](https://github.com/hashicorp/design-system/pull/1798)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 3.1.1

### Patch Changes

Added `@ember/string` as a direct dependency

<small class="doc-whats-new-changelog-metadata">[#1782](https://github.com/hashicorp/design-system/pull/1782)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@4.0.3

## 3.1.0

### Minor Changes

`CodeBlock` - Added new component

<small class="doc-whats-new-changelog-metadata">[#1687](https://github.com/hashicorp/design-system/pull/1687)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

Upgraded the following dependencies:

- `@ember/test-waiters` from `3.0.2` to `3.1.0`
- `ember-cli-htmlbars` from `6.2.0` to `6.3.0`
- `ember-focus-trap` from `1.0.2` to `1.1.0`
- `ember-keyboard` from `8.2.0` to `8.2.1`
- `sass` from `1.62.1` to `1.69.5`

<small class="doc-whats-new-changelog-metadata">[#1756](https://github.com/hashicorp/design-system/pull/1756)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Breadcrumb` - Added support for external links

<small class="doc-whats-new-changelog-metadata">[#1774](https://github.com/hashicorp/design-system/pull/1774)</small>

<div class="doc-whats-new-changelog-separator"></div>

Upgraded the following dependencies:

- `ember-cached-decorator-polyfill` from `0.1.4` to `1.0.2`
- `ember-cli-babel` from `7.26.11` to `8.2.0`
- `ember-cli-sass` from `10.0.1` to `11.0.1`
- `ember-composable-helpers` from `4.5.0` to `5.0.0`

<small class="doc-whats-new-changelog-metadata">[#1761](https://github.com/hashicorp/design-system/pull/1761)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Button` - Fixed `HdsInteractiveSignature` type import

<small class="doc-whats-new-changelog-metadata">[#1769](https://github.com/hashicorp/design-system/pull/1769)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@4.0.2

## 3.0.2

### Patch Changes

Explicitly added `ember-element-helper` as dependency for the `components` package

<small class="doc-whats-new-changelog-metadata">[#1751](https://github.com/hashicorp/design-system/pull/1751)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 3.0.1

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@4.0.1

## 3.0.0

### Major Changes

Dropped support for Node 14

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::VisibilityToggle` - Added component as a form base element

`Form::TextInput::Field` - Added `Form::VisibilityToggle` to password inputs (controlled via `@hasVisibilityToggle` - Notice that this is set to be visible by default now)

`Form::MaskedInput` - Refactored to use `Form::VisibilityToggle`

`Form::MaskedInput` - Renamed `@isMasked` to `@isContentMasked`

To migrate:

- in `Form::MaskedInput` instances replace `@isMasked` arguments with `@isContentMasked`

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` – Removed `@listPosition` `left` and `right` (use `bottom-left` and `bottom-right`, respectively).

To migrate:

- in `Dropdown` instances:
  - replace `@listPosition="left"` with `@listPosition="bottom-left"`
  - replace `@listPosition="right"` with `@listPosition="bottom-right"`

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - Renamed `extraBefore/After` generic containers to `ExtraBefore/After` (uppercase `E`).

To migrate:

- rename all the `extraBefore/After` instances yielded within the `SideNav` component to `ExtraBefore/After`

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::RadioCard` - Remove the `@layout` property.

`Form::RadioCard::Group` - Repurposed the `@layout` property to either `horizontal` (default) or `vertical`

To migrate `Form::RadioCard` and `Form::RadioCard::Group` instances without encountering visual changes:

- make sure all instances with `@layout="fixed"` have a `@maxWidth` defined, then remove the `@layout="fixed"` definition
- remove all `@layout="fluid"` definitions

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Minor Changes

`Dropdown::ListItem::CopyItem` - Changed defaults for `@color` (now `secondary`) and `@isTruncated` (now `true`).

_Consumers should review the defaults values for this (sub)component in their codebases, to make sure they match the intended visual designs._

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Button`, `Interactive` - Converted components to TypeScript.

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Copy::Snippet` - Fixed the way in which “width/full-width” is applied to the component + Internal update to the “truncation” implementation.

- the component is not full-width anymore by default (the width now fits the content); use `@isFullWidth={{true}}` to have a full-width layout
- the internal class name `hds-copy-snippet__text--truncated` has been changed to `hds-copy-snippet--is-truncated` (and moved)

_Consumers should review the pages where this component is used to make sure its width matches the intended visual designs (in case, use the `@isFullWidth` argument to control its full-width). In case they're using the `hds-copy-snippet__text--truncated` class name, they should also update their code to adapt to the new implementation._

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

Removed `ember-cli-clipboard` as dependency and introduced a custom `hds-clipboard` modifier (using the web [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API))

`Copy::Button` - Multiple updates:

- replaced third-party `clipboard` modifier with `hds-clipboard`
- removed `@container` argument (not needed anymore, it was used in the third party library as a hack to account for focus trapping and focus shifting)
- added `@onSuccess/onError` callbacks

`Copy::Snippet` - Multiple updates:

- replaced third-party `clipboard` modifier with `hds-clipboard`
- added `@onSuccess/onError` callbacks
- `Dropdown::ListItem::CopyItem`
  - the change to the underlying `Copy::Snippet` has fixed an issue with the focus being lost on copy (causing the dropdown to close on copy)

_Consumers should remove the `@container` argument from all the instances of `Copy::Button` (not needed anymore) and double check that the `Copy::Button/Snippet` instances work exactly as before._

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

`Copy::Snippet` - Fixed background colors for different states according to Figma specs (main change is the default/base background is now transparent, not white).

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Form::MaskedInput` - Changed copy logic for `CopyButton` used inside the component.

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Accordion` - Replaced internal text styling (using `Text` component).

`ApplicationState` - Replaced internal text styling (using `Text` component).

`Copy::Snippet` - Replaced internal text styling (using `Text` component).

`Dropdown` - Replaced internal text styling (using `Text` component).

`Form:**` - Replaced internal text styling (using `Text` component).

`Flyout` - Replaced internal text styling (using `Text` component).

`Modal` - Replaced internal text styling (using `Text` component).

`PageHeader` - Replaced internal text styling (using `Text` component).

`Pagination` - Replaced internal text styling (using `Text` component).

`Stepper` - Replaced internal text styling (using `Text` component).

`Tag` - Replaced internal text styling (using `Text` component).

_No impact is expected on the consumers' applications._

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Button` - Applied explicit text alignment to the text to fix alignment on "link" buttons.

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@4.0.0

## 2.15.0

### Minor Changes

`Button` - updated horizontal padding of icon-only variant

`Dropdown::ToggleIcon` - updated sizing of the "small" variant to match the height of the "small" variant `Button`

<small class="doc-whats-new-changelog-metadata">[#1690](https://github.com/hashicorp/design-system/pull/1690)</small>

### Patch Changes

`Pagination` - Removed handling of query parameters from `onPageSizeChange` function.

<small class="doc-whats-new-changelog-metadata">[#1736](https://github.com/hashicorp/design-system/pull/1736)</small>

_Notice: while technically this is a breaking change, we consider this a fast-follow fix for the previous release._

## 2.14.2

### Patch Changes

`Pagination` - updated the logic for “Compact” variant to expose `@currentPageSize` and handle controlled/uncontrolled changes

<small class="doc-whats-new-changelog-metadata">[#1724](https://github.com/hashicorp/design-system/pull/1724)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - replace `assert` with `warn` in `setIndicator` function

<small class="doc-whats-new-changelog-metadata">[#1716](https://github.com/hashicorp/design-system/pull/1716)</small>

## 2.14.1

### Patch Changes

`Tabs` - Fixed issue with `@isSelected` dynamically changed within `#each` loops

<small class="doc-whats-new-changelog-metadata">[#1709](https://github.com/hashicorp/design-system/pull/1709)</small>

## 2.14.0

### Minor Changes

`Pagination::Compact` - Added option to show "SizeSelector" element

<small class="doc-whats-new-changelog-metadata">[#1700](https://github.com/hashicorp/design-system/pull/1700)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Tabs` - Refactored logic for `Tabs` component + `Tab/Panel` sub-components to support more complex use cases:

- introduced `@selectedTabIndex` argument to control the "selected" tab from the consuming application, e.g. via query params (effort spearheaded by @MiniHeyd)
- fixed issue with nested tabs not initializing the "selected" indicator correctly
- fixed issue with dynamic tab content not updating the "selected" indicator correctly

<small class="doc-whats-new-changelog-metadata">[#1688](https://github.com/hashicorp/design-system/pull/1688)</small>

## 2.13.0

### Minor Changes

`AppFooter` - Added new component

<small class="doc-whats-new-changelog-metadata">[#1623](https://github.com/hashicorp/design-system/pull/1623)</small>

<div class="doc-whats-new-changelog-separator"></div>

`SideNav` - add `@isCollapsible` (to control if users can collapse the sidenav on 'desktop' viewports) and `@isMinimized` (to control the default state on 'desktop' viewports) arguments

<small class="doc-whats-new-changelog-metadata">[#1630](https://github.com/hashicorp/design-system/pull/1630)</small>

### Patch Changes

`Tag` - Updated padding for dismiss button for WCAG conformance

<small class="doc-whats-new-changelog-metadata">[#1696](https://github.com/hashicorp/design-system/pull/1696)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Link::Standalone` – increase target size

<small class="doc-whats-new-changelog-metadata">[#1678](https://github.com/hashicorp/design-system/pull/1678)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@1.9.0

## 2.12.2

### Patch Changes

`PowerSelect` - fix style overrides when the list is positioned above

<small class="doc-whats-new-changelog-metadata">[#1655](https://github.com/hashicorp/design-system/pull/1655)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Text` - Fixed issue with whitespace adding extra underline when used in links (eg. inside a `Link::Inline`)

<small class="doc-whats-new-changelog-metadata">[#1652](https://github.com/hashicorp/design-system/pull/1652)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@3.1.3

## 2.12.1

### Patch Changes

`Pagination` - Bugfix `aria-label` on the component

<small class="doc-whats-new-changelog-metadata">[#1627](https://github.com/hashicorp/design-system/pull/1627)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Dropdown` - changed `@height` property to use `max-height` instead of a fixed height.

<small class="doc-whats-new-changelog-metadata">[#1635](https://github.com/hashicorp/design-system/pull/1635)</small>

## 2.12.0

### Minor Changes

`IconTile` - updated component to include `vault-secrets` product option

<small class="doc-whats-new-changelog-metadata">[#1640](https://github.com/hashicorp/design-system/pull/1640)</small>

### Patch Changes

`Text` - Removed leftover `console.log` from code

<small class="doc-whats-new-changelog-metadata">[#1615](https://github.com/hashicorp/design-system/pull/1615)</small>

<div class="doc-whats-new-changelog-separator"></div>

Refactored the layout of the `Dropdown` checkbox and radio inputs to make the gap between the inputs and the associated text, as well as the icon and count, clickable.

<small class="doc-whats-new-changelog-metadata">[#1618](https://github.com/hashicorp/design-system/pull/1618)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Link::Standalone` - Changed font-weight from 500 to 400 to match font-weight of `Hds::Button`.

<small class="doc-whats-new-changelog-metadata">[#1617](https://github.com/hashicorp/design-system/pull/1617)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Stepper` - removed some CSS declarations that were not used/applied

<small class="doc-whats-new-changelog-metadata">[#1628](https://github.com/hashicorp/design-system/pull/1628)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-tokens@1.8.0
- @hashicorp/ember-flight-icons@3.1.2

## 2.11.0

### Minor Changes

`Hds::Text` - Added new `Text` component

<small class="doc-whats-new-changelog-metadata">[#1490](https://github.com/hashicorp/design-system/pull/1490)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Form::MaskedInput` - Add `hasCopyButton` argument

<small class="doc-whats-new-changelog-metadata">[#1587](https://github.com/hashicorp/design-system/pull/1587)</small>

### Patch Changes

`Form::Indicator` - Remove aria-hidden from the "optional" `<span>`

<small class="doc-whats-new-changelog-metadata">[#1577](https://github.com/hashicorp/design-system/pull/1577) - Thanks [@DingoEatingFuzz](https://github.com/DingoEatingFuzz) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

Removed `ember-named-blocks-polyfill` as all consumers of HDS are on Ember 3.25 or later now. This can be installed locally if it is still needed.

<small class="doc-whats-new-changelog-metadata">[#1606](https://github.com/hashicorp/design-system/pull/1606)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Alert`, `Toast`: Fixed an issue with anchor tag color styles within Description that had been overriding `Hds::Link` color; changed the default color for HTML links within Description to "neutral" to better align with existing guidance for links in the actions and improve accessible contrast.

<small class="doc-whats-new-changelog-metadata">[#1576](https://github.com/hashicorp/design-system/pull/1576)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@3.1.1

## 2.10.0

### Minor Changes

Added new `FileInput` component

<small class="doc-whats-new-changelog-metadata">[#1535](https://github.com/hashicorp/design-system/pull/1535)</small>

### Patch Changes

Remove unnecessary export of `hds/copy/index.js`

<small class="doc-whats-new-changelog-metadata">[#1570](https://github.com/hashicorp/design-system/pull/1570)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Tabs` - Fix missing tab indicator when used in Modal or Flyout

<small class="doc-whats-new-changelog-metadata">[#1575](https://github.com/hashicorp/design-system/pull/1575)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Copy::Snippet` - Added support for container and updated API docs

<small class="doc-whats-new-changelog-metadata">[#1567](https://github.com/hashicorp/design-system/pull/1567)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Tabs` - Fixed tabs and panels misbehaving on route change

<small class="doc-whats-new-changelog-metadata">[#1571](https://github.com/hashicorp/design-system/pull/1571)</small>

<div class="doc-whats-new-changelog-separator"></div>

<small class="doc-whats-new-changelog-metadata">[#1568](https://github.com/hashicorp/design-system/pull/1568)</small>

`Copy::Button`, `Copy::Snippet` - Updated error icon

<div class="doc-whats-new-changelog-separator"></div>

`Hds::SegmentedGroup` - Prevent `border-radius` from interfering with underlying elements

<small class="doc-whats-new-changelog-metadata">[#1555](https://github.com/hashicorp/design-system/pull/1555)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Table` - Resolved issue where `ThSort` was not supporting right-aligned text properly

<small class="doc-whats-new-changelog-metadata">[#1565](https://github.com/hashicorp/design-system/pull/1565)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@3.1.0

## 2.9.0

### Minor Changes

Added the `Hds::CopyButton` and `Hds::CopySnippet` components.

<small class="doc-whats-new-changelog-metadata">[#1488](https://github.com/hashicorp/design-system/pull/1488)</small>

### Patch Changes

Adjusted closing brace on copywrite headers to avoid terminal noise

<small class="doc-whats-new-changelog-metadata">[#1539](https://github.com/hashicorp/design-system/pull/1539)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Modal` - reduce test flakiness around closing Modal when using `@ember/test-helpers`

<small class="doc-whats-new-changelog-metadata">[#1549](https://github.com/hashicorp/design-system/pull/1549) - Thanks [@fivetanley](https://github.com/fivetanley) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

Fix Embroider warnings caused by incorrect export of internal utility functions

<small class="doc-whats-new-changelog-metadata">[#1530](https://github.com/hashicorp/design-system/pull/1530)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Flyout` - reduce test flakiness around closing Flyout when using `@ember/test-helpers`

<small class="doc-whats-new-changelog-metadata">[#1552](https://github.com/hashicorp/design-system/pull/1552)</small>

<div class="doc-whats-new-changelog-separator"></div>

`Hds::Form::Field` - Fix error message for unexpected `@layout` values

<small class="doc-whats-new-changelog-metadata">[#1529](https://github.com/hashicorp/design-system/pull/1529)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/ember-flight-icons@3.0.9

## 2.8.1

### Patch Changes

- [#1516](https://github.com/hashicorp/design-system/pull/1516) [`f2192cad7`](https://github.com/hashicorp/design-system/commit/f2192cad73b6d966bf813f54dcee02e157c76392) Thanks [@didoo](https://github.com/didoo)! - `Hds::SideNav` - Fixed issue with links still being interactive (even if visually hidden) when the navigation is "minimized"

- [#1518](https://github.com/hashicorp/design-system/pull/1518) [`5fd48e31e`](https://github.com/hashicorp/design-system/commit/5fd48e31ed3241ee19a8226bb28fa04ad79479c5) Thanks [@didoo](https://github.com/didoo)! - `Hds::PageHeader` - Fixed overflow of non-breaking text for `title`, `subtitle` and `description` elements

- [#1494](https://github.com/hashicorp/design-system/pull/1494) [`169a85b63`](https://github.com/hashicorp/design-system/commit/169a85b6348649bc0e2411f3ab6f6a086eecb692) Thanks [@natmegs](https://github.com/natmegs)! - `Hds::Form::TextInput` - Add support for `datetime-local` type

- [#1500](https://github.com/hashicorp/design-system/pull/1500) [`b6c2867a4`](https://github.com/hashicorp/design-system/commit/b6c2867a4b7d1c183e9a17d16208ed12ce1aa43f) Thanks [@didoo](https://github.com/didoo)! - `Hds::SideNav` - updated layout styling for the `SideNav::List::Title` element

- [#1520](https://github.com/hashicorp/design-system/pull/1520) [`7f7ec22c3`](https://github.com/hashicorp/design-system/commit/7f7ec22c387ac9df05d05de31e5c2b45d6324777) Thanks [@alex-ju](https://github.com/alex-ju)! - Upgrade `ember-style-modifier` to `3.0.1`

- Updated dependencies [[`fd5953633`](https://github.com/hashicorp/design-system/commit/fd595363396c2e6672025ab8f9c3df7d2a3fce53)]:
  - @hashicorp/design-system-tokens@1.7.0
  - @hashicorp/ember-flight-icons@3.0.8

## 2.8.0

### Minor Changes

- [#1492](https://github.com/hashicorp/design-system/pull/1492) [`a17e5b2ac`](https://github.com/hashicorp/design-system/commit/a17e5b2acf66493ccbb68a623a3b7ba2fd5ab5a8) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - `Hds::Card` - Updated default value of `@overflow` argument to `"visible"` to address an area of consumer confusion and better support the most common use cases.

  Technically, this is a breaking change as it will require consumers relying upon the previous `hidden` default value to now manually set the value. The result of not setting the a `hidden` value can cause square edges of some images to "stick out" and overlap the rounded corners of the Card itself. We considered this to be a fairly minor, low-impact issue however which would not affect functionality or usability.

- [#1452](https://github.com/hashicorp/design-system/pull/1452) [`c277d0366`](https://github.com/hashicorp/design-system/commit/c277d036673cf572c00ebf5b8b35b424c0b057fd) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Form::TextInput` - Add loading state on "search" type

- [#1468](https://github.com/hashicorp/design-system/pull/1468) [`b0a766ccf`](https://github.com/hashicorp/design-system/commit/b0a766ccf5357dd6f0e8dfb68d8c1ee823e76b50) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Hds::Form::MaskedInput` component

- [#1423](https://github.com/hashicorp/design-system/pull/1423) [`5ac340c8c`](https://github.com/hashicorp/design-system/commit/5ac340c8c3a3adab388704067578cf419e2e2f10) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add `Hds::Accordion` component

### Patch Changes

- [#1466](https://github.com/hashicorp/design-system/pull/1466) [`cdda7ae8e`](https://github.com/hashicorp/design-system/commit/cdda7ae8eaf553bd32ec9e3944edf08fe352caf4) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::PageHeader` – Set position to 'relative'

- [#1470](https://github.com/hashicorp/design-system/pull/1470) [`0ea2ccfd0`](https://github.com/hashicorp/design-system/commit/0ea2ccfd0303149014de768c715ebb53dffe6c4c) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Textarea` – Fix border and text color for readonly state

- [#1456](https://github.com/hashicorp/design-system/pull/1456) [`b4237e73b`](https://github.com/hashicorp/design-system/commit/b4237e73b3701d94e92556ad0108b8a38bef312d) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Modal` – Prevent `onClose` callback function invocation when `isDismissDisabled` is `true`

- [#1469](https://github.com/hashicorp/design-system/pull/1469) [`ef98ed4ed`](https://github.com/hashicorp/design-system/commit/ef98ed4ed188520fd69a0090ab93d7d0c44e634c) Thanks [@didoo](https://github.com/didoo)! - Set the `font-weight` of the `button` mixin explicitly to `regular` instead of relying on inheritance (components using this mixin: `Button`, `Dropdown::ToggleButton` and soon `Accordion`) - No visual difference expected

- Updated dependencies [[`b2ec25b39`](https://github.com/hashicorp/design-system/commit/b2ec25b399ba9aad5f8ae0b1f18a1bef9a6543e0)]:
  - @hashicorp/design-system-tokens@1.6.0
  - @hashicorp/ember-flight-icons@3.0.7

## 2.7.1

### Patch Changes

- [#1438](https://github.com/hashicorp/design-system/pull/1438) [`ae852e7f8`](https://github.com/hashicorp/design-system/commit/ae852e7f83da72c62ee7791f89ac5c4a9e6bc7c6) Thanks [@didoo](https://github.com/didoo)! - `TooltipButton` - added `text-align: inherit` to the "button" element

- [#1444](https://github.com/hashicorp/design-system/pull/1444) [`5a4d036e1`](https://github.com/hashicorp/design-system/commit/5a4d036e1dd349dfde1b1f8e278d332fac7abe7e) Thanks [@MelSumner](https://github.com/MelSumner)! - Internal accessibility tweaks for dropdown component

- [#1395](https://github.com/hashicorp/design-system/pull/1395) [`e6e0c22c5`](https://github.com/hashicorp/design-system/commit/e6e0c22c538e381f4a97428dc35cf1295ce6ae21) Thanks [@alex-ju](https://github.com/alex-ju)! - Upgraded Ember.js to latest stable release 4.12, including upgrades to:

  - `ember-auto-import` from `2.6.0` to `2.6.3`
  - `ember-cli-htmlbars` from `6.1.0` to `6.2.0`

  Upgraded the following dependencies:

  - `ember-focus-trap` from `1.0.1` to `1.0.2`
  - `ember-keyboard` from `8.1.0` to `8.2.0`
  - `ember-truth-helpers` from `3.0.0` to `3.1.1`
  - `sass` from `1.58.3` to `1.62.1`

  Shifted our supported version of Node.js from `12.* || 14.* || >= 16` to `14.* || 16.* || >= 18`

- [#1425](https://github.com/hashicorp/design-system/pull/1425) [`921aa03b9`](https://github.com/hashicorp/design-system/commit/921aa03b95f56da21e794ee62ecc96019f5c4bb7) Thanks [@didoo](https://github.com/didoo)! - `Table` - Set `min-height` instead of `height` for the table head cells + Updated the cells' internal padding to align with the design specs in Figma

- [#1433](https://github.com/hashicorp/design-system/pull/1433) [`9aa5291d1`](https://github.com/hashicorp/design-system/commit/9aa5291d187bc867baf7c069c9dd17856cb5f79f) Thanks [@didoo](https://github.com/didoo)! - - Updated CSS code of components to use flex `gap`

  - Fixed an issue with `Hds::Sidenav::Link` that was generating an empty node

  This will lead to a minimal visual impact on some edge cases of `Alert/Toast` (multiple description items) and `SideNav` (text + generic content)

- [#1426](https://github.com/hashicorp/design-system/pull/1426) [`1f8886a2d`](https://github.com/hashicorp/design-system/commit/1f8886a2d5117d74a0dddd4bca4a09d9fcedc8da) Thanks [@MelSumner](https://github.com/MelSumner)! - Style tweaks to standalone link

- [#1434](https://github.com/hashicorp/design-system/pull/1434) [`eadefc4bd`](https://github.com/hashicorp/design-system/commit/eadefc4bdb4e5fd6c110a7be1d7d9aa720695678) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix scroll management on `Hds::Modal` and `Hds::Flyout` resulting in stray `style` attribute on `<body>` element

- Updated dependencies [[`e6e0c22c5`](https://github.com/hashicorp/design-system/commit/e6e0c22c538e381f4a97428dc35cf1295ce6ae21)]:
  - @hashicorp/ember-flight-icons@3.0.6

## 2.7.0

### Minor Changes

- [#1421](https://github.com/hashicorp/design-system/pull/1421) [`b8a45d6e7`](https://github.com/hashicorp/design-system/commit/b8a45d6e7ade6e973b2a860444d80d9216e3ab5c) Thanks [@didoo](https://github.com/didoo)! - `Table` - Exposed the internal sorting properties and methods `setSortBy`, `sortBy` and `sortOrder`

- [#1377](https://github.com/hashicorp/design-system/pull/1377) [`437c253dd`](https://github.com/hashicorp/design-system/commit/437c253dd6106d616ed8f83c060adb12ac83acac) Thanks [@jorytindall](https://github.com/jorytindall)! - Adds `PageHeader` component

- [#1393](https://github.com/hashicorp/design-system/pull/1393) [`38fb21e60`](https://github.com/hashicorp/design-system/commit/38fb21e6091c739f621e967e23d4c8b2794c9575) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Separator` component

### Patch Changes

- [#1415](https://github.com/hashicorp/design-system/pull/1415) [`555c86d3f`](https://github.com/hashicorp/design-system/commit/555c86d3fde07109775a61523f7b26444fc9ee62) Thanks [@didoo](https://github.com/didoo)! - `Hds::Table` - Changed the way in which the column `@width` defined by the user is applied

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@3.0.5

## 2.6.0

### Minor Changes

- [#1381](https://github.com/hashicorp/design-system/pull/1381) [`02cdeacd5`](https://github.com/hashicorp/design-system/commit/02cdeacd51d29ed3d19e66cc09b95589becd770b) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add new `Reveal` component

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@3.0.4

## 2.5.0

### Minor Changes

- [#1391](https://github.com/hashicorp/design-system/pull/1391) [`0a7c53886`](https://github.com/hashicorp/design-system/commit/0a7c5388643f95891082dde2b27b66716372b514) Thanks [@alex-ju](https://github.com/alex-ju)! - Embed page scroll management into the `Modal` and `Flyout` components

## 2.4.3

### Patch Changes

- [#1388](https://github.com/hashicorp/design-system/pull/1388) [`56a6b94df`](https://github.com/hashicorp/design-system/commit/56a6b94dfa337a887153e39393ed2a2bb1b93774) Thanks [@didoo](https://github.com/didoo)! - Fixed `SideNav` issue with content resizing when transitioning its `width`

## 2.4.2

### Patch Changes

- [#1380](https://github.com/hashicorp/design-system/pull/1380) [`cd16ccc19`](https://github.com/hashicorp/design-system/commit/cd16ccc19e0992be2bed5d567880d2d0d36f1880) Thanks [@MelSumner](https://github.com/MelSumner)! - A11y Fix: removes `aria-label` from stepper/indicator and from task/indicator, which was causing an accessibility test error.

## 2.4.1

### Patch Changes

- Updated dependencies [[`2c7d70868`](https://github.com/hashicorp/design-system/commit/2c7d70868b0fa000618214589e2422e07db68b22)]:
  - @hashicorp/ember-flight-icons@3.0.3

## 2.4.0

### Minor Changes

- [#1371](https://github.com/hashicorp/design-system/pull/1371) [`aa2be65cf`](https://github.com/hashicorp/design-system/commit/aa2be65cf3df7742c09d772b4f14b2b56f549b53) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Refactor `Hds::Disclosure` internal utility component into two new components:
  - Rename the original `Hds::Disclosure` component to `Hds::MenuPrimitive`
  - Add a new `Hds::DisclosurePrimitive` component stripped of the “click outside/unfocus/esc to close” functionality

### Patch Changes

- [#1373](https://github.com/hashicorp/design-system/pull/1373) [`b2949f208`](https://github.com/hashicorp/design-system/commit/b2949f2087b0e52574a927bb095dc748a6aa81c3) Thanks [@MelSumner](https://github.com/MelSumner)! - Updates aria-label support for consistency. Consumers can now see in the component API docs where `@ariaLabel` is supported for a custom value, and what the fallback value is.

- [#1364](https://github.com/hashicorp/design-system/pull/1364) [`3e1543077`](https://github.com/hashicorp/design-system/commit/3e1543077960d682c9e16d335a894186cf2ef6ad) Thanks [@alex-ju](https://github.com/alex-ju)! - Prevent `Tooltip` content from overflowing

## 2.3.3

### Patch Changes

- [#1350](https://github.com/hashicorp/design-system/pull/1350) [`be5c5aad8`](https://github.com/hashicorp/design-system/commit/be5c5aad8fb9d59ecc57be5f78a45619bf18ce10) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - `RadioCard` - Update CSS to enable wrapping of long strings in label which were overflowing the container

- [#1353](https://github.com/hashicorp/design-system/pull/1353) [`0ed127294`](https://github.com/hashicorp/design-system/commit/0ed127294e66fa7d7412f40eb82ed4c3a89e3763) Thanks [@didoo](https://github.com/didoo)! - removed `z-index` value from `AppFrame::Footer`

## 2.3.2

### Patch Changes

- [#1344](https://github.com/hashicorp/design-system/pull/1344) [`6d6cf3ea8`](https://github.com/hashicorp/design-system/commit/6d6cf3ea81bf5bd1f631c99fc53cc88318d7d52f) Thanks [@cbfx](https://github.com/cbfx)! - `SideNav::Portal::Target` - Fixed a possible source of flickering when a panel has already been rendered

## 2.3.1

### Patch Changes

- [#1338](https://github.com/hashicorp/design-system/pull/1338) [`2bc23fd20`](https://github.com/hashicorp/design-system/commit/2bc23fd20bafdedda65126f606c345ea5eb6fa1e) Thanks [@didoo](https://github.com/didoo)! - `SideNav` - Fix issue with links being clickable even if not visible

- [#1339](https://github.com/hashicorp/design-system/pull/1339) [`ea8edb9bf`](https://github.com/hashicorp/design-system/commit/ea8edb9bf0567b5dc97ded9efbfeb5c6f27f52d5) Thanks [@didoo](https://github.com/didoo)! - `SideNav` - Updated CSS declaration that was causing an horizontal scrollbar to appear in some conditions

## 2.3.0

### Minor Changes

- [#1283](https://github.com/hashicorp/design-system/pull/1283) [`d0ae66503`](https://github.com/hashicorp/design-system/commit/d0ae665033e6b83a65c2dcde8630985f76872901) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - - Add new `TooltipButton` component and `hds-tooltip` modifier

  - Add design tokens for `Tooltip`

- [#1316](https://github.com/hashicorp/design-system/pull/1316) [`5763ffbca`](https://github.com/hashicorp/design-system/commit/5763ffbca564d3a23b8a497393acc43729d92de8) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `SegmentedGroup` component

### Patch Changes

- [#1329](https://github.com/hashicorp/design-system/pull/1329) [`216ce51a8`](https://github.com/hashicorp/design-system/commit/216ce51a81383f2e8a5d1f989c5148edf74268f6) Thanks [@didoo](https://github.com/didoo)! - `SideNav::Portal::Target` - Removed extra call to `commitStyles`

- [#1328](https://github.com/hashicorp/design-system/pull/1328) [`095caf4d4`](https://github.com/hashicorp/design-system/commit/095caf4d430d459d848647ed3c1dba3155c358cf) Thanks [@didoo](https://github.com/didoo)! - `SideNav::Portal::Target` - Made the `:hover:focus` state (the one the links finds itself once clicked) identical to the `:active/.active` state

- [#1334](https://github.com/hashicorp/design-system/pull/1334) [`f6fa1e15e`](https://github.com/hashicorp/design-system/commit/f6fa1e15ee52bc8962fc244a73640dd57d62769a) Thanks [@didoo](https://github.com/didoo)! - `SideNav` - added missing override of `Dropdown::ToggleButton`

- Updated dependencies [[`d0ae66503`](https://github.com/hashicorp/design-system/commit/d0ae665033e6b83a65c2dcde8630985f76872901)]:
  - @hashicorp/design-system-tokens@1.5.0

## 2.2.0

### Minor Changes

- [#1284](https://github.com/hashicorp/design-system/pull/1284) [`050a2afa5`](https://github.com/hashicorp/design-system/commit/050a2afa5bd539e15ff21728bb6ac27ac2b90dc6) Thanks [@didoo](https://github.com/didoo)! - Added `AppFrame` component

- [#1321](https://github.com/hashicorp/design-system/pull/1321) [`6cb5f55b1`](https://github.com/hashicorp/design-system/commit/6cb5f55b1a47d9718960e17c68c7ad3b8bcad04c) Thanks [@didoo](https://github.com/didoo)! - Extracted `Hds::SideNav::Base` from the `Hds::SideNav` component

- [#1304](https://github.com/hashicorp/design-system/pull/1304) [`038d8306a`](https://github.com/hashicorp/design-system/commit/038d8306aee38711ba846e4d7272d237b93733e5) Thanks [@didoo](https://github.com/didoo)! - Extended the `Hds::SideNav` component to support responsiveness (animation/transition) and content portaling by adapting existing implementation for Cloud UI

- [#1315](https://github.com/hashicorp/design-system/pull/1315) [`e900dbcca`](https://github.com/hashicorp/design-system/commit/e900dbcca7df1592559245e2b2031d0b2a9ec617) Thanks [@didoo](https://github.com/didoo)! - Added a `@isInline` argument to the `Hds::Dropdown` component

- [#1309](https://github.com/hashicorp/design-system/pull/1309) [`ef7eeff66`](https://github.com/hashicorp/design-system/commit/ef7eeff66d1d9b81b53cf082085eb1fa636263ef) Thanks [@jorytindall](https://github.com/jorytindall)! - Add `Hds::Flyout::Footer` as generic block to `Hds::Flyout`

- [#1317](https://github.com/hashicorp/design-system/pull/1317) [`fa3a328a1`](https://github.com/hashicorp/design-system/commit/fa3a328a1806af8482bcedee002c8bc3232f3968) Thanks [@didoo](https://github.com/didoo)! - Changed order of "modal" container element in the DOM for the `AppFrame` component

### Patch Changes

- [#1312](https://github.com/hashicorp/design-system/pull/1312) [`cd1527ef5`](https://github.com/hashicorp/design-system/commit/cd1527ef5de743e1fdf9b982bff7aa1bbc18ac54) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `min-height` to `Hds::Textarea`

- [#1313](https://github.com/hashicorp/design-system/pull/1313) [`5a2f5778d`](https://github.com/hashicorp/design-system/commit/5a2f5778d5e1d57a7d0d080f01319492e1a5a8b7) Thanks [@didoo](https://github.com/didoo)! - Added design tokens for `SideNav` component

- [#1306](https://github.com/hashicorp/design-system/pull/1306) [`e993f6c42`](https://github.com/hashicorp/design-system/commit/e993f6c42a502f4d43cce2e1e7b1a7a8cfd90cdd) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix `PowerSelectMultiple` style overrides when search is enabled

- Updated dependencies [[`5a2f5778d`](https://github.com/hashicorp/design-system/commit/5a2f5778d5e1d57a7d0d080f01319492e1a5a8b7)]:
  - @hashicorp/design-system-tokens@1.4.2

## 2.1.0

### Minor Changes

- [#1258](https://github.com/hashicorp/design-system/pull/1258) [`3466d2279`](https://github.com/hashicorp/design-system/commit/3466d2279191504442029976a4e18d3ca99015bf) Thanks [@MelSumner](https://github.com/MelSumner)! - Adds Hds::ApplicationState component

### Patch Changes

- [#1291](https://github.com/hashicorp/design-system/pull/1291) [`b2c21a86e`](https://github.com/hashicorp/design-system/commit/b2c21a86ee681d53e728fa5c52192b9003762ea9) Thanks [@didoo](https://github.com/didoo)! - Fixed missing inset shadow for `TextInput`, `Textarea`, `Checkbox`, `Radio`, `PowerSelect` overrides

## 2.0.0

### Major Changes

- [#1185](https://github.com/hashicorp/design-system/pull/1185) [`a883e7fd7`](https://github.com/hashicorp/design-system/commit/a883e7fd763ae7a93ecc5ef3d49ed0230b48ea11) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Checkmark`, `Checkbox` and `Radio` as `Hds::Dropdown::ListItem`s

  Rename `Hds::Dropdown::ListItem` internal CSS classes as follows:

  - `hds-dropdown-list-item--copy-item` → `hds-dropdown-list-item--variant-copy-item`
  - `hds-dropdown-list-item--description` → `hds-dropdown-list-item--variant-description`
  - `hds-dropdown-list-item--generic` → `hds-dropdown-list-item--variant-generic`
  - `hds-dropdown-list-item--interactive` → `hds-dropdown-list-item--variant-interactive`
  - `hds-dropdown-list-item--separator` → `hds-dropdown-list-item--variant-separator`
  - `hds-dropdown-list-item--title` → `hds-dropdown-list-item--variant-title`

  **Note:** If test assertions are relying on these class names, tests will fail. If extensions/overrides have been applied to these classes, they will suffer visual changes.

- [#1212](https://github.com/hashicorp/design-system/pull/1212) [`6e79216a8`](https://github.com/hashicorp/design-system/commit/6e79216a880ae140cce15f1dc6494f0aeca8e0b8) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Hds::Dropdown::Header` and `Hds::Dropdown::Footer` as generic blocks to `Hds::Dropdown`

  Rename `Hds::Dropdown` internal CSS class `hds-dropdown-list` → `hds-dropdown__list`

  The `hds-dropdown__list` element is now wrapped in a `hds-dropdown__content` element to accommodate the new header and footer elements. As a result, the following modifiers will be applied to the wrapper element.

  - `hds-dropdown-list--fixed-width` → `hds-dropdown__content--fixed-width`
  - `hds-dropdown-list--position-left` → `hds-dropdown__content--position-left`
  - `hds-dropdown-list--position-right` → `hds-dropdown__content--position-right`

  **Note:** If test assertions are relying on these class names, tests will fail. If extensions/overrides have been applied to these classes, they will suffer visual changes.

- [#1266](https://github.com/hashicorp/design-system/pull/1266) [`082842b59`](https://github.com/hashicorp/design-system/commit/082842b59321f843c4955e4cdaf2ce2674a8913d) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `@icon`, `@count`, `@badge` and `@badgeCount` to `Dropdown::Toggle::Button`

  `Hds::Dropdown::Toggle::Button` and `Hds::Dropdown::Toggle::Icon` now share the chevron element. As a result, we renamed internal CSS classes as follows:

  - `hds-button__text` → `hds-dropdown-toggle-button__text`
  - `hds-button__icon` → `hds-dropdown-toggle-chevron`

  The icon element within `Hds::Dropdown::Toggle::Icon` no longer has the `hds-dropdown-toggle-icon__chevron` class and it's currently wrapped in the `hds-dropdown-toggle-chevron` container, similar to `Hds::Dropdown::Toggle::Button`.

  The `Hds::Dropdown::Toggle::Icon` now has a solid border, for consistency with `Hds::Dropdown::Toggle::Button` and the secondary style of `Hds::Button`.

  **Note:** If test assertions are relying on these class names, tests will fail. If extensions/overrides have been applied to these classes, they will suffer visual changes.

### Minor Changes

- [#1276](https://github.com/hashicorp/design-system/pull/1276) [`5ad29412d`](https://github.com/hashicorp/design-system/commit/5ad29412d2edc0cc4265d3c0bbbf388e821f1cc7) Thanks [@alex-ju](https://github.com/alex-ju)! - Allow small `@size` on `Dropdown::Toggle::Icon`

- [#1262](https://github.com/hashicorp/design-system/pull/1262) [`3eb78b8de`](https://github.com/hashicorp/design-system/commit/3eb78b8de7c678cff977c9d3a677c47a3216caad) Thanks [@alex-ju](https://github.com/alex-ju)! - Add new `@listPositions` for `Dropdown` as follows:

  - `bottom-left`
  - `bottom-right` (default)
  - `top-left`
  - `top-right`

  **Note:** `left` and `right` are now deprecated and will be removed in a future major release

## 1.8.1

### Patch Changes

- [#1260](https://github.com/hashicorp/design-system/pull/1260) [`8eb0d1ff6`](https://github.com/hashicorp/design-system/commit/8eb0d1ff63248fe049962192190480a7fe6fdef9) Thanks [@didoo](https://github.com/didoo)! - Added `@ember/render-modifiers` as explicit dependency

- [#1256](https://github.com/hashicorp/design-system/pull/1256) [`451d98842`](https://github.com/hashicorp/design-system/commit/451d98842474dad2b3f3a6ad38c813e9d92d0f1d) Thanks [@alex-ju](https://github.com/alex-ju)! - Make the `Disclosure` mechanism more resilient

## 1.8.0

### Minor Changes

- [#1163](https://github.com/hashicorp/design-system/pull/1163) [`992fde13f`](https://github.com/hashicorp/design-system/commit/992fde13f48b925563e85a7253f4c0aaeca50b9d) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add new `SideNav` components

## 1.7.3

### Patch Changes

- [#1242](https://github.com/hashicorp/design-system/pull/1242) [`f1a947db2`](https://github.com/hashicorp/design-system/commit/f1a947db20bf19cf88b4c3a8091d3e7b51649364) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Revert ember-truth-helpers & ember-keyboard dependency updates

## 1.7.2

### Patch Changes

- [#1234](https://github.com/hashicorp/design-system/pull/1234) [`2fa69aca7`](https://github.com/hashicorp/design-system/commit/2fa69aca75f2ea1245be04ccfad7966ec77ab12d) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix checkmark and disabled state on `power-select` style overrides

## 1.7.1

### Patch Changes

- [#1232](https://github.com/hashicorp/design-system/pull/1232) [`9d1a73da3`](https://github.com/hashicorp/design-system/commit/9d1a73da3621c1a1ad32736c79ac7b4af6162b05) Thanks [@alex-ju](https://github.com/alex-ju)! - Make `ember-body-class` a dev dependency

## 1.7.0

### Minor Changes

- [#1201](https://github.com/hashicorp/design-system/pull/1201) [`5b11fe34c`](https://github.com/hashicorp/design-system/commit/5b11fe34c5dec1f96b75ee20d77f83d92bc4e962) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add @label argument to Pagination::SizeSelector component and associated @sizeSelectorLabel argument to Pagination::Numbered component to make Pagination::SizeSelector label text customizeable.

- [#1160](https://github.com/hashicorp/design-system/pull/1160) [`b71c0c07f`](https://github.com/hashicorp/design-system/commit/b71c0c07fa809819eef3e0bb090af51aec563918) Thanks [@MelSumner](https://github.com/MelSumner)! - Added new custom sort feature support to table component:

  - Adds `sortingFunction` support in `@columns` declaration
  - Adds `sortedMessageText` support for custom sorting message
  - Updates the `aria-sort` to fallback to "none" instead of "null" (per spec)
  - Adds support for the `\{\{each\}\}` loop's `key` to be defined with `identityKey` (optional; falls back to the Ember default if none is provided)

### Patch Changes

- [#1217](https://github.com/hashicorp/design-system/pull/1217) [`c021b0527`](https://github.com/hashicorp/design-system/commit/c021b052707d8dca7cb7375dfa84f1e9e9b8ec87) Thanks [@alex-ju](https://github.com/alex-ju)! - Update `ember-cli` to `4.10.0` alongside other patch and minor dependency updates

- [#1208](https://github.com/hashicorp/design-system/pull/1208) [`583f7559d`](https://github.com/hashicorp/design-system/commit/583f7559d9d66fc5da3cb5e8174258b334c85058) Thanks [@MelSumner](https://github.com/MelSumner)! - Updates table styles to include scoped row support

- [#1226](https://github.com/hashicorp/design-system/pull/1226) [`2b0a028b8`](https://github.com/hashicorp/design-system/commit/2b0a028b89835abfd419c2ed93a4a393f2852cd0) Thanks [@didoo](https://github.com/didoo)! - Changed inner logic for `ThSort` arguments

- [#1181](https://github.com/hashicorp/design-system/pull/1181) [`2ef00f654`](https://github.com/hashicorp/design-system/commit/2ef00f6549f5c41332b8da66d862c40f64548af1) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add a style to prevent accidental display of hidden `Hds::Tabs::Panel`

- [#1204](https://github.com/hashicorp/design-system/pull/1204) [`fcbaff90b`](https://github.com/hashicorp/design-system/commit/fcbaff90b514962c50363c8a985d88b520048636) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - \* Scope group layout styles to nested child components.
  - Fix bug with --token-pagination-child-spacing-vertical value so that it adds "px" unit.
- Updated dependencies [[`fcbaff90b`](https://github.com/hashicorp/design-system/commit/fcbaff90b514962c50363c8a985d88b520048636)]:
  - @hashicorp/design-system-tokens@1.4.1

## 1.6.1

### Patch Changes

- [#1193](https://github.com/hashicorp/design-system/pull/1191) [`0f76e60`](https://github.com/hashicorp/design-system/commit/0f76e60f6eb4293dc5ba1ffb75f72d7f981a8e88) Thanks [@fivetanley](https://github.com/fivetanley)! - Fix `Hds::Table` compile error for Ember 3.28 or lower

## 1.6.0

### Minor Changes

- [#661](https://github.com/hashicorp/design-system/pull/661) [`2c6024a38`](https://github.com/hashicorp/design-system/commit/2c6024a38f5f457231f7301d219478a4f746de37) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add new **`Pagination`** component (`Numbered`, `Compact`)

- [#1070](https://github.com/hashicorp/design-system/pull/1070) [`91b004f93`](https://github.com/hashicorp/design-system/commit/91b004f9329034064890f3e7a18e35912312fb5d) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Flyout` component

### Patch Changes

- Updated dependencies [[`2c6024a38`](https://github.com/hashicorp/design-system/commit/2c6024a38f5f457231f7301d219478a4f746de37)]:
  - @hashicorp/design-system-tokens@1.4.0

## 1.5.2

### Patch Changes

- [#1036](https://github.com/hashicorp/design-system/pull/1036) [`b1756288e`](https://github.com/hashicorp/design-system/commit/b1756288e907dd36784fd33921e016d99a1b3417) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Update design system name to Helios

- [#971](https://github.com/hashicorp/design-system/pull/971) [`fa819fedf`](https://github.com/hashicorp/design-system/commit/fa819fedf22b2dee45e8ee1119b98099f5402524) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix repetitive required field indicator for screen readers

- [#1130](https://github.com/hashicorp/design-system/pull/1130) [`34fb0fe18`](https://github.com/hashicorp/design-system/commit/34fb0fe18895e59676fb208dc6025d2d15353336) Thanks [@MelSumner](https://github.com/MelSumner)! - Moves icon and count inside of tab (button element) for WCAG conformance

- [#1157](https://github.com/hashicorp/design-system/pull/1157) [`39b645296`](https://github.com/hashicorp/design-system/commit/39b64529645110c0980c253c2e01099e2b585bc0) Thanks [@MelSumner](https://github.com/MelSumner)! - Fixes malformed CSS classes in table component

- [#1080](https://github.com/hashicorp/design-system/pull/1080) [`1dde47948`](https://github.com/hashicorp/design-system/commit/1dde47948ef2aa2400e8f39e49e060d7507db037) Thanks [@didoo](https://github.com/didoo)! - Added `onSort` callback to `Hds::Table` component

- [#1127](https://github.com/hashicorp/design-system/pull/1127) [`4eaf727e7`](https://github.com/hashicorp/design-system/commit/4eaf727e7b9ac732c1cc5a053d9e5a4b636ffc78) Thanks [@MelSumner](https://github.com/MelSumner)! - Adds missing aria-label to breadcrumb truncation toggle for WCAG conformance.

- Updated dependencies [[`b1756288e`](https://github.com/hashicorp/design-system/commit/b1756288e907dd36784fd33921e016d99a1b3417)]:
  - @hashicorp/design-system-tokens@1.3.1

## 1.5.1

### Patch Changes

- [#867](https://github.com/hashicorp/design-system/pull/867) [`a26f3da41`](https://github.com/hashicorp/design-system/commit/a26f3da4158ea75e7bb06ba284d62f5169e7759d) Thanks [@MelSumner](https://github.com/MelSumner)! - Bugfix: removed extra space in label that was causing label and legend to be inconsistent. Moved the `&nbsp;` to the `required` indicator instead for consistency.

## 1.5.0

### Minor Changes

- [#827](https://github.com/hashicorp/design-system/pull/827) [`c775030b0`](https://github.com/hashicorp/design-system/commit/c775030b0337d630159ce3a108b61f336efca7bb) Thanks [@MelSumner](https://github.com/MelSumner)! - [PR 760](https://github.com/hashicorp/design-system/pull/760) Finalized Hds::Table component; resolved text alignment and column width invocation options. Added support for `th` elements with the scope of `row`.

### Patch Changes

- [#816](https://github.com/hashicorp/design-system/pull/816) [`325cdaa2a`](https://github.com/hashicorp/design-system/commit/325cdaa2aa3859058de9f79758e1f1d1c5e4246e) Thanks [@jorytindall](https://github.com/jorytindall)! - Updated the modal border radius based on revised design guidelines.

## 1.4.1

### Patch Changes

- [#740](https://github.com/hashicorp/design-system/pull/740) [`cd1a09307`](https://github.com/hashicorp/design-system/commit/cd1a09307aef9617e7a31a5d9e722417f4c9045e) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `indeterminate` style to `Checkbox` component

- Updated dependencies [[`92c83961f`](https://github.com/hashicorp/design-system/commit/92c83961f0e8b01e52e3c596c85871ec5cf8c94d)]:
  - @hashicorp/design-system-tokens@1.3.0

## 1.4.0

### Minor Changes

- [#631](https://github.com/hashicorp/design-system/pull/631) [`5d4b1811`](https://github.com/hashicorp/design-system/commit/5d4b1811a4bcdfe0c2205767aceead9286f5f159) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Modal` component and `DismissButton` utility component (used by `Alert`, `Toast` and `Modal`)

- [#722](https://github.com/hashicorp/design-system/pull/722) [`58a52103`](https://github.com/hashicorp/design-system/commit/58a521034b0e6a2a421b4c8b79f26a431e13a83b) Thanks [@MelSumner](https://github.com/MelSumner)! - Add `Table` component

### Patch Changes

- [#681](https://github.com/hashicorp/design-system/pull/681) [`6f08ddd2`](https://github.com/hashicorp/design-system/commit/6f08ddd2b491ed13b60e153aa4cc13db8c3884da) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Explicitly set `aria-selected` to `true` or `false`

- [#698](https://github.com/hashicorp/design-system/pull/698) [`db8a1caf`](https://github.com/hashicorp/design-system/commit/db8a1caff4553ed3240c0260a831526fd2fe6844) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `@layout` parameter to `RadioCard`

- Updated dependencies [[`aeff4e02`](https://github.com/hashicorp/design-system/commit/aeff4e02e3c5c738104be326569c110dc2f79618)]:
  - @hashicorp/ember-flight-icons@3.0.2

## 1.3.2

### Patch Changes

- [#668](https://github.com/hashicorp/design-system/pull/668) [`3c3b6706`](https://github.com/hashicorp/design-system/commit/3c3b67061d3850721525a624c14bc88ee72e32a1) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix whitespace issue in `Link::Inline` and `Interactive` utility component

## 1.3.1

### Patch Changes

- [#663](https://github.com/hashicorp/design-system/pull/663) [`1397d52c`](https://github.com/hashicorp/design-system/commit/1397d52c4405bb768b8cf0e7db2e0503d48f8f00) Thanks [@nfagerlund](https://github.com/nfagerlund)! - Tabs::Panel: Regress modern helper syntax for 3.24 compatibility

## 1.3.0

### Minor Changes

- [#548](https://github.com/hashicorp/design-system/pull/548) [`5d1e2cb4`](https://github.com/hashicorp/design-system/commit/5d1e2cb4f953bfbe55ae1fa8a675903712a66a1c) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add new Tabs component

### Patch Changes

- [#618](https://github.com/hashicorp/design-system/pull/618) [`11d39410`](https://github.com/hashicorp/design-system/commit/11d39410c40725ff34a291e17eac3f8f8321c659) Thanks [@alex-ju](https://github.com/alex-ju)! - Update `ember` to `4.7.0`

- [#660](https://github.com/hashicorp/design-system/pull/660) [`4d0826a6`](https://github.com/hashicorp/design-system/commit/4d0826a6df220031b36f4918c5c5365012672c27) Thanks [@alex-ju](https://github.com/alex-ju)! - Update the `Hds::Button` style when rendered as a link

- [#638](https://github.com/hashicorp/design-system/pull/638) [`90182235`](https://github.com/hashicorp/design-system/commit/901822353453e98c914c8d57e523d64b32a23f75) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - explicitly add ember-style-modifiers as a dependency

- [#636](https://github.com/hashicorp/design-system/pull/636) [`27a283a5`](https://github.com/hashicorp/design-system/commit/27a283a52c2828b32c282401f91df9bd929f9dda) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Add copyright notice to license file

- Updated dependencies [[`a079992f`](https://github.com/hashicorp/design-system/commit/a079992fbbed11812fcf4cdd4409a00fa2d246f1), [`11d39410`](https://github.com/hashicorp/design-system/commit/11d39410c40725ff34a291e17eac3f8f8321c659), [`27a283a5`](https://github.com/hashicorp/design-system/commit/27a283a52c2828b32c282401f91df9bd929f9dda), [`ecbe26df`](https://github.com/hashicorp/design-system/commit/ecbe26df6bdbaf7b4f00c70d016eead0da9168f0)]:
  - @hashicorp/design-system-tokens@1.2.0
  - @hashicorp/ember-flight-icons@3.0.1

## 1.2.0

### Minor Changes

- [#576](https://github.com/hashicorp/design-system/pull/576) [`ab821911`](https://github.com/hashicorp/design-system/commit/ab821911e8d7f99b2b70e41e06f3fe8f681f9c8f) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `RadioCard` component

### Patch Changes

- [#586](https://github.com/hashicorp/design-system/pull/586) [`55ec4246`](https://github.com/hashicorp/design-system/commit/55ec424615505733159ac420284c47758f0667a3) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - make ember-truth-helpers a dependency

- Updated dependencies [[`55f38cb3`](https://github.com/hashicorp/design-system/commit/55f38cb3a30a6edf8854e53ce3642270fe00efdc), [`258c06d9`](https://github.com/hashicorp/design-system/commit/258c06d952d41696bb8c5b4bab19eb46e4612cdc)]:
  - @hashicorp/ember-flight-icons@3.0.0
  - @hashicorp/design-system-tokens@1.1.0

## 1.1.0

### Minor Changes

- [#539](https://github.com/hashicorp/design-system/pull/539) [`5b548865`](https://github.com/hashicorp/design-system/commit/5b548865ed1000e5f51c22365a81c858576bd2bd) Thanks [@alex-ju](https://github.com/alex-ju)! - Add custom styles for `ember-power-select` add-on

- [#577](https://github.com/hashicorp/design-system/pull/577) [`2f5a2c21`](https://github.com/hashicorp/design-system/commit/2f5a2c214c25be7fd91c2e73c88fb436f72dbd6f) Thanks [@alex-ju](https://github.com/alex-ju)! - Add small variant to `Hds::Dropdown::ToggleButton`

### Patch Changes

- [#545](https://github.com/hashicorp/design-system/pull/545) [`6d2a6298`](https://github.com/hashicorp/design-system/commit/6d2a6298c407a74a14a11b3426fd60d673d10954) Thanks [@didoo](https://github.com/didoo)! - Small cleanup (reformatting, linting) of the Sass files. Should have zero visual impact on the components.

- [#565](https://github.com/hashicorp/design-system/pull/565) [`0f5247f0`](https://github.com/hashicorp/design-system/commit/0f5247f0f088ad35f877294089d0c69caaffdb37) Thanks [@didoo](https://github.com/didoo)! - added stylelint to the codebase and re-organized CSS declarations

- Updated dependencies [[`0b245333`](https://github.com/hashicorp/design-system/commit/0b24533369ccc2d02aa5c6c8b8ba4f722e07d236)]:
  - @hashicorp/design-system-tokens@1.0.1

## 1.0.4

### Patch Changes

- [#534](https://github.com/hashicorp/design-system/pull/534) [`65cde6ad`](https://github.com/hashicorp/design-system/commit/65cde6ad63c370fd9f0f6984cb7e974e4d3a9030) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix label indicator for assistive technologies

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.12

## 1.0.3

### Patch Changes

- [#529](https://github.com/hashicorp/design-system/pull/529) [`b956be8f`](https://github.com/hashicorp/design-system/commit/b956be8fcb3692d184603a2a40e0c42df0461ff5) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix `required` attribute on form fields

## 1.0.2

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.11

## 1.0.1

### Patch Changes

- [#516](https://github.com/hashicorp/design-system/pull/516) [`a81a3580`](https://github.com/hashicorp/design-system/commit/a81a35806504f6a7b7f9dfdf0e8a5ddbef0f47fc) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix text wrapping in alert description

## 1.0.0 🎉

### Major Changes

This release signifies the first major release of the HashiCorp Design System. Moving forward we expect to respect [SemVer](https://semver.org/) as we make additional changes to the design system.

**Note:** Even though this is a major version bump, there should not be any breaking changes from the last minor releases.

### Minor Changes

#### Stepper component

- [#470](https://github.com/hashicorp/design-system/pull/470) [`96d47264`](https://github.com/hashicorp/design-system/commit/96d4726404664f301df0352a1fdbc4b6b6e9cb88) Thanks [@jorytindall](https://github.com/jorytindall)! - Added Stepper component structure and step/task components

#### ButtonSet component

- [#486](https://github.com/hashicorp/design-system/pull/486) [`3ea2ad55`](https://github.com/hashicorp/design-system/commit/3ea2ad55b2ec9c579e2154ac4bb820f06a231e9f) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add new ButtonSet component to standardize button spacing

#### Tag component

- [#443](https://github.com/hashicorp/design-system/pull/443) [`7756c855`](https://github.com/hashicorp/design-system/commit/7756c8554114564eccb2b08872ceabff02351682) Thanks [@alex-ju](https://github.com/alex-ju) & [@agendelHC](https://github.com/agendelHC)! - Add tag component

#### Form controls components

- [#447](https://github.com/hashicorp/design-system/pull/447) [`0b1e9855`](https://github.com/hashicorp/design-system/commit/0b1e985586b8f531a6208ea5ce25ac74faa77dda) Thanks [@didoo](https://github.com/didoo)!

  - Added the form **`TextInput`** controls (`Base`, `Field`)
  - Added the form **`Textarea`** controls (`Base`, `Field`)
  - Added the form **`Select`** controls (`Base`, `Field`)
  - Added the form **`Checkbox`** controls (`Base`, `Field`, `Group`)
  - Added the form **`Radio`** controls (`Base`, `Field`, `Group`)
  - Added the form **`Toggle`** controls (`Base`, `Field`, `Group`)
  - Added the form "base" low-level elements: **`Label`**, **`HelperText`**, **`Error`**, **`Legend`**, **`Field`**, **`Fieldset`**

### Patch Changes

- Updated dependencies [[`0b1e9855`](https://github.com/hashicorp/design-system/commit/0b1e985586b8f531a6208ea5ce25ac74faa77dda)]:
  - @hashicorp/design-system-tokens@1.0.0

## 0.12.15

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.10

## 0.12.14

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.9

## 0.12.13

### Patch Changes

- [#461](https://github.com/hashicorp/design-system/pull/461) [`71465b37`](https://github.com/hashicorp/design-system/commit/71465b377b5ff4f47eca2bcfb096df9f082b23cb) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix computation error on disclosure (take 2)

## 0.12.12

### Patch Changes

- [#456](https://github.com/hashicorp/design-system/pull/456) [`d0634a62`](https://github.com/hashicorp/design-system/commit/d0634a622b50c18d713afdc2fdb97a8e7a4df6af) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix computation error on disclosure utility

## 0.12.11

### Patch Changes

- [#426](https://github.com/hashicorp/design-system/pull/426) [`ff236b25`](https://github.com/hashicorp/design-system/commit/ff236b2530dae122c011abf88baf2059a7871427) Thanks [@didoo](https://github.com/didoo)! - Updated font-weight to "medium" for "Badge" and "BadgeCount" components

## 0.12.10

### Patch Changes

- [#428](https://github.com/hashicorp/design-system/pull/428) [`599dca97`](https://github.com/hashicorp/design-system/commit/599dca971fba57b613f9a17588ebe0e569aafe4c) Thanks [@didoo](https://github.com/didoo)! - Fixed issue with "disabled" visual state for "Hds::Button" when is a link

## 0.12.9

### Patch Changes

- [#418](https://github.com/hashicorp/design-system/pull/418) [`981e2bd9`](https://github.com/hashicorp/design-system/commit/981e2bd99d29398a40274d390d1885ebfcd85133) Thanks [@alex-ju](https://github.com/alex-ju)! - Determine an accessible name for `alertdialog` alerts #418

- [#416](https://github.com/hashicorp/design-system/pull/416) [`824e53d1`](https://github.com/hashicorp/design-system/commit/824e53d11678a5bb2544add3d9d1b2a93f9c42c1) Thanks [@alex-ju](https://github.com/alex-ju)! - Remove stray aria-describedby in alert component

- [#415](https://github.com/hashicorp/design-system/pull/415) [`c6842109`](https://github.com/hashicorp/design-system/commit/c68421094991b2d62832cb346b4cf23eca1049e4) Thanks [@didoo](https://github.com/didoo)! - Added `@levelHover` and `@levelActive` arguments to `Card::Container` component

## 0.12.8

### Patch Changes

- [#400](https://github.com/hashicorp/design-system/pull/400) [`d87d622b`](https://github.com/hashicorp/design-system/commit/d87d622b0f1f8829a0d5e6a48cfcd8ad8ff6f425) Thanks [@alex-ju](https://github.com/alex-ju)! - Determine alert component's role based on the presence of interactive elements

## 0.12.7

### Patch Changes

- [#406](https://github.com/hashicorp/design-system/pull/406) [`3c3f49b9`](https://github.com/hashicorp/design-system/commit/3c3f49b950fe7c0c9fa9732d9a8534d3b73e69fd) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix badge vertical alignment

## 0.12.6

### Patch Changes

- [#399](https://github.com/hashicorp/design-system/pull/399) [`62e3077e`](https://github.com/hashicorp/design-system/commit/62e3077e5cf40e93852e9fa3489d3d1970d45070) Thanks [@alex-ju](https://github.com/alex-ju)! - Enable programmatic close on dropdown component

## 0.12.5

### Patch Changes

- [#391](https://github.com/hashicorp/design-system/pull/391) [`0d8515f0`](https://github.com/hashicorp/design-system/commit/0d8515f06ae15b9955a15e9cafa97dc1d4c87cee) Thanks [@didoo](https://github.com/didoo)! - Fixed bug in `Link::Standalone` and `Link::Inline` components that added `target="_blank"` and `rel="noopener noreferrer”` attributes in any case/condition.

- [#354](https://github.com/hashicorp/design-system/pull/354) [`e7997ee6`](https://github.com/hashicorp/design-system/commit/e7997ee68d7d8b104243c8b6129db1030a3cea57) Thanks [@didoo](https://github.com/didoo)! - small update to the `yield` helper component - this is used in `Alert` and `Toast` but the changes should have no impact

## 0.12.4

### Patch Changes

- [#343](https://github.com/hashicorp/design-system/pull/343) [`a74711c8`](https://github.com/hashicorp/design-system/commit/a74711c8c0de6843625781488ed94521c7f8cb7c) Thanks [@MelSumner](https://github.com/MelSumner)! - Fixes copy-item bug in FireFox

- [#328](https://github.com/hashicorp/design-system/pull/328) [`32b36ab1`](https://github.com/hashicorp/design-system/commit/32b36ab132b3356923ef6d1f3f36c2f7036e852c) Thanks [@didoo](https://github.com/didoo)! - updated `font-weight` to `medium` for `Link::Standalone` component (to be in sync with design specs)

- [#319](https://github.com/hashicorp/design-system/pull/319) [`7c96344f`](https://github.com/hashicorp/design-system/commit/7c96344f3c83baecc56daac6dfdddb809c161c1f) Thanks [@didoo](https://github.com/didoo)! - updated the `Hds::Dropdown::ListItem::Interactive` to support the `isLoading` state

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.8

## 0.12.3

### Patch Changes

- Updated dependencies [[`a46fc035`](https://github.com/hashicorp/design-system/commit/a46fc03570f51e8375b15571ddcb10e62ba446fb)]:
  - @hashicorp/design-system-tokens@0.8.1

## 0.12.2

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.7

## 0.12.1

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.6

## 0.12.0

### Minor Changes (Some Breaking)

- [#217](https://github.com/hashicorp/design-system/pull/217) [`210edd17`](https://github.com/hashicorp/design-system/commit/210edd17431e6e3097260aed0df5a8902f93b7f7) Thanks [@didoo](https://github.com/didoo)!

#### Interactive

- Introduced `<Hds::Interactive>` (a generic, "utility" component used internally by all the interactive elements like buttons and links)

#### Button

- updated the button API to handle also links as `<a>`/`<LinkTo/LinkToExternal>`
  - it can be used in place of the `<Hds::Link/LinkTo::CTA>` component (see below)
  - when the button is a link - the text is underlined for differentiation with a normal button - ⚠️ **Visual change!** - the button responds to `space` key event
- removed the `@type` argument from the API in favour of the `type` native attribute - 🚨 **Breaking change!**

#### Link/LinkTo::CTA

- removed the `<Hds::Link/LinkTo::CTA>` component, in favour of `<Hds::Button>` component (see above) - 🚨 **Breaking change!**

#### Link::Inline

- added the `<Hds::Link::Inline>` component (with API very similar to the `<Hds::Link::Standalone>`)

#### Dropdown

- Updated the `Dropdown::ListItem::Interactive` to use the new `<Hds::Interactive>` component

#### Alert/Toast components

- Removed the `<LinkTo::Standalone>` action (now you can use directly `<Link::Standalone>`)

## 0.11.2

### Patch Changes

- [#301](https://github.com/hashicorp/design-system/pull/301) [`4976379e`](https://github.com/hashicorp/design-system/commit/4976379e1b080c7753ceee2affe8cadc053296e5) Thanks [@alex-ju](https://github.com/alex-ju)! - Convey the disclosure state to assistive tech for dropdown and truncated breadcrumbs

## 0.11.1

### Patch Changes

- [#284](https://github.com/hashicorp/design-system/pull/284) [`ba409885`](https://github.com/hashicorp/design-system/commit/ba409885468f91d659d10971fa1f34f64f57ddbc) Thanks [@alex-ju](https://github.com/alex-ju)! - Change focus management in disclosure utility component

- [#289](https://github.com/hashicorp/design-system/pull/289) [`bf3a00e5`](https://github.com/hashicorp/design-system/commit/bf3a00e56989bbef92bfa355a42e5775785847a3) Thanks [@didoo](https://github.com/didoo)! - "Alert" and "Toast" components - converted "title" and "description" arguments to be contextual components

## 0.11.0

### Minor Changes (Some Breaking)

- [#245](https://github.com/hashicorp/design-system/pull/245) [`c6de1018`](https://github.com/hashicorp/design-system/commit/c6de101880ec1c21971e3775e1a21b6cb9e69757) Thanks [@didoo](https://github.com/didoo)!
  - Added `Alert` component
  - Added `Toast` component
- [#259](https://github.com/hashicorp/design-system/pull/259) [`478b3069`](https://github.com/hashicorp/design-system/commit/478b3069e800cf2ccefba9b5475c72b024e25d16) Thanks [@didoo](https://github.com/didoo)!
  - removed autofocus on first item for `Disclosure` component (and as a result also for `Breadcrumb` and `Dropdown` components) (🚨 Breaking)
  - updated focus state treatment for `Dropdown` component (🚨 Breaking)

### Patch Changes

- [#225](https://github.com/hashicorp/design-system/pull/225) [`f1f07179`](https://github.com/hashicorp/design-system/commit/f1f0717952b3e6b41676135cf00e77a6e55579ec) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - update to ember-keyboard@8.1.0 in packages/components

- [#265](https://github.com/hashicorp/design-system/pull/265) [`79bc3e99`](https://github.com/hashicorp/design-system/commit/79bc3e99cd5cc6cb60fc82286d5726c0d0ffbd82) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - npx ember-cli-update@4.3.0 dependency updates

- [#253](https://github.com/hashicorp/design-system/pull/253) [`21786983`](https://github.com/hashicorp/design-system/commit/21786983d4ebbb3f38a72d4d105504169bfeda78) Thanks [@MelSumner](https://github.com/MelSumner)! - bugfix for icon size in copy-item component

## 0.10.0

### Minor Changes (Some Breaking)

- [#200](https://github.com/hashicorp/design-system/pull/200) [`a8072537`](https://github.com/hashicorp/design-system/commit/a8072537542791398d375cde4a7a85c2955c66da) Thanks [@didoo](https://github.com/didoo)! - Updated Dropdown component:

  - added chevron animation for `toggle` elements
  - fixed issue with `list-item/interactive` height
  - added handling of dynamic `width` for the list
  - exposed an `onClose` event
  - removed the default icon for `toggle/icon` (🚨 Breaking)
  - removed icon requirement from the `critical` list item (🚨 Breaking)
  - updated the documentation and integration tests
  - some code refactorings, reorganizations and cleanups

## 0.9.2

### Patch Changes

- [#209](https://github.com/hashicorp/design-system/pull/209) [`6021d433`](https://github.com/hashicorp/design-system/commit/6021d43352b8e38b268b06cd98ca0c62adb14999) Thanks [@didoo](https://github.com/didoo)! - Re-ordered declarations of CSS states

## 0.9.1

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.5

## 0.9.0

### Minor Changes

- [#66](https://github.com/hashicorp/design-system/pull/66) [`29e2ce55`](https://github.com/hashicorp/design-system/commit/29e2ce55bab74cc02dd511794dfadd2b3ac40a14) Thanks [@MelSumner](https://github.com/MelSumner)! - Adds dropdown component to the design system

### Patch Changes

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@2.0.4

## 0.8.0

### Minor Changes

- [#115](https://github.com/hashicorp/design-system/pull/115) [`caff569b`](https://github.com/hashicorp/design-system/commit/caff569b46a9a46940eab94d263816dd7d046c56) Thanks [@didoo](https://github.com/didoo)! - added “Link::CTA“ and “LinkTo::CTA” components

## 0.7.1

### Patch Changes

- [#184](https://github.com/hashicorp/design-system/pull/184) [`12056051`](https://github.com/hashicorp/design-system/commit/12056051f2c3ffebc09a85fcd802732e5d5dce7d) Thanks [@didoo](https://github.com/didoo)! - Fixed issue with "click outside" in Safari for "Disclosure/Breadcrumb/Dropdown"

## 0.7.0

### Minor Changes (Some Breaking)

- [#150](https://github.com/hashicorp/design-system/pull/150) [`c236c159`](https://github.com/hashicorp/design-system/commit/c236c159f7d7ec6edc661710963f5733eb961edf) Thanks [@didoo](https://github.com/didoo)! - removed “box-sizing“ declarations from the components (we assume the consumers codebase already have set it to “border-box“ by default (🚨 Breaking)

## 0.6.0

### Minor Changes

- [#136](https://github.com/hashicorp/design-system/pull/136) [`bce712a7`](https://github.com/hashicorp/design-system/commit/bce712a7dc13615fa179b8c16791ac6cb8c37984) Thanks [@didoo](https://github.com/didoo)! - updated font-stack definitions in design tokens, will impact the visual aspect of all the components for certains combinations of OS/browser

### Patch Changes

- Updated dependencies [[`c17f142c`](https://github.com/hashicorp/design-system/commit/c17f142c0c938b471b696820d1fa440f62f7315b)]:
  - @hashicorp/design-system-tokens@0.8.0

## 0.5.1

### Patch Changes

- [#133](https://github.com/hashicorp/design-system/pull/133) [`6ed18c7f`](https://github.com/hashicorp/design-system/commit/6ed18c7f9bf211141ac38005e6bd3aea2dbbf1c7) Thanks [@didoo](https://github.com/didoo)! - small change to the “noop“ guard in the “@didInsert“ method of the “Disclosure“ component

## 0.5.0

### Minor Changes (Some Breaking)

- [#127](https://github.com/hashicorp/design-system/pull/127) [`fa13190f`](https://github.com/hashicorp/design-system/commit/fa13190f1058f172898221aa1e1913965bfa53e9) Thanks [@didoo](https://github.com/didoo)! - removed the “isDisabled“ prop from the “Button” component; added instructions for developers to manually add it themselves if needed. (🚨 Breaking)

### Patch Changes

- [#125](https://github.com/hashicorp/design-system/pull/125) [`b0ff180c`](https://github.com/hashicorp/design-system/commit/b0ff180c85ff920e704d46c9b823b3fa261b1b1e) Thanks [@didoo](https://github.com/didoo)! - updated border radius of “Badge” from 4px to 5px

- [#126](https://github.com/hashicorp/design-system/pull/126) [`7b639915`](https://github.com/hashicorp/design-system/commit/7b63991586b242973bad45c6108c447453772d0a) Thanks [@didoo](https://github.com/didoo)! - updated the internal padding of the “Button” component to match design specifications

## 0.4.0

### Minor Changes

- [#117](https://github.com/hashicorp/design-system/pull/117) [`e78f6df8`](https://github.com/hashicorp/design-system/commit/e78f6df8f7488f9f97e8de2a5dc3464b2a390725) Thanks [@didoo](https://github.com/didoo)! - added a stacking context for the “Button” component so that the focus z-index is isolated in the button

## 0.3.2

### Patch Changes

- [#112](https://github.com/hashicorp/design-system/pull/112) [`2be08081`](https://github.com/hashicorp/design-system/commit/2be08081582dd7e9c092fdb35c94c063d5ee7f4e) Thanks [@didoo](https://github.com/didoo)! - added missing helpers for “color” and “typography” in “components” package

## 0.3.1

### Patch Changes

- [#98](https://github.com/hashicorp/design-system/pull/98) [`411cd9b9`](https://github.com/hashicorp/design-system/commit/411cd9b949e376d38eb1dc4d4af93ae17e6c686a) Thanks [@didoo](https://github.com/didoo)! - refactored the “focus-ring” mixins to support both “action” (default) and “critical“ colors

- Updated dependencies [[`411cd9b9`](https://github.com/hashicorp/design-system/commit/411cd9b949e376d38eb1dc4d4af93ae17e6c686a)]:
  - @hashicorp/design-system-tokens@0.7.0

## 0.3.0

### Minor Changes

- [#48](https://github.com/hashicorp/design-system/pull/48) [`971efb9e`](https://github.com/hashicorp/design-system/commit/971efb9e92478e4d88c24aeee835f448f35d2066) Thanks [@didoo](https://github.com/didoo)! - Added "Breadcrumb" component

## 0.2.0

### Minor Changes

- [#76](https://github.com/hashicorp/design-system/pull/76) [`48a82d54`](https://github.com/hashicorp/design-system/commit/48a82d545817c280d022cf95b2f3a691dc3c46a3) Thanks [@didoo](https://github.com/didoo)! - Added the "tertiary" color variant to the "Button" component

- [#77](https://github.com/hashicorp/design-system/pull/77) [`c08711e4`](https://github.com/hashicorp/design-system/commit/c08711e4fa3fac0cd3418b8afa1a0c4c254e8fac) Thanks [@didoo](https://github.com/didoo)! - Fixed the "elevation" treatment for the "Button" component

## 0.1.2

### Patch Changes

- Updated dependencies [[`04db4d9e`](https://github.com/hashicorp/design-system/commit/04db4d9ece6aba358acfa0721a78dfe84c561b5e)]:
  - @hashicorp/design-system-tokens@0.6.0
