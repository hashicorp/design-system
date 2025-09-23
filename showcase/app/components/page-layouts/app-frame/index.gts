import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContainers from 'showcase/components/page-layouts/app-frame/sub-sections/containers';
import SubSection3dVisualization from 'showcase/components/page-layouts/app-frame/sub-sections/3d-visualization';
import SubSectionFramed from 'showcase/components/page-layouts/app-frame/sub-sections/framed';
import SubSectionDemo from 'showcase/components/page-layouts/app-frame/sub-sections/demo';

const AppFrameIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AppFrame Component"}}

  <ShwTextH1>AppFrame</ShwTextH1>

  <section data-test-percy>
    <SubSectionContainers />
    <SubSection3dVisualization />
  </section>
  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
  <section>
    <SubSectionFramed />
    <SubSectionDemo />
  </section>
</template>;

export default AppFrameIndex;
