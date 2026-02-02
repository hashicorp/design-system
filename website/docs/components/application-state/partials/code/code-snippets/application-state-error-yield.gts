import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';
import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsApplicationState as |A|>
    <A.Header @title="An error has occurred" @errorCode="404" />
    <A.Body>
      <DocPlaceholder @text="block yield" @height="100" @background="#eee" />
    </A.Body>
    <A.Footer as |F|>
      <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
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
