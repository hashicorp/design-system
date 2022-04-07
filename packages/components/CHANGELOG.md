# @hashicorp/design-system-components

## 0.8.0

### Minor Changes

- [#115](https://github.com/hashicorp/design-system/pull/115) [`caff569b`](https://github.com/hashicorp/design-system/commit/caff569b46a9a46940eab94d263816dd7d046c56) Thanks [@didoo](https://github.com/didoo)! - added “Link::CTA“ and “LinkTo::CTA” components

## 0.7.1

### Patch Changes

- [#184](https://github.com/hashicorp/design-system/pull/184) [`12056051`](https://github.com/hashicorp/design-system/commit/12056051f2c3ffebc09a85fcd802732e5d5dce7d) Thanks [@didoo](https://github.com/didoo)! - Fixed issue with "click outside" in Safari for "Disclosure/Breadcrumb/Dropdown"

## 0.7.0

### Minor Changes

- [#150](https://github.com/hashicorp/design-system/pull/150) [`c236c159`](https://github.com/hashicorp/design-system/commit/c236c159f7d7ec6edc661710963f5733eb961edf) Thanks [@didoo](https://github.com/didoo)! - removed “box-sizing“ declarations from the components (we assume the consumers codebase already have set it to “border-box“ by default

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

### Minor Changes

- [#127](https://github.com/hashicorp/design-system/pull/127) [`fa13190f`](https://github.com/hashicorp/design-system/commit/fa13190f1058f172898221aa1e1913965bfa53e9) Thanks [@didoo](https://github.com/didoo)! - removed the “isDisabled“ prop from the “Button” component; added instructions for developers to manually add it themselves if needed.

### Patch Changes

- [#125](https://github.com/hashicorp/design-system/pull/125) [`b0ff180c`](https://github.com/hashicorp/design-system/commit/b0ff180c85ff920e704d46c9b823b3fa261b1b1e) Thanks [@didoo](https://github.com/didoo)! - updated border radius of “Badge” from 4px to 5px

* [#126](https://github.com/hashicorp/design-system/pull/126) [`7b639915`](https://github.com/hashicorp/design-system/commit/7b63991586b242973bad45c6108c447453772d0a) Thanks [@didoo](https://github.com/didoo)! - updated the internal padding of the “Button” component to match design specifications

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

* [#77](https://github.com/hashicorp/design-system/pull/77) [`c08711e4`](https://github.com/hashicorp/design-system/commit/c08711e4fa3fac0cd3418b8afa1a0c4c254e8fac) Thanks [@didoo](https://github.com/didoo)! - Fixed the "elevation" treatment for the "Button" component

## 0.1.2

### Patch Changes

- Updated dependencies [[`04db4d9e`](https://github.com/hashicorp/design-system/commit/04db4d9ece6aba358acfa0721a78dfe84c561b5e)]:
  - @hashicorp/design-system-tokens@0.6.0
