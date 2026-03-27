// import the SVG file (using 'import')
import iconArrowRight from "@hashicorp/flight-icons/svg/arrow-right-24.svg?include";

// the icon can also be imported using required
const iconArrowLeft = require("@hashicorp/flight-icons/svg/arrow-left-24.svg?include");

{
  /* elsewhere in the file */
}
<InlineSvg src={iconArrowRight} />;
{
  /* alternatively you can also use a similar approach */
}
<InlineSvg
  src={require("@hashicorp/flight-icons/svg/arrow-right-24.svg?include")}
/>;
