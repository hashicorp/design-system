import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconPlug16: TemplateOnlyComponent<CarbonIconSignature> = <template>
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
                d='M22,8H21V2H19V8H13V2H11V8H10a2,2,0,0,0-2,2v6a8.0073,8.0073,0,0,0,7,7.9307V30h2V23.9307A8.0073,8.0073,0,0,0,24,16V10A2,2,0,0,0,22,8Zm0,8a6,6,0,0,1-12,0V10H22Z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconPlug16;
