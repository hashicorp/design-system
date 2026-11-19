/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

const CodeFragmentWithOptionsGenericContent: TemplateOnlyComponent = <template>
  <ShwPlaceholder
    @text="placeholder w/transparent bg"
    @background="transparent"
    @height="40px"
  />
</template>;

export default CodeFragmentWithOptionsGenericContent;
