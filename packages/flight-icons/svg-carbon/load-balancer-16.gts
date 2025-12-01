import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconLoadBalancer16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M4 26H8V30H4zM14 26H18V30H14zM24 26H28V30H24zM25 16H17V12H15v4H7a2.0023 2.0023 0 00-2 2v6H7V18h8v6h2V18h8v6h2V18A2.0023 2.0023 0 0025 16zM20 10V2H12v8zM14 8V4h4V8z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconLoadBalancer16;
