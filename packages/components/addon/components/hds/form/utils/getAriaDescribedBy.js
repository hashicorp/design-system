import { ID_PREFIX as ERROR_ID_PREFIX } from '../error';
import { ID_PREFIX as HELPER_TEXT_ID_PREFIX } from '../helper-text';

export function getAriaDescribedBy(element) {
  let ariaDescribedBy = [];
  ariaDescribedBy.push(`${HELPER_TEXT_ID_PREFIX}${element.id}`);
  ariaDescribedBy.push(`${ERROR_ID_PREFIX}${element.id}`);
  // append @ariaDescribedBy arg, if provided
  if (element.args.ariaDescribedBy) {
    ariaDescribedBy.push(element.args.ariaDescribedBy);
  }
  return ariaDescribedBy.join(' ');
}
