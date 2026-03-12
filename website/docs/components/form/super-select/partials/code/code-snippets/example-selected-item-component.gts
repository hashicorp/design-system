import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface ExampleSelectedItemComponentSignature {
  Args: {
    option: {
      size: string;
    };
  };
}

const ExampleSelectedItemComponent: TemplateOnlyComponent<ExampleSelectedItemComponentSignature> =
  <template>
    <span>
      {{@option.size}}
    </span>
  </template>;

export default ExampleSelectedItemComponent;
