export function normalizeApiText(text: string): string {
  // Wrap Ember-style namespace API references (e.g. Hds::Button) in backticks,
  // but preserve any inline code span that is already wrapped in backticks.
  // NOTE: this currently only auto-detects namespaced patterns; we will also
  // need a way to detect non-namespaced component references used in GTS docs
  // (for example, HdsButton) and normalize those as code too.
  const codeSegmentPattern = /(`[^`]*`)/u;

  return text
    .split(codeSegmentPattern)
    .map((segment) => {
      if (segment.startsWith('`') && segment.endsWith('`')) {
        return segment;
      }

      return segment.replace(
        /(^|[^A-Za-z0-9_])([A-Z][A-Za-z0-9]*(?:::[A-Z][A-Za-z0-9]*)+)(?=$|[^A-Za-z0-9_])/gu,
        '$1`$2`'
      );
    })
    .join('');
}
