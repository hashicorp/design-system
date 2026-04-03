/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import style from 'ember-style-modifier';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsCopySnippet,
  HdsDropdown,
  HdsIcon,
  HdsPageHeader,
  HdsTextBody,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const MOCK_CONNECTION_STRING =
  'z7k2Q9m1P8x4L0c5T3v6N2b8R1j4W9y7d2H6s0A5';

export default class CopySnippetLoadingStateIndex extends Component {
  @tracked copyValue: string | undefined = undefined;
  timer: ReturnType<typeof setTimeout> | undefined;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);

    this.timer = window.setTimeout(() => {
      this.copyValue = MOCK_CONNECTION_STRING;
    }, 5000);

    registerDestructor(this, (): void => {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
    });
  }

  <template>
    {{pageTitle "Copy Snippet Loading State"}}

    <ShwTextH1>Copy Snippet Loading State</ShwTextH1>
    <ShwTextBody>
      This example simulates a delayed connection string (5 seconds) and swaps from a loading
      treatment to a copy snippet when the value becomes available.
    </ShwTextBody>

    <section data-test-percy>
      <HdsPageHeader as |PH|>
        <PH.Title>Detail page</PH.Title>
        <PH.Actions>
          <HdsDropdown as |D|>
            <D.ToggleButton @text="Manage" @color="secondary" />
            <D.Interactive @icon="edit">Edit</D.Interactive>
            <D.Interactive @icon="trash" @color="critical">Delete</D.Interactive>
            <D.Separator />
            {{#if this.copyValue}}
              <D.CopyItem
                @copyItemTitle="Connection string"
                @text={{this.copyValue}}
              />
            {{else}}
              <D.Interactive
                @icon="loading"
                @isLoading={{true}}
              >Loading connection string</D.Interactive>
            {{/if}}
          </HdsDropdown>
        </PH.Actions>
        <PH.Generic>
          <HdsLayoutFlex
            @tag="div"
            @direction="row"
            @gap="16"
            @align="center"
          >
            <HdsTextBody
              @tag="span"
              @size="200"
              @weight="semibold"
              @color="foreground-primary"
            >Connection string:</HdsTextBody>
            {{#if this.copyValue}}
              <HdsCopySnippet @textToCopy={{this.copyValue}} />
            {{else}}
              <div {{style display="inline-flex" align-items="center" gap="8px"}}>
                <HdsIcon @name="loading" @color="faint" />
                <HdsTextBody
                  @tag="span"
                  @size="200"
                  @weight="regular"
                  @color="faint"
                >Loading</HdsTextBody>
              </div>
            {{/if}}
          </HdsLayoutFlex>
        </PH.Generic>
      </HdsPageHeader>
    </section>

    <ShwDivider @level={{2}} />
  </template>;
}
