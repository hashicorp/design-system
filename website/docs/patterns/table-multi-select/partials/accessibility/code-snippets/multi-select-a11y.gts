import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import {
  HdsTextBody,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked selectedCount = 10;
  @tracked totalCount = 100;

  updateSelectedCount = () => {
    this.selectedCount = this.selectedCount + 1;
  };

  <template>
    <div class="doc-table-multi-select-role-example">
      <button {{on "click" this.updateSelectedCount}} type="button">
        Add to count
      </button>
      <div class="doc-table-multi-select-pattern-wrapper">
        <HdsTextBody
          role="status"
          @tag="p"
          @size="200"
          @color="foreground-primary"
        >
          {{this.selectedCount}}
          selected out of
          {{this.totalCount}}
        </HdsTextBody>
        <HdsDropdown as |D|>
          <D.ToggleButton @size="small" @text="Actions" @color="secondary" />
          <D.Interactive @icon="edit">Edit</D.Interactive>
          <D.Interactive @icon="trash" @color="critical">Delete</D.Interactive>
          <D.Separator />
          <D.Interactive>Select all</D.Interactive>
          <D.Interactive>Reset selection</D.Interactive>
        </HdsDropdown>
      </div>
    </div>
  </template>
}
