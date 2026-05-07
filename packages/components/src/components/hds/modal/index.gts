/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import type { ComponentLike } from '@glint/template';

import HdsModalCds from './cds/index.gts';
import HdsModalHds from './hds/index.gts';

import type { HdsIconSignature } from '../icon/index.gts';
import type { HdsModalSizes, HdsModalColors } from './types.ts';

export { SIZES, COLORS, DEFAULT_SIZE, DEFAULT_COLOR } from './cds/index.gts';

// Public block API exposed by the wrapper. This is the structural intersection
// of the public API both implementations already satisfy. The cds implementation
// yields a local HdsModalHeader/HdsModalFooter; the hds implementation yields
// `HdsDialogPrimitiveHeader`/`HdsDialogPrimitiveFooter` (with `id`/`onDismiss`/etc.
// already bound). Either matches this shape from the consumer's perspective.

type HdsModalHeaderLike = ComponentLike<{
  Args: {
    icon?: HdsIconSignature['Args']['name'];
    tagline?: string;
  };
  Blocks: { default: [] };
  Element: Element;
}>;

type HdsModalBodyLike = ComponentLike<{
  Args: Record<string, never>;
  Blocks: { default: [] };
  Element: Element;
}>;

type HdsModalFooterLike = ComponentLike<{
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
  };
  Blocks: {
    default: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (event: MouseEvent, ...args: any[]) => void;
      },
    ];
  };
  Element: Element;
}>;

export interface HdsModalSignature {
  Args: {
    isDismissDisabled?: boolean;
    size?: HdsModalSizes;
    color?: HdsModalColors;
    returnFocusTo?: string;
    onOpen?: () => void;
    onClose?: (event: Event) => void;
    /**
     * When true, renders the Carbon (cds) modal implementation.
     * When false (default), renders the original HDS modal implementation
     * (native `<dialog>` with focus-trap).
     */
    useCds?: boolean;
  };
  Blocks: {
    default: [
      {
        Header?: HdsModalHeaderLike;
        Body?: HdsModalBodyLike;
        Footer?: HdsModalFooterLike;
      },
    ];
  };
  Element: HTMLElement | HTMLDialogElement;
}

export default class HdsModal extends Component<HdsModalSignature> {
  get useCds(): boolean {
    return this.args.useCds ?? false;
  }

  <template>
    {{#if this.useCds}}
      <HdsModalCds
        @isDismissDisabled={{@isDismissDisabled}}
        @size={{@size}}
        @color={{@color}}
        @returnFocusTo={{@returnFocusTo}}
        @onOpen={{@onOpen}}
        @onClose={{@onClose}}
        ...attributes
      >
        <:default as |M|>
          {{yield (hash Header=M.Header Body=M.Body Footer=M.Footer)}}
        </:default>
      </HdsModalCds>
    {{else}}
      <HdsModalHds
        @isDismissDisabled={{@isDismissDisabled}}
        @size={{@size}}
        @color={{@color}}
        @returnFocusTo={{@returnFocusTo}}
        @onOpen={{@onOpen}}
        @onClose={{@onClose}}
        ...attributes
      >
        <:default as |M|>
          {{yield (hash Header=M.Header Body=M.Body Footer=M.Footer)}}
        </:default>
      </HdsModalHds>
    {{/if}}
  </template>
}
