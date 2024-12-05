/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

export default class IndexController extends Controller {
  cards = [
    {
      title: 'Foundations',
      description:
        'Design decisions and guidance for colors, icons, typography, and more.',
      route: 'foundations',
    },
    {
      title: 'Content',
      description:
        'Structured guidelines on tone and voice, user communication and more.',
      route: 'content',
    },
    {
      title: 'Components',
      description:
        'Reusable building blocks to speed up your work and focus on your users.',
      route: 'components',
    },
    {
      title: 'Patterns',
      description:
        'Guidelines and best practices for consistent and scalable interfaces.',
      route: 'patterns',
    },
  ];
}
