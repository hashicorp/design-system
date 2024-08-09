export enum TextTagValues {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  P = 'p',
  Span = 'span',
  Div = 'div',
}

export type TextTags = `${TextTagValues}`;

export enum TextAlignValues {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type TextAligns = `${TextAlignValues}`;

export enum TextWeightValues {
  Inherit = 'inherit',
  Regular = 'regular',
  Bold = 'bold',
}

export type TextWeights = `${TextWeightValues}`;

export enum TextVariantValues {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  Body = 'body',
}

export type TextVariants = `${TextVariantValues}`;
