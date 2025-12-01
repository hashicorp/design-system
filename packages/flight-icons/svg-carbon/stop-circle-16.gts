import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconStopCircle16: TemplateOnlyComponent<CarbonIconSignature> =
    <template>
        {{#let (uniqueId) as |id|}}
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
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
                    d='M8,2c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S4.7,2,8,2 M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z'
                ></path><path
                    d='M10,6v4H6V6H10 M10,5H6C5.4,5,5,5.4,5,6v4c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1V6C11,5.4,10.6,5,10,5z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconStopCircle16;
