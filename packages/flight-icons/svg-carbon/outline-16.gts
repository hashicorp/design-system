import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconOutline16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M21,2h-10C6,2,2,6,2,11v10c0,5,4,9,9,9h10c5,0,9-4,9-9v-10c0-5-4-9-9-9ZM28,21c0,3.9-3.1,7-7,7h-10c-3.9,0-7-3.1-7-7v-10c0-3.9,3.1-7,7-7h10c3.9,0,7,3.1,7,7v10ZM9.5,19c.8284,0,1.5.6716,1.5,1.5s-.6716,1.5-1.5,1.5-1.5-.6716-1.5-1.5.6716-1.5,1.5-1.5ZM9.5,10c.8284,0,1.5.6716,1.5,1.5s-.6716,1.5-1.5,1.5-1.5-.6716-1.5-1.5.6716-1.5,1.5-1.5ZM14,12h10v2h-10v-2ZM14,18h10v2h-10v-2Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconOutline16;
