/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type HdsComponentsRegistry from '@hashicorp/design-system-components/template-registry';
import type PageTitle from 'ember-page-title/template-registry';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type ShowcaseTemplateRegistry from './template-registry';
import type EmberComposableHelpersRegistry from '@nullvoxpopuli/ember-composable-helpers/template-registry';
import type PowerSelectRegistry from 'ember-power-select/template-registry';
import type { HelperLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberStyleModifierRegistry,
      EmberTruthRegistry,
      HdsComponentsRegistry,
      PageTitle,
      RenderModifiersRegistry,
      ShowcaseTemplateRegistry,
      EmberComposableHelpersRegistry,
      PowerSelectRegistry {
    // TODO: `ember-cli-string-helpers` is no longer deprecated and we should add types to it.
    capitalize: HelperLike<{
      Args: {
        Positional: [string];
      };
      Return: string;
    }>;
  }
}
