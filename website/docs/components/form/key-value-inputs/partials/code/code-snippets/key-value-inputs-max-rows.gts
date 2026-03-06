import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { eq, lt } from 'ember-truth-helpers';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked exampleData = [
    { id: 1, os: 'darwin' },
    { id: 2, os: 'linux' },
    { id: 3, os: 'windows' },
  ];

  get canDeleteRow() {
    return this.exampleData.length > 1;
  }

  onAddRow = () => {
    this.exampleData = [
      ...this.exampleData,
      { os: '', id: this.exampleData.length + 1 },
    ];
  };

  onDeleteRow = (rowToDelete: unknown) => {
    if (this.exampleData.length === 1) {
      this.exampleData = [{ id: 1, os: '' }];
    } else {
      if ('id' in (rowToDelete as Record<string, unknown>)) {
        this.exampleData = this.exampleData.filter(
          (item) => item.id !== (rowToDelete as { id: number }).id,
        );
      }
    }
  };

  <template>
    <HdsFormKeyValueInputs @data={{this.exampleData}}>
      <:header as |H|>
        <H.Legend>Plugin binaries</H.Legend>
        <H.HelperText>
          A zipped binary file for each supported OS and architecture pair.
        </H.HelperText>
      </:header>
      <:row as |R|>
        <R.Field as |F|>
          <F.Label>
            OS and architecture
          </F.Label>
          <F.Select>
            <option></option>
            <option selected={{if (eq R.rowData.os "darwin") true}}>darwin -
              arm64</option>
            <option selected={{if (eq R.rowData.os "linux") true}}>linux - 386</option>
            <option selected={{if (eq R.rowData.os "windows") true}}>windows -
              amd64</option>
          </F.Select>
        </R.Field>
        <R.Field as |F|>
          <F.Label>
            File
          </F.Label>
          <F.FileInput />
        </R.Field>
        {{#if this.canDeleteRow}}
          <R.DeleteRowButton @onClick={{this.onDeleteRow}} />
        {{/if}}
      </:row>
      <:footer as |F|>
        {{#if (lt this.exampleData.length 3)}}
          <F.AddRowButton
            @text="Add OS &amp; Architecture"
            @onClick={{this.onAddRow}}
          />
        {{else}}
          <F.Alert as |A|>
            <A.Description>Only 3 binaries can be added at a time.</A.Description>
          </F.Alert>
        {{/if}}
      </:footer>
    </HdsFormKeyValueInputs>
  </template>
}
