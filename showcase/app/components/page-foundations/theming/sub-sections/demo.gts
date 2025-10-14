import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwFrame
    @id="demo-application-with-theme-switcher"
    @src="/foundations/theming/frameless/demo-application-with-theme-switcher"
    @label="Demo application with theme switcher"
    @height="1000"
  />
</template>;

export default SubSectionDemo;
