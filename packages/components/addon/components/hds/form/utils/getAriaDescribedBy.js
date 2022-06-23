export function getAriaDescribedBy(element) {
  // initialize the array using the descriptors' IDs, if they exist
  let ariaDescribedBy = element.descriptors ?? [];

  // append @extraAriaDescribedBy arg, if provided
  if (element.args.extraAriaDescribedBy) {
    ariaDescribedBy.push(element.args.extraAriaDescribedBy);
  }

  return ariaDescribedBy.join(' ');
}
