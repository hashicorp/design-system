import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <!--  Note: this is a non-interactive example -->

  <HdsFormKeyValueInputs
    @data={{array
      (hash
        tag="production"
        description="This is a tag meant to indicate production environments."
      )
      (hash tag="staging" description="")
    }}
  >
    <:header as |H|>
      <H.Legend>Custom tags</H.Legend>
    </:header>
    <:row as |R|>
      <R.Field as |F|>
        <F.Label>
          Name
        </F.Label>
        <F.TextInput @value={{R.rowData.tag}} />
      </R.Field>
      <R.Field @width="2fr" as |F|>
        <F.Label>
          Description
        </F.Label>
        <F.Textarea @value={{R.rowData.description}} />
      </R.Field>
      <R.DeleteRowButton />
    </:row>
    <:footer as |F|>
      <F.AddRowButton @text="Add tag" />
    </:footer>
  </HdsFormKeyValueInputs>
</template>;

export default LocalComponent;
