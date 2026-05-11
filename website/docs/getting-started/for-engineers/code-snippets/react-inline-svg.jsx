/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// import the SVG file (using 'import')
import iconArrowRight from "@hashicorp/flight-icons/svg/arrow-right-24.svg?include";

<InlineSvg src={iconArrowRight} />;

// the icon can also be imported using required
const iconArrowLeft = require("@hashicorp/flight-icons/svg/arrow-left-24.svg?include");

// alternatively you can also use a similar approach
<InlineSvg
  src={require("@hashicorp/flight-icons/svg/arrow-right-24.svg?include")}
/>;
