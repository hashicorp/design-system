import Component from '@glimmer/component';
import style from 'ember-style-modifier/modifiers/style';
import { array, hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import {
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsFormTextInputBase,
  HdsSegmentedGroup,
  HdsTable,
} from '@hashicorp/design-system-components/components';

import MockAppMainPagination from './pagination';

import CLUSTERS from 'showcase/mocks/cluster-data';

export interface MockAppMainTableComplexSignature {
  Args: {
    showFilters?: boolean;
    showPagination?: boolean;
  };
}

export default class MockAppMainTableComplex extends Component<MockAppMainTableComplexSignature> {
  showFilters = this.args.showFilters ?? false;
  showPagination = this.args.showPagination ?? false;

  <template>
    {{#if this.showFilters}}
      <div {{style margin-bottom="16px"}}>
        <HdsSegmentedGroup as |SGR|>
          <SGR.TextInput @type="search" placeholder="Search" />
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary" @text="Cluster" />
            <D.Header @hasDivider={{true}}>
              <HdsFormTextInputBase
                @type="search"
                placeholder="Narrow results"
              />
            </D.Header>
            <D.Checkbox
              name="checkbox-item-dropdown"
              @count="1"
            >Lorem</D.Checkbox>
            <D.Checkbox
              name="checkbox-item-dropdown"
              @count="23"
              checked
            >Ipsum</D.Checkbox>
            <D.Checkbox
              name="checkbox-item-dropdown"
              @count="456"
            >Dolor</D.Checkbox>
            <D.Footer @hasDivider={{true}}>
              <HdsButtonSet>
                <HdsButton @text="Apply" @isFullWidth={{true}} @size="small" />
                <HdsButton
                  @text="Cancel"
                  @color="secondary"
                  @isFullWidth={{true}}
                  @size="small"
                />
              </HdsButtonSet>
            </D.Footer>
          </SGR.Dropdown>
          <SGR.Dropdown as |D|>
            <D.ToggleButton @color="secondary" @text="Status" />
            <D.Radio name="radio-item-dropdown">Active</D.Radio>
            <D.Radio name="radio-item-dropdown">Establishing</D.Radio>
            <D.Radio name="radio-item-dropdown">Pending</D.Radio>
            <D.Radio name="radio-item-dropdown">Failing</D.Radio>
          </SGR.Dropdown>
        </HdsSegmentedGroup>
      </div>
    {{/if}}
    <HdsTable
      @model={{CLUSTERS}}
      @isSelectable={{true}}
      @columns={{array
        (hash label="Peer name" isSortable=true key="peer-name")
        (hash label="Cluster partition")
        (hash label="Status")
        (hash label="Imported services")
        (hash label="Exported services")
        (hash
          label="Select an action from the menu"
          width="55px"
          isVisuallyHidden=true
        )
      }}
      @sortBy="peer-name"
      @sortOrder="asc"
    >
      <:body as |B|>
        <B.Tr
          @selectionKey="{{B.data.id}}"
          @isSelected={{eq B.data.id 2}}
          @selectionAriaLabelSuffix="row #{{B.data.peer-name}}"
        >
          <B.Td>{{B.data.peer-name}}</B.Td>
          <B.Td>{{B.data.cluster-partition}}</B.Td>
          <B.Td>
            {{#if (eq B.data.status "failing")}}
              <HdsBadge
                @text="Failing"
                @color="critical"
                @icon="x"
                @type="outlined"
              />
            {{else if (eq B.data.status "active")}}
              <HdsBadge
                @text="Active"
                @color="success"
                @icon="check"
                @type="outlined"
              />
            {{else if (eq B.data.status "pending")}}
              <HdsBadge
                @text="Pending"
                @color="neutral"
                @icon="loading"
                @type="outlined"
              />
            {{else if (eq B.data.status "establishing")}}
              <HdsBadge
                @text="Establishing"
                @color="highlight"
                @icon="loading"
                @type="outlined"
              />
            {{/if}}
          </B.Td>
          <B.Td>{{B.data.services.imported}}</B.Td>
          <B.Td>{{B.data.services.exported}}</B.Td>
          <B.Td @align="right">
            <HdsDropdown @isInline={{true}} as |dd|>
              <dd.ToggleIcon
                @icon="more-horizontal"
                @text="Overflow Options"
                @hasChevron={{false}}
                @size="small"
              />
              <dd.Interactive @href="#">Create</dd.Interactive>
              <dd.Interactive @href="#">Read</dd.Interactive>
              <dd.Interactive @href="#">Update</dd.Interactive>
              <dd.Separator />
              <dd.Interactive
                @href="#"
                @color="critical"
                @icon="trash"
              >Delete</dd.Interactive>
            </HdsDropdown>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
    {{#if this.showPagination}}
      <MockAppMainPagination />
    {{/if}}
  </template>
}
