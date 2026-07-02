/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsAppFrame,
  HdsModal,
  HdsButtonSet,
  HdsButton,
} from '@hashicorp/design-system-components/components';

export default class PageLayoutsAppFrameFramelessDemoFullAppFrameWithModal extends Component {
  @tracked isModalOpen = true;

  handleModalClose = () => {
    this.isModalOpen = false;
  };

  <template>
    {{pageTitle "AppFrame Component - Frameless"}}

    <HdsAppFrame as |Frame|>
      <Frame.Header>
        <ShwPlaceholder @height="60px" @text="header" @background="#e5ffd2" />
      </Frame.Header>
      <Frame.Sidebar>
        <ShwPlaceholder
          @width="120px"
          @height="100%"
          @text="sidebar"
          @background="#e4c5f3"
        />
      </Frame.Sidebar>
      <Frame.Main>
        <ShwPlaceholder @height="200vh" @text="main" @background="#d2f4ff" />
      </Frame.Main>
      {{#if this.isModalOpen}}
        <HdsModal @onClose={{this.handleModalClose}} as |M|>
          <M.Header>Demo modal</M.Header>
          <M.Body>
            <ShwPlaceholder
              @width="100%"
              @height="100%"
              @text="modal"
              @background="#ffffffb5"
            />
          </M.Body>
          <M.Footer as |MFooter|>
            <HdsButtonSet>
              <HdsButton
                @color="secondary"
                @text="Close"
                {{on "click" MFooter.close}}
              />
              <HdsButton @text="Submit" {{on "click" MFooter.close}} />
            </HdsButtonSet>
          </M.Footer>
        </HdsModal>
      {{/if}}
      <Frame.Footer>
        <ShwPlaceholder @height="60px" @text="footer" @background="#fff8d2" />
      </Frame.Footer>
    </HdsAppFrame>
  </template>
}
