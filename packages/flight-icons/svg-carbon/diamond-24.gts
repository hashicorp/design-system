import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconDiamond24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    stroke-width='0'
                    d='m29.3906,14.5269L17.4731,2.6094c-.406-.4062-.9397-.6094-1.4731-.6094s-1.0671.2031-1.4731.6094L2.6094,14.5269c-.4062.4062-.6094.9395-.6094,1.4731s.2031,1.0669.6094,1.4731l11.9175,11.9175c.406.4062.9397.6094,1.4731.6094s1.0671-.2031,1.4731-.6094l11.9175-11.9175c.4062-.4062.6094-.9395.6094-1.4731s-.2031-1.0669-.6094-1.4731Zm-13.3906,13.5088L3.9646,16,16,3.9644l12.0356,12.0356-12.0356,12.0356Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconDiamond24;
