import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconMinusCircleFill24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='m16,2c-7.6,0-14,6.4-14,14s6.4,14,14,14,14-6.4,14-14S23.6,2,16,2Zm8,15H8v-2h16v2Z'
                ></path><path
                    fill='none'
                    d='M24 17L8 17 8 15 24 15 24 17z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconMinusCircleFill24;
