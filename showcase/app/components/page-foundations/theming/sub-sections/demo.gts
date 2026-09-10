import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwLabel from 'showcase/components/shw/label';
import ShwBodyLinkToRoute from 'showcase/components/shw/body-link-to-route';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwLabel>Demo application with theme switcher</ShwLabel>
  {{! NOTE: we don't use the `ShwFrame` frameless wrapper directly because changing theme in the iframe interferes with the stylesheet in the parent page, and it may create confusion }}
  <ShwBodyLinkToRoute
    @route="page-foundations.theming.frameless.demo-application-with-theme-switcher"
    @isRouteExternal={{true}}
  >
    Open the demo application
    <span class="sr-only">frame in a new window</span>
  </ShwBodyLinkToRoute>
</template>;

export default SubSectionDemo;
