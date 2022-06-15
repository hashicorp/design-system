import { ID_PREFIX as ERROR_ID_PREFIX } from '../error';
import { ID_PREFIX as HELPER_TEXT_ID_PREFIX } from '../helper-text';

export function getAriaDescribedBy(element) {
  let ariaDescribedBy = [];

  if (element.HTMLElement) {
    let helperText = element.HTMLElement.querySelector(
      `#${HELPER_TEXT_ID_PREFIX}${element.id}`
    );
    let error = element.HTMLElement.querySelector(
      `#${ERROR_ID_PREFIX}${element.id}`
    );

    if (helperText) {
      ariaDescribedBy.push(`${HELPER_TEXT_ID_PREFIX}${element.id}`);
    }
    if (error) {
      ariaDescribedBy.push(`${ERROR_ID_PREFIX}${element.id}`);
    }
  }

  // append @ariaDescribedBy arg, if provided
  if (element.args.ariaDescribedBy) {
    ariaDescribedBy.push(element.args.ariaDescribedBy);
  }
  return ariaDescribedBy.join(' ');
}
