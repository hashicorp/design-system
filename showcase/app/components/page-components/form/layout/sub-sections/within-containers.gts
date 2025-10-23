/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import MockAppMainGenericFormPartialsAccountSignup from 'showcase/components/mock/app/main/generic-form/partials/account-signup';
import MockAppMainGenericFormPartialsActions from 'showcase/components/mock/app/main/generic-form/partials/actions';
import MockAppMainGenericFormPartialsAddPolicy from 'showcase/components/mock/app/main/generic-form/partials/add-policy';
import MockAppMainGenericFormPartialsAddUser from 'showcase/components/mock/app/main/generic-form/partials/add-user';

import {
  HdsButton,
  HdsButtonSet,
  HdsFlyout,
  HdsForm,
  HdsFormSeparator,
  HdsModal,
  HdsTabs,
} from '@hashicorp/design-system-components/components';

export default class SubSectionWithinContainers extends Component {
  @tracked isModalActive = false;
  @tracked isFlyoutActive = false;

  activateModal = () => {
    this.isModalActive = true;
  };

  deactivateModal = () => {
    this.isModalActive = false;
  };

  activateFlyout = () => {
    this.isFlyoutActive = true;
  };

  deactivateFlyout = () => {
    this.isFlyoutActive = false;
  };

  <template>
    <ShwTextH2>Within containers</ShwTextH2>

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="Within Tabs">
        <HdsTabs as |T|>
          <T.Tab>Simple form</T.Tab>
          <T.Tab>Complex form</T.Tab>
          <T.Tab>Generic content</T.Tab>
          <T.Panel>
            <div {{style padding="24px 0"}}>
              {{! Here we use Mock::App components to avoid too much code repetition  }}
              <MockAppMainGenericFormPartialsAccountSignup />
            </div>
          </T.Panel>
          <T.Panel>
            <div {{style padding="24px 0"}}>
              {{! Here we use Mock::App components to avoid too much code repetition  }}
              <HdsForm>
                <MockAppMainGenericFormPartialsAddUser
                  @isHeaderFullWidth={{true}}
                />
                <HdsFormSeparator />
                <MockAppMainGenericFormPartialsAddPolicy />
                <MockAppMainGenericFormPartialsActions />
              </HdsForm>
            </div>
          </T.Panel>
          <T.Panel>
            <div {{style padding="24px 0"}}>
              <ShwPlaceholder @text="Generic content" @height="250" />
            </div>
          </T.Panel>
        </HdsTabs>
      </SF.Item>
      <SF.Item @label="Within a Modal">
        <button type="button" {{on "click" this.activateModal}}>Open modal</button>
        {{#if this.isModalActive}}
          <HdsModal
            id="test-form-in-modal"
            @onClose={{this.deactivateModal}}
            as |M|
          >
            <M.Header>Account signup form</M.Header>
            <M.Body>
              {{! Here we use Mock::App components to avoid too much code repetition  }}
              <MockAppMainGenericFormPartialsAccountSignup
                @hideHeader={{true}}
                @hideActions={{true}}
              />
            </M.Body>
            <M.Footer as |F|>
              {{! TODO! replace with partials/actions and pass callback as argument }}
              <HdsButtonSet>
                <HdsButton
                  type="submit"
                  @text="Submit"
                  {{on "click" this.deactivateModal}}
                />
                <HdsButton
                  type="button"
                  @text="Cancel"
                  @color="secondary"
                  {{on "click" F.close}}
                />
              </HdsButtonSet>
            </M.Footer>
          </HdsModal>
        {{/if}}
      </SF.Item>
      <SF.Item @label="Within a Flyout">
        <button type="button" {{on "click" this.activateFlyout}}>Open flyout</button>
        {{#if this.isFlyoutActive}}
          <HdsFlyout
            id="test-form-in-flyout"
            @onClose={{this.deactivateFlyout}}
            as |F|
          >
            <F.Header>Account signup form</F.Header>
            <F.Body>
              {{! Here we use Mock::App components to avoid too much code repetition  }}
              <MockAppMainGenericFormPartialsAccountSignup
                @hideHeader={{true}}
                @hideActions={{true}}
              />
            </F.Body>
            <F.Footer as |F|>
              {{! TODO! replace with partials/actions and pass callback as argument }}
              <HdsButtonSet>
                <HdsButton
                  type="submit"
                  @text="Submit"
                  {{on "click" this.deactivateFlyout}}
                />
                <HdsButton
                  type="button"
                  @text="Cancel"
                  @color="secondary"
                  {{on "click" F.close}}
                />
              </HdsButtonSet>
            </F.Footer>
          </HdsFlyout>
        {{/if}}
      </SF.Item>
    </ShwFlex>
  </template>
}
