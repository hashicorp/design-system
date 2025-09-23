import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionFramed: TemplateOnlyComponent = <template>
  <ShwTextH3>Framed</ShwTextH3>

  <ShwFrame
    @id="demo-full-app-frame-lt-480px"
    @src="/layouts/app-frame/frameless/demo-full-app-frame"
    @label="Full app-frame (height < 480px)"
    @height="400"
  />

  <ShwFrame
    @id="demo-full-app-frame-gt-480px"
    @src="/layouts/app-frame/frameless/demo-full-app-frame"
    @label="Full app-frame (height > 480px)"
    @height="500"
  />

  <ShwFrame
    @id="demo-full-app-frame-with-modal"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-modal"
    @label="Full app-frame with modal"
  />
</template>;

export default SubSectionFramed;
