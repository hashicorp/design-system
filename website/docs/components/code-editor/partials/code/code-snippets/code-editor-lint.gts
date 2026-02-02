import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const BAD_JSON_CODE = `{
  message: "Hello, world!",
  : "success"
  "data": null,
}`;

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeEditor
    @ariaLabel="linting"
    @isLintingEnabled={{true}}
    @language="json"
    @value={{BAD_JSON_CODE}}
  />
</template>;

export default LocalComponent;
