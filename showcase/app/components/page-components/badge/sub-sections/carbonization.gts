/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

const SubSectionCarbonization: TemplateOnlyComponent = <template>
  <ShwDivider />
  <ShwDivider />

  <ShwTextH2>Carbonization</ShwTextH2>

  <ShwCarbonizationComparisonGrid @label="grid label as argument" as |CG|>
    <CG.Item @area="hds" class="test #1" @label="at-label #1">
      CG.Item Content #1
    </CG.Item>
    <CG.Item @area="cds-g90" class="test #2">
      CG.Item Content #2
    </CG.Item>
    <CG.Item @area="wc-g10" class="test #3" as |CGI|>
      <CGI.Label>cgi-label #3</CGI.Label>
      CG.Item Content #3
    </CG.Item>
  </ShwCarbonizationComparisonGrid>

  <ShwCarbonizationComparisonGrid as |CG|>
    <CG.Label>Yielded label</CG.Label>
    <CG.Item @area="hds" class="test #1" @label="at-label #1">
      CG.Item Content #1
    </CG.Item>
    <CG.Item @area="cds-g90" class="test #2">
      CG.Item Content #2
    </CG.Item>
    <CG.Item @area="wc-g10" class="test #3" as |CGI|>
      <CGI.Label>cgi-label #3</CGI.Label>
      CG.Item Content #3
    </CG.Item>
  </ShwCarbonizationComparisonGrid>
</template>;

export default SubSectionCarbonization;
