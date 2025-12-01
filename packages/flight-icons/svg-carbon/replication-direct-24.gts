import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconReplicationDirect24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M28 8h2V4a2.0021 2.0021 0 00-2-2H24V4h4zM17 2H21V4H17zM28 11H30V15H28zM28 18v4H24V10a2.0023 2.0023 0 00-2-2H10V4h4V2H10A2.0023 2.0023 0 008 4V8H4a2.0023 2.0023 0 00-2 2V28a2.0023 2.0023 0 002 2H22a2.0023 2.0023 0 002-2V24h4a2.0023 2.0023 0 002-2V18zM22 28H4V10H22z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconReplicationDirect24;
