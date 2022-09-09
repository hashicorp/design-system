/* eslint-disable prettier/prettier */
import { helper } from '@ember/component/helper';

export function capitalize(params/*, hash*/) {
  let input = params[0];

  return input.charAt(0).toUpperCase() + input.slice(1)
}

export default helper(capitalize);
