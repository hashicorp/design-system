import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwLabel from 'showcase/components/shw/label';

export interface ShwCarbonizationStylePreviewTypographySignature {
  Args: {
    class: string;
    label: string;
  };
}

const ShwCarbonizationStylePreviewTypography: TemplateOnlyComponent<ShwCarbonizationStylePreviewTypographySignature> =
  <template>
    <div class="shw-carbonization-style-preview-typography">
      <ShwLabel>{{@label}}</ShwLabel>
      <p class={{@class}}>Lorem ipsum 123 @&amp;%!?</p>
    </div>
  </template>;

export default ShwCarbonizationStylePreviewTypography;
