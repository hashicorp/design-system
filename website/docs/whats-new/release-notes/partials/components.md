<p class="doc-whats-new-changelog-npm-info">
  <strong><code>npm package: @hashicorp/design-system-components</code></strong>
  <a href="https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components">
    <img src="https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components.svg" alt="npm version" height="20">
  </a>
</p>

## 2.12.2

**Patch changes**

- [#1655](https://github.com/hashicorp/design-system/pull/1655) [`38f7e36c2`](https://github.com/hashicorp/design-system/commit/38f7e36c25f3efdade9c8833512d55af502ee07e) Thanks [@alex-ju](https://github.com/alex-ju)! - PowerSelect - fix style overrides when the list is positioned above

- [#1652](https://github.com/hashicorp/design-system/pull/1652) [`61af964b0`](https://github.com/hashicorp/design-system/commit/61af964b0078377dcedafa744e0fd18e89852b96) Thanks [@didoo](https://github.com/didoo)! - `Text` - Fixed issue with whitespace adding extra underline when used in links (eg. inside a `Link::Inline`)

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@3.1.3

## 2.12.1

**Patch changes**

- [#1627](https://github.com/hashicorp/design-system/pull/1627) [`53c9f13c0`](https://github.com/hashicorp/design-system/commit/53c9f13c0a2b120d19d74a88fd0e0799d59752c4) Thanks [@MelSumner](https://github.com/MelSumner)! - `Pagination` - Bugfix `aria-label` on the component

- [#1635](https://github.com/hashicorp/design-system/pull/1635) [`2ecab760c`](https://github.com/hashicorp/design-system/commit/2ecab760c07c89ee9d34e993b879fc19e914c2e0) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - `Dropdown` - changed `@height` property to use `max-height` instead of a fixed height.

## 2.12.0

**Minor changes**

- [#1640](https://github.com/hashicorp/design-system/pull/1640) [`8001667d2`](https://github.com/hashicorp/design-system/commit/8001667d2b0b549b5c2743ebaa4b50b58344a87f) Thanks [@didoo](https://github.com/didoo)! - `Design tokens` - Added color tokens for “Vault Secrets” product

  `IconTile` - updated component to include `vault-secrets` product option

**Patch changes**

- [#1615](https://github.com/hashicorp/design-system/pull/1615) [`d5d4402b2`](https://github.com/hashicorp/design-system/commit/d5d4402b2b7529d60ac693babc2a9187f8fbad36) Thanks [@didoo](https://github.com/didoo)! - `Text` - Removed leftover `console.log` from code

- [#1618](https://github.com/hashicorp/design-system/pull/1618) [`4e31014d5`](https://github.com/hashicorp/design-system/commit/4e31014d503d4b71e6b70b11ba750b75c0cb2d37) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Refactor the layout of the `Dropdown` checkbox and radio inputs to make the gap between the inputs and the associated text, as well as the icon and count, clickable.

- [#1617](https://github.com/hashicorp/design-system/pull/1617) [`214f66e9e`](https://github.com/hashicorp/design-system/commit/214f66e9e8818da87e6d514b3808b40a0b7e56f5) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Change font-weight of `Hds::Link::Standalone` from 500 to 400 to match font-weight of `Hds::Button`.

- [#1628](https://github.com/hashicorp/design-system/pull/1628) [`cc15349d3`](https://github.com/hashicorp/design-system/commit/cc15349d31c698d89540897570f76a5f2dc670ce) Thanks [@didoo](https://github.com/didoo)! - `Stepper` - removed some CSS declarations that were not used/applied

- Updated dependencies [[`8001667d2`](https://github.com/hashicorp/design-system/commit/8001667d2b0b549b5c2743ebaa4b50b58344a87f)]:
  - @hashicorp/design-system-tokens@1.8.0
  - @hashicorp/ember-flight-icons@3.1.2

## 2.11.0

**Minor changes**

- [#1490](https://github.com/hashicorp/design-system/pull/1490) [`4dafcb7d7`](https://github.com/hashicorp/design-system/commit/4dafcb7d7568027c495cb92d01026359a040507a) Thanks [@didoo](https://github.com/didoo)! - `Hds::Text` - Added new `Text` component

- [#1587](https://github.com/hashicorp/design-system/pull/1587) [`57e7a42cb`](https://github.com/hashicorp/design-system/commit/57e7a42cb8353af83d8be5be0a318f951b00d3e3) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Form::MaskedInput` - Add `hasCopyButton` argument

**Patch changes**

- [#1577](https://github.com/hashicorp/design-system/pull/1577) [`8aa9a5889`](https://github.com/hashicorp/design-system/commit/8aa9a5889cf14fc28100a462dfd42754a3bdb42b) Thanks [@DingoEatingFuzz](https://github.com/DingoEatingFuzz)! - Remove aria-hidden from the "optional" span in Form::Indicator

- [#1606](https://github.com/hashicorp/design-system/pull/1606) [`7ac4526db`](https://github.com/hashicorp/design-system/commit/7ac4526dbddda6bea0e6e9f542addc5c97914fa8) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Remove `ember-named-blocks-polyfill` as all consumers of HDS are on Ember 3.25 or later now. This can be installed locally if it is still needed.

- [#1576](https://github.com/hashicorp/design-system/pull/1576) [`e16c88ba9`](https://github.com/hashicorp/design-system/commit/e16c88ba959dcd0b186fd823fc3fccacf39674e8) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - `Alert`, `Toast`: Fixed an issue with anchor tag color styles within Description that had been overriding `Hds::Link` color; changed the default color for HTML links within Description to "neutral" to better align with existing guidance for links in the actions and improve accessible contrast.

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@3.1.1

## 2.10.0

**Minor changes**

- [#1535](https://github.com/hashicorp/design-system/pull/1535) [`2daa95479`](https://github.com/hashicorp/design-system/commit/2daa95479307fea0b94b2af413126d09525462c8) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add new `FileInput` component

**Patch changes**

- [#1570](https://github.com/hashicorp/design-system/pull/1570) [`7bf297996`](https://github.com/hashicorp/design-system/commit/7bf297996e06a15cb2506bfb23f43d71ecc9b492) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Remove unnecessary export of `hds/copy/index.js`

- [#1575](https://github.com/hashicorp/design-system/pull/1575) [`0362019ca`](https://github.com/hashicorp/design-system/commit/0362019ca043ef955364f18b23dbcd36f0bfb2bf) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Tabs` - Fix missing tab indicator when used in Modal or Flyout

- [#1567](https://github.com/hashicorp/design-system/pull/1567) [`384faeec2`](https://github.com/hashicorp/design-system/commit/384faeec244011f8090f3bcce0def89da1563164) Thanks [@MelSumner](https://github.com/MelSumner)! - Add support for container in Copy::Snippet and update API docs

- [#1571](https://github.com/hashicorp/design-system/pull/1571) [`8ad8a5908`](https://github.com/hashicorp/design-system/commit/8ad8a59080d0c0c855f2f746f0a10ddf4440e461) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Tabs` - Fix tabs and panels misbehaving on route change

- [#1568](https://github.com/hashicorp/design-system/pull/1568) [`dbe2e437d`](https://github.com/hashicorp/design-system/commit/dbe2e437d7d465cda3b69c7a28b01cbfb2849b79) Thanks [@MelSumner](https://github.com/MelSumner)! - Update error icon for copy components

- [#1555](https://github.com/hashicorp/design-system/pull/1555) [`90a615161`](https://github.com/hashicorp/design-system/commit/90a61516156ea58898febaa5bd66b31386256151) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::SegmentedGroup` - prevent `border-radius` from interfering with underlying elements

- [#1565](https://github.com/hashicorp/design-system/pull/1565) [`60154db1a`](https://github.com/hashicorp/design-system/commit/60154db1a00f877b2c3bc4a9c4069556e8af809b) Thanks [@MelSumner](https://github.com/MelSumner)! - Resolved issue where ThSort was not supporting right-aligned text properly

- Updated dependencies [[`8b8d6bcfa`](https://github.com/hashicorp/design-system/commit/8b8d6bcfa67efa5de1a2cc419167a962e747a8c9)]:
  - @hashicorp/ember-flight-icons@3.1.0

## 2.9.0

**Minor changes**

- [#1488](https://github.com/hashicorp/design-system/pull/1488) [`372bae36d`](https://github.com/hashicorp/design-system/commit/372bae36d87377dc87aa18ed39c7834a4cc545f4) Thanks [@MelSumner](https://github.com/MelSumner)! - Adds the `Hds::CopyButton` and `Hds::CopySnippet` components.

**Patch changes**

- [#1539](https://github.com/hashicorp/design-system/pull/1539) [`9d3f29a42`](https://github.com/hashicorp/design-system/commit/9d3f29a42e8130b2155498a7c3cb77a6da279a68) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Adjusted closing brace on copywrite headers to avoid terminal noise

- [#1549](https://github.com/hashicorp/design-system/pull/1549) [`a6553ea03`](https://github.com/hashicorp/design-system/commit/a6553ea032f70f0167f149589801b72154c3cf75) Thanks [@fivetanley](https://github.com/fivetanley)! - `Hds::Modal` - reduce test flakiness around closing Modal when using `@ember/test-helpers`

- [#1530](https://github.com/hashicorp/design-system/pull/1530) [`b757e6efb`](https://github.com/hashicorp/design-system/commit/b757e6efb4c115abcd604bc4ef155f731f118c72) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix Embroider warnings caused by incorrect export of internal utility functions

- [#1552](https://github.com/hashicorp/design-system/pull/1552) [`865ff7aad`](https://github.com/hashicorp/design-system/commit/865ff7aad593bddf6f16bfdb1210318bedfa4e22) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Flyout` - reduce test flakiness around closing Flyout when using `@ember/test-helpers`

- [#1529](https://github.com/hashicorp/design-system/pull/1529) [`1433fe098`](https://github.com/hashicorp/design-system/commit/1433fe0988b9c4e0d280ac450e6688e5d606630d) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Form::Field` - Fix error message for unexpected `@layout` values

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@3.0.9

## 2.8.1

**Patch changes**

- [#1516](https://github.com/hashicorp/design-system/pull/1516) [`f2192cad7`](https://github.com/hashicorp/design-system/commit/f2192cad73b6d966bf813f54dcee02e157c76392) Thanks [@didoo](https://github.com/didoo)! - `Hds::SideNav` - Fixed issue with links still being interactive (even if visually hidden) when the navigation is "minimized"

- [#1518](https://github.com/hashicorp/design-system/pull/1518) [`5fd48e31e`](https://github.com/hashicorp/design-system/commit/5fd48e31ed3241ee19a8226bb28fa04ad79479c5) Thanks [@didoo](https://github.com/didoo)! - `Hds::PageHeader` - Fixed overflow of non-breaking text for `title`, `subtitle` and `description` elements

- [#1494](https://github.com/hashicorp/design-system/pull/1494) [`169a85b63`](https://github.com/hashicorp/design-system/commit/169a85b6348649bc0e2411f3ab6f6a086eecb692) Thanks [@natmegs](https://github.com/natmegs)! - `Hds::Form::TextInput` - Add support for `datetime-local` type

- [#1500](https://github.com/hashicorp/design-system/pull/1500) [`b6c2867a4`](https://github.com/hashicorp/design-system/commit/b6c2867a4b7d1c183e9a17d16208ed12ce1aa43f) Thanks [@didoo](https://github.com/didoo)! - `Hds::SideNav` - updated layout styling for the `SideNav::List::Title` element

- [#1520](https://github.com/hashicorp/design-system/pull/1520) [`7f7ec22c3`](https://github.com/hashicorp/design-system/commit/7f7ec22c387ac9df05d05de31e5c2b45d6324777) Thanks [@alex-ju](https://github.com/alex-ju)! - Upgrade `ember-style-modifier` to `3.0.1`

- Updated dependencies [[`fd5953633`](https://github.com/hashicorp/design-system/commit/fd595363396c2e6672025ab8f9c3df7d2a3fce53)]:
  - @hashicorp/design-system-tokens@1.7.0
  - @hashicorp/ember-flight-icons@3.0.8

## 2.8.0

**Minor changes**

- [#1492](https://github.com/hashicorp/design-system/pull/1492) [`a17e5b2ac`](https://github.com/hashicorp/design-system/commit/a17e5b2acf66493ccbb68a623a3b7ba2fd5ab5a8) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - `Hds::Card` - Updated default value of `@overflow` argument to `"visible"` to address an area of consumer confusion and better support the most common use cases.

  Technically, this is a breaking change as it will require consumers relying upon the previous `hidden` default value to now manually set the value. The result of not setting the a `hidden` value can cause square edges of some images to "stick out" and overlap the rounded corners of the Card itself. We considered this to be a fairly minor, low-impact issue however which would not affect functionality or usability.

- [#1452](https://github.com/hashicorp/design-system/pull/1452) [`c277d0366`](https://github.com/hashicorp/design-system/commit/c277d036673cf572c00ebf5b8b35b424c0b057fd) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Form::TextInput` - Add loading state on "search" type

- [#1468](https://github.com/hashicorp/design-system/pull/1468) [`b0a766ccf`](https://github.com/hashicorp/design-system/commit/b0a766ccf5357dd6f0e8dfb68d8c1ee823e76b50) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Hds::Form::MaskedInput` component

- [#1423](https://github.com/hashicorp/design-system/pull/1423) [`5ac340c8c`](https://github.com/hashicorp/design-system/commit/5ac340c8c3a3adab388704067578cf419e2e2f10) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Add `Hds::Accordion` component

**Patch changes**

- [#1466](https://github.com/hashicorp/design-system/pull/1466) [`cdda7ae8e`](https://github.com/hashicorp/design-system/commit/cdda7ae8eaf553bd32ec9e3944edf08fe352caf4) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::PageHeader` – Set position to 'relative'

- [#1470](https://github.com/hashicorp/design-system/pull/1470) [`0ea2ccfd0`](https://github.com/hashicorp/design-system/commit/0ea2ccfd0303149014de768c715ebb53dffe6c4c) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Textarea` – Fix border and text color for readonly state

- [#1456](https://github.com/hashicorp/design-system/pull/1456) [`b4237e73b`](https://github.com/hashicorp/design-system/commit/b4237e73b3701d94e92556ad0108b8a38bef312d) Thanks [@alex-ju](https://github.com/alex-ju)! - `Hds::Modal` – Prevent `onClose` callback function invocation when `isDismissDisabled` is `true`

- [#1469](https://github.com/hashicorp/design-system/pull/1469) [`ef98ed4ed`](https://github.com/hashicorp/design-system/commit/ef98ed4ed188520fd69a0090ab93d7d0c44e634c) Thanks [@didoo](https://github.com/didoo)! - Set the `font-weight` of the `button` mixin explicitly to `regular` instead of relying on inheritance (components using this mixin: `Button`, `Dropdown::ToggleButton` and soon `Accordion`) - No visual difference expected

- Updated dependencies [[`b2ec25b39`](https://github.com/hashicorp/design-system/commit/b2ec25b399ba9aad5f8ae0b1f18a1bef9a6543e0)]:
  - @hashicorp/design-system-tokens@1.6.0
  - @hashicorp/ember-flight-icons@3.0.7

## 2.7.1

**Patch changes**

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

**Minor changes**

- [#1421](https://github.com/hashicorp/design-system/pull/1421) [`b8a45d6e7`](https://github.com/hashicorp/design-system/commit/b8a45d6e7ade6e973b2a860444d80d9216e3ab5c) Thanks [@didoo](https://github.com/didoo)! - `Table` - Exposed the internal sorting properties and methods `setSortBy`, `sortBy` and `sortOrder`

- [#1377](https://github.com/hashicorp/design-system/pull/1377) [`437c253dd`](https://github.com/hashicorp/design-system/commit/437c253dd6106d616ed8f83c060adb12ac83acac) Thanks [@jorytindall](https://github.com/jorytindall)! - Adds `PageHeader` component

- [#1393](https://github.com/hashicorp/design-system/pull/1393) [`38fb21e60`](https://github.com/hashicorp/design-system/commit/38fb21e6091c739f621e967e23d4c8b2794c9575) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Separator` component

**Patch changes**

- [#1415](https://github.com/hashicorp/design-system/pull/1415) [`555c86d3f`](https://github.com/hashicorp/design-system/commit/555c86d3fde07109775a61523f7b26444fc9ee62) Thanks [@didoo](https://github.com/didoo)! - `Hds::Table` - Changed the way in which the column `@width` defined by the user is applied

- Updated dependencies []:
  - @hashicorp/ember-flight-icons@3.0.5


---

_[Read the full changelog](https://github.com/hashicorp/design-system/blob/main/packages/components/CHANGELOG.md)_