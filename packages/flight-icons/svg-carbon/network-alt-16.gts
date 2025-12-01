import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconNetworkAlt16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M30 30H22V22h8zm-6-2h4V24H24zM20 27H8A6 6 0 018 15h2v2H8a4 4 0 000 8H20z'
                ></path><path d='M20,20H12V12h8Zm-6-2h4V14H14Z'></path><path
                    d='M24 17H22V15h2a4 4 0 000-8H12V5H24a6 6 0 010 12zM10 10H2V2h8zM4 8H8V4H4z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconNetworkAlt16;
