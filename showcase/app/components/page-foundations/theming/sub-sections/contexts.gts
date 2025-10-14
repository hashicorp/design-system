import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionContexts: TemplateOnlyComponent = <template>
  <ShwTextH2>Contextual theming</ShwTextH2>

  <ShwFrame
    @id="page-with-contextual-themes"
    @src="/foundations/theming/frameless/page-with-contextual-themes"
    @label="Page with contextual themes"
    @height="900"
  />
</template>;

export default SubSectionContexts;
