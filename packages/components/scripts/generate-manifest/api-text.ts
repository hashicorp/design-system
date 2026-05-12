export function normalizeApiText(text: string): string {
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
