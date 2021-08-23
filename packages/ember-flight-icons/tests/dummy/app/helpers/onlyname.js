import Helper from '@ember/component/helper';

/**
 * This helper takes the dash and two digits (`-24` or `-16`) out of the `Name`
 * It is necessary until the `_catalog.json` provides the format we need
 */
export default class Onlyname extends Helper {
  compute([string]) {
    let reg = string.match(/-\d\d/gi);
    return string.replace(reg, '');
  }
}
