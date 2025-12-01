import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconRepeat24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M6 6H26.1719l-3.586-3.5859L24 1l6 6-6 6-1.4141-1.4141L26.1719 8H6v7H4V8A2.0024 2.0024 0 016 6zM9.4141 20.4141L5.8281 24H26V17h2v7a2.0024 2.0024 0 01-2 2H5.8281L9.414 29.5859 8 31 2 25l6-6z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconRepeat24;
