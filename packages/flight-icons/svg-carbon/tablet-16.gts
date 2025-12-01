import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconTablet16: TemplateOnlyComponent<CarbonIconSignature> =
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
                <path d='M24 13H26V19H24z'></path><path
                    d='M30,7V25a2.0023,2.0023,0,0,1-2,2H4a2.002,2.002,0,0,1-2-2V7A2.0023,2.0023,0,0,1,4,5H28A2.0027,2.0027,0,0,1,30,7ZM4,25H28V7H4Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconTablet16;
