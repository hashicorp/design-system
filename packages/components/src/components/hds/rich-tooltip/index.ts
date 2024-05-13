/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '../../../utils/hds-get-element-id.js';

interface IndexSignature {
  Args: {
    enableClickEvents: unknown;
    isOpen: unknown;
    onClose: unknown;
    onOpen: unknown;
  };
  Blocks: {
    default: [unknown];
  };
  Element: HTMLDivElement;
}

export default class IndexComponent extends Component<IndexSignature> {
  elementId = getElementId(this);
  arrowId = `arrow-${this.elementId}`;
  popoverId = `popover-${this.elementId}`;

  get enableSoftEvents() {
    return this.args.enableClickEvents !== true;
  }

  get enableClickEvents() {
    return this.args.enableClickEvents ?? false;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Index': typeof IndexComponent;
    'index': typeof IndexComponent;
  }
}
