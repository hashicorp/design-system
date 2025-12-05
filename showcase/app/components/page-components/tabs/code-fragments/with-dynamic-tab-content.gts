/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsTabs } from '@hashicorp/design-system-components/components';

const getRandomInteger = (max = 125) => Math.floor(Math.random() * max);

export default class CodeFragmentWithDynamicTabContent extends Component {
  @tracked count1: string | undefined = undefined;
  @tracked count2 = '2';
  @tracked count3 = '3';

  updateCountValues = () => {
    this.count1 = String(getRandomInteger());
    this.count2 = String(getRandomInteger());
    this.count3 = String(getRandomInteger());
  };

  <template>
    <div class="shw-component-tabs-example-heading">
      <ShwTextBody>Variable tabs width</ShwTextBody>
      <button type="button" {{on "click" this.updateCountValues}}>Update count
        values</button>
    </div>
    <HdsTabs as |T|>
      <T.Tab @count={{this.count1}}>One</T.Tab>
      <T.Tab @count={{this.count2}}>Two</T.Tab>
      <T.Tab @count={{this.count3}}>Three</T.Tab>
      <T.Panel><ShwPlaceholder
          @text="Content of first tab"
          @height="50"
        /></T.Panel>
      <T.Panel><ShwPlaceholder
          @text="Content of second tab"
          @height="50"
        /></T.Panel>
      <T.Panel><ShwPlaceholder
          @text="Content of third tab"
          @height="50"
        /></T.Panel>
    </HdsTabs>
  </template>
}
