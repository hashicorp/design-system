import Helper from '@ember/component/helper';

export default class Substring extends Helper {
  compute([string]) {
    let reg = string.match(/-\d\d/gi);
    return string.replace(reg, '');
  }
}
