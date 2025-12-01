import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconBucket16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M10 10H22V12H10zM10 15H22V17H10zM10 20H22V22H10z'
                ></path><path
                    stroke-width='0'
                    d='m26,28H6c-1.1028,0-2-.8972-2-2V6c0-1.1028.8972-2,2-2h20c1.1028,0,2,.8972,2,2v20c0,1.1028-.8972,2-2,2ZM6,6v20h20V6H6Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconBucket16;
