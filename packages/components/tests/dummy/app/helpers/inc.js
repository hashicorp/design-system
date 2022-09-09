/* eslint-disable prettier/prettier */
import { helper } from '@ember/component/helper';

export function inc(params/*, hash*/) {
  return parseInt(params[0], 10) + 1;
}

export default helper(inc);
