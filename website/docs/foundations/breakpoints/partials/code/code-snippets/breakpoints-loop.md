import { hdsBreakpoints } from '@hashicorp/design-system-components/utils/hds-breakpoints';

// do something with a specific breakpoint value
const myBreakpoint1 = hdsBreakpoints['xl'].value; // numeric (eg. 1440)
const myBreakpoint2 = hdsBreakpoints['lg'].px;    // size in px (eg. 1088px)
const myBreakpoint3 = hdsBreakpoints['sm'].rem;   // size in rem (eg. 30rem)

// loop over all the breakpoints
Object.entries(hdsBreakpoints).forEach(([name, sizes]) => {
  // do something with a specific breakpoint value in px
  const myBreakpointSizePx = sizes.px;
});
