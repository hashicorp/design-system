import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconLayout16: TemplateOnlyComponent<CarbonIconSignature> =
    <template>
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
                    d='M26 6v4H6V6H26m0-2H6A2 2 0 004 6v4a2 2 0 002 2H26a2 2 0 002-2V6a2 2 0 00-2-2zM10 16V26H6V16h4m0-2H6a2 2 0 00-2 2V26a2 2 0 002 2h4a2 2 0 002-2V16a2 2 0 00-2-2zM26 16V26H16V16H26m0-2H16a2 2 0 00-2 2V26a2 2 0 002 2H26a2 2 0 002-2V16a2 2 0 00-2-2z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconLayout16;
