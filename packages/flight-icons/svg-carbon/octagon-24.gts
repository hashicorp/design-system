import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconOctagon24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M20.5857,29H11.4143A1.9865,1.9865,0,0,1,10,28.4141L3.5859,22A1.9865,1.9865,0,0,1,3,20.5857V11.4143A1.9865,1.9865,0,0,1,3.5859,10L10,3.5859A1.9865,1.9865,0,0,1,11.4143,3h9.1714A1.9865,1.9865,0,0,1,22,3.5859L28.4141,10A1.9865,1.9865,0,0,1,29,11.4143v9.1714A1.9865,1.9865,0,0,1,28.4141,22L22,28.4141A1.9865,1.9865,0,0,1,20.5857,29ZM11.4141,5,5,11.4141v9.1716L11.4141,27h9.1716L27,20.5859V11.4143L20.5859,5H11.4141Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconOctagon24;
