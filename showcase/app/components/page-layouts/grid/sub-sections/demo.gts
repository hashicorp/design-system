import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwFrame
    @id="demo-full-app-frame-with-grid-responsive"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-grid-responsive"
    @height="780"
    @label="Responsive column widths, all views defined"
  />
</template>;

export default SubSectionDemo;
