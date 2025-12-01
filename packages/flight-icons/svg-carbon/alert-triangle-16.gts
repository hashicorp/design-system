import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconAlertTriangle16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M14.5,14h-13c-0.2,0-0.3-0.1-0.4-0.2c-0.1-0.2-0.1-0.3,0-0.5l6.5-12C7.7,1,8,0.9,8.2,1.1c0.1,0,0.2,0.1,0.2,0.2l6.5,12	c0.1,0.2,0.1,0.3,0,0.5C14.9,13.9,14.7,14,14.5,14z M2.3,13h11.3L8,2.5L2.3,13z'
                ></path><path
                    d='M7.5 6H8.5V9.5H7.5zM8 10.8c-.4 0-.8.3-.8.8s.3.8.8.8c.4 0 .8-.3.8-.8S8.4 10.8 8 10.8z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconAlertTriangle16;
