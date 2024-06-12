/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsApplicationStateHeaderSignature {
  Args: {
    title?: string;
    errorCode?: string;
    icon?: string;
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateHeaderComponent extends Component<HdsApplicationStateHeaderSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Hds::ApplicationState::Header': typeof HdsApplicationStateHeaderComponent;
    'hds/application-state/header': typeof HdsApplicationStateHeaderComponent;
  }
}
