import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconLogs16: TemplateOnlyComponent<CarbonIconSignature> = <template>
    {{#let (uniqueId) as |id|}}
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            fill={{if @color @color 'currentColor'}}
            width='16'
            height='16'
            aria-labelledby={{if @title (concat 'title-' id)}}
            aria-hidden={{unless @title 'true'}}
            ...attributes
        >
            {{#if @title}}
                <title id='title-{{id}}'>{{@title}}</title>
            {{/if}}
            <path
                d='M28 16v6H4V6H15V4H4A2 2 0 002 6V22a2 2 0 002 2h8v4H8v2H24V28H20V24h8a2 2 0 002-2V16zM18 28H14V24h4zM18 4H30V6H18z'
            ></path><path d='M18 8H30V10H18zM18 12H24V14H18z'></path></svg>
    {{/let}}
</template>;

export default CarbonIconLogs16;
