import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCodeBlock,
  HdsTextDisplay,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-code-block-demo-heading">
    <HdsTextDisplay @tag="h2" @size="300">
      Learn to write functions
    </HdsTextDisplay>
    <HdsTextBody @tag="p">
      Functions are a critical part of learning to code. They are reusable
      chunks of code that can perform tasks like convert an object to an array.
    </HdsTextBody>
  </div>
  <HdsCodeBlock
    @language="go"
    @value="package main
import fmt
func main() {
  fmt.Println(helloWorld)
}"
    as |CB|
  >
    <CB.Title @tag="h3">
      Example function
    </CB.Title>
  </HdsCodeBlock>
</template>;

export default LocalComponent;
