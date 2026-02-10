import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCodeEditor,
  HdsTextDisplay,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const GO_CODE = `func convertObjectToArray(obj map[string]interface{}) []interface{} {
	var arr []interface{}
	for key, value := range obj {
		arr = append(arr, key, value)
	}
	sort.Slice(arr, func(i, j int) bool {
		return fmt.Sprintf("%v", arr[i]) < fmt.Sprintf("%v", arr[j])
	})
	return arr
}`;

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-code-editor-demo-heading">
    <HdsTextDisplay @tag="h2" @size="300">
      Learn to write functions in Go
    </HdsTextDisplay>
    <HdsTextBody @tag="p">
      Functions are a critical part of learning Go. They are reusable chunks of
      code that can perform tasks like convert an object to an array.
    </HdsTextBody>
  </div>
  <HdsCodeEditor @language="go" @value={{GO_CODE}} as |CE|>
    <CE.Title @tag="h3">
      Convert object to array
    </CE.Title>
  </HdsCodeEditor>
</template>;

export default LocalComponent;
