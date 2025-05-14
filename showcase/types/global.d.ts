/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberCliStringHelpersRegistry from 'ember-cli-string-helpers/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type HdsComponentsRegistry from '@hashicorp/design-system-components/template-registry';
import type PageTitle from 'ember-page-title/template-registry';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type ShowcaseTemplateRegistry from './template-registry';
import type EmberComposableHelpersRegistry from '@nullvoxpopuli/ember-composable-helpers/template-registry';
import type PowerSelectRegistry from 'ember-power-select/template-registry';
import type BasicDropdownRegistry from 'ember-basic-dropdown/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberCliStringHelpersRegistry,
      EmberStyleModifierRegistry,
      EmberTruthRegistry,
      HdsComponentsRegistry,
      PageTitle,
      RenderModifiersRegistry,
      EmberIntlRegistry,
      ShowcaseTemplateRegistry,
      EmberComposableHelpersRegistry,
      PowerSelectRegistry,
      BasicDropdownRegistry {}
}
