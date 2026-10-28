/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// ---------------------------------------------------------------------------
// TEMPORARY: ambient declarations for loose-mode helper modules that ship
// without resolvable TypeScript types. These are registered in the strict test
// resolver (see tests/test-helper.ts) so ember-power-select can render.
//
// REMOVE this entire block once we upgrade to ember-power-select@9 /
// ember-basic-dropdown@9 (strict-mode, no manual registration needed).
// ---------------------------------------------------------------------------
declare module 'ember-assign-helper/helpers/assign' {
  import type Helper from '@ember/component/helper';
  const AssignHelper: typeof Helper;
  export default AssignHelper;
}

declare module 'ember-power-select/helpers/ember-power-select-is-equal' {
  import type Helper from '@ember/component/helper';
  const EmberPowerSelectIsEqual: typeof Helper;
  export default EmberPowerSelectIsEqual;
}

declare module 'ember-power-select/helpers/ember-power-select-is-group' {
  import type Helper from '@ember/component/helper';
  const EmberPowerSelectIsGroup: typeof Helper;
  export default EmberPowerSelectIsGroup;
}

declare module 'ember-power-select/helpers/ember-power-select-is-selected-present' {
  import type Helper from '@ember/component/helper';
  const EmberPowerSelectIsSelectedPresent: typeof Helper;
  export default EmberPowerSelectIsSelectedPresent;
}
// --------------------- END TEMPORARY power-select block ---------------------
