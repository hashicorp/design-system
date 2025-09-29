/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array } from '@ember/helper';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

export default class SubSectionContainers extends Component {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    <ShwTextBody>Skip directly to the <a href="#demos">demos</a></ShwTextBody>

    <ShwTextH2>Containers</ShwTextH2>

    <button
      type="button"
      class="shw-component-form-key-value-inputs-button-highlight"
      {{on "click" this.toggleHighlight}}
    >
      {{if this.showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <div
      class="shw-component-form-key-value-inputs-containers
        {{if
          this.showHighlight
          'shw-component-form-key-value-inputs-highlight-elements'
        }}"
    >
      <HdsFormKeyValueInputs @data={{array "row1" "row2"}}>
        <:header as |H|>
          <H.Legend><ShwPlaceholder
              @height="24px"
              @text="legend"
              @background="#e4c5f3"
            /></H.Legend>
          <H.HelperText><ShwPlaceholder
              @height="24px"
              @text="helper text"
              @background="#e4c5f3"
            /></H.HelperText>
          <H.Generic><ShwPlaceholder
              @height="24px"
              @text="generic"
            /></H.Generic>
        </:header>

        <:row as |R|>
          <R.Field as |F|>
            <F.Label><ShwPlaceholder
                @width="175px"
                @height="24px"
                @text="row {{R.rowIndex}} / field 1 / label"
                @background="#e5ffd2"
              /></F.Label>
            <F.HelperText><ShwPlaceholder
                @height="24px"
                @text="row {{R.rowIndex}} / field 1 / helper text"
                @background="#e5ffd2"
              /></F.HelperText>
            <ShwPlaceholder
              @height="36px"
              @text="row {{R.rowIndex}} / field 1 / input"
              @background="#add8e6"
            />
          </R.Field>
          <R.Field @width="2fr" as |F|>
            <F.Label><ShwPlaceholder
                @width="175px"
                @height="24px"
                @text="row {{R.rowIndex}} / field 2 / label"
                @background="#e5ffd2"
              /></F.Label>
            <F.HelperText><ShwPlaceholder
                @height="24px"
                @text="row {{R.rowIndex}} / field 2 / helper text"
                @background="#e5ffd2"
              /></F.HelperText>
            <ShwPlaceholder
              @height="36px"
              @text="row {{R.rowIndex}} / field 2 / input"
              @background="#add8e6"
            />
          </R.Field>
          <R.Generic>
            <ShwPlaceholder
              @height="36px"
              @width="200px"
              @text="row {{R.rowIndex}} / generic"
            />
          </R.Generic>
          <R.DeleteRowButton />
        </:row>

        <:footer as |F|>
          <F.AddRowButton />
          <ShwPlaceholder @height="24px" @text="alert" @background="#fff8d2" />
          <F.Error><ShwPlaceholder
              @height="16px"
              @text="Error message"
              @background="#fff8d2"
            /></F.Error>
        </:footer>
      </HdsFormKeyValueInputs>
    </div>

    <ShwDivider />
  </template>
}
