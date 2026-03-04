import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked exampleData = [
    { id: 1, name: 'Judith Maxene', email: 'j.maxene@randatmail.com' },
    { id: 2, name: 'Elmira Aishah', email: 'e.aishah@randatmail.com' },
  ];

  get canDeleteRow() {
    return this.exampleData.length > 1;
  }

  onAddRow = () => {
    this.exampleData = [
      ...this.exampleData,
      { name: '', email: '', id: this.exampleData.length + 1 },
    ];
  };

  onDeleteRow = (rowToDelete: unknown) => {
    if (this.exampleData.length === 1) {
      this.exampleData = [{ id: 1, name: '', email: '' }];
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
        <H.Legend>Invite multiple users to your organization</H.Legend>
        <H.HelperText>
          Users without an organization role cannot view or edit anything inside
          their organization until a project-level or workspace-level role is
          assigned to them after they accept their invitation.
        </H.HelperText>
      </:header>
      <:row as |R|>
        <R.Field as |F|>
          <F.Label>
            Email address for invitee
          </F.Label>
          <F.TextInput @value={{R.rowData.email}} />
        </R.Field>
        <R.Field as |F|>
          <F.Label>
            Name of invitee
          </F.Label>
          <F.TextInput @value={{R.rowData.name}} />
        </R.Field>
        {{#if this.canDeleteRow}}
          <R.DeleteRowButton @onClick={{this.onDeleteRow}} />
        {{/if}}
      </:row>
      <:footer as |F|>
        <F.AddRowButton @text="Add user" @onClick={{this.onAddRow}} />
      </:footer>
    </HdsFormKeyValueInputs>
  </template>
}
