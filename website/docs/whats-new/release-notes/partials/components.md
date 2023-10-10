**`npm package: @hashicorp/design-system-components`**

## 2.12.2 <Doc::Badge @type="outlined">Recent</Doc::Badge> 

**August 21st**

- `PowerSelect` fix style overrides when the list is positioned above. [(#1655)](https://github.com/hashicorp/design-system/pull/1655) Thanks [@alex-ju](https://github.com/alex-ju)!

- `Text` fixed issue with whitespace adding extra underline when used in links (eg. inside a `Link::Inline`). [(#1652)](https://github.com/hashicorp/design-system/pull/1652) Thanks [@didoo](https://github.com/didoo)! 

- 🔄 Updated dependencies:
    - @hashicorp/ember-flight-icons@3.1.3

## 2.12.1 

**August 21st**

- `Pagination` bugfix `aria-label` on the component.[(#1627)](https://github.com/hashicorp/design-system/pull/1627) Thanks [@MelSumner](https://github.com/MelSumner)! 

- `Dropdown` changed `@height` property to use `max-height` instead of a fixed height. [(#1635)](https://github.com/hashicorp/design-system/pull/1635) Thanks [@KristinLBradley](https://github.com/KristinLBradley)!

## 2.12.0

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

### Some Examples of Edge cases

## 0.6.0 <Doc::Badge @type="critical">Breaking Change</Doc::Badge> 

**April 1st**

`Breaking change` changes the output path for tokens to include `dist/ in the path. [(#70)](https://github.com/hashicorp/design-system/pull/70) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)!

Before `/products/css/tokens.css`

After `/dist/products/css/tokens.css`

## 0.6.0 

**April 1st**

🔥 `Breaking change` changes the output path for tokens to include `dist/ in the path. [(#70)](https://github.com/hashicorp/design-system/pull/70) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)!

Before `/products/css/tokens.css`

After `/dist/products/css/tokens.css`