import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconHeadphones24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M25,16V15A9,9,0,0,0,7,15v1A5,5,0,0,0,7,26H9V15a7,7,0,0,1,14,0V26h2a5,5,0,0,0,0-10ZM4,21a3,3,0,0,1,3-3v6A3,3,0,0,1,4,21Zm21,3V18a3,3,0,0,1,0,6Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconHeadphones24;
