import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCopyButton,
  HdsFormFieldset,
  HdsFormTextareaBase,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormFieldset @layout="vertical" as |F|>
    <F.Legend>Cluster secret</F.Legend>
    <F.HelperText>This is some example helper text.</F.HelperText>
    <F.Control>
      <HdsLayoutFlex @align="start" @gap="8">
        <HdsFormTextareaBase
          @value="C9WhJuvE70CnTcqvNqptMhmnBHmMNXuj"
          id="cluster-name-example-textarea"
        />
        <HdsCopyButton
          @text="Copy"
          @isIconOnly={{true}}
          @targetToCopy="#cluster-name-example-textarea"
        />
      </HdsLayoutFlex>
    </F.Control>
    <F.Error>This is example error text.</F.Error>
  </HdsFormFieldset>
</template>;

export default LocalComponent;
