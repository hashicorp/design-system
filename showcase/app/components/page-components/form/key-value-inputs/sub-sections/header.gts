/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const EMPTY_DATA = [] as unknown[];

const SubSectionHeader: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>Header</ShwTextH3>

  <ShwFlex @direction="column" @gap="3rem" as |SF|>
    <SF.Item @label="No header - ⚠️ not valid/accessible ⚠️">
      <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Key</F.Label>
            <F.TextInput />
          </R.Field>
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
        <:footer as |F|>
          <F.AddRowButton @text="Add row" />
        </:footer>
      </HdsFormKeyValueInputs>
    </SF.Item>
    <SF.Item @label="With legend">
      <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
        <:header as |H|>
          <H.Legend>This is the legend</H.Legend>
        </:header>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Key</F.Label>
            <F.TextInput />
          </R.Field>
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
        <:footer as |F|>
          <F.AddRowButton @text="Add row" />
        </:footer>
      </HdsFormKeyValueInputs>
    </SF.Item>
    <SF.Item @label="With legend + helper text">
      <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
        <:header as |H|>
          <H.Legend>This is the legend</H.Legend>
          <H.HelperText>This is the helper text, usually used jointly with the
            legend.</H.HelperText>
        </:header>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Key</F.Label>
            <F.TextInput />
          </R.Field>
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
        <:footer as |F|>
          <F.AddRowButton @text="Add row" />
        </:footer>
      </HdsFormKeyValueInputs>
    </SF.Item>
    <SF.Item @label="With multiple helper texts">
      <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
        <:header as |H|>
          <H.Legend>Sample legend</H.Legend>
          <H.HelperText>This is the helper text, usually used jointly with the
            legend.</H.HelperText>
          <H.HelperText>This is another helper text, that should appear below
            the first helper text, with the right amount of space between them.</H.HelperText>
        </:header>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Text Input</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
      </HdsFormKeyValueInputs>
    </SF.Item>
    <SF.Item @label="With very long content">
      <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
        <:header as |H|>
          <H.Legend>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Diam diam mi etiam mollis tortor vestibulum. Felis, arcu amet, nibh
            eget eget etiam orci aliquet. Varius facilisis magna faucibus
            commodo iaculis faucibus aliquet.</H.Legend>
          <H.HelperText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Diam diam mi etiam mollis tortor vestibulum. Felis, arcu amet, nibh
            eget eget etiam orci aliquet. Varius facilisis magna faucibus
            commodo iaculis faucibus aliquet.</H.HelperText>
        </:header>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Key</F.Label>
            <F.TextInput />
          </R.Field>
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
        <:footer as |F|>
          <F.AddRowButton @text="Add row" />
        </:footer>
      </HdsFormKeyValueInputs>
    </SF.Item>
    <SF.Item @label="With 'required' indicator">
      <HdsFormKeyValueInputs @isRequired={{true}} @data={{EMPTY_DATA}}>
        <:header as |H|>
          <H.Legend>This is the legend</H.Legend>
          <H.HelperText>This is the helper text, usually used jointly with the
            legend.</H.HelperText>
        </:header>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Key</F.Label>
            <F.TextInput />
          </R.Field>
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
        <:footer as |F|>
          <F.AddRowButton @text="Add row" />
        </:footer>
      </HdsFormKeyValueInputs>
    </SF.Item>
    <SF.Item @label="With 'Optional' indicator">
      <HdsFormKeyValueInputs @isOptional={{true}} @data={{EMPTY_DATA}}>
        <:header as |H|>
          <H.Legend>This is the legend</H.Legend>
          <H.HelperText>This is the helper text, usually used jointly with the
            legend.</H.HelperText>
        </:header>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Key</F.Label>
            <F.TextInput />
          </R.Field>
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
        <:footer as |F|>
          <F.AddRowButton @text="Add row" />
        </:footer>
      </HdsFormKeyValueInputs>
    </SF.Item>
    <SF.Item @label="With extra content">
      <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
        <:header as |H|>
          <H.Legend>This is the legend</H.Legend>
          <H.HelperText>This is the helper text, usually used jointly with the
            legend.</H.HelperText>
          <H.Generic><ShwPlaceholder
              @height="36px"
              @text="generic content"
            /></H.Generic>
        </:header>
        <:row as |R|>
          <R.Field as |F|>
            <F.Label>Key</F.Label>
            <F.TextInput />
          </R.Field>
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput />
          </R.Field>
          <R.DeleteRowButton />
        </:row>
        <:footer as |F|>
          <F.AddRowButton @text="Add row" />
        </:footer>
      </HdsFormKeyValueInputs>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionHeader;
