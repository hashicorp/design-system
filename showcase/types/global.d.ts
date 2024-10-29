/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import 'ember-source/types';
export {};

import '@glint/environment-ember-loose';
import { Portal, PortalTarget } from 'ember-stargate';

import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type EmberStargateRegistry from 'ember-stargate/template-registry';
import type HdsComponentsRegistry from '@hashicorp/design-system-components/template-registry';
import type PageTitle from 'ember-page-title/template-registry';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type ShowcaseTemplateRegistry from './template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberStyleModifierRegistry,
      EmberTruthRegistry,
      EmberStargateRegistry,
      HdsComponentsRegistry,
      PageTitle,
      RenderModifiersRegistry,
      ShowcaseTemplateRegistry {
    // we have to use `ember-stargate` version `0.4.3` because version `0.5.0` causes a break in the tests for `ember-lts-3.28`
    Portal: typeof Portal;
    PortalTarget: typeof PortalTarget;
  }
}
