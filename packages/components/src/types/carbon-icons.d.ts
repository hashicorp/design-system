// This file tells TypeScript how to handle imports from @carbon/icons.

// We declare that any module imported from the '@carbon/icons/es' directory
// is a valid module. This specifically targets the deep imports we are
// using for tree-shaking (e.g., '@carbon/icons/es/add/16.js').
//
// This resolves the "implicitly has an 'any' type" error without
// needing to modify the generation script.

declare module '@carbon/icons/es/*' {
  // We can be more specific, but 'any' is fine since we
  // type the `@icon` arg in the component signature anyway.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export default value;
}
