/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type PageTitleRegistry from 'ember-page-title/template-registry';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';

import type HdsComponentsRegistry from '@hashicorp/design-system-components/template-registry';

import type WebsiteRegistry from './template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends HdsComponentsRegistry,
      PageTitleRegistry,
      EmberTruthRegistry,
      WebsiteRegistry {}
}
