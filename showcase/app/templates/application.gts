/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array, hash, get } from '@ember/helper';
import { and, eq } from 'ember-truth-helpers';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import ShwLogoDesignSystem from 'showcase/components/shw/logo/design-system';
import { scheduleOnce } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

const columns = [
  {
    key: 'workspaceName',
    label: 'Name',
    width: 'minmax(200px, auto)',
    type: 'string',
    link: {
      route: 'v2.organization.workspaces.workspace',
      internalLink: {
        modelKeys: ['workspaceName'],
      },
    },
    isSortable: true,
  },
  {
    key: 'projectName',
    label: 'Project name',
    width: 'minmax(200px, auto)',
    type: 'string',
    link: {
      route: 'v2.organization.projects.project.show',
      internalLink: {
        modelKeys: ['projectExternalId'],
      },
    },
    isSortable: true,
  },
  {
    key: 'currentRunExternalId',
    label: 'Current run ID',
    width: 'minmax(200px, auto)',
    type: 'string',
    link: {
      route: 'v2.organization.workspaces.workspace.runs.show',
      internalLink: {
        modelKeys: ['workspaceName', 'currentRunExternalId'],
      },
    },
    isSortable: true,
  },
  {
    key: 'currentRunStatus',
    label: 'Run status',
    width: 'minmax(150px, auto)',
    type: 'string',
    isSortable: true,
  },
  {
    key: 'currentRunAppliedAt',
    label: 'Current run applied',
    width: 'minmax(220px, auto)',
    type: 'date',
    dateTime: true,
    isSortable: true,
  },
  {
    key: 'vcsRepoIdentifier',
    label: 'VCS repo',
    width: 'minmax(150px, auto)',
    type: 'string',
    isSortable: true,
  },
  {
    key: 'moduleCount',
    label: 'Module count',
    width: 'minmax(150px, auto)',
    type: 'number',
    link: {
      route: 'v2.organization.explorer.type',
      internalLink: {
        typeName: 'Modules',
      },
      query: {
        type: 'modules',
        sort: null,
        fields: null,
        filter: [
          {
            workspaces: {
              contains: ['workspaceName'],
            },
          },
        ],
      },
    },
    isSortable: true,
  },
  {
    key: 'modules',
    label: 'Modules',
    width: 'minmax(150px, auto)',
    list: true,
    type: 'string',
    isSortable: true,
  },
  {
    key: 'providerCount',
    label: 'Provider count',
    width: 'minmax(150px, auto)',
    type: 'number',
    link: {
      route: 'v2.organization.explorer.type',
      internalLink: {
        typeName: 'Providers',
      },
      query: {
        type: 'providers',
        sort: null,
        fields: null,
        filter: [
          {
            workspaces: {
              contains: ['workspaceName'],
            },
          },
        ],
      },
    },
    isSortable: true,
  },
  {
    key: 'providers',
    label: 'Providers',
    width: 'minmax(150px, auto)',
    list: true,
    type: 'string',
    isSortable: true,
  },
  {
    key: 'workspaceTerraformVersion',
    label: 'Terraform version',
    width: 'minmax(150px, auto)',
    type: 'string',
    isSortable: true,
  },
  {
    key: 'drifted',
    label: 'Drifted',
    width: 'minmax(150px, auto)',
    requiresCanManageAssessments: true,
    type: 'boolean',
    isSortable: true,
  },
  {
    key: 'allChecksSucceeded',
    label: 'Health checks succeeded',
    width: 'minmax(150px, auto)',
    requiresCanManageAssessments: true,
    type: 'boolean',
    isSortable: true,
  },
  {
    key: 'checksPassed',
    label: 'Health checks passed',
    width: 'minmax(150px, auto)',
    requiresCanManageAssessments: true,
    type: 'number',
    isSortable: true,
  },
  {
    key: 'checksFailed',
    label: 'Health checks failed',
    width: 'minmax(150px, auto)',
    requiresCanManageAssessments: true,
    type: 'number',
    isSortable: true,
  },
  {
    key: 'checksErrored',
    label: 'Health checks errored',
    width: 'minmax(150px, auto)',
    requiresCanManageAssessments: true,
    type: 'number',
    isSortable: true,
  },
  {
    key: 'resourcesDrifted',
    label: 'Resources drifted',
    width: 'minmax(150px, auto)',
    requiresCanManageAssessments: true,
    type: 'number',
    isSortable: true,
  },
  {
    key: 'resourcesUndrifted',
    label: 'Resources undrifted',
    width: 'minmax(150px, auto)',
    requiresCanManageAssessments: true,
    type: 'number',
    isSortable: true,
  },
  {
    key: 'stateVersionTerraformVersion',
    label: 'State Terraform version',
    width: 'minmax(150px, auto)',
    type: 'string',
    link: {
      route: 'v2.organization.explorer.type',
      internalLink: {
        typeName: 'Terraform Versions',
      },
      query: {
        type: 'tf_versions',
        sort: null,
        fields: null,
        filter: [
          {
            workspaces: {
              contains: ['workspaceName'],
            },
          },
        ],
      },
    },
    isSortable: true,
  },
  {
    key: 'currentRumCount',
    label: 'Current RUM count',
    width: 'minmax(140px, auto)',
    type: 'number',
    isSortable: true,
  },
  {
    key: 'workspaceCreatedAt',
    label: 'Created',
    width: 'minmax(140px, auto)',
    type: 'date',
    isSortable: true,
  },
  {
    key: 'workspaceUpdatedAt',
    label: 'Updated',
    width: 'minmax(140px, auto)',
    type: 'date',
    isSortable: true,
  },
];

const serializedData = [
  {
    id: 'ws-0',
    allChecksSucceeded: true,
    currentRumCount: 1,
    checksPassed: 180,
    checksFailed: 20,
    checksErrored: 126,
    currentRunExternalId: 'run-0Yks9WCFeD9xRTWo',
    currentRunStatus: 'applied',
    currentRunAppliedAt: '2025-11-10T16:09:10.460Z',
    drifted: true,
    moduleCount: 83,
    modules: 'setne-cukej-ug',
    organizationName: 'modern-bank-0',
    projectExternalId: 'prj-0Yks9WCFeD9xRTWo',
    projectName: 'ibhit lifemaf vozede',
    providers: 'opzuhes-mukceup-daw',
    providerCount: 23,
    resourcesDrifted: 14,
    resourcesUndrifted: 102,
    stateVersionTerraformVersion: '0.15.0',
    tags: null,
    workspaceName: 'luj-ikafuwa-daw',
    workspaceCreatedAt: '2025-11-10T16:09:10.460Z',
    workspaceUpdatedAt: '2025-11-10T16:09:10.460Z',
    workspaceTerraformVersion: '0.14.0',
    vcsRepoIdentifier: 'example/AR5zIJEK0fd*L0',
    type: 'visibility-workspaces',
  },
  {
    id: 'ws-1',
    allChecksSucceeded: false,
    currentRumCount: 52,
    checksPassed: 135,
    checksFailed: 65,
    checksErrored: 45,
    currentRunExternalId: 'run-1Yks9WCFeD9xRTWo',
    currentRunStatus: 'applied',
    currentRunAppliedAt: '2025-11-10T16:08:10.460Z',
    drifted: false,
    moduleCount: 38,
    modules: 'setne-cukej-ug',
    organizationName: 'modern-bank-0',
    projectExternalId: 'prj-1Yks9WCFeD9xRTWo',
    projectName: 'wih fasgerove tuhgenit',
    providers: 'opzuhes-mukceup-daw',
    providerCount: 89,
    resourcesDrifted: 113,
    resourcesUndrifted: 10,
    stateVersionTerraformVersion: '0.15.0',
    tags: null,
    workspaceName: 'lelib-irakaz-uviuku',
    workspaceCreatedAt: '2025-11-09T16:09:10.460Z',
    workspaceUpdatedAt: '2025-11-09T16:09:10.460Z',
    workspaceTerraformVersion: '0.14.0',
    vcsRepoIdentifier: 'example/mXuRe@]*V1',
    type: 'visibility-workspaces',
  },
  {
    id: 'ws-2',
    allChecksSucceeded: false,
    currentRumCount: 183,
    checksPassed: 137,
    checksFailed: 63,
    checksErrored: 110,
    currentRunExternalId: 'run-2Yks9WCFeD9xRTWo',
    currentRunStatus: 'planned',
    currentRunAppliedAt: '2025-11-10T16:07:10.460Z',
    drifted: false,
    moduleCount: 111,
    modules: 'setne-cukej-ug',
    organizationName: 'modern-bank-0',
    projectExternalId: 'prj-2Yks9WCFeD9xRTWo',
    projectName: 'cu dewih useso',
    providers: 'opzuhes-mukceup-daw',
    providerCount: 138,
    resourcesDrifted: 2,
    resourcesUndrifted: 4,
    stateVersionTerraformVersion: '0.15.0',
    tags: null,
    workspaceName: 'reje-bizwawbob-fapfasbe',
    workspaceCreatedAt: '2025-11-08T16:09:10.460Z',
    workspaceUpdatedAt: '2025-11-08T16:09:10.460Z',
    workspaceTerraformVersion: '0.14.0',
    vcsRepoIdentifier: 'example/^kKZQ7E@v2',
    type: 'visibility-workspaces',
  },
  {
    id: 'ws-3',
    allChecksSucceeded: true,
    currentRumCount: 187,
    checksPassed: 62,
    checksFailed: 138,
    checksErrored: 156,
    currentRunExternalId: 'run-3Yks9WCFeD9xRTWo',
    currentRunStatus: 'assessed',
    currentRunAppliedAt: '2025-11-10T16:06:10.460Z',
    drifted: false,
    moduleCount: 55,
    modules: 'setne-cukej-ug',
    organizationName: 'modern-bank-0',
    projectExternalId: 'prj-3Yks9WCFeD9xRTWo',
    projectName: 'bufih hagrol sa',
    providers: 'opzuhes-mukceup-daw',
    providerCount: 178,
    resourcesDrifted: 129,
    resourcesUndrifted: 174,
    stateVersionTerraformVersion: '0.15.0',
    tags: null,
    workspaceName: 'zugcizdig-opzefa-fuh',
    workspaceCreatedAt: '2025-11-07T16:09:10.460Z',
    workspaceUpdatedAt: '2025-11-07T16:09:10.460Z',
    workspaceTerraformVersion: '0.14.0',
    vcsRepoIdentifier: 'example/o*#p5ovcMoHaEA6gsg3',
    type: 'visibility-workspaces',
  },
  {
    id: 'ws-4',
    allChecksSucceeded: true,
    currentRumCount: 36,
    checksPassed: 9,
    checksFailed: 191,
    checksErrored: 173,
    currentRunExternalId: 'run-4Yks9WCFeD9xRTWo',
    currentRunStatus: 'assessed',
    currentRunAppliedAt: '2025-11-10T16:05:10.460Z',
    drifted: false,
    moduleCount: 136,
    modules: 'setne-cukej-ug',
    organizationName: 'modern-bank-0',
    projectExternalId: 'prj-4Yks9WCFeD9xRTWo',
    projectName: 'geofjan ilarevhi kuwlun',
    providers: 'opzuhes-mukceup-daw',
    providerCount: 194,
    resourcesDrifted: 106,
    resourcesUndrifted: 107,
    stateVersionTerraformVersion: '0.15.0',
    tags: null,
    workspaceName: 'hiifci-itumo-fe',
    workspaceCreatedAt: '2025-11-06T16:09:10.460Z',
    workspaceUpdatedAt: '2025-11-06T16:09:10.460Z',
    workspaceTerraformVersion: '0.14.0',
    vcsRepoIdentifier: 'example/2ZUo^!T58Gkk4',
    type: 'visibility-workspaces',
  },
];

export default class Application extends Component {
  enableStickyColumn = true;
  @tracked columns = columns;
  @tracked serializedData = serializedData;

  constructor() {
    super(...arguments);

    scheduleOnce('afterRender', () => {
      this.columns = columns
      this.serializedData = serializedData;
    });
  }

  <template>
    <HdsAdvancedTable
      @model={{this.serializedData}}
      @columns={{this.columns}}
      @isStriped={{true}}
      @isSelectable={{true}}
      @hasStickyFirstColumn={{this.enableStickyColumn}}
      data-test-explorer-table
    >
      <:body as |B|>
        <B.Tr @selectionKey={{B.data.id}} data-test-explorer-row>
          {{#each this.columns as |column index|}}
            {{#let (get B.data column.key) as |value|}}
              {{#if (and (eq index 0) this.enableStickyColumn)}}
                <B.Th>
                  {{value}}
                </B.Th>
              {{else}}
                <B.Td>
                  {{value}}
                </B.Td>
              {{/if}}
            {{/let}}
          {{/each}}
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
