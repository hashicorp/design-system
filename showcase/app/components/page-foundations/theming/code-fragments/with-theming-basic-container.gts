import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface CodeFragmentWithThemingBasicContainerSignature {
  Args: {
    text?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithThemingBasicContainer: TemplateOnlyComponent<CodeFragmentWithThemingBasicContainerSignature> =
  <template>
    <div class="shw-foundation-theming-basic-container" ...attributes>
      {{#if @text}}
        {{@text}}
      {{else}}
        {{yield}}
      {{/if}}
    </div>
  </template>;

export default CodeFragmentWithThemingBasicContainer;
