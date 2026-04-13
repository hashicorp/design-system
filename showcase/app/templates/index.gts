/**
 * Minimal index for bundle benchmarking - redirects to the demo page
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

const Index: TemplateOnlyComponent = <template>
  <div style="padding: 2rem;">
    <h1>Minimal Benchmark Showcase</h1>
    <p>
      <LinkTo @route="page-layouts.app-frame.frameless.demo-full-app-frame-with-app-header-and-app-side-nav">
        Go to App Frame Demo →
      </LinkTo>
    </p>
  </div>
</template>;

export default Index;
