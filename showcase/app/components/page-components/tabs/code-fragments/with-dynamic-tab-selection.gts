/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';
import { fn } from '@ember/helper';

import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsTabs } from '@hashicorp/design-system-components/components';

export default class CodeFragmentWithDynamicTabSelection extends Component {
  @tracked atSelected = 'two';

  setAtSelected = (tab: string) => {
    this.atSelected = tab;
  };

  <template>
    <div class="shw-component-tabs-example-heading">
      <ShwTextBody>Dynamic
        <code>@isSelected</code>
        argument</ShwTextBody>
      <div class="shw-component-tabs-example-heading-button-set">
        <span>@isSelected = </span>
        <button
          type="button"
          {{on "click" (fn this.setAtSelected "one")}}
        >"one"</button>
        <button
          type="button"
          {{on "click" (fn this.setAtSelected "two")}}
        >"two"</button>
        <button
          type="button"
          {{on "click" (fn this.setAtSelected "three")}}
        >"three"</button>
      </div>
    </div>
    <HdsTabs as |T|>
      <T.Tab @isSelected={{eq this.atSelected "one"}}>One</T.Tab>
      <T.Tab @isSelected={{eq this.atSelected "two"}}>Two</T.Tab>
      <T.Tab @isSelected={{eq this.atSelected "three"}}>Three</T.Tab>
      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content three" @height="50" /></T.Panel>
    </HdsTabs>
  </template>
}
