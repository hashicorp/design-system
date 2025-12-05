/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/base-elements/code-fragments/with-character-count';

const SubSectionCharacterCount: TemplateOnlyComponent = <template>
  <ShwTextH2>Character count</ShwTextH2>

  <ShwTextH3>Default content</ShwTextH3>

  <ShwTextBody>Base</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount @ariaLabel="currentLength = 0" />
    </SG.Item>
    <SG.Item @label="currentLength > 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength > 0"
        @value="cl"
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextBody>maxLength</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = 0"
        @maxLength={{25}}
      />
    </SG.Item>
    <SG.Item @label="currentLength < maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength < maxLength"
        @maxLength={{25}}
        @value="cluster"
      />
    </SG.Item>
    <SG.Item @label="currentLength = maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = maxLength"
        @maxLength={{25}}
        @value="cluster-length-is-longer-"
      />
    </SG.Item>
    <SG.Item @label="currentLength > maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength > maxLength"
        @maxLength={{25}}
        @value="cluster-length-is-longer-than"
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextBody>minLength</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = 0"
        @minLength={{3}}
      />
    </SG.Item>
    <SG.Item @label="currentLength < maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength < maxLength"
        @minLength={{3}}
        @value="c"
      />
    </SG.Item>
    <SG.Item @label="currentLength >= minLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength >= minLength"
        @minLength={{3}}
        @value="clu"
      />
    </SG.Item>
    <SG.Item />
  </ShwGrid>

  <ShwTextBody>minLength + maxLength</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = 0"
        @minLength={{3}}
        @maxLength={{25}}
      />
    </SG.Item>
    <SG.Item @label="currentLength < minLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength < minLength"
        @minLength={{3}}
        @maxLength={{25}}
        @value="c"
      />
    </SG.Item>
    <SG.Item @label="minLength <= currentLength <= maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="minLength <= currentLength <= maxLength"
        @minLength={{3}}
        @maxLength={{25}}
        @value="cluster"
      />
    </SG.Item>
    <SG.Item @label="currentLength > maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength > maxLength"
        @minLength={{3}}
        @maxLength={{25}}
        @value="cluster-length-is-longer-than"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Custom content</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With custom content">
      <CodeFragmentWithCharacterCount
        @ariaLabel="with custom content"
        @minLength={{20}}
        @maxLength={{40}}
        @customContent={{true}}
        @value="Lorem ipsum dolor"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionCharacterCount;
