/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsButton, HdsButtonSet, HdsDropdown, HdsCodeBlock, HdsModal, HdsTabs } from '@hashicorp/design-system-components/components';

const VALUE_DEMO_SHORTER = `package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}`;

const VALUE_DEMO_LONGER = `package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}
func main2() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}`;

export default class SubSectionDemo extends Component {
  @tracked valueDemo = VALUE_DEMO_SHORTER;
  @tracked isModalActive = false;

  onUpdateClickDemo = () => {
    if (this.valueDemo === VALUE_DEMO_SHORTER) {
      this.valueDemo = VALUE_DEMO_LONGER;
    } else {
      this.valueDemo = VALUE_DEMO_SHORTER;
    }
  }

  deactivateModal = () => {
    this.isModalActive = false;
  }

  <template>
    <ShwTextH2>Demo</ShwTextH2>

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="Within Tabs">
        <HdsTabs {{style width="400px"}} as |T|>
          <T.Tab>Ruby</T.Tab>
          <T.Tab>Go</T.Tab>
          <T.Tab>Lorem</T.Tab>

          <T.Panel>
            <HdsCodeBlock
              @language="ruby"
              @highlightLines="2"
              @ariaLabel="Ruby within tabs"
              @value='Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/noble64"
  end'
            />
          </T.Panel>
          <T.Panel>
            <HdsCodeBlock
              @language="go"
              @highlightLines="2, 4"
              @hasLineWrapping={{true}}
              @maxHeight="130px"
              @ariaLabel="Go within tabs"
              @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    fmt.Println(res)
  }"
            />
          </T.Panel>
          <T.Panel>
            <HdsCodeBlock @language="shell-session" @ariaLabel="Shell within tabs" @value="$ brew tap hashicorp/tap" />
          </T.Panel>
        </HdsTabs>

      </SF.Item>
      <SF.Item @label="Within a Dropdown">
        <HdsDropdown @listPosition="bottom-left" as |dd|>
          <dd.ToggleButton @text="Open menu" />
          <dd.Generic>
            <HdsCodeBlock
              @hasCopyButton={{true}}
              @language="go"
              @highlightLines="2, 4"
              @ariaLabel="Within a dropdown"
              @value="package main
  import 'fmt'
  func main() {
    fmt.Println('hello world')
  }"
            />
          </dd.Generic>
        </HdsDropdown>
      </SF.Item>
      <SF.Item @label="Within a Modal">
        <HdsButton @color="secondary" @text="Open modal" {{on "click" this.activateModal}} />

        {{! template-lint-disable no-autofocus-attribute }}
        {{#if this.isModalActive}}
          <HdsModal id="test-copy-button-modal" @onClose={{this.deactivateModal}} as |M|>
            <M.Header>
              Lorem ipsum dolor
            </M.Header>
            <M.Body>
              <HdsCodeBlock
                @hasCopyButton={{true}}
                @language="go"
                @highlightLines="2, 4"
                @ariaLabel="Within a modal"
                @value="package main
  import 'fmt'
  func main() {
    fmt.Println('hello world')
  }"
              />
            </M.Body>
            <M.Footer as |F|>
              <HdsButtonSet>
                <HdsButton type="submit" @text="OK" {{on "click" this.deactivateModal}} />
                <HdsButton type="button" @text="Cancel" @color="secondary" {{on "click" F.close}} />
              </HdsButtonSet>
            </M.Footer>
          </HdsModal>
        {{/if}}
      </SF.Item>
      <SF.Item @label="Dynamic updates">
        <HdsCodeBlock @language="go" @highlightLines="2, 4" @maxHeight="180px" @value={{this.valueDemo}} />
        <HdsButton
          type="button"
          @text="Update"
          @isInline={{true}}
          {{style marginTop="12px"}}
          {{on "click" this.onUpdateClickDemo}}
        />
      </SF.Item>
    </ShwFlex>
  </template>
}
