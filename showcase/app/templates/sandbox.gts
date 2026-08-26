/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { array, hash } from '@ember/helper';
import { on } from '@ember/modifier';

import {
  HdsTable,
  HdsPaginationNumbered,
  HdsFormTextInputField,
  HdsButton,
} from '@hashicorp/design-system-components/components';

interface DataRow {
  id: number;
  name: string;
  role: string;
  status: string;
  location: string;
}

const ALL_ROWS: DataRow[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Engineer',
    status: 'Active',
    location: 'San Francisco',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Designer',
    status: 'Active',
    location: 'New York',
  },
  {
    id: 3,
    name: 'Carol White',
    role: 'Product Manager',
    status: 'Inactive',
    location: 'Austin',
  },
  {
    id: 4,
    name: 'David Brown',
    role: 'Engineer',
    status: 'Active',
    location: 'Seattle',
  },
  {
    id: 5,
    name: 'Eva Martinez',
    role: 'QA Engineer',
    status: 'Active',
    location: 'Denver',
  },
  {
    id: 6,
    name: 'Frank Lee',
    role: 'DevOps',
    status: 'Inactive',
    location: 'Chicago',
  },
  {
    id: 7,
    name: 'Grace Kim',
    role: 'Designer',
    status: 'Active',
    location: 'Los Angeles',
  },
  {
    id: 8,
    name: 'Henry Wilson',
    role: 'Engineer',
    status: 'Active',
    location: 'Boston',
  },
  {
    id: 9,
    name: 'Iris Chen',
    role: 'Data Analyst',
    status: 'Active',
    location: 'Portland',
  },
  {
    id: 10,
    name: 'Jake Taylor',
    role: 'Engineer',
    status: 'Inactive',
    location: 'Miami',
  },
  {
    id: 11,
    name: 'Karen Davis',
    role: 'Product Manager',
    status: 'Active',
    location: 'Atlanta',
  },
  {
    id: 12,
    name: 'Liam Anderson',
    role: 'DevOps',
    status: 'Active',
    location: 'Phoenix',
  },
  {
    id: 13,
    name: 'Mia Thomas',
    role: 'Designer',
    status: 'Active',
    location: 'Nashville',
  },
  {
    id: 14,
    name: 'Noah Garcia',
    role: 'Engineer',
    status: 'Inactive',
    location: 'Dallas',
  },
  {
    id: 15,
    name: 'Olivia Harris',
    role: 'QA Engineer',
    status: 'Active',
    location: 'Minneapolis',
  },
];

const PAGE_SIZE_DEFAULT = 5;

export default class Sandbox extends Component {
  @tracked _rows: DataRow[] = [...ALL_ROWS];
  @tracked _query = '';
  @tracked _currentPage = 1;
  @tracked _pageSize = PAGE_SIZE_DEFAULT;

  get filteredRows(): DataRow[] {
    const q = this._query.trim().toLowerCase();
    if (!q) return this._rows;
    return this._rows.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.role.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q) ||
        row.location.toLowerCase().includes(q),
    );
  }

  get pagedRows(): DataRow[] {
    const start = (this._currentPage - 1) * this._pageSize;
    return this.filteredRows.slice(start, start + this._pageSize);
  }

  get totalItems(): number {
    return this.filteredRows.length;
  }

  handleSearch = (event: Event) => {
    this._query = (event.target as HTMLInputElement).value;
    this._currentPage = 1;
  };

  handlePageChange = (page: number, pageSize: number) => {
    this._currentPage = page;
    if (pageSize !== undefined) {
      this._pageSize = pageSize;
    }
  };

  handlePageSizeChange = (size: number) => {
    this._pageSize = size;
    this._currentPage = 1;
  };

  removeRow = (id: number) => {
    this._rows = this._rows.filter((row) => row.id !== id);
    // Reset to page 1 if current page is now beyond total
    const maxPage = Math.max(
      1,
      Math.ceil(this.filteredRows.length / this._pageSize),
    );
    if (this._currentPage > maxPage) {
      this._currentPage = maxPage;
    }
  };

  <template>
    <div class="sandbox-page">
      <h1 class="sandbox-page__title">Team Members</h1>

      <div class="sandbox-page__toolbar">
        <HdsFormTextInputField
          @value={{this._query}}
          @type="search"
          @width="320px"
          {{on "input" this.handleSearch}}
          as |F|
        >
          <F.Label>Search</F.Label>
        </HdsFormTextInputField>
      </div>

      <HdsTable
        @model={{this.pagedRows}}
        @columns={{array
          (hash label="Name" key="name")
          (hash label="Role" key="role")
          (hash label="Status" key="status")
          (hash label="Location" key="location")
          (hash label="Actions")
        }}
      >
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.name}}</B.Td>
            <B.Td>{{B.data.role}}</B.Td>
            <B.Td>{{B.data.status}}</B.Td>
            <B.Td>{{B.data.location}}</B.Td>
            <B.Td>
              <HdsButton
                @text="Remove"
                @color="critical"
                @size="small"
                {{on "click" (fn this.removeRow B.data.id)}}
              />
            </B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <div class="sandbox-page__pagination">
        <HdsPaginationNumbered
          @totalItems={{this.totalItems}}
          @currentPage={{this._currentPage}}
          @pageSize={{this._pageSize}}
          @onPageChange={{this.handlePageChange}}
          @onPageSizeChange={{this.handlePageSizeChange}}
        />
      </div>
    </div>

    <style>
      .sandbox-page {
        padding: 24px 32px;
        max-width: 1100px;
        margin: 0 auto;
      }

      .sandbox-page__title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 20px;
        color: var(--token-color-foreground-strong);
      }

      .sandbox-page__toolbar {
        margin-bottom: 16px;
      }

      .sandbox-page__pagination {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
      }
    </style>
  </template>
}
