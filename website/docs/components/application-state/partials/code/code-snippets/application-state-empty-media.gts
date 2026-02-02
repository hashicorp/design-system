import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsApplicationState as |A|>
    <A.Media><img
        src="/assets/images/avatar.png"
        alt="portrait of a cat wearing coat and tie"
      /></A.Media>
    <A.Header @title="Empty state title text" />
    <A.Body @text="Some sentence that conveys a good message to the user" />
    <A.Footer as |F|>
      <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
    </A.Footer>
  </HdsApplicationState>
</template>;

export default LocalComponent;
