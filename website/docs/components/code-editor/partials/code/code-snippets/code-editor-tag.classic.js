import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  goCode = `func convertObjectToArray(obj map[string]interface{}) []interface{} {
  var arr []interface{}
  for key, value := range obj {
    arr = append(arr, key, value)
  }
  sort.Slice(arr, func(i, j int) bool {
    return fmt.Sprintf("%v", arr[i]) < fmt.Sprintf("%v", arr[j])
  })
  return arr
}`;
}
