import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconNavigation16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M4,12.9835a1,1,0,0,0,.6289.9448l9.6015,3.8409,3.8407,9.6019A1,1,0,0,0,19,28h.0162a1.0009,1.0009,0,0,0,.9238-.6582l8-22.0007A1,1,0,0,0,26.658,4.0594l-22,8A1.0011,1.0011,0,0,0,4,12.9835Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconNavigation16;
