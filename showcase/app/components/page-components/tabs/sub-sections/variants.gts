/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsTabs } from '@hashicorp/design-system-components/components';

export default class SubSectionVariants extends Component {
  logClickedTab = (event: MouseEvent, index: number) => {
    const eventTarget = event.target as HTMLElement;
    const tabId = eventTarget?.id;
    console.log(`Tab with ID "${tabId}" and index "${index}" clicked!`);
  };

  <template>
    <ShwTextH2>Variants</ShwTextH2>

    <ShwTextBody>Basic usage</ShwTextBody>

    <HdsTabs as |T|>
      <T.Tab>One</T.Tab>
      <T.Tab>Two</T.Tab>
      <T.Tab>Three</T.Tab>

      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content three" @height="50" /></T.Panel>
    </HdsTabs>

    <ShwTextBody>With optional icon and badge count</ShwTextBody>

    <HdsTabs as |T|>
      <T.Tab @count="5">One</T.Tab>
      <T.Tab @icon="info">Two</T.Tab>
      <T.Tab>Three</T.Tab>
      <T.Tab @icon="alert-triangle" @count="5">Four</T.Tab>

      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content three" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content four" @height="50" /></T.Panel>
    </HdsTabs>

    <ShwTextBody>With pre-selected tab</ShwTextBody>

    <HdsTabs as |T|>
      <T.Tab>One</T.Tab>
      <T.Tab>Two</T.Tab>
      <T.Tab @isSelected={{true}}>Three (selected on page load)</T.Tab>

      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel>
        <ShwPlaceholder
          @text="Content three (displayed on page load)"
          @height="50"
        />
      </T.Panel>
    </HdsTabs>

    <ShwTextBody>With overflowing tabs</ShwTextBody>

    <HdsTabs as |T|>
      <T.Tab>One one-thousand</T.Tab>
      <T.Tab>Two one-thousand</T.Tab>
      <T.Tab>Three one-thousand</T.Tab>
      <T.Tab>Four one-thousand</T.Tab>
      <T.Tab>Five one-thousand</T.Tab>
      <T.Tab>Six one-thousand</T.Tab>
      <T.Tab>Seven one-thousand</T.Tab>
      <T.Tab>Eight one-thousand</T.Tab>
      <T.Tab>Nine one-thousand</T.Tab>
      <T.Tab>Ten one-thousand</T.Tab>

      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content three" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content four" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content five" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content six" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content seven" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content eight" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content nine" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content ten" @height="50" /></T.Panel>
    </HdsTabs>

    <ShwTextBody>Invoking a callback function when a tab is clicked</ShwTextBody>

    <HdsTabs @onClickTab={{this.logClickedTab}} as |T|>
      <T.Tab>One</T.Tab>
      <T.Tab>Two</T.Tab>
      <T.Tab>Three</T.Tab>

      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content three" @height="50" /></T.Panel>
    </HdsTabs>

    <ShwDivider />
  </template>
}
