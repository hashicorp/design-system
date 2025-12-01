import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconBriefcase16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M28,10H22V6a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2v4H4a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V12A2,2,0,0,0,28,10ZM12,6h8v4H12ZM4,26V12H28V26Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconBriefcase16;
