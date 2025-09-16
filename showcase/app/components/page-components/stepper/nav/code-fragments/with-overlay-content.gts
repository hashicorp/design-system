/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import {
  HdsButton,
  HdsButtonSet,
  HdsFlyout,
  HdsModal,
  HdsStepperNav,
} from '@hashicorp/design-system-components/components';

import type { HdsStepperNavSignature } from '@hashicorp/design-system-components/components/hds/stepper/nav/index';

export interface CodeFragmentWithOverlayContentSignature {
  Element: HdsStepperNavSignature['Element'];
}

export default class CodeFragmentWithOverlayContent extends Component<CodeFragmentWithOverlayContentSignature> {
  @tracked modalActive = false;
  @tracked flyoutActive = false;

  activateModal = () => {
    this.modalActive = true;
  };

  deactivateModal = () => {
    this.modalActive = false;
  };

  activateFlyout = () => {
    this.flyoutActive = true;
  };

  deactivateFlyout = () => {
    this.flyoutActive = false;
  };

  <template>
    <HdsStepperNav @titleTag="h3" @currentStep={{1}} @ariaLabel="Label" as |S|>
      <S.Step>
        <:title>Title</:title>
        <:description>Description</:description>
      </S.Step>
      <S.Step>
        <:title>Title</:title>
        <:description>Description</:description>
      </S.Step>
      <S.Step>
        <:title>Title</:title>
        <:description>Description</:description>
      </S.Step>
      <S.Panel />
      <S.Panel>
        <HdsButtonSet>
          <HdsButton
            @text="Open modal"
            @color="secondary"
            {{on "click" this.activateModal}}
          />
          <HdsButton
            @text="Open flyout"
            @color="secondary"
            {{on "click" this.activateFlyout}}
          />
        </HdsButtonSet>

        {{#if this.modalActive}}
          <HdsModal id="demo-modal" @onClose={{this.deactivateModal}} as |M|>
            <M.Header>
              Modal title
            </M.Header>
            <M.Body>
              <p class="hds-typography-body-300 hds-foreground-primary">Modal
                content</p>
            </M.Body>
            <M.Footer as |F|>
              <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
            </M.Footer>
          </HdsModal>
        {{/if}}

        {{#if this.flyoutActive}}
          <HdsFlyout id="demo-flyout" @onClose={{this.deactivateFlyout}} as |M|>
            <M.Header @tagline="Main page context" @icon="info">
              Additional information
            </M.Header>
            <M.Body>
              <p class="hds-typography-body-300 hds-foreground-primary">
                Aliquam ac enim iaculis, faucibus enim id, dapibus quam. Nunc
                nibh mi, vehicula sed enim eget, lacinia venenatis tortor.
                Quisque vitae accumsan est, eu vehicula arcu.
              </p>
            </M.Body>
          </HdsFlyout>
        {{/if}}
      </S.Panel>
      <S.Panel />
    </HdsStepperNav>
  </template>
}
