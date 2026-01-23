import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsApplicationState as |A|>
    <A.Header @title="An error has occurred" @icon="help" @errorCode="404" />
    <A.Body
      @text="Sorry, an unexpected error has occurred.
      Please try again later or contact support for assistance."
    />
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
