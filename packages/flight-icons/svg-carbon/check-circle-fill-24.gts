import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconCheckCircleFill24: TemplateOnlyComponent<CarbonIconSignature> =
    <template>
        {{#let (uniqueId) as |id|}}
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
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
                    d='M12,1C6,1,1,6,1,12s5,11,11,11s11-4.9,11-11S18.1,1,12,1z M10.4,16.3l-3.9-3.9l1.3-1.2l2.7,2.7l5.8-5.8l1.3,1.3L10.4,16.3z'
                ></path><path
                    fill='none'
                    d='M10.4,16.3l-3.9-3.9l1.3-1.2l2.7,2.7l5.8-5.8l1.3,1.3L10.4,16.3z'
                    data-icon-path='inner-path'
                    opacity='0'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconCheckCircleFill24;
