import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconDatabase24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M24,3H8A2,2,0,0,0,6,5V27a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V5A2,2,0,0,0,24,3Zm0,2v6H8V5ZM8,19V13H24v6Zm0,8V21H24v6Z'
                ></path><circle cx='11' cy='8' r='1'></circle><circle
                    cx='11'
                    cy='16'
                    r='1'
                ></circle><circle cx='11' cy='24' r='1'></circle></svg>
        {{/let}}
    </template>;

export default CarbonIconDatabase24;
