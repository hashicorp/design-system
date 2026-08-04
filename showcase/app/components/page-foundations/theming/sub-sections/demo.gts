import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwLabel from 'showcase/components/shw/label';
import ShwBodyLinkToRoute from 'showcase/components/shw/body-link-to-route';
// import ShwFrame from 'showcase/components/shw/frame';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwLabel>Demo application with theme switcher</ShwLabel>
  <ShwBodyLinkToRoute
    @route="page-foundations.theming.frameless.demo-application-with-theme-switcher"
    @isRouteExternal={{true}}
  >
    Open the demo application
    <span class="sr-only">frame in a new window</span>
  </ShwBodyLinkToRoute>

  {{! NOTE: we don't use the frameless page because changing theme in the iframe interferes with the stylesheed in the parent page, and it may create confusion }}
  {{! <ShwFrame
    @id="demo-application-with-theme-switcher"
    @src="/foundations/theming/frameless/demo-application-with-theme-switcher"
    @label="Demo application with theme switcher"
    @height="1000"
  /> }}
</template>;

export default SubSectionDemo;
