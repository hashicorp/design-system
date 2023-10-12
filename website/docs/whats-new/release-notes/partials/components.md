<p class="doc-whats-new-changelog-npm-info">
  <strong><code>npm package: @hashicorp/design-system-components</code></strong>
  <a href="https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components">
    <img src="https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components.svg" alt="npm version" height="20">
  </a>
</p>

## 3.0.0

**Major changes**

- Drop support for Node 14 - PR: [#1708](https://github.com/hashicorp/design-system/pull/1708) / Commit: [`59fedbdd9`](https://github.com/hashicorp/design-system/commit/59fedbdd9534d403fa51c6b2527ac65b4e72b473) /

- Add `Hds::Form::VisibilityToggle` as a form base element - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`0f8dfb1d3`](https://github.com/hashicorp/design-system/commit/0f8dfb1d393c9d95583a6b2ea8166adc378f13ac) /

  - `Hds::Form::TextInput::Field` - Add `Hds::Form::VisibilityToggle` to password inputs (controlled via `@hasVisibilityToggle` - Notice that this is set to be visible by default now)
  - `Hds::Form::MaskedInput` - Refactor to use `Hds::Form::VisibilityToggle`
  - `Hds::Form::MaskedInput` - Rename `@isMasked` to `@isContentMasked`

  To migrate `Hds::Form::MaskedInput` instances replace `@isMasked` arguments with `@isContentMasked`

- `Hds::Dropdown` – remove `@listPosition` `left` and `right` (use `bottom-left` and `bottom-right`, respectively) - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`8a8108e53`](https://github.com/hashicorp/design-system/commit/8a8108e53928b6d984b54237df6333fa76069bfa) /

  To migrate `Hds::Dropdown` instances:

  - replace `@listPosition="left"` with `@listPosition="bottom-left"`
  - replace `@listPosition="right"` with `@listPosition="bottom-right"`

- `SideNav` - renamed `extraBefore/After` generic containers to `ExtraBefore/After` (uppercase `E`) - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`f1c040446`](https://github.com/hashicorp/design-system/commit/f1c040446902cdce29f2d10363f1728c0befcf73) /

  To migrate rename all the `extraBefore/After` instances yielded within the `<Hds::SideNav>` component to `ExtraBefore/After`

- `Form::RadioCard` - remove the `@layout` property - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`07ccb1bc1`](https://github.com/hashicorp/design-system/commit/07ccb1bc156c33faccafb7993f33ba2b34dff604) /

  `Form::RadioCard::Group` - repurpose the `@layout` property to either `horizontal` (default) or `vertical`

  To migrate `Form::RadioCard` and `Form::RadioCard::Group` instances without encountering visual changes:

  - make sure all instances with `@layout="fixed"` have a `@maxWidth` defined, then remove the `@layout="fixed"` definition
  - remove all `@layout="fluid"` definitions

**Minor changes**

- `Dropdown::ListItem::CopyItem` - changed defaults for `@color` (now `secondary`) and `@isTruncated` (now `true`) - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`b99ff90b3`](https://github.com/hashicorp/design-system/commit/b99ff90b3baa32f9ba30f987992d957e1fa575f3) /

  _Consumers should review the defaults values for this (sub)component in their codebases, to make sure they match the intended visual designs._

- `Button`, `Interactive` - Converted components to TypeScript - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`2ddd0ece9`](https://github.com/hashicorp/design-system/commit/2ddd0ece9245f92afa3c9b2997aa6b4f638fd1c7) /

- `Copy::Snippet` - Fixed the way in which “width/full-width” is applied to the component + Internal update to the “truncation” implementation. - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`67070a680`](https://github.com/hashicorp/design-system/commit/67070a6800da459874d9b506b14d6126f9e73db2) /

  - the component is not full-width anymore by default (the width now fits the content); use `@isFullWidth={{true}}` to have a full-width layout
  - the internal class name `hds-copy-snippet__text--truncated` has been changed to `hds-copy-snippet--is-truncated` (and moved)

  _Consumers should review the pages where this component is used to make sure its width matches the intended visual designs (in case, use the `@isFullWidth` argument to control its full-width). In case they're using the `hds-copy-snippet__text--truncated` class name, they should also update their code to adapt to the new implementation._

- removed `ember-cli-clipboard` as dependency and introduced a custom `hds-clipboard` modifier (using the web [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)) - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`620c16df6`](https://github.com/hashicorp/design-system/commit/620c16df61c21a5a5b1c54d4052342442043082a) /

  - `Copy::Button`
    - replaced third-party `clipboard` modifier with `hds-clipboard`
    - removed `@container` argument (not needed anymore, it was used in the third party library as a hack to account for focus trapping and focus shifting)
    - added `@onSuccess/onError` callbacks
  - `Copy::Snippet`
    - replaced third-party `clipboard` modifier with `hds-clipboard`
    - added `@onSuccess/onError` callbacks
  - `Dropdown::ListItem::CopyItem`
    - the change to the underlying `Copy::Snippet` has fixed an issue with the focus being lost on copy (causing the dropdown to close on copy)

  _Consumers should remove the `@container` argument from all the instances of `Copy::Button` (not needed anymore) and double check that the `Copy::Button/Snippet` instances work exactly as before._

**Patch changes**

- `Copy::Snippet` - fixed background colors for different states according to Figma specs (main change is the default/base background is now transparent, not white) - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`de5b896f6`](https://github.com/hashicorp/design-system/commit/de5b896f6c30c58465e6bd0f15122deb824a6d89) /

- `Form::MaskedInput` - changed copy logic for `CopyButton` used inside the component - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`bb4352db5`](https://github.com/hashicorp/design-system/commit/bb4352db5aad3fe291cbf6ed943a1bab773b4ade) /

- `Accordion` - replaced internal text styling (using `Text` component) - PR: [#1634](https://github.com/hashicorp/design-system/pull/1634) / Commit: [`e919c1b5c`](https://github.com/hashicorp/design-system/commit/e919c1b5c52f4b6a95f21eb7e9e212983240c9dd) /

  - `ApplicationState` - replaced internal text styling (using `Text` component)
  - `Copy::Snippet` - replaced internal text styling (using `Text` component)
  - `Dropdown` - replaced internal text styling (using `Text` component)
  - `Form:**` - replaced internal text styling (using `Text` component)
  - `Flyout` - replaced internal text styling (using `Text` component)
  - `Modal` - replaced internal text styling (using `Text` component)
  - `PageHeader` - replaced internal text styling (using `Text` component)
  - `Pagination` - replaced internal text styling (using `Text` component)
  - `Stepper` - replaced internal text styling (using `Text` component)
  - `Tag` - replaced internal text styling (using `Text` component)

  _No impact is expected on the consumers' applications._

- 🔄 Updated dependencies [[`59fedbdd9`](https://github.com/hashicorp/design-system/commit/59fedbdd9534d403fa51c6b2527ac65b4e72b473)]:
  - @hashicorp/ember-flight-icons@4.0.0

## 2.14.0

**Minor changes**

- [#1700](https://github.com/hashicorp/design-system/pull/1700) [`33d760fb8`](https://github.com/hashicorp/design-system/commit/33d760fb88d3945be8b50302a9bb7dce3ae221fe) Thanks [@didoo](https://github.com/didoo)! - `Pagination::Compact` - Added option to show "SizeSelector" element

- [#1688](https://github.com/hashicorp/design-system/pull/1688) [`c842b6eb7`](https://github.com/hashicorp/design-system/commit/c842b6eb731d82146b0e1ad8b9f55930b58aba18) Thanks [@didoo](https://github.com/didoo)! - `Tabs` - Refactored logic for `Tabs` component + `Tab/Panel` sub-components to support more complex use cases:

  - introduced `@selectedTabIndex` argument to control the "selected" tab from the consuming application, e.g. via query params (effort spearheaded by @MiniHeyd)
  - fixed issue with nested tabs not initializing the "selected" indicator correctly
  - fixed issue with dynamic tab content not updating the "selected" indicator correctly

## 2.13.0

**Minor changes**

- [#1623](https://github.com/hashicorp/design-system/pull/1623) [`2111a5439`](https://github.com/hashicorp/design-system/commit/2111a5439abea2951f12517354db662edd7c9cb9) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - `AppFooter` - Added new component

- [#1630](https://github.com/hashicorp/design-system/pull/1630) [`04da95443`](https://github.com/hashicorp/design-system/commit/04da95443290ee2d03d9bef23787a4ef10577247) Thanks [@alex-ju](https://github.com/alex-ju)! - `SideNav` - add `@isCollapsible` (to control if users can collapse the sidenav on 'desktop' viewports) and `@isMinimized` (to control the default state on 'desktop' viewports) arguments

**Patch changes**

- [#1696](https://github.com/hashicorp/design-system/pull/1696) [`f3f3fb103`](https://github.com/hashicorp/design-system/commit/f3f3fb103a5aa1c6489d011b6820560df4c2ed88) Thanks [@MelSumner](https://github.com/MelSumner)! - `Tag` - Updated padding for dismiss button for WCAG conformance

- [#1678](https://github.com/hashicorp/design-system/pull/1678) [`a51976ded`](https://github.com/hashicorp/design-system/commit/a51976ded4f7939fe140a1abade0f98832ccc2d0) Thanks [@alex-ju](https://github.com/alex-ju)! - `Link::Standalone` – increase target size

- Updated dependencies [[`04da95443`](https://github.com/hashicorp/design-system/commit/04da95443290ee2d03d9bef23787a4ef10577247)]:
  - @hashicorp/design-system-tokens@1.9.0

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


---

_[Read the full changelog](https://github.com/hashicorp/design-system/blob/main/packages/components/CHANGELOG.md)_