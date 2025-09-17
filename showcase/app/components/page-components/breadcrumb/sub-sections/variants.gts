import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithGenericContent from '../code-fragments/with-generic-content';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Variants</ShwTextH2>

  <ShwFlex @label="Text only" as |SF|>
    <SF.Item>
      <CodeFragmentWithGenericContent />
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With icons" as |SF|>
    <SF.Item>
      <CodeFragmentWithGenericContent @hasIcons={{true}} />
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With truncation" as |SF|>
    <SF.Item>
      <CodeFragmentWithGenericContent @hasTruncation={{true}} />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

</template>;

export default SubSectionVariants;
