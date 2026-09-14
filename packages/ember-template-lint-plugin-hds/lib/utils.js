export function closestUniqueMatch(input, candidates) {
  let bestDistance = Number.POSITIVE_INFINITY;
  let best = [];

  for (const candidate of candidates) {
    const distance = levenshtein(input, candidate);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = [candidate];
    } else if (distance === bestDistance) {
      best.push(candidate);
    }
  }

  const threshold = input.length >= 4 ? 2 : 1;
  return best.length === 1 && bestDistance <= threshold ? best[0] : undefined;
}

export function staticStringValue(attribute) {
  const value = attribute?.value;
  if (value?.type === "TextNode") {
    return {
      value: value.chars,
      replace(replacement) {
        value.chars = replacement;
      },
    };
  }

  if (
    value?.type === "MustacheStatement" &&
    value.path?.type === "StringLiteral"
  ) {
    return {
      value: value.path.value,
      replace(replacement) {
        value.path.value = replacement;
        value.path.original = replacement;
      },
    };
  }

  return undefined;
}

function levenshtein(left, right) {
  const previous = Array.from(
    { length: right.length + 1 },
    (_, index) => index,
  );

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex++) {
    let diagonal = previous[0];
    previous[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex++) {
      const above = previous[rightIndex];
      previous[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + 1,
        diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }

  return previous[right.length];
}
