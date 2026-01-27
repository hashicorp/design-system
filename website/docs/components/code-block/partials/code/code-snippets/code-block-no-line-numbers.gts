import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeBlock
    @language="go"
    @ariaLabel="line numbers"
    @hasLineNumbers={{false}}
    @value="package main
import fmt
func main() {
  fmt.Println(helloWorld)
}"
  />
</template>;

export default LocalComponent;
