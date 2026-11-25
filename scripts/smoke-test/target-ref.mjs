export const DEFAULT_TARGET_REF = 'main';

// Plain branch names only: no option-like, traversal, or git-special characters.
const TARGET_REF_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;

export function isValidTargetRef(value) {
  return (
    typeof value === 'string' &&
    value.length <= 100 &&
    TARGET_REF_PATTERN.test(value) &&
    !value.includes('..') &&
    !value.includes('//') &&
    !value.endsWith('/') &&
    !value.endsWith('.') &&
    !value.endsWith('.lock')
  );
}

export function consumerTargetRef(consumer) {
  return consumer.targetRef ?? DEFAULT_TARGET_REF;
}
