export function getAriaDescribedBy(element) {
  let ariaDescribedBy = [];

  // append descriptor's IDs, if provided
  if (element.descriptors) {
    element.descriptors.forEach((descriptor) =>
      ariaDescribedBy.push(descriptor)
    );
  }

  // append @extraAriaDescribedBy arg, if provided
  if (element.args.extraAriaDescribedBy) {
    ariaDescribedBy.push(element.args.extraAriaDescribedBy);
  }

  if (ariaDescribedBy.length) {
    return ariaDescribedBy.join(' ');
  } else {
    return null;
  }
}
