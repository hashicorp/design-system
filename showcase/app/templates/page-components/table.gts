// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq, not } from 'ember-truth-helpers';
import { pageTitle } from 'ember-page-title';

import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import MockTableCustomSorting from 'showcase/components/mock/components/table/custom-sorting';
import MockTableMultiSelect from 'showcase/components/mock/components/table/multi-select';
import MockTableBaseElements from 'showcase/components/mock/components/table/base-elements';

import {
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsIcon,
  HdsLinkInline,
  HdsTable,
} from '@hashicorp/design-system-components/components';

import type { PageComponentsTableModel } from 'showcase/routes/page-components/table';

export interface PageComponentsTableSignature {
  Args: {
    model: PageComponentsTableModel;
  };
  Element: HTMLElement;
}

export default class PageComponentsTable extends Component<PageComponentsTableSignature> {
  declare model: PageComponentsTableModel;

  <template>
    {{pageTitle "Table Component"}}

    <ShwTextH1>Table</ShwTextH1>

    <section data-test-percy>
      <ShwTextH2>Data model</ShwTextH2>

      <ShwTextH4 @tag="h3">Table with model</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist")
          (hash key="album" label="Album")
          (hash key="year" label="Release Year")
        }}
      >
        <:body as |B|>
          <B.Tr id={{B.rowIndex}}>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4 @tag="h3">Table with no model defined</ShwTextH4>

      <HdsTable @caption="a custom table with no model defined">
        <:head as |H|>
          <H.Tr>
            <H.Th>Cell Header</H.Th>
            <H.Th>Cell Header</H.Th>
            <H.Th @width="20%">Custom Width</H.Th>
          </H.Tr>
        </:head>
        <:body as |B|>
          <B.Tr>
            <B.Th>Scope Row</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwDivider />

      <ShwTextH2>Sorting</ShwTextH2>

      <ShwTextH3>Basic sorting</ShwTextH3>

      <ShwTextH4>Sortable table (all columns sortable)</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true)
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4>Sortable table (only some columns sortable)</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4>Sortable table, one column right-aligned</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true align="right")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4>Sortable table, some columns sortable, artist column
        pre-sorted.</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year")
        }}
        @sortBy="artist"
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwDivider @level={{2}} />

      <MockTableCustomSorting @model={{@model}} />

      <ShwDivider />

      <ShwTextH2>Tooltip</ShwTextH2>

      <ShwTextH4 @tag="h3">Table with model (sortable and non-sortable columns)</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash
            key="artist"
            label="Artist"
            isSortable=true
            tooltip="Artist performing the album"
          )
          (hash key="album" label="Album" tooltip="Name of the album")
          (hash
            key="vinyl-cost"
            label="Vinil Cost (USD)"
            isSortable=true
            tooltip="Cost of the vinyl"
            align="right"
          )
          (hash
            key="year"
            label="Release Year"
            tooltip="Year of release of the album"
            align="right"
          )
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.vinyl-cost}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4 @tag="h3">Table without model defined (sortable and
        non-sortable columns)</ShwTextH4>

      <ShwTextBody>⚠️
        <em>Notice: in this example the "sort" button doesn't work, is for
          presentation purpose only.</em></ShwTextBody>

      <HdsTable @caption="a custom table with no model defined">
        <:head as |H|>
          <H.Tr>
            <H.ThSort @tooltip="Column #1 extra information">Cell Header</H.ThSort>
            <H.Th @tooltip="Column #2 extra information">Cell Header</H.Th>
            <H.Th>Cell Header</H.Th>
          </H.Tr>
        </:head>
        <:body as |B|>
          <B.Tr>
            <B.Th
              @tooltip="This is an extra (non documented) case, made possible by the fact that the &lt;TableTh&gt; subcomponent is yielded in both the &lt;thead&gt; and the &lt;tbody&gt;"
            >Scope Row</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th>Scope row</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th>Scope row</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwDivider />

      <MockTableMultiSelect @model={{@model}} />

      <ShwDivider />

      <ShwTextH2>Table customization</ShwTextH2>

      <ShwTextH4 @tag="h3">Density</ShwTextH4>

      <ShwFlex @direction="column" @gap="2rem" as |SF|>
        {{#each @model.DENSITIES as |density|}}
          <SF.Item @label={{capitalize density}}>
            <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
              {{#let (array false true) as |booleans|}}
                {{#each booleans as |bool|}}
                  <SG.Item>
                    <HdsTable
                      @isSelectable={{bool}}
                      @density={{if (not (eq density "default")) density}}
                    >
                      <:head as |H|>
                        <H.Tr>
                          <H.Th>Lorem</H.Th>
                          <H.Th>Ipsum</H.Th>
                          <H.Th>Dolor</H.Th>
                        </H.Tr>
                      </:head>
                      <:body as |B|>
                        <B.Tr @selectionKey="row1">
                          <B.Th>Scope Row</B.Th>
                          <B.Td>Cell Content</B.Td>
                          <B.Td>Cell Content</B.Td>
                        </B.Tr>
                        <B.Tr @selectionKey="row2" @isSelected={{true}}>
                          <B.Th>Scope Row</B.Th>
                          <B.Td>Cell Content</B.Td>
                          <B.Td>Cell Content</B.Td>
                        </B.Tr>
                        <B.Tr @selectionKey="row3">
                          <B.Th>Scope Row</B.Th>
                          <B.Td>Cell Content</B.Td>
                          <B.Td>Cell Content</B.Td>
                        </B.Tr>
                        <B.Tr @selectionKey="row4">
                          <B.Th>Scope Row</B.Th>
                          <B.Td>Cell Content</B.Td>
                          <B.Td>Cell Content</B.Td>
                        </B.Tr>
                      </:body>
                    </HdsTable>
                  </SG.Item>
                {{/each}}
              {{/let}}
            </ShwGrid>
          </SF.Item>
        {{/each}}
      </ShwFlex>

      <ShwDivider @level={{2}} />

      <ShwTextH4 @tag="h3">Striping</ShwTextH4>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#let (array false true) as |booleans|}}
          {{#each booleans as |bool|}}
            <SG.Item>
              <HdsTable @isStriped={{true}} @isSelectable={{bool}}>
                <:head as |H|>
                  <H.Tr>
                    <H.Th>Lorem</H.Th>
                    <H.Th>Ipsum</H.Th>
                    <H.Th>Dolor</H.Th>
                  </H.Tr>
                </:head>
                <:body as |B|>
                  <B.Tr @selectionKey="row1">
                    <B.Th>Scope Row</B.Th>
                    <B.Td>Cell Content</B.Td>
                    <B.Td>Cell Content</B.Td>
                  </B.Tr>
                  <B.Tr @selectionKey="row2" @isSelected={{true}}>
                    <B.Th>Scope Row</B.Th>
                    <B.Td>Cell Content</B.Td>
                    <B.Td>Cell Content</B.Td>
                  </B.Tr>
                  <B.Tr @selectionKey="row3">
                    <B.Th>Scope Row</B.Th>
                    <B.Td>Cell Content</B.Td>
                    <B.Td>Cell Content</B.Td>
                  </B.Tr>
                  <B.Tr @selectionKey="row4">
                    <B.Th>Scope Row</B.Th>
                    <B.Td>Cell Content</B.Td>
                    <B.Td>Cell Content</B.Td>
                  </B.Tr>
                </:body>
              </HdsTable>
            </SG.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH4 @tag="h3">Sortable table, last column not sortable, visually
        hidden and with custom width.</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true)
          (hash
            key="other"
            label="Select an action from the menu"
            width="55px"
            isVisuallyHidden=true
          )
        }}
        @valign="middle"
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
            <B.Td @align="right">
              <HdsDropdown @isInline={{true}} as |dd|>
                <dd.ToggleIcon
                  @icon="more-horizontal"
                  @text="Overflow Options"
                  @hasChevron={{false}}
                  @size="small"
                />
                <dd.Interactive
                  @route="page-components.table"
                >Create</dd.Interactive>
                <dd.Interactive
                  @route="page-components.table"
                >Read</dd.Interactive>
                <dd.Interactive
                  @route="page-components.table"
                >Update</dd.Interactive>
                <dd.Separator />
                <dd.Interactive
                  @route="page-components.table"
                  @color="critical"
                  @icon="trash"
                >Delete</dd.Interactive>
              </HdsDropdown>
            </B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4 @tag="h3">Table where last column has right-aligned text</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true)
          (hash key="vinyl-cost" label="Vinyl Cost (USD)" align="right")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.vinyl-cost}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4 @tag="h3">Table with various cell content</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true)
          (hash key="other" label="Additional Actions")
        }}
      >
        <:body as |B|>
          <B.Tr>
            <B.Td>
              <HdsLinkInline @href="#showcase">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </HdsLinkInline>
            </B.Td>
            <B.Td>
              <div class="shw-component-table-cell-content-div">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.album}}
              </div>
            </B.Td>
            <B.Td>
              <HdsBadge
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                @text={{B.data.year}}
                @type="outlined"
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                @color={{B.data.badge-color}}
              />
            </B.Td>
            <B.Td>
              <HdsButtonSet>
                <HdsButton
                  @text="Add"
                  @isIconOnly={{true}}
                  @icon="plus"
                  @size="small"
                />
                <HdsButton
                  @text="Edit"
                  @isIconOnly={{true}}
                  @icon="edit"
                  @size="small"
                  @color="secondary"
                />
                <HdsButton
                  @text="Delete"
                  @isIconOnly={{true}}
                  @icon="trash"
                  @size="small"
                  @color="critical"
                />
              </HdsButtonSet>
            </B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4 @tag="h3">Table with multi-line content</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.music}}
        @caption="table with multi-line content"
        @columns={{array
          (hash key="artist" label="Artist")
          (hash key="album" label="Album")
          (hash key="quote" label="Quote" width="50%")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwDivider />

      <ShwTextH2>Layout</ShwTextH2>

      <ShwTextH3>Interaction between table layout and columns width</ShwTextH3>

      <ShwTextH4>Width in <code>px</code> + Table-layout = 'auto'</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.userMoreColumnsData}}
        @columns={{array
          (hash
            key="first_name" label="First Name" isSortable=true width="200px"
          )
          (hash key="last_name" label="Last Name" isSortable=true width="200px")
          (hash key="age" label="Age" isSortable=true align="right")
          (hash key="email" label="Email")
          (hash key="bio" label="Biography" width="350px")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.first_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.last_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.age}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.bio}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4>Width in <code>px</code> + Table-layout = 'fixed'</ShwTextH4>

      <ShwTextBody>⚠️
        <em>Notice: this example looks broken but we’ve left it on purpose to
          show what happens when a fixed layout is applied to the table, with
          only some columns having a width declared.</em></ShwTextBody>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.userMoreColumnsData}}
        @columns={{array
          (hash
            key="first_name" label="First Name" isSortable=true width="200px"
          )
          (hash key="last_name" label="Last Name" isSortable=true width="200px")
          (hash key="age" label="Age" isSortable=true align="right")
          (hash key="email" label="Email")
          (hash key="bio" label="Biography" width="350px")
        }}
        @isFixedLayout={{true}}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.first_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.last_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.age}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.bio}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4>Width in <code>%</code> + Table-layout = 'auto'</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.userMoreColumnsData}}
        @columns={{array
          (hash key="first_name" label="First Name" isSortable=true width="20%")
          (hash key="last_name" label="Last Name" isSortable=true width="20%")
          (hash key="age" label="Age" isSortable=true align="right")
          (hash key="email" label="Email")
          (hash key="bio" label="Biography" width="35%")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.first_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.last_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.age}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.bio}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwTextH4>Width in <code>%</code> + Table-layout = 'fixed'</ShwTextH4>

      <HdsTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{@model.userMoreColumnsData}}
        @columns={{array
          (hash key="first_name" label="First Name" isSortable=true width="20%")
          (hash key="last_name" label="Last Name" isSortable=true width="20%")
          (hash key="age" label="Age" isSortable=true align="right")
          (hash key="email" label="Email")
          (hash key="bio" label="Biography" width="35%")
        }}
        @isFixedLayout={{true}}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.first_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.last_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.age}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.bio}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Large table with overflowing container</ShwTextH3>

      <ShwTextH4>Container with overflow = 'auto' + Table-layout = 'auto' +
        Columns width (in
        <code>px</code>)</ShwTextH4>

      <div class="shw-component-table-scrollable-wrapper">
        <HdsTable
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{@model.userMoreColumnsData}}
          @columns={{array
            (hash
              key="first_name" label="First Name" isSortable=true width="200px"
            )
            (hash
              key="last_name" label="Last Name" isSortable=true width="200px"
            )
            (hash key="age" label="Age" isSortable=true align="right")
            (hash key="email" label="Email" isSortable=true)
            (hash key="phone" label="Phone" isSortable=true)
            (hash key="bio" label="Biography" width="350px")
            (hash key="education" label="Education Degree" isSortable=true)
            (hash key="occupation" label="Occupation" isSortable=true)
          }}
        >
          <:body as |B|>
            <B.Tr>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.first_name}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.last_name}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td @align="right">{{B.data.age}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.email}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.phone}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.bio}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.education}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.occupation}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </div>

      <ShwTextH4>Container with overflow = 'auto' + Sub-container with
        'max-content' width + Table-layout = 'auto' + Columns width (in
        <code>px</code>)</ShwTextH4>

      <div class="shw-component-table-scrollable-wrapper">
        <div class="shw-component-table-max-content-width">
          <HdsTable
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @model={{@model.userMoreColumnsData}}
            @columns={{array
              (hash
                key="first_name"
                label="First Name"
                isSortable=true
                width="200px"
              )
              (hash
                key="last_name" label="Last Name" isSortable=true width="200px"
              )
              (hash key="age" label="Age" isSortable=true align="right")
              (hash key="email" label="Email" isSortable=true)
              (hash key="phone" label="Phone" isSortable=true)
              (hash key="bio" label="Biography" width="350px")
              (hash key="education" label="Education Degree" isSortable=true)
              (hash key="occupation" label="Occupation" isSortable=true)
            }}
          >
            <:body as |B|>
              <B.Tr>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td>{{B.data.first_name}}</B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td>{{B.data.last_name}}</B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td @align="right">{{B.data.age}}</B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td>{{B.data.email}}</B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td>{{B.data.phone}}</B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td>{{B.data.bio}}</B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td>{{B.data.education}}</B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <B.Td>{{B.data.occupation}}</B.Td>
              </B.Tr>
            </:body>
          </HdsTable>
        </div>
      </div>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Table with <code>colspan/rowspan</code> attributes</ShwTextH3>

      <HdsTable>
        <:head as |H|>
          <H.Tr>
            <H.Th>Lorem</H.Th>
            <H.Th>Ipsum</H.Th>
            <H.Th>Dolor</H.Th>
            <H.Th>Sit amet</H.Th>
          </H.Tr>
        </:head>
        <:body as |B|>
          <B.Tr>
            <B.Th rowspan="3">Scope Row with rowspan="3"</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Td colspan="2">Cell Content with colspan="2"</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Td colspan="3">Cell Content with colspan="3"</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th rowspan="2">Scope Row with rowspan="2"</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td rowspan="3">Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th>Scope Row</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
          <B.Tr>
            <B.Th>Scope Row</B.Th>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
            <B.Td>Cell Content</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <ShwDivider />

      <MockTableBaseElements @model={{@model}} />
    </section>
  </template>
}
