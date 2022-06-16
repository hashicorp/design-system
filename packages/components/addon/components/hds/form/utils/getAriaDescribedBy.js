export function getAriaDescribedBy(element) {
  let ariaDescribedBy = [];

  // append descriptor's IDs, if provided
  if (element.descriptors) {
    element.descriptors.forEach((descriptor) =>
      ariaDescribedBy.push(descriptor)
    );
  }

  // append @ariaDescribedBy arg, if provided
  if (element.args.ariaDescribedBy) {
    ariaDescribedBy.push(element.args.ariaDescribedBy);
  }
  return ariaDescribedBy.join(' ');
}
