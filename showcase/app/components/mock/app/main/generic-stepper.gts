/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

// HDS components
import {
  HdsButton,
  HdsButtonSet,
  HdsFlyout,
  HdsModal,
  HdsStepperList,
  HdsStepperNav,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

export interface MockAppMainGenericStepperSignature {
  Element: HTMLDivElement;
}

export default class MockAppMainGenericStepper extends Component<MockAppMainGenericStepperSignature> {
  @tracked currentStep = 1;
  @tracked navModalActive = false;
  @tracked navFlyoutActive = false;
  @tracked listModalActive = false;
  @tracked listFlyoutActive = false;

  updateCurrentStep = (_event: MouseEvent, stepNumber: number) => {
    this.currentStep = stepNumber;
  };

  onNextClick = () => {
    this.currentStep++;
  };

  onPreviousClick = () => {
    this.currentStep--;
  };

  activateNavModal = () => {
    this.navModalActive = true;
  };

  deactivateNavModal = () => {
    this.navModalActive = false;
  };

  activateNavFlyout = () => {
    this.navFlyoutActive = true;
  };

  deactivateNavFlyout = () => {
    this.navFlyoutActive = false;
  };

  activateListModal = () => {
    this.navModalActive = true;
  };

  deactivateListModal = () => {
    this.navModalActive = false;
  };

  activateListFlyout = () => {
    this.navFlyoutActive = true;
  };

  deactivateListFlyout = () => {
    this.navFlyoutActive = false;
  };

  <template>
    <div class="mock-app-main-generic-stepper">
      <HdsTextDisplay
        @tag="h2"
        @size="400"
        class="mock-app-main-generic-stepper__header"
      >StepperNav</HdsTextDisplay>
      <HdsStepperNav
        @titleTag="h3"
        @currentStep={{this.currentStep}}
        @ariaLabel="Label"
        @onStepChange={{this.updateCurrentStep}}
        as |S|
      >
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
        <S.Panel>
          <ShwPlaceholder @text="Step 1: Generic content" @height="100" />
          <HdsButton
            type="button"
            @text="Next"
            @isInline={{true}}
            class="mock-app-main-generic-stepper__form-button"
            {{on "click" this.onNextClick}}
          />
        </S.Panel>
        <S.Panel>
          <HdsButtonSet>
            <HdsButton
              @text="Open modal"
              @color="secondary"
              {{on "click" (fn this.activateNavModal "navModalActive")}}
            />
            <HdsButton
              @text="Open flyout"
              @color="secondary"
              {{on "click" (fn this.activateNavFlyout "navFlyoutActive")}}
            />
          </HdsButtonSet>

          {{#if this.navModalActive}}
            <HdsModal
              id="nav-modal"
              @onClose={{fn this.deactivateNavModal "navModalActive"}}
              as |M|
            >
              <M.Header>
                Modal title
              </M.Header>
              <M.Body>
                <p class="hds-typography-body-300 hds-foreground-primary">Modal
                  content</p>
              </M.Body>
              <M.Footer as |F|>
                <HdsButton
                  type="button"
                  @text="Confirm"
                  {{on "click" F.close}}
                />
              </M.Footer>
            </HdsModal>
          {{/if}}

          {{#if this.navFlyoutActive}}
            <HdsFlyout
              id="nav-flyout"
              @onClose={{fn this.deactivateNavFlyout "navFlyoutActive"}}
              as |M|
            >
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
          <HdsButtonSet class="mock-app-main-generic-stepper__form-button">
            <HdsButton
              type="button"
              @text="Previous"
              @color="secondary"
              @isInline={{true}}
              {{on "click" this.onPreviousClick}}
            />
            <HdsButton
              type="button"
              @text="Next"
              @isInline={{true}}
              {{on "click" this.onNextClick}}
            />
          </HdsButtonSet>
        </S.Panel>
        <S.Panel>
          <ShwPlaceholder @text="Step 3: Generic content" @height="100" />
          <HdsButton
            type="button"
            @text="Previous"
            @color="secondary"
            @isInline={{true}}
            class="mock-app-main-generic-stepper__form-button"
            {{on "click" this.onPreviousClick}}
          />
        </S.Panel>
      </HdsStepperNav>
      <HdsTextDisplay
        @tag="h2"
        @size="400"
        class="mock-app-main-generic-stepper__header"
      >StepperList</HdsTextDisplay>
      <HdsStepperList
        @titleTag="h3"
        @ariaLabel="Label"
        {{style width="200px"}}
        as |S|
      >
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 1: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <HdsButton
              @text="Open modal"
              @color="secondary"
              {{on "click" (fn this.activateListModal "listModalActive")}}
            />
            {{#if this.listModalActive}}
              <HdsModal
                id="list-modal"
                @onClose={{fn this.deactivateListModal "listModalActive"}}
                as |M|
              >
                <M.Header>
                  Modal title
                </M.Header>
                <M.Body>
                  <p
                    class="hds-typography-body-300 hds-foreground-primary"
                  >Modal content</p>
                </M.Body>
                <M.Footer as |F|>
                  <HdsButton
                    type="button"
                    @text="Confirm"
                    {{on "click" F.close}}
                  />
                </M.Footer>
              </HdsModal>
            {{/if}}
          </:content>
        </S.Step>
        <S.Step @status="progress">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <HdsButton
              @text="Open flyout"
              @color="secondary"
              {{on "click" (fn this.activateListFlyout "listFlyoutActive")}}
            />
            {{#if this.listFlyoutActive}}
              <HdsFlyout
                id="list-flyout"
                @onClose={{fn this.deactivateListFlyout "listFlyoutActive"}}
                as |M|
              >
                <M.Header @tagline="Main page context" @icon="info">
                  Additional information
                </M.Header>
                <M.Body>
                  <p class="hds-typography-body-300 hds-foreground-primary">
                    Aliquam ac enim iaculis, faucibus enim id, dapibus quam.
                    Nunc nibh mi, vehicula sed enim eget, lacinia venenatis
                    tortor. Quisque vitae accumsan est, eu vehicula arcu.
                  </p>
                </M.Body>
              </HdsFlyout>
            {{/if}}
          </:content>
        </S.Step>
        <S.Step @status="incomplete">
          <:title>Title</:title>
        </S.Step>
      </HdsStepperList>
    </div>
  </template>
}
