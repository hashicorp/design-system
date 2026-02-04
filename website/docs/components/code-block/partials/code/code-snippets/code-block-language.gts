import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeBlock
    @ariaLabel="language"
    @language="go"
    @value="package main
import fmt
func main() {
  fmt.Println(helloWorld)
}"
  />
</template>;

export default LocalComponent;
