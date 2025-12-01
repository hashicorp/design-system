import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconMinimizeAlt16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M2 9L2 10 5.3 10 1 14.3 1.7 15 6 10.7 6 14 7 14 7 9zM14 7L14 6 10.7 6 15 1.7 14.3 1 10 5.3 10 2 9 2 9 7z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconMinimizeAlt16;
