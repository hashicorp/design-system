import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconGitPullRequest16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    stroke-width='0'
                    d='M25 22.1421v-13.1421c0-2.2056-1.7944-4-4-4h-4.1719l2.5859-2.5859-1.4141-1.4141-5 5 5 5 1.4141-1.4141-2.5859-2.5859h4.1719c1.1028 0 2 .8975 2 2v13.1421c-1.7202.4473-3 1.9995-3 3.8579 0 2.2056 1.7944 4 4 4s4-1.7944 4-4c0-1.8584-1.2798-3.4106-3-3.8579zm-1 5.8579c-1.1028 0-2-.8975-2-2s.8972-2 2-2 2 .8975 2 2-.8972 2-2 2zM4 6c0 1.8584 1.2798 3.4106 3 3.8579v12.2842c-1.7202.447-3 1.9993-3 3.8579 0 2.2061 1.7944 4 4 4s4-1.7939 4-4c0-1.8586-1.2798-3.4109-3-3.8579v-12.2842c1.7202-.4473 3-1.9995 3-3.8579 0-2.2056-1.7944-4-4-4s-4 1.7944-4 4zm6 20c0 1.1025-.897 2-2 2s-2-.8975-2-2c0-1.1025.897-2 2-2s2 .8975 2 2zm0-20c0 1.103-.897 2-2 2s-2-.897-2-2c0-1.103.897-2 2-2s2 .897 2 2z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconGitPullRequest16;
