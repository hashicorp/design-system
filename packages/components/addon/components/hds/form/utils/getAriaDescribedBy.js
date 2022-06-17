export function getAriaDescribedBy(element) {
  let ariaDescribedBy = [];

  // append descriptor's IDs, if provided
  if (element.descriptors) {
    ariaDescribedBy.concat(element.descriptors);
  }

  // append @extraAriaDescribedBy arg, if provided
  if (element.args.extraAriaDescribedBy) {
    ariaDescribedBy.push(element.args.extraAriaDescribedBy);
  }
  return ariaDescribedBy.join(' ');
}
