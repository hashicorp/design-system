/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { later } from '@ember/runloop';
import { on } from '@ember/modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import USERS from 'showcase/mocks/user-data';
import type { User } from 'showcase/mocks/user-data';

import {
  HdsButton,
  HdsFormSelectBase,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithDynamicCellContent from 'showcase/components/page-components/advanced-table/code-fragments/with-dynamic-cell-content';
import CodeFragmentWithDebugSelect from 'showcase/components/page-components/advanced-table/code-fragments/with-debug-select';

export default class SubSectionFunctionalExamples extends Component {
  // INLINE FILTER EXAMPLE
  onChangeInlineFilter = (
    setModel: (newModel: User[]) => void,
    event: Event,
  ) => {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'all') {
      setModel(USERS.slice(0, 4));
    } else {
      const remainder = value === 'even' ? 0 : 1;
      setModel(USERS.slice(0, 4).filter((item) => item.id % 2 === remainder));
    }
  };

  // DELETE ROWS EXAMPLE
  deleteUsers = (setModel: (newModel: User[]) => void, model: User[]) => {
    const newData = model.filter((user) => !user.isSelected);
    setModel([...newData]);
  };

  // ANIMATE ROWS EXAMPLE
  animateUsers = (setModel: (newModel: User[]) => void, model: User[]) => {
    const newModel = model.map((user) => ({
      ...user,
      isAnimated: user.isSelected,
    }));

    setModel([...newModel]);

    // eslint-disable-next-line ember/no-runloop
    later(() => {
      this.resetUserAnimation(setModel, model);
    }, 5000);
  };

  resetUserAnimation = (
    setModel: (newModel: User[]) => void,
    model: User[],
  ) => {
    const newModel = model.map((user) => ({
      ...user,
      isAnimated: false,
    }));

    setModel([...newModel]);
  };

  <template>
    <ShwTextH2>Functional examples</ShwTextH2>

    <ShwTextH3>With dynamic focusable content in cells</ShwTextH3>
    <CodeFragmentWithDynamicCellContent />

    <ShwTextH3>With inline filter</ShwTextH3>

    {{! INLINE FILTER EXAMPLE }}
    <CodeFragmentWithDebugSelect>
      <:topbarAction as |T|>
        <label for="inline-filter-example">Filter:</label>
        <HdsFormSelectBase
          id="inline-filter-example"
          {{on "change" (fn this.onChangeInlineFilter T.setVisibleModel)}}
          as |C|
        >
          <C.Options>
            <option value="all">Show all rows</option>
            <option value="even">Show even rows</option>
            <option value="odd">Show odd rows</option>
          </C.Options>
        </HdsFormSelectBase>
      </:topbarAction>
    </CodeFragmentWithDebugSelect>

    <ShwTextH3>With pagination</ShwTextH3>
    <CodeFragmentWithDebugSelect @hasPagination={{true}} />

    <ShwTextH3>Delete selected rows</ShwTextH3>

    <ShwTextBody>This demo emulates, for example, when a user needs to delete
      the selected users.</ShwTextBody>

    {{! DELETE ROWS EXAMPLE }}
    <CodeFragmentWithDebugSelect @hasPagination={{true}}>
      <:topbarAction as |T|>
        <HdsButton
          @text="Delete users"
          @icon="trash"
          {{on "click" (fn this.deleteUsers T.setModel T.model)}}
        />
      </:topbarAction>
    </CodeFragmentWithDebugSelect>

    <ShwTextH3>Execute action on selected rows</ShwTextH3>

    <ShwTextBody>This demo emulates, for example, when a user needs to download
      the selected files.</ShwTextBody>

    {{! ANIMATE ROWS EXAMPLE }}
    <CodeFragmentWithDebugSelect @shouldHideSelectionDebugControls={{true}}>
      <:topbarAction as |T|>
        <HdsButton
          @text="Animate users"
          @icon="play"
          {{on "click" (fn this.animateUsers T.setVisibleModel T.model)}}
        />
      </:topbarAction>
    </CodeFragmentWithDebugSelect>

    <ShwDivider />
  </template>
}
