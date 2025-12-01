import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconReload16: TemplateOnlyComponent<CarbonIconSignature> =
    <template>
        {{#let (uniqueId) as |id|}}
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
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
                    d='M13,9c0,2.8-2.2,5-5,5s-5-2.2-5-5s2.2-5,5-5h3.1L9.3,5.8L10,6.5l3-3l-3-3L9.3,1.2L11.1,3H8C4.7,3,2,5.7,2,9s2.7,6,6,6	s6-2.7,6-6H13z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconReload16;
