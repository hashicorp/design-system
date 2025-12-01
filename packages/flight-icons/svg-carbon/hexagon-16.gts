import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconHexagon16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    stroke-width='0'
                    d='m23,29h-14c-.3555,0-.6846-.189-.8638-.4961L1.1362,16.5039c-.1816-.3113-.1816-.6965,0-1.0078L8.1362,3.4961c.1792-.3071.5083-.4961.8638-.4961h14c.3555,0,.6846.189.8638.4961l7,12c.1816.3113.1816.6965,0,1.0078l-7,12c-.1792.3071-.5083.4961-.8638.4961Zm-13.4258-2h12.8516l6.4165-11-6.4165-11h-12.8516l-6.4165,11,6.4165,11Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconHexagon16;
