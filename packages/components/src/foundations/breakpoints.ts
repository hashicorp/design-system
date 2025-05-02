// todo: understand if we can generate this list reading the correspondin Sass file
// see: https://sergiocarracedo.es/2020/07/17/sharing-variables-between-scss-and-typescript/

export const hdsBreakpointsValues = {
  sm: { value: 480, px: '480px', rem: '30rem' },
  md: { value: 768, px: '768px', rem: '48rem' },
  lg: { value: 1088, px: '1088px', rem: '68rem' },
  xl: { value: 1440, px: '1440px', rem: '90rem' },
  xxl: { value: 1920, px: ' 1920px', rem: '120rem' },
};

export const hdsBreakpointsNames = Object.keys(hdsBreakpointsValues);
