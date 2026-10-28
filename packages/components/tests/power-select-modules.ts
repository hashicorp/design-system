/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// ---------------------------------------------------------------------------
// TEMPORARY: loose-mode power-select / basic-dropdown registration
//
// ember-power-select@8 and ember-basic-dropdown@8 ship classic (loose-mode)
// templates that reference helpers, components, and modifiers by string name.
// The strict resolver used in tests does not auto-register addon `_app_`
// trees, so each of these must be wired up by hand and merged into the test
// application's `modules` map (see tests/test-helper.ts).
//
// DELETE this whole file (and its import in tests/test-helper.ts) once we
// upgrade to ember-power-select@9 / ember-basic-dropdown@9, which are fully
// strict-mode and need no manual registration. Then also drop the
// `@embroider/util` devDependency and its alias in vite.config.mjs, which
// are only here for this file and for those addons. That upgrade means widening
// this package's `ember-basic-dropdown` peer range (^7.3.0 || ^8.6.1).
// ---------------------------------------------------------------------------

import OrHelper from 'ember-truth-helpers/helpers/or';
import AndHelper from 'ember-truth-helpers/helpers/and';
import EqHelper from 'ember-truth-helpers/helpers/eq';
import NotHelper from 'ember-truth-helpers/helpers/not';
import NotEqHelper from 'ember-truth-helpers/helpers/not-eq';
import AssignHelper from 'ember-assign-helper/helpers/assign';
import ElementHelper from 'ember-element-helper/helpers/element';
import { EnsureSafeComponentHelper } from '@embroider/util';
import EmberPowerSelectIsEqual from 'ember-power-select/helpers/ember-power-select-is-equal';
import EmberPowerSelectIsGroup from 'ember-power-select/helpers/ember-power-select-is-group';
import EmberPowerSelectIsSelectedPresent from 'ember-power-select/helpers/ember-power-select-is-selected-present';
import PowerSelect from 'ember-power-select/components/power-select';
import PowerSelectMultiple from 'ember-power-select/components/power-select-multiple';
import PowerSelectMultipleTrigger from 'ember-power-select/components/power-select-multiple/trigger';
import PowerSelectMultipleInput from 'ember-power-select/components/power-select-multiple/input';
import PowerSelectOptions from 'ember-power-select/components/power-select/options';
import PowerSelectBeforeOptions from 'ember-power-select/components/power-select/before-options';
import PowerSelectPlaceholder from 'ember-power-select/components/power-select/placeholder';
import PowerSelectNoMatchesMessage from 'ember-power-select/components/power-select/no-matches-message';
import PowerSelectSearchMessage from 'ember-power-select/components/power-select/search-message';
import PowerSelectTrigger from 'ember-power-select/components/power-select/trigger';
import PowerSelectLabel from 'ember-power-select/components/power-select/label';
import PowerSelectInput from 'ember-power-select/components/power-select/input';
import PowerSelectGroup from 'ember-power-select/components/power-select/power-select-group';
import BasicDropdown from 'ember-basic-dropdown/components/basic-dropdown';
import BasicDropdownContent from 'ember-basic-dropdown/components/basic-dropdown-content';
import BasicDropdownTrigger from 'ember-basic-dropdown/components/basic-dropdown-trigger';
import BasicDropdownWormhole from 'ember-basic-dropdown/components/basic-dropdown-wormhole';
import BasicDropdownTriggerModifier from 'ember-basic-dropdown/modifiers/basic-dropdown-trigger';

export const powerSelectTestModules = {
  './helpers/or': OrHelper,
  './helpers/and': AndHelper,
  './helpers/eq': EqHelper,
  './helpers/not': NotHelper,
  './helpers/not-eq': NotEqHelper,
  './helpers/assign': AssignHelper,
  './helpers/element': ElementHelper,
  './helpers/ensure-safe-component': EnsureSafeComponentHelper,
  './helpers/ember-power-select-is-equal': EmberPowerSelectIsEqual,
  './helpers/ember-power-select-is-group': EmberPowerSelectIsGroup,
  './helpers/ember-power-select-is-selected-present':
    EmberPowerSelectIsSelectedPresent,
  './components/power-select': PowerSelect,
  './components/power-select-multiple': PowerSelectMultiple,
  './components/power-select-multiple/trigger': PowerSelectMultipleTrigger,
  './components/power-select-multiple/input': PowerSelectMultipleInput,
  './components/power-select/options': PowerSelectOptions,
  './components/power-select/before-options': PowerSelectBeforeOptions,
  './components/power-select/placeholder': PowerSelectPlaceholder,
  './components/power-select/no-matches-message': PowerSelectNoMatchesMessage,
  './components/power-select/search-message': PowerSelectSearchMessage,
  './components/power-select/trigger': PowerSelectTrigger,
  './components/power-select/label': PowerSelectLabel,
  './components/power-select/input': PowerSelectInput,
  './components/power-select/power-select-group': PowerSelectGroup,
  './components/basic-dropdown': BasicDropdown,
  './components/basic-dropdown-content': BasicDropdownContent,
  './components/basic-dropdown-trigger': BasicDropdownTrigger,
  './components/basic-dropdown-wormhole': BasicDropdownWormhole,
  './modifiers/basic-dropdown-trigger': BasicDropdownTriggerModifier,
};
