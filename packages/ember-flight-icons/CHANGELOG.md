# @hashicorp/ember-flight-icons

## 5.0.0

### Major Changes

Converted Ember packages to v2 addon format.

To migrate update Sass cofiguration in `ember-cli-build.js` to include the paths for `ember-flight-icons` and `design-system-components`:

```js
sassOptions: {
  precision: 4,
  includePaths: [
    './node_modules/@hashicorp/design-system-tokens/dist/products/css',
    './node_modules/@hashicorp/ember-flight-icons/dist/styles'
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

## 4.1.0

### Minor Changes

_Since this is an update brand colors and product icons, we consider this a `minor` version release_

Improved resilience of SVG sprite loading script

<small class="doc-whats-new-changelog-metadata">[#1920](https://github.com/hashicorp/design-system/pull/1920)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@3.0.0

## 4.0.6

### Patch Changes

remove unused `contextRootURL` function

<small class="doc-whats-new-changelog-metadata">[#1900](https://github.com/hashicorp/design-system/pull/1900)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.25.0

## 4.0.5

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.24.0

## 4.0.4

### Patch Changes

When `lazyEmbed` is true, use dynamic `import()` to bundle the sprite separately

<small class="doc-whats-new-changelog-metadata">[#1803](https://github.com/hashicorp/design-system/pull/1803) - Thanks [@meirish](https://github.com/meirish) for the contribution! 🙏</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.23.0

## 4.0.3

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.22.0

## 4.0.2

### Patch Changes

Upgraded the following dependencies:

- `ember-cli-babel` from `7.26.11` to `8.2.0`

<small class="doc-whats-new-changelog-metadata">[#1761](https://github.com/hashicorp/design-system/pull/1761)</small>

<div class="doc-whats-new-changelog-separator"></div>

Upgraded the following dependencies:

- `ember-cli-htmlbars` from `6.2.0` to `6.3.0`

<small class="doc-whats-new-changelog-metadata">[#1756](https://github.com/hashicorp/design-system/pull/1756)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.21.0

## 4.0.1

### Patch Changes

Added missing dependency on `ember-get-config`

<small class="doc-whats-new-changelog-metadata">[#1747](https://github.com/hashicorp/design-system/pull/1747)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 4.0.0

### Major Changes

Drop support for Node 14

<small class="doc-whats-new-changelog-metadata">[#1634](https://github.com/hashicorp/design-system/pull/1634)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 3.1.3

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.20.0

## 3.1.2

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.19.0

## 3.1.1

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.18.0

## 3.1.0

### Minor Changes

Added opt in flag to allow consumers to move sprite loading out of index.html

<small class="doc-whats-new-changelog-metadata">[#1543](https://github.com/hashicorp/design-system/pull/1543)</small>

## 3.0.9

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.17.0

## 3.0.8

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.16.0

## 3.0.7

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.15.0

## 3.0.6

### Patch Changes

Upgraded Ember.js to latest stable release 4.12, including upgrades to:

- `ember-auto-import` from `2.6.0` to `2.6.3`
- `ember-cli-htmlbars` from `6.1.0` to `6.2.0`

Upgraded the following dependencies:

- `ember-focus-trap` from `1.0.1` to `1.0.2`
- `ember-keyboard"` from `8.1.0` to `8.2.0`
- `ember-truth-helpers` from `3.0.0` to `3.1.1`
- `sass` from `1.58.3` to `1.62.1`

Shifted our supported version of Node.js from `12.* || 14.* || >= 16` to `14.* || 16.* || >= 18`

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.14.0

<small class="doc-whats-new-changelog-metadata">[#1395](https://github.com/hashicorp/design-system/pull/1395)</small>

## 3.0.5

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.13.1

## 3.0.4

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@2.13.0

## 3.0.3

### Patch Changes

Fix error message for mismatched icon `@name`

<small class="doc-whats-new-changelog-metadata">[#1375](https://github.com/hashicorp/design-system/pull/1375) [`2c7d70868`](https://github.com/hashicorp/design-system/commit/2c7d70868b0fa000618214589e2422e07db68b22)</small>

## 3.0.2

### Patch Changes

- [#715](https://github.com/hashicorp/design-system/pull/715) [`aeff4e02`](https://github.com/hashicorp/design-system/commit/aeff4e02e3c5c738104be326569c110dc2f79618) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - remove `ember-test-selectors` peerDependency

- Updated dependencies [[`f9c22874`](https://github.com/hashicorp/design-system/commit/f9c22874ab24db25ee347c95e5c26dc0055a642e), [`b95f448a`](https://github.com/hashicorp/design-system/commit/b95f448a31cc138436caf0aae332139c5129d9dc)]:
  - @hashicorp/flight-icons@2.12.0

## 3.0.1

### Patch Changes

- [#618](https://github.com/hashicorp/design-system/pull/618) [`11d39410`](https://github.com/hashicorp/design-system/commit/11d39410c40725ff34a291e17eac3f8f8321c659) Thanks [@alex-ju](https://github.com/alex-ju)! - Update `ember` to `4.7.0`

* [#636](https://github.com/hashicorp/design-system/pull/636) [`27a283a5`](https://github.com/hashicorp/design-system/commit/27a283a52c2828b32c282401f91df9bd929f9dda) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Add copyright notice to license file

* Updated dependencies [[`27a283a5`](https://github.com/hashicorp/design-system/commit/27a283a52c2828b32c282401f91df9bd929f9dda)]:
  - @hashicorp/flight-icons@2.11.1

## 3.0.0

### Major Changes

- [#580](https://github.com/hashicorp/design-system/pull/580) [`55f38cb3`](https://github.com/hashicorp/design-system/commit/55f38cb3a30a6edf8854e53ce3642270fe00efdc) Thanks [@didoo](https://github.com/didoo)! - updated the Ember `FlightIcon` component to throw an error if a non-existing icon name is used

### Patch Changes

- Updated dependencies [[`55f38cb3`](https://github.com/hashicorp/design-system/commit/55f38cb3a30a6edf8854e53ce3642270fe00efdc), [`382fce2d`](https://github.com/hashicorp/design-system/commit/382fce2d063e8ff31849f28d68a138537354c68e)]:
  - @hashicorp/flight-icons@2.11.0

## 2.0.12

### Patch Changes

- Updated dependencies [[`4e557797`](https://github.com/hashicorp/design-system/commit/4e5577973154397da0b5d4302755a07b22826345)]:
  - @hashicorp/flight-icons@2.10.0

## 2.0.11

### Patch Changes

- Updated dependencies [[`f2b3398e`](https://github.com/hashicorp/design-system/commit/f2b3398e3056ae39fa35b1f9c81ddc0b2100073d)]:
  - @hashicorp/flight-icons@2.9.0

## 2.0.10

### Patch Changes

- Updated dependencies [[`c8221e26`](https://github.com/hashicorp/design-system/commit/c8221e26e85142024483be2ea85f6191f3ceb652)]:
  - @hashicorp/flight-icons@2.8.0

## 2.0.9

### Patch Changes

- Updated dependencies [[`c2f2e4ce`](https://github.com/hashicorp/design-system/commit/c2f2e4cea526421f63853461265064742af69729)]:
  - @hashicorp/flight-icons@2.7.0

## 2.0.8

### Patch Changes

- Updated dependencies [[`c241a6f0`](https://github.com/hashicorp/design-system/commit/c241a6f02723d2d1031d2f3e06c093d3e6b503d7), [`c0e90d53`](https://github.com/hashicorp/design-system/commit/c0e90d53fde0a9697d5aff04146f527285f7e696)]:
  - @hashicorp/flight-icons@2.6.0

## 2.0.7

### Patch Changes

- Updated dependencies [[`671640a4`](https://github.com/hashicorp/design-system/commit/671640a476ab4ae4e0dd84e5e00964475e95e870)]:
  - @hashicorp/flight-icons@2.5.0

## 2.0.6

### Patch Changes

- Updated dependencies [[`59906536`](https://github.com/hashicorp/design-system/commit/599065361476aab6016dce017f01ca73b9ebeebc)]:
  - @hashicorp/flight-icons@2.4.0

## 2.0.5

### Patch Changes

- Updated dependencies [[`fc3a3dd4`](https://github.com/hashicorp/design-system/commit/fc3a3dd429f5681474bed95b43245d83b4094567)]:
  - @hashicorp/flight-icons@2.3.1

## 2.0.4

### Patch Changes

- Updated dependencies [[`84b2514d`](https://github.com/hashicorp/design-system/commit/84b2514dff3e0ad584b843f315d3e2d77444b7be)]:
  - @hashicorp/flight-icons@2.3.0

## 2.0.3

### Patch Changes

- [#163](https://github.com/hashicorp/design-system/pull/163) [`3f2c4c06`](https://github.com/hashicorp/design-system/commit/3f2c4c064f91493ac0d943fda3df540bf40634b9) Thanks [@amyrlam](https://github.com/amyrlam)! - Bump @hashicorp/flight-icons package
