import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

import DocBanner from 'website/components/doc/banner';

const DynamicTemplateError: TemplateOnlyComponent = <template>
  <DocBanner @type="critical">
    <p class="doc-text-body-small"><strong>Error rendering the dynamic template</strong></p>
    <p class="doc-text-body-small">There was an error rendering the dynamic
      template for this page.<br />Check the console to see the details of the
      error.</p>
    <p class="doc-text-body-small">If you need support or want to notify the
      Design Systems Team of this error, please
      <LinkTo
        @route="show"
        @model="about/support"
        class="doc-link-generic"
      >contact us</LinkTo>.
    </p>
  </DocBanner>
</template>;

export default DynamicTemplateError;
