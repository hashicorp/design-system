/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import HdsAppFrameFooter from './parts/footer.gts';
import HdsAppFrameHeader from './parts/header.gts';
import HdsAppFrameMain from './parts/main.gts';
import HdsAppFrameModals from './parts/modals.gts';
import HdsAppFrameSidebar from './parts/sidebar.gts';

export interface HdsAppFrameSignature {
  Args: {
    hasFooter?: boolean;
    hasHeader?: boolean;
    hasMain?: boolean;
    hasModals?: boolean;
    hasSidebar?: boolean;
  };
  Blocks: {
    default: [
      {
        Footer?: typeof HdsAppFrameFooter;
        Header?: typeof HdsAppFrameHeader;
        Main?: typeof HdsAppFrameMain;
        Modals?: typeof HdsAppFrameModals;
        Sidebar?: typeof HdsAppFrameSidebar;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAppFrame extends Component<HdsAppFrameSignature> {
  // Indicates if the "header" container should be displayed
  get hasHeader(): boolean {
    return this.args.hasHeader ?? true;
  }

  // Indicates if the "sidebar" container should be displayed
  get hasSidebar(): boolean {
    return this.args.hasSidebar ?? true;
  }

  // Indicates if the "footer" container should be displayed
  get hasFooter(): boolean {
    return this.args.hasFooter ?? true;
  }

  // Indicates if the "modals" container should be displayed
  get hasModals(): boolean {
    return this.args.hasModals ?? true;
  }

  // Get the class names to apply to the component.
  get classNames(): string {
    const classes = ['hds-app-frame'];

    if (this.hasHeader && this.hasSidebar) {
      classes.push('hds-app-frame--has-header-with-sidebar');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if this.hasHeader}}
        {{yield (hash Header=HdsAppFrameHeader)}}
      {{/if}}
      {{#if this.hasSidebar}}
        {{yield (hash Sidebar=HdsAppFrameSidebar)}}
      {{/if}}
      {{!
        IMPORTANT: since the modals may be injected via portal or in-element with code that lives in the "main" container,
        the "modal" container needs to be present in the DOM _before_ the "main" block, otherwise it may cause errors
        where the target DOM element is not found (for example in tests where the modal may be immediately opened on first render).
      }}
      {{#if this.hasModals}}
        {{yield (hash Modals=HdsAppFrameModals)}}
      {{/if}}
      {{yield (hash Main=HdsAppFrameMain)}}
      {{#if this.hasFooter}}
        {{yield (hash Footer=HdsAppFrameFooter)}}
      {{/if}}
    </div>
  </template>
}
