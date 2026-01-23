import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFooter } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-app-footer-demo-dark-background">
    <HdsAppFooter @theme="dark" as |AF|>
      <AF.StatusLink @status="operational" />
      <AF.LegalLinks />
    </HdsAppFooter>
  </div>
</template>;

export default LocalComponent;
