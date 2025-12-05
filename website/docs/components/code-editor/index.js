/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class Index extends Component {
  loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

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

  badJsonCode = `{
  message: "Hello, world!",
  : "success"
  "data": null,
}`;
}
