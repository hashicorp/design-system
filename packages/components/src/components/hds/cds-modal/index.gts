/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/modal/index.js';

import { MODAL_SIZE } from '@carbon/web-components/es/components/modal/defs.js';

type ModalSize = `${MODAL_SIZE}`;
type ModalLoadingStatus = 'inactive' | 'active' | 'finished' | 'error';

export const CDS_MODAL_SIZE_OPTIONS = Object.values(MODAL_SIZE);
export const CDS_MODAL_LOADING_STATUS_OPTIONS: ModalLoadingStatus[] = [
  'inactive',
  'active',
  'finished',
  'error',
];

export interface HdsCdsModalSignature {
  Args: {
    alert?: boolean;
    ariaLabel?: string;
    containerClass?: string;
    fullWidth?: boolean;
    hasScrollingContent?: boolean;
    loadingDescription?: string;
    loadingIconDescription?: string;
    loadingStatus?: ModalLoadingStatus;
    loadingSuccessDelay?: number;
    open?: boolean;
    preventClose?: boolean;
    preventCloseOnClickOutside?: boolean;
    shouldSubmitOnEnter?: boolean;
    size?: ModalSize;
    styles?: string;
  };
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsModal extends Component<HdsCdsModalSignature> {
  <template>
    <cds-modal
      alert={{@alert}}
      aria-label={{@ariaLabel}}
      {{!-- container-class={{@containerClass}} --}}
      full-width={{@fullWidth}}
      has-scrolling-content={{@hasScrollingContent}}
      loading-description={{@loadingDescription}}
      loading-icon-description={{@loadingIconDescription}}
      loading-status={{@loadingStatus}}
      loading-success-delay={{@loadingSuccessDelay}}
      open={{@open}}
      prevent-close={{@preventClose}}
      prevent-close-on-click-outside={{@preventCloseOnClickOutside}}
      should-submit-on-enter={{@shouldSubmitOnEnter}}
      size={{@size}}
      {{!-- styles={{@styles}} --}}
      ...attributes
    >
      {{yield}}
    </cds-modal>
  </template>
}
