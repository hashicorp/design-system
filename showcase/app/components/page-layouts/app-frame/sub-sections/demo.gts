import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';
import ShwDivider from 'showcase/components/shw/divider';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwDivider />

  <ShwTextH2>Demo</ShwTextH2>

  <ShwFrame
    @id="demo-full-app-frame-with-app-header-and-app-side-nav"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-app-header-and-app-side-nav"
    @height="780"
    @label="Full AppFrame with AppHeader & AppSideNav"
  />

  <ShwFrame
    @id="demo-full-app-frame-with-side-nav"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-side-nav"
    @height="780"
    @label="Full AppFrame with old SideNav (without AppHeader)"
  />
</template>;

export default SubSectionDemo;
