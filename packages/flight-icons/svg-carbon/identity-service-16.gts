import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconIdentityService16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M30 24v-2h-2.101c-.13-.637-.384-1.229-.732-1.753l1.49-1.49-1.414-1.414-1.49 1.49c-.524-.348-1.116-.602-1.753-.732V16h-2v2.101c-.637.13-1.229.384-1.753.732l-1.49-1.49-1.414 1.414 1.49 1.49c-.348.524-.602 1.116-.732 1.753H16v2h2.101c.13.637.384 1.229.732 1.753l-1.49 1.49 1.414 1.414 1.49-1.49c.524.348 1.116.602 1.753.732V30h2v-2.101c.637-.13 1.229-.384 1.753-.732l1.49 1.49 1.414-1.414-1.49-1.49c.348-.524.602-1.116.732-1.753H30zM23 26c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S24.654 26 23 26zM12 6H16V8H12z'
                ></path><path
                    d='M6,28V4h16v9h2V4c0-1.103-0.897-2-2-2H6C4.897,2,4,2.897,4,4v24c0,1.103,0.897,2,2,2h8v-2H6z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconIdentityService16;
