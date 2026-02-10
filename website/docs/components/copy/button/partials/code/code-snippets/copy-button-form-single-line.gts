import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCopyButton,
  HdsFormFieldset,
  HdsFormTextInputBase,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormFieldset @layout="vertical" as |F|>
    <F.Legend>Cluster name</F.Legend>
    <F.HelperText>This is some example helper text.</F.HelperText>
    <F.Control>
      <HdsLayoutFlex @align="start" @gap="8">
        <HdsFormTextInputBase
          @value="aws-east-cluster-01"
          id="cluster-name-example-text-input"
        />
        <HdsCopyButton
          @text="Copy"
          @isIconOnly={{true}}
          @targetToCopy="#cluster-name-example-text-input"
        />
      </HdsLayoutFlex>
    </F.Control>
    <F.Error>This is example error text.</F.Error>
  </HdsFormFieldset>
</template>;

export default LocalComponent;
