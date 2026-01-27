import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

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
  <HdsCodeEditor @ariaLabel="language" @language="go" @value={{GO_CODE}} />
</template>;

export default LocalComponent;
