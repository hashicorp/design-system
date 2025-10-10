/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import PaginationIndex from 'showcase/components/page-components/pagination/index';

import PageComponentsPaginationController from 'showcase/controllers/page-components/pagination';

interface PaginationIndexSignature {
  Args: {
    model: unknown;
    controller: PageComponentsPaginationController;
  };
}

const PageComponentsPagination: TemplateOnlyComponent<PaginationIndexSignature> =
  <template><PaginationIndex @controller={{@controller}} /></template>;

export default PageComponentsPagination;
