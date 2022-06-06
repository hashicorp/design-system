import { ID_PREFIX as ERROR_ID_PREFIX } from '../error';
import { ID_PREFIX as HELPER_TEXT_ID_PREFIX } from '../helper-text';

export function describedBy(element) {
  let describedBy = [];
  describedBy.push(`${HELPER_TEXT_ID_PREFIX}${element.id}`);
  describedBy.push(`${ERROR_ID_PREFIX}${element.id}`);
  // append @ariaDescribedBy arg, if provided
  if (element.args.ariaDescribedBy) {
    describedBy.push(element.args.ariaDescribedBy);
  }
  return describedBy.join(' ');
}
