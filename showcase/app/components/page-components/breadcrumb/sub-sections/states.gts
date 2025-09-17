import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithMockStates from '../code-fragments/with-mock-states';
import type { MockState } from '../code-fragments/with-mock-states';

const STATES: MockState[] = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  {{#each STATES as |state|}}
    <ShwFlex @label={{capitalize state}} as |SF|>
      <SF.Item>
        <CodeFragmentWithMockStates @mock-state={{state}} />
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionStates;
