/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCdsButton } from '@hashicorp/design-system-components/components';

import CodeFragmentControlledModal from '../code-fragments/controlled-modal';
import CodeFragmentDismissModal from '../code-fragments/dismiss-modal';

export default class SubSectionInteractive extends Component {
  @tracked isControlledOpen = false;
  @tracked isDismissDemoOpen = false;
  @tracked isDirectOpen = false;
  @tracked isDismissDisabled = false;
  @tracked closeCount = 0;

  openControlledModal = () => {
    this.isControlledOpen = true;
  };

  closeControlledModal = () => {
    this.isControlledOpen = false;
  };

  openDismissDemoModal = () => {
    this.isDismissDemoOpen = true;
  };

  closeDismissDemoModal = () => {
    this.isDismissDemoOpen = false;
  };

  openDirectModal = () => {
    this.isDirectOpen = true;
  };

  toggleDismissDisabled = () => {
    this.isDismissDisabled = !this.isDismissDisabled;
  };

  handleControlledClosed = () => {
    this.isControlledOpen = false;
    this.closeCount += 1;
  };

  handleDismissDemoBeforeClose = (event: Event) => {
    if (this.isDismissDisabled) {
      event.preventDefault();
    }
  };

  handleDismissDemoClosed = () => {
    this.isDismissDemoOpen = false;
  };

  handleDirectClosed = () => {
    this.isDirectOpen = false;
  };

  <template>
    <ShwTextH2>Interactive Examples</ShwTextH2>

    <ShwGrid @columns={{2}} as |SG|>
      <SG.Item>
        <ShwTextH3>Programmatic open and close</ShwTextH3>
        <p>Use the trigger or modal actions to control visibility.</p>
        <HdsCdsButton @kind="primary" {{on "click" this.openControlledModal}}>
          Open modal
        </HdsCdsButton>
        <CodeFragmentControlledModal
          @closeCount={{this.closeCount}}
          @isOpen={{this.isControlledOpen}}
          @onClose={{this.handleControlledClosed}}
          @onCloseWithState={{this.closeControlledModal}}
        />
      </SG.Item>

      <SG.Item>
        <ShwTextH3>Dismiss behavior</ShwTextH3>
        <p>Toggle whether users can dismiss through overlay, escape, or close
          controls.</p>
        <HdsCdsButton
          @kind="secondary"
          {{on "click" this.toggleDismissDisabled}}
        >
          {{if this.isDismissDisabled "Enable dismiss" "Disable dismiss"}}
        </HdsCdsButton>
        <br />
        <br />
        <HdsCdsButton @kind="primary" {{on "click" this.openDismissDemoModal}}>
          Open dismiss demo
        </HdsCdsButton>
        <CodeFragmentDismissModal
          @isDismissDisabled={{this.isDismissDisabled}}
          @isOpen={{this.isDismissDemoOpen}}
          @onBeforeClose={{this.handleDismissDemoBeforeClose}}
          @onClose={{this.handleDismissDemoClosed}}
          @onForceClose={{this.closeDismissDemoModal}}
        />
      </SG.Item>

      <SG.Item>
        <ShwTextH3>Direct `cds-modal` usage</ShwTextH3>
        <p>This example uses Carbon web components directly with an XS modal.</p>
        <HdsCdsButton @kind="primary" {{on "click" this.openDirectModal}}>
          Open direct xs modal
        </HdsCdsButton>

        <cds-modal
          open={{this.isDirectOpen}}
          size="xs"
          {{on "cds-modal-closed" this.handleDirectClosed}}
        >
          <cds-modal-header>
            <cds-modal-close-button
              close-button-label="Close"
            ></cds-modal-close-button>
            <cds-modal-heading>Direct cds-modal (xs)</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content description="">
              This modal is rendered directly with `cds-modal` tags instead of
              HDS wrapper components.
            </cds-modal-body-content>
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary" data-modal-close>
              Cancel
            </cds-modal-footer-button>
            <cds-modal-footer-button kind="primary" data-modal-close>
              Confirm
            </cds-modal-footer-button>
          </cds-modal-footer>
        </cds-modal>
      </SG.Item>
    </ShwGrid>
  </template>
}
