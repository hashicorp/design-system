import type { TemplateOnlyComponent } from '@ember/component/template-only';
import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';
import hdsCodeEditor from '@hashicorp/design-system-components/modifiers/hds-code-editor';

const MyComponent: TemplateOnlyComponent = <template>
  <button type="button" {{hdsTooltip "this is a tooltip!"}}>
    Click me!
  </button>
  <div {{hdsCodeEditor ariaLabel="Example code editor"}} />
</template>;

export default MyComponent;
