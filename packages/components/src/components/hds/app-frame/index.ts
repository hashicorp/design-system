/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAppFrameFooterSignature } from './parts/footer.ts';
import type { HdsAppFrameHeaderSignature } from './parts/header.ts';
import type { HdsAppFrameMainSignature } from './parts/main.ts';
import type { HdsAppFrameModalsSignature } from './parts/modals.ts';
import type { HdsAppFrameSidebarSignature } from './parts/sidebar.ts';
export interface HdsAppFrameSignature {
  Args: {
    hasFooter?: boolean;
    hasHeader?: boolean;
    hasMain?: boolean;
    hasModals?: boolean;
    hasSidebar?: boolean;
    isHeaderFixed?: boolean;
  };
  Blocks: {
    default: [
      {
        Footer?: ComponentLike<HdsAppFrameFooterSignature>;
        Header?: ComponentLike<HdsAppFrameHeaderSignature>;
        Main?: ComponentLike<HdsAppFrameMainSignature>;
        Modals?: ComponentLike<HdsAppFrameModalsSignature>;
        Sidebar?: ComponentLike<HdsAppFrameSidebarSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAppFrameComponent extends Component<HdsAppFrameSignature> {
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

  // Set whether the header should be fixed or not
  get isHeaderFixed(): boolean {
    return this.args.isHeaderFixed ?? true;
  }

  // Get the class names to apply to the component.
  get classNames(): string {
    const classes = ['hds-app-frame'];

    if (this.isHeaderFixed && this.hasHeader) {
      classes.push('hds-app-frame--is-header-fixed');
    }

    return classes.join(' ');
  }
}
