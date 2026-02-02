import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsApplicationState as |A|>
    <A.Header @title="Empty state title text" />
    <A.Body @text="The item you were looking for was not found." />
    <A.Footer as |F|>
      <F.LinkStandalone
        @icon="help"
        @text="Need Help"
        @href="/components/alert"
        @iconPosition="trailing"
      />
    </A.Footer>
  </HdsApplicationState>
</template>;

export default LocalComponent;
