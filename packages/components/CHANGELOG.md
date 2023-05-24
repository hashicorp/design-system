# @hashicorp/design-system-components

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
  - Adds support for the `{{each}}` loop's `key` to be defined with `identityKey` (optional; falls back to the Ember default if none is provided)

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

* [#1070](https://github.com/hashicorp/design-system/pull/1070) [`91b004f93`](https://github.com/hashicorp/design-system/commit/91b004f9329034064890f3e7a18e35912312fb5d) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `Flyout` component

### Patch Changes

- Updated dependencies [[`2c6024a38`](https://github.com/hashicorp/design-system/commit/2c6024a38f5f457231f7301d219478a4f746de37)]:
  - @hashicorp/design-system-tokens@1.4.0

## 1.5.2

### Patch Changes

- [#1036](https://github.com/hashicorp/design-system/pull/1036) [`b1756288e`](https://github.com/hashicorp/design-system/commit/b1756288e907dd36784fd33921e016d99a1b3417) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Update design system name to Helios

* [#971](https://github.com/hashicorp/design-system/pull/971) [`fa819fedf`](https://github.com/hashicorp/design-system/commit/fa819fedf22b2dee45e8ee1119b98099f5402524) Thanks [@alex-ju](https://github.com/alex-ju)! - Fix repetitive required field indicator for screen readers

- [#1130](https://github.com/hashicorp/design-system/pull/1130) [`34fb0fe18`](https://github.com/hashicorp/design-system/commit/34fb0fe18895e59676fb208dc6025d2d15353336) Thanks [@MelSumner](https://github.com/MelSumner)! - Moves icon and count inside of tab (button element) for WCAG conformance

* [#1157](https://github.com/hashicorp/design-system/pull/1157) [`39b645296`](https://github.com/hashicorp/design-system/commit/39b64529645110c0980c253c2e01099e2b585bc0) Thanks [@MelSumner](https://github.com/MelSumner)! - Fixes malformed CSS classes in table component

- [#1080](https://github.com/hashicorp/design-system/pull/1080) [`1dde47948`](https://github.com/hashicorp/design-system/commit/1dde47948ef2aa2400e8f39e49e060d7507db037) Thanks [@didoo](https://github.com/didoo)! - Added `onSort` callback to `Hds::Table` component

* [#1127](https://github.com/hashicorp/design-system/pull/1127) [`4eaf727e7`](https://github.com/hashicorp/design-system/commit/4eaf727e7b9ac732c1cc5a053d9e5a4b636ffc78) Thanks [@MelSumner](https://github.com/MelSumner)! - Adds missing aria-label to breadcrumb truncation toggle for WCAG conformance.

* Updated dependencies [[`b1756288e`](https://github.com/hashicorp/design-system/commit/b1756288e907dd36784fd33921e016d99a1b3417)]:
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

* [#722](https://github.com/hashicorp/design-system/pull/722) [`58a52103`](https://github.com/hashicorp/design-system/commit/58a521034b0e6a2a421b4c8b79f26a431e13a83b) Thanks [@MelSumner](https://github.com/MelSumner)! - Add `Table` component

### Patch Changes

- [#681](https://github.com/hashicorp/design-system/pull/681) [`6f08ddd2`](https://github.com/hashicorp/design-system/commit/6f08ddd2b491ed13b60e153aa4cc13db8c3884da) Thanks [@KristinLBradley](https://github.com/KristinLBradley)! - Explicitly set `aria-selected` to `true` or `false`

* [#698](https://github.com/hashicorp/design-system/pull/698) [`db8a1caf`](https://github.com/hashicorp/design-system/commit/db8a1caff4553ed3240c0260a831526fd2fe6844) Thanks [@alex-ju](https://github.com/alex-ju)! - Add `@layout` parameter to `RadioCard`

* Updated dependencies [[`aeff4e02`](https://github.com/hashicorp/design-system/commit/aeff4e02e3c5c738104be326569c110dc2f79618)]:
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

* [#660](https://github.com/hashicorp/design-system/pull/660) [`4d0826a6`](https://github.com/hashicorp/design-system/commit/4d0826a6df220031b36f4918c5c5365012672c27) Thanks [@alex-ju](https://github.com/alex-ju)! - Update the `Hds::Button` style when rendered as a link

- [#638](https://github.com/hashicorp/design-system/pull/638) [`90182235`](https://github.com/hashicorp/design-system/commit/901822353453e98c914c8d57e523d64b32a23f75) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - explicitly add ember-style-modifiers as a dependency

* [#636](https://github.com/hashicorp/design-system/pull/636) [`27a283a5`](https://github.com/hashicorp/design-system/commit/27a283a52c2828b32c282401f91df9bd929f9dda) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Add copyright notice to license file

* Updated dependencies [[`a079992f`](https://github.com/hashicorp/design-system/commit/a079992fbbed11812fcf4cdd4409a00fa2d246f1), [`11d39410`](https://github.com/hashicorp/design-system/commit/11d39410c40725ff34a291e17eac3f8f8321c659), [`27a283a5`](https://github.com/hashicorp/design-system/commit/27a283a52c2828b32c282401f91df9bd929f9dda), [`ecbe26df`](https://github.com/hashicorp/design-system/commit/ecbe26df6bdbaf7b4f00c70d016eead0da9168f0)]:
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

* [#577](https://github.com/hashicorp/design-system/pull/577) [`2f5a2c21`](https://github.com/hashicorp/design-system/commit/2f5a2c214c25be7fd91c2e73c88fb436f72dbd6f) Thanks [@alex-ju](https://github.com/alex-ju)! - Add small variant to `Hds::Dropdown::ToggleButton`

### Patch Changes

- [#545](https://github.com/hashicorp/design-system/pull/545) [`6d2a6298`](https://github.com/hashicorp/design-system/commit/6d2a6298c407a74a14a11b3426fd60d673d10954) Thanks [@didoo](https://github.com/didoo)! - Small cleanup (reformatting, linting) of the Sass files. Should have zero visual impact on the components.

* [#565](https://github.com/hashicorp/design-system/pull/565) [`0f5247f0`](https://github.com/hashicorp/design-system/commit/0f5247f0f088ad35f877294089d0c69caaffdb37) Thanks [@didoo](https://github.com/didoo)! - added stylelint to the codebase and re-organized CSS declarations

* Updated dependencies [[`0b245333`](https://github.com/hashicorp/design-system/commit/0b24533369ccc2d02aa5c6c8b8ba4f722e07d236)]:
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

* [#416](https://github.com/hashicorp/design-system/pull/416) [`824e53d1`](https://github.com/hashicorp/design-system/commit/824e53d11678a5bb2544add3d9d1b2a93f9c42c1) Thanks [@alex-ju](https://github.com/alex-ju)! - Remove stray aria-describedby in alert component

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

* [#354](https://github.com/hashicorp/design-system/pull/354) [`e7997ee6`](https://github.com/hashicorp/design-system/commit/e7997ee68d7d8b104243c8b6129db1030a3cea57) Thanks [@didoo](https://github.com/didoo)! - small update to the `yield` helper component - this is used in `Alert` and `Toast` but the changes should have no impact

## 0.12.4

### Patch Changes

- [#343](https://github.com/hashicorp/design-system/pull/343) [`a74711c8`](https://github.com/hashicorp/design-system/commit/a74711c8c0de6843625781488ed94521c7f8cb7c) Thanks [@MelSumner](https://github.com/MelSumner)! - Fixes copy-item bug in FireFox

* [#328](https://github.com/hashicorp/design-system/pull/328) [`32b36ab1`](https://github.com/hashicorp/design-system/commit/32b36ab132b3356923ef6d1f3f36c2f7036e852c) Thanks [@didoo](https://github.com/didoo)! - updated `font-weight` to `medium` for `Link::Standalone` component (to be in sync with design specs)

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

* [#289](https://github.com/hashicorp/design-system/pull/289) [`bf3a00e5`](https://github.com/hashicorp/design-system/commit/bf3a00e56989bbef92bfa355a42e5775785847a3) Thanks [@didoo](https://github.com/didoo)! - "Alert" and "Toast" components - converted "title" and "description" arguments to be contextual components

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
