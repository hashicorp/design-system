export enum CarbonIconSizeValues {
  Sixteen = '16',
  Twenty = '20',
  TwentyFour = '24',
  ThirtyTwo = '32',
}

export type CarbonIconSizes = `${CarbonIconSizeValues}`;

export interface CarbonIconAttrs {
  viewBox: string;
  width?: number | string;
  height?: number | string;
}

export type CarbonIconNodeAttrs = {
  d?: string;
  cx?: number | string;
  cy?: number | string;
  r?: number | string;
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  points?: string;
  opacity?: number | string;
  transform?: string;
  fill?: string;
  stroke?: string;
  'stroke-width'?: number | string;
  'stroke-linecap'?: string;
  'stroke-linejoin'?: string;
  'stroke-miterlimit'?: string;
  // allow anything else but still narrow to AttrValue-like types
  [key: string]: string | number | undefined;
};

export interface CarbonIconContent {
  elem: string;
  attrs: CarbonIconNodeAttrs;
}

export interface CarbonIcon {
  attrs: CarbonIconAttrs;
  content: CarbonIconContent[];
  name: string;
  size: string | number;
}
