import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconGitCommit16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M30,15H21.91A5.9925,5.9925,0,0,0,10.09,15H2v2h8.09A5.9925,5.9925,0,0,0,21.91,17H30ZM16,20a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,20Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconGitCommit16;
