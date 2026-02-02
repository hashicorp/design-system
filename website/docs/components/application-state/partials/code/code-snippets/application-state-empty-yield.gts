import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';
import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsApplicationState as |A|>
    <A.Header @title="Empty state title text" />
    <A.Body>
      <DocPlaceholder @text="block yield" @height="100" @background="#eee" />
    </A.Body>
    <A.Footer as |F|>
      <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
    </A.Footer>
  </HdsApplicationState>
</template>;

export default LocalComponent;
