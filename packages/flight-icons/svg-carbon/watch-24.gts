import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconWatch24: TemplateOnlyComponent<CarbonIconSignature> = <template>
    {{#let (uniqueId) as |id|}}
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            fill={{if @color @color 'currentColor'}}
            width='24'
            height='24'
            aria-labelledby={{if @title (concat 'title-' id)}}
            aria-hidden={{unless @title 'true'}}
            ...attributes
        >
            {{#if @title}}
                <title id='title-{{id}}'>{{@title}}</title>
            {{/if}}
            <path
                d='M22 8H21V2H19V8H13V2H11V8H10a2 2 0 00-2 2V22a2 2 0 002 2h1v6h2V24h6v6h2V24h1a2 2 0 002-2V10A2 2 0 0022 8zM10 22V10H22V22zM25 14H27V18H25z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconWatch24;
