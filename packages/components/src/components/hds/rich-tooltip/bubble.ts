/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ModifierLike } from '@glint/template';
import type { SetupPrimitivePopoverModifier } from '../popover-primitive';

export interface HdsRichTooltipBubbleSignature {
  Args: {
    width?: string;
    height?: string;
    isOpen?: boolean;
    popoverId: string;
    arrowId: string;
    setupPrimitivePopover: ModifierLike<SetupPrimitivePopoverModifier>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsRichTooltipBubble extends Component<HdsRichTooltipBubbleSignature> {
  get sizingStyles(): Record<string, string> {
    const sizingStyles: {
      width?: string;
      'max-width'?: string;
      height?: string;
      'max-height'?: string;
    } = {};

    if (this.args.width) {
      sizingStyles['width'] = this.args.width;
      sizingStyles['max-width'] = 'none';
    }

    if (this.args.height) {
      sizingStyles['height'] = this.args.height;
      sizingStyles['max-height'] = 'none';
    }

    return sizingStyles;
  }
}
