import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAppFooter,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAppFooter as |AF|>
    <AF.Item>
      <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
    </AF.Item>
    <AF.Item>
      <HdsTextBody @tag="span" @size="100">Vault</HdsTextBody>
    </AF.Item>
    <AF.Item>
      <HdsTextBody @tag="span" @size="100">API: 1.0</HdsTextBody>
    </AF.Item>
  </HdsAppFooter>
</template>;

export default LocalComponent;
