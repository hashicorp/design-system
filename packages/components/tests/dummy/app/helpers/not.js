import { helper } from '@ember/component/helper';

export function not(params) {
  return !params[0];
}

export default helper(not);
