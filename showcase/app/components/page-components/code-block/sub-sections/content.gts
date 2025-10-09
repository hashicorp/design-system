/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

export default class SubSectionContent extends Component {
  @tracked input: string | undefined = '';

  textWithNewLine = `Vagrant.configure("2") do |config|\nconfig.vm.box "ubuntu/noble64"\nend`;

  get codeValue() {
    let value = `codeLang = 'ruby';`;

    if (this.input !== '') {
      value += `\n\n${this.input} = "the input is: ${this.input}"`;
    }

    return value;
  }

  updateCodeValue = () => {
    this.input = ['rand1', 'rand2', 'rand3', ''][Math.floor(Math.random() * 4)];
  };

  updateInput = (event: Event) => {
    this.input = (event.target as HTMLInputElement).value;
  };

  <template>
    <ShwTextH2>Content</ShwTextH2>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item @label="one line">
        <HdsCodeBlock
          @language="bash"
          @ariaLabel="one line"
          @value="aws ec2 --region us-west-1 accept-vpc-peering-connection"
        />
      </SG.Item>
      <SG.Item @label="multi-line">
        <HdsCodeBlock
          @language="go"
          @ariaLabel="multi-line"
          @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet'
    fmt.Println(res)
  }"
        />
      </SG.Item>
    </ShwGrid>

    <ShwTextBody>New lines handling</ShwTextBody>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item @label="new lines in Handlebars" @forceMinWidth={{true}}>
        <HdsCodeBlock
          @language="go"
          @ariaLabel="new lines in Handlebars"
          @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    fmt.Println(res)
  }"
        />
      </SG.Item>
      <SG.Item @forceMinWidth={{true}} as |SGI|>
        <SGI.Label>new lines with
          <code>\n</code>
          escape sequence in Ruby
        </SGI.Label>
        <HdsCodeBlock
          @language="ruby"
          @ariaLabel="new lines with escape sequence in Ruby"
          @value={{this.textWithNewLine}}
        />
      </SG.Item>
      <SG.Item @forceMinWidth={{true}} as |SGI|>
        <SGI.Label><code>\n</code>
          in Handlebars (not interpreted as newline)
        </SGI.Label>
        <HdsCodeBlock
          @language="ruby"
          @ariaLabel="\n in Handlebars (not interpreted as newline)"
          @value='Vagrant.configure("2") do |config|\nconfig.vm.box "ubuntu/noble64"\nend'
        />
      </SG.Item>
      <SG.Item @forceMinWidth={{true}} as |SGI|>
        <SGI.Label>Line numbering start changed to "5"
        </SGI.Label>
        {{! template-lint-disable no-whitespace-for-layout }}
        <HdsCodeBlock
          @language="go"
          @maxHeight="105px"
          @lineNumberStart={{5}}
          @ariaLabel="Line numbering start changed to 5"
          @value="package main
  import 'fmt'
  func main() {
    res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    fmt.Println(res)
  }"
        />
        {{! template-lint-enable no-whitespace-for-layout }}
      </SG.Item>
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Title and description</ShwTextH3>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item @label="title">
        <HdsCodeBlock
          @value='Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/noble64"
  end'
          @language="ruby"
          as |CB|
        >
          <CB.Title>Title</CB.Title>
        </HdsCodeBlock>
      </SG.Item>
      <SG.Item @label="description">
        <HdsCodeBlock
          @value='Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/noble64"
  end'
          @language="ruby"
          @ariaLabel="description"
          as |CB|
        >
          <CB.Description>Description</CB.Description>
        </HdsCodeBlock>
      </SG.Item>
      <SG.Item @label="title and description">
        <HdsCodeBlock
          @value='Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/noble64"
  end'
          @language="ruby"
          as |CB|
        >
          <CB.Title>Title that may wrap on multiple lines if the parent
            container is limiting its width</CB.Title>
          <CB.Description>
            Description that could contain
            <a href="#">a link</a>
            or other basic styling such as
            <b>bold</b>,
            <i>italic</i>
            or even
            <code>code</code>.
          </CB.Description>
        </HdsCodeBlock>
      </SG.Item>
      <SG.Item @label="custom title tag">
        <HdsCodeBlock
          @value='Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/noble64"
  end'
          @language="ruby"
          as |CB|
        >
          <CB.Title @tag="h2">Title</CB.Title>
        </HdsCodeBlock>
      </SG.Item>
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dynamic content</ShwTextH3>

    <ShwTextBody>
      <button type="button" {{on "click" this.updateCodeValue}}>
        Update value
      </button>
    </ShwTextBody>

    <ShwTextBody>
      <label for="input">Change input value:</label>
      <input
        id="input"
        type="text"
        value={{this.input}}
        {{on "input" this.updateInput}}
      />
    </ShwTextBody>

    <HdsCodeBlock
      @value={{this.codeValue}}
      @language="ruby"
      @hasCopyButton={{true}}
      @hasLineNumbers={{false}}
      id="code-block-with-dynamic-content"
      as |CB|
    >
      <CB.Title>
        Dynamic content
      </CB.Title>
    </HdsCodeBlock>
  </template>
}
