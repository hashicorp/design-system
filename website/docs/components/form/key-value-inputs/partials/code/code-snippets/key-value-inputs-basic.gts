import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <!--  =====================================================================
    Note: this is a non-interactive example, used to demonstrate how the @data argument
    and the different sub-components are combined and invoked, to achieve the desired layout
  ===================================================================== -->

  <HdsFormKeyValueInputs
    @data={{array
      (hash email="j.maxene@randatmail.com" name="Judith Maxene")
      (hash email="e.aishah@randatmail.com" name="Elmira Aishah")
    }}
  >
    <:header as |H|>
      <H.Legend>Invite multiple users to your organization</H.Legend>
      <H.HelperText>
        Users without organization roles cannot view or edit anything inside
        their organization until project-level or workspace-level roles are
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
      <R.DeleteRowButton />
    </:row>
    <:footer as |F|>
      <F.AddRowButton @text="Add user" />
    </:footer>
  </HdsFormKeyValueInputs>
</template>;

export default LocalComponent;
