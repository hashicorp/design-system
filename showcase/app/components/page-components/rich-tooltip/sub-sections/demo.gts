/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsAlert,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsFormTextInputField,
  HdsIcon,
  HdsLinkInline,
  HdsLinkStandalone,
  HdsModal,
  HdsRichTooltip,
  HdsTable,
  HdsTabs,
  HdsTag,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import type { HdsBadgeColors } from '@hashicorp/design-system-components/components/hds/badge/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

interface DEMO_TABLE_DATA_ITEM {
  id: number;
  'peer-name': string;
  'cluster-partition': string;
  'cluster-icon': HdsIconSignature['Args']['name'];
  status: {
    text: string;
    color: HdsBadgeColors;
    icon: HdsIconSignature['Args']['name'];
  };
  tagsCount: number;
}

const DEMO_TABLE_DATA: DEMO_TABLE_DATA_ITEM[] = [
  {
    id: 1,
    'peer-name': 'cluster-2-partition-2',
    'cluster-partition': 'cluster-2 / partition-2',
    'cluster-icon': 'boundary-color',
    status: { text: 'pending', color: 'neutral', icon: 'loading' },
    tagsCount: 12,
  },
  {
    id: 2,
    'peer-name': 'cluster-3-partition-3',
    'cluster-partition': 'cluster-3 / partition-3',
    'cluster-icon': 'terraform-color',
    status: { text: 'establishing', color: 'highlight', icon: 'loading' },
    tagsCount: 58,
  },
  {
    id: 3,
    'peer-name': 'cluster-4-partition-4',
    'cluster-partition': 'cluster-4 / partition-4',
    'cluster-icon': 'nomad-color',
    status: { text: 'failed', color: 'critical', icon: 'x' },
    tagsCount: 23,
  },
  {
    id: 4,
    'peer-name': 'cluster-5-partition-5',
    'cluster-partition': 'cluster-5 / partition-5',
    'cluster-icon': 'waypoint-color',
    status: { text: 'active', color: 'success', icon: 'check' },
    tagsCount: 105,
  },
];

const DEMO_TABLE_COLUMNS = [
  { label: 'Peer name' },
  { label: 'Cluster partition' },
  { label: 'Status' },
  { label: 'Tags' },
  { label: 'Actions', width: '150px' },
];

const TAGS = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur'];

export default class SubSectionDemo extends Component {
  @tracked isModalActive = false;

  onClickButton = () => {
    window.alert('The button has been clicked!');
  };

  activateModal = () => {
    this.isModalActive = true;
  };

  deactivateModal = () => {
    this.isModalActive = false;
  };

  <template>
    <ShwTextH2>Demo</ShwTextH2>

    <ShwFlex as |SF|>
      <SF.Item @label="Inline with other text" {{style width="250px"}}>
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum dolor
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @text="Test"
              @isInline={{true}}
              @icon="lock"
              @iconPosition="leading"
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet consectetur adipisicing elit. Doloremque blanditiis sapiente
          iste beatae voluptates voluptatum.
        </HdsTextBody>
      </SF.Item>
      <SF.Item @label="Inline / Long text" {{style width="250px"}}>
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum dolor
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @text="Test with long text"
              @isInline={{true}}
              @icon="lock"
              @iconPosition="leading"
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet consectetur adipisicing elit. Doloremque blanditiis sapiente
          iste beatae voluptates voluptatum.
        </HdsTextBody>
      </SF.Item>
      <SF.Item @label="Inline / Multi-line" {{style width="250px"}}>
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum dolor
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @text="Test with long text that wraps multiple lines"
              @isInline={{true}}
              @icon="lock"
              @iconPosition="leading"
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet consectetur adipisicing elit. Doloremque blanditiis sapiente
          iste beatae voluptates voluptatum.
        </HdsTextBody>
      </SF.Item>
    </ShwFlex>

    <ShwFlex as |SF|>
      <SF.Item
        @label="Inline text with pre/post characters (testing whitespace)"
        {{style width="250px"}}
      >
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum "<HdsRichTooltip as |RT|><RT.Toggle
              @text="dolor sit"
              @isInline={{true}}
            /><RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble></HdsRichTooltip>" amet.
        </HdsTextBody>
      </SF.Item>
      <SF.Item
        @label="Inline icon only (testing vertical alignment)"
        {{style width="250px"}}
      >
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum dolor
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @isInline={{true}}
              @icon="info"
              aria-label="Inline icon"
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet.
        </HdsTextBody>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwFlex as |SF|>
      <SF.Item @label="Block within other text" {{style width="250px"}}>
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </HdsTextBody>
        <HdsRichTooltip {{style margin="8px 0"}} as |RT|>
          <RT.Toggle @text="Test" @icon="lock" @size="medium" />
          <RT.Bubble>
            <ShwPlaceholder @text="generic content" @height="30" />
          </RT.Bubble>
        </HdsRichTooltip>
        <HdsTextBody @size="200" @tag="p">
          Doloremque blanditiis sapiente iste beatae voluptates voluptatum.
        </HdsTextBody>
      </SF.Item>
      <SF.Item @label="Block / Long text" {{style width="250px"}}>
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </HdsTextBody>
        <HdsRichTooltip {{style margin="8px 0"}} as |RT|>
          <RT.Toggle @text="Test with long text" @icon="lock" @size="medium" />
          <RT.Bubble>
            <ShwPlaceholder @text="generic content" @height="30" />
          </RT.Bubble>
        </HdsRichTooltip>
        <HdsTextBody @size="200" @tag="p">
          Doloremque blanditiis sapiente iste beatae voluptates voluptatum.
        </HdsTextBody>
      </SF.Item>
      <SF.Item @label="Block / Multi-line" {{style width="250px"}}>
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </HdsTextBody>
        <HdsRichTooltip {{style margin="8px 0"}} as |RT|>
          <RT.Toggle
            @text="Test with long text that wraps multiple lines"
            @icon="lock"
            @size="medium"
          />
          <RT.Bubble>
            <ShwPlaceholder @text="generic content" @height="30" />
          </RT.Bubble>
        </HdsRichTooltip>
        <HdsTextBody @size="200" @tag="p">
          Doloremque blanditiis sapiente iste beatae voluptates voluptatum.
        </HdsTextBody>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="Within an Alert">
        <HdsAlert
          @type="inline"
          @color="warning"
          {{style width="600px"}}
          as |A|
        >
          <A.Title>Altering admin permissions</A.Title>
          <A.Description>This user is assigned to an
            <HdsRichTooltip as |RT|>
              <RT.Toggle @text="admin role" @isInline={{true}} /><RT.Bubble>
                <HdsTextBody @tag="p" size="100">Admin role enables a couple of
                  pretty cool features and permissions within the app. For
                  details on what an admin can do, reference
                  <HdsLinkInline @href="#">the documentation</HdsLinkInline>.</HdsTextBody>
              </RT.Bubble></HdsRichTooltip>, changing this will remove them from
            projects in which they don’t already have admin permissions.</A.Description>
        </HdsAlert>
      </SF.Item>
      <SF.Item @label="Within a Form Field">
        <div
          class="shw-component-rich-tooltip-demo-form-field"
          {{style width="400px"}}
        >
          <HdsFormTextInputField
            @value="Lorem ipsum dolor"
            @width="250px"
            as |F|
          >
            <F.Label>
              <div
                class="shw-component-rich-tooltip-demo-form-field-label-wrapper"
              >
                This is the label text
                <HdsRichTooltip as |RT|>
                  <RT.Toggle @icon="info" aria-label="more info" />
                  <RT.Bubble @placement="right">
                    <ShwPlaceholder @text="generic content" @height="30" />
                  </RT.Bubble>
                </HdsRichTooltip>
              </div>
            </F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormTextInputField>
          <HdsFormTextInputField
            @value="Lorem ipsum dolor"
            @width="250px"
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.HelperText>Lorem ipsum dolor sit amet
              <HdsRichTooltip as |RT|>
                <RT.Toggle @text="consectetur adipisicing" @isInline={{true}} />
                <RT.Bubble @placement="right">
                  <ShwPlaceholder @text="generic content" @height="30" />
                </RT.Bubble>
              </HdsRichTooltip>
              elit sed perferendis culpa expedita assumenda at nisi.</F.HelperText>
          </HdsFormTextInputField>
        </div>
      </SF.Item>
      <SF.Item @label="Within a Modal">
        <HdsButton
          @color="secondary"
          @text="Open modal"
          {{on "click" this.activateModal}}
        />
        {{! template-lint-disable no-autofocus-attribute }}
        {{#if this.isModalActive}}
          <HdsModal
            id="test-copy-button-modal"
            @onClose={{this.deactivateModal}}
            as |M|
          >
            <M.Header>
              Lorem ipsum dolor
            </M.Header>
            <M.Body>
              <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Sed perferendis culpa expedita
                assumenda at
                <HdsRichTooltip as |RT|>
                  <RT.Toggle
                    @text="nisi minus unde fuga"
                    @isInline={{true}}
                    @icon="info"
                  />
                  <RT.Bubble @placement="top">
                    <ShwPlaceholder @text="generic content" @height="30" />
                  </RT.Bubble>
                </HdsRichTooltip>
                iure suscipit aut qui, odit natus eum voluptates.
              </HdsTextBody>
            </M.Body>
            <M.Footer as |F|>
              <HdsButtonSet>
                <HdsButton
                  type="submit"
                  @text="OK"
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
      <SF.Item @label="Within a Table">
        <HdsTable @model={{DEMO_TABLE_DATA}} @columns={{DEMO_TABLE_COLUMNS}}>
          <:body as |B|>
            <B.Tr>
              <B.Td>
                <HdsLinkInline
                  @href="#showcase"
                >{{B.data.peer-name}}</HdsLinkInline>
              </B.Td>
              <B.Td>
                <div
                  class="shw-component-rich-tooltip-demo-table-cell-content-flex"
                >
                  {{#if B.data.cluster-icon}}
                    <HdsIcon @name={{B.data.cluster-icon}} @isInline={{true}} />
                  {{/if}}
                  <div>
                    <HdsRichTooltip as |RT|>
                      <RT.Toggle @text={{B.data.cluster-partition}} />
                      <RT.Bubble>
                        <HdsTextBody @size="100" @tag="p">Lorem ipsum dolor sit
                          amet</HdsTextBody>
                      </RT.Bubble>
                    </HdsRichTooltip>
                    <HdsTextBody
                      @size="100"
                      @tag="p"
                      @color="foreground-faint"
                    >Lorem ipsum dolor sit amet</HdsTextBody>
                  </div>
                </div>
              </B.Td>
              <B.Td>
                {{#if B.data.status}}
                  <HdsRichTooltip as |RT|>
                    <RT.Toggle>
                      <HdsBadge
                        @text={{capitalize B.data.status.text}}
                        @color={{B.data.status.color}}
                        @icon={{B.data.status.icon}}
                        @type="outlined"
                      />
                    </RT.Toggle>
                    <RT.Bubble>
                      <HdsTextBody @size="100" @tag="p">The status is
                        <strong>{{B.data.status.text}}</strong>. Refer to the
                        <HdsLinkInline @href="#">
                          documentation</HdsLinkInline>
                        for more details about this status.</HdsTextBody>
                    </RT.Bubble>
                  </HdsRichTooltip>
                {{/if}}
              </B.Td>
              <B.Td>
                <HdsRichTooltip as |RT|>
                  <RT.Toggle
                    @text="{{B.data.tagsCount}}"
                    @icon="info"
                    @iconPosition="leading"
                  />
                  <RT.Bubble>
                    <HdsTextBody
                      @size="100"
                      @tag="p"
                      @weight="semibold"
                    >Tags:</HdsTextBody>
                    <div
                      class="shw-component-rich-tooltip-demo-table-cell-content-tags"
                    >
                      {{#each TAGS as |tag|}}
                        <HdsTag @text={{tag}} />
                      {{/each}}
                    </div>
                    <HdsTextBody @size="100" @tag="p">
                      <HdsLinkInline
                        @href="#"
                        @icon="sidebar"
                        @iconPosition="leading"
                      >See all
                        {{B.data.tagsCount}}
                        tags</HdsLinkInline>
                    </HdsTextBody>
                  </RT.Bubble>
                </HdsRichTooltip>
              </B.Td>
              <B.Td>
                <HdsButtonSet>
                  <HdsButton
                    @text="Add"
                    @isIconOnly={{true}}
                    @icon="plus"
                    @size="small"
                  />
                  <HdsButton
                    @text="Edit"
                    @isIconOnly={{true}}
                    @icon="edit"
                    @size="small"
                    @color="secondary"
                  />
                  <HdsButton
                    @text="Delete"
                    @isIconOnly={{true}}
                    @icon="trash"
                    @size="small"
                    @color="critical"
                  />
                </HdsButtonSet>
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
      <SF.Item @label="Within Tabs">
        <HdsTabs {{style width="400px"}} as |T|>
          <T.Tab>Tab #1</T.Tab>
          <T.Tab>Tab #2</T.Tab>
          <T.Tab>Tab #3</T.Tab>
          <T.Panel>
            <div class="shw-component-rich-tooltip-demo-tabs-panel">
              <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet
                <HdsRichTooltip as |RT|>
                  <RT.Toggle
                    @text="consectetur adipisicing"
                    @isInline={{true}}
                    @icon="info"
                    @iconPosition="leading"
                  />
                  <RT.Bubble>
                    <ShwPlaceholder @text="generic content" @height="30" />
                  </RT.Bubble>
                </HdsRichTooltip>
                elit. Sed perferendis culpa expedita assumenda at nisi minus
                unde fuga iure suscipit aut qui, odit natus eum voluptates.
              </HdsTextBody>
            </div>
          </T.Panel>
          <T.Panel>
            <div class="shw-component-rich-tooltip-demo-tabs-panel">
              <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Sed perferendis culpa expedita
                assumenda at
                <HdsRichTooltip as |RT|>
                  <RT.Toggle
                    @text="nisi minus unde"
                    @isInline={{true}}
                    @icon="info"
                    @iconPosition="leading"
                  />
                  <RT.Bubble>
                    <ShwPlaceholder @text="generic content" @height="30" />
                  </RT.Bubble>
                </HdsRichTooltip>
                fuga iure suscipit aut qui, odit natus eum voluptates.
              </HdsTextBody>
            </div>
          </T.Panel>
          <T.Panel>
            <div class="shw-component-rich-tooltip-demo-tabs-panel">
              <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Sed perferendis culpa expedita
                assumenda at
                <HdsRichTooltip as |RT|>
                  <RT.Toggle
                    @text="nisi minus unde fuga iure"
                    @isInline={{true}}
                    @icon="info"
                    @iconPosition="leading"
                  />
                  <RT.Bubble>
                    <ShwPlaceholder @text="generic content" @height="30" />
                  </RT.Bubble>
                </HdsRichTooltip>
                suscipit aut qui, odit natus eum voluptates.
              </HdsTextBody>
            </div>
          </T.Panel>
        </HdsTabs>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwGrid @columns={{2}} @gap="2rem" {{style width="fit-content"}} as |SG|>
      <SG.Item @label="Button + InfoText">
        <div class="shw-component-rich-tooltip-demo-action-plus-info">
          <HdsButton
            @text="Lorem ipsum"
            @icon="wand"
            {{on "click" this.onClickButton}}
          />
          <HdsRichTooltip @enableClickEvents={{true}} as |RT|>
            <RT.Toggle @icon="info" aria-label="more info" />
            <RT.Bubble @placement="top-start">
              <HdsTextBody
                @size="200"
                @tag="p"
                {{style margin-bottom="12px"}}
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.</HdsTextBody>
              <HdsButton @text="Got it" @size="small" {{on "click" RT.close}} />
            </RT.Bubble>
          </HdsRichTooltip>
        </div>
      </SG.Item>
      <SG.Item @label="Link + InfoText">
        <div class="shw-component-rich-tooltip-demo-action-plus-info">
          <HdsLinkStandalone
            @icon="external-link"
            @iconPosition="leading"
            @text="Acme Corp"
            @href="#"
          />
          <HdsRichTooltip @enableClickEvents={{true}} as |RT|>
            <RT.Toggle @icon="info" aria-label="more info" />
            <RT.Bubble @placement="top-start">
              <HdsTextBody
                @size="200"
                @tag="p"
                {{style margin-bottom="12px"}}
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.</HdsTextBody>
              <HdsButton @text="Got it" @size="small" {{on "click" RT.close}} />
            </RT.Bubble>
          </HdsRichTooltip>
        </div>
      </SG.Item>
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwFlex as |SF|>
      <SF.Item @label="With complex popover content">
        <HdsRichTooltip @enableClickEvents={{true}} as |RT|>
          <RT.Toggle @text="Lorem ipsum dolor" @icon="info" @size="medium" />
          <RT.Bubble @placement="top">
            <div class="shw-component-rich-tooltip-content-interactive">
              <button
                type="button"
                {{on "click" RT.close}}
                title="Button that closes the popover on click"
              >x</button>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur
                </li>
                <li>
                  <a href="https://google.com">Link to Google</a>
                </li>
                <li>
                  <label for="value-input">Input value:</label>
                  <input id="value-input" type="text" />
                </li>
                <li>
                  <button type="button" {{on "click" RT.close}}>Got it!</button>
                </li>
              </ul>
            </div>
          </RT.Bubble>
        </HdsRichTooltip>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />
  </template>
}
