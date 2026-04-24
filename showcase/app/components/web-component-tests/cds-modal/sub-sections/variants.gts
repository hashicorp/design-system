/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCdsButton } from '@hashicorp/design-system-components/components';

import CodeFragmentVariantModal from '../code-fragments/variant-modal';

const CDS_MODAL_SIZE_OPTIONS = ['xs', 'sm', '', 'lg'] as const;
type ModalSize = (typeof CDS_MODAL_SIZE_OPTIONS)[number];

export default class SubSectionVariants extends Component {
  @tracked isOpen = false;
  @tracked activeSize: ModalSize | undefined = undefined;

  openModal = (size: ModalSize) => {
    this.activeSize = size;
    this.isOpen = true;
  };

  handleModalClosed = () => {
    this.isOpen = false;
  };

  get activeSizeLabel() {
    return this.activeSize || 'regular';
  }

  <template>
    <ShwTextH2>Size</ShwTextH2>

    <ShwFlex as |SF|>
      {{#each CDS_MODAL_SIZE_OPTIONS as |size|}}
        <SF.Item @label={{if size size "regular"}}>
          <HdsCdsButton
            @kind="secondary"
            {{on "click" (fn this.openModal size)}}
          >
            Open
            {{if size size "regular"}}
            modal
          </HdsCdsButton>
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <CodeFragmentVariantModal
      @activeSizeLabel={{this.activeSizeLabel}}
      @isOpen={{this.isOpen}}
      @onClose={{this.handleModalClosed}}
      @size={{this.activeSize}}
    />
  </template>
}
