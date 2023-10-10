**`npm package: @hashicorp/design-system-components`**

### 2.12.2 <Doc::Badge @type="outlined">Latest</Doc::Badge> 

**August 21st**

- `PowerSelect` fix style overrides when the list is positioned above. [(#1655)](https://github.com/hashicorp/design-system/pull/1655) Thanks [@alex-ju](https://github.com/alex-ju)!

- `Text` fixed issue with whitespace adding extra underline when used in links (eg. inside a `Link::Inline`). [(#1652)](https://github.com/hashicorp/design-system/pull/1652) Thanks [@didoo](https://github.com/didoo)! 

- 🔄 Updated dependencies:
    - @hashicorp/ember-flight-icons@3.1.3

### 2.12.1 

**August 21st**

- `Pagination` bugfix `aria-label` on the component.[(#1627)](https://github.com/hashicorp/design-system/pull/1627) Thanks [@MelSumner](https://github.com/MelSumner)! 

- `Dropdown` changed `@height` property to use `max-height` instead of a fixed height. [(#1635)](https://github.com/hashicorp/design-system/pull/1635) Thanks [@KristinLBradley](https://github.com/KristinLBradley)!

### 2.12.0

**August 21st**

- `Design tokens` added color tokens for “Vault Secrets” product. [(#1640)](https://github.com/hashicorp/design-system/pull/1640) Thanks [@didoo](https://github.com/didoo)! 

- `IconTile` updated component to include `vault-secrets` product option

- `Text` removed leftover `console.log` from code.[(#1615)](https://github.com/hashicorp/design-system/pull/1615) Thanks [@didoo](https://github.com/didoo)!

- `Dropdown` refactored the layout of the checkbox and radio inputs to make the gap between the inputs and the associated text, as well as the icon and count, clickable. [(#1618)](https://github.com/hashicorp/design-system/pull/1618) Thanks [@KristinLBradley](https://github.com/KristinLBradley)!

- `Hds::Link::Standalone` change font-weight from 500 to 400 to match font-weight of `Hds::Button`. [(#1617)](https://github.com/hashicorp/design-system/pull/1617) Thanks [@KristinLBradley](https://github.com/KristinLBradley)!

- `Stepper` removed some CSS declarations that were not used/applied. [(#1628)](https://github.com/hashicorp/design-system/pull/1628) Thanks [@didoo](https://github.com/didoo)!

- 🔄 Updated dependencies:
    - @hashicorp/design-system-tokens@1.8.0
    - @hashicorp/ember-flight-icons@3.1.2

### 2.11.0

**August 21st**

- `Hds::Text` added new `Text` component. [(#1490)](https://github.com/hashicorp/design-system/pull/1490) Thanks [@didoo](https://github.com/didoo)!

- `Hds::Form::MaskedInput` add `hasCopyButton` argument. [(#1587)](https://github.com/hashicorp/design-system/pull/15807) Thanks [@alex-ju](https://github.com/alex-ju)!

- `Form::Indicator` removed aria-hidden from the "optional" span [(#1577)](https://github.com/hashicorp/design-system/pull/1577) Thanks [@DingoEatingFuzz](https://github.com/DingoEatingFuzz)!

- `ember-named-blocks-polyfill` removed as all consumers of HDS are on Ember 3.25 or later now. This can be installed locally if it is still needed. [(#1606)](https://github.com/hashicorp/design-system/pull/1577) Thanks [@Dhaulagiri](https://github.com/didoo)! 

- `Alert`, `Toast` fixed an issue with anchor tag color styles within Description that had been overriding `Hds::Link color`; changed the default color for HTML links within Description to "neutral" to better align with existing guidance for links in the actions and improve accessible contrast. [(#1576)](https://github.com/hashicorp/design-system/pull/1577) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! 

- 🔄 Updated dependencies:
    - @hashicorp/ember-flight-icons@3.1.1

### 2.8.0

**August 21st**

- `Hds::Card` updated default value of @overflow argument to "visible" to address an area of consumer confusion and better support the most common use cases. 
[(#1492)](https://github.com/hashicorp/design-system/pull/1492) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! 
    - ⛔️ `Breaking change` technically, this is a breaking change as it will require consumers relying upon the previous hidden default value to now manually set the value. The result of not setting the a hidden value can cause square edges of some images to "stick out" and overlap the rounded corners of the Card itself. We considered this to be a fairly minor, low-impact issue however which would not affect functionality or usability.

- `Hds::Form::TextInput` add loading state on "search" type. [(#1452)](https://github.com/hashicorp/design-system/pull/1492) Thanks [@alex-ju](https://github.com/alex-ju)! 

- `Hds::Form::MaskedInput` add component. [(#1468)](https://github.com/hashicorp/design-system/pull/1492) Thanks [@alex-ju](https://github.com/alex-ju)!

- `Hds::Accordion component` add component [(#1423)](https://github.com/hashicorp/design-system/pull/1423) Thanks [@KristinBradley](https://github.com/KristinLBradley)!

- `Hds::PageHeader` set position to 'relative'. [(#1466)](https://github.com/hashicorp/design-system/pull/1466) Thanks [@alex-ju](https://github.com/alex-ju)!

- `Hds::Textarea` fix border and text color for readonly state. [(#1470)](https://github.com/hashicorp/design-system/pull/1470) Thanks [@alex-ju](https://github.com/alex-ju)!

- `Hds::Modal` prevent onClose callback function invocation when isDismissDisabled is true. [(#1456)](https://github.com/hashicorp/design-system/pull/145) Thanks [@alex-ju](https://github.com/alex-ju)!

- `font-weight` of the `button` mixin explicitly to `regualr` instead of relying on inheritance (components using this mixin: `Button`, `Dropdown::ToggleButton` and soon `Accordion`) - No visual difference expected. [(#1469)](https://github.com/hashicorp/design-system/pull/1469) Thanks [@didoo](https://github.com/didoo)!

- 🔄 Updated dependencies:
    - @hashicorp/design-system-tokens@1.6.0
    - @hashicorp/ember-flight-icons@3.0.7

### 2.4.0

**August 21st**

- `Hds::Disclosure` refactored internal utility component into two new components. Renamed from `Hds::Disclosure component` to `Hds::MenuPrimitive`. `Hds::DisclosurePrimitive` component stripped of the 'click outside/unfocus/esc to close' functionality. [(#1371)](https://github.com/hashicorp/design-system/pull/1371) Thanks [@KristinLBradley](https://github.com/KristinLBradley)!

- `aria-label` update to support for consistency. Consumers can now see in the component API docs where @ariaLabel is supported for a custom value, and what the fallback value is. [(#1373)](https://github.com/hashicorp/design-system/pull/1373) Thanks [@MelSumner](https://github.com/MelSumner)!

- `Tooltip` prevent content from overflowing. [(#1364)](https://github.com/hashicorp/design-system/pull/1371) Thanks [@alex-ju](https://github.com/alex-ju)!