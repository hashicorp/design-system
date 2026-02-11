import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsSegmentedGroup,
  HdsFormField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormField @layout="vertical" as |F|>
    <F.Label>New API Key</F.Label>
    <F.HelperText>Your org must have at least one key and at most five keys</F.HelperText>
    <F.Control>
      <HdsSegmentedGroup as |SG|>
        <SG.TextInput
          id={{F.id}}
          aria-describedby={{F.ariaDescribedBy}}
          size="32"
        />
        <SG.Button @color="secondary" @text="Generate" />
      </HdsSegmentedGroup>
    </F.Control>
  </HdsFormField>
</template>;

export default LocalComponent;
