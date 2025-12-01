import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconShoppingBag24: TemplateOnlyComponent<CarbonIconSignature> =
    <template>
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
                    d='M28.76,11.35A1,1,0,0,0,28,11H22V7a3,3,0,0,0-3-3H13a3,3,0,0,0-3,3v4H4a1,1,0,0,0-1,1.15L4.88,24.3a2,2,0,0,0,2,1.7H25.14a2,2,0,0,0,2-1.7L29,12.15A1,1,0,0,0,28.76,11.35ZM12,7a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v4H12ZM25.14,24H6.86L5.17,13H26.83Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconShoppingBag24;
