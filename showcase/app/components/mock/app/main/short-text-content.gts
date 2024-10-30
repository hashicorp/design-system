/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// HDS components
import {
  HdsLinkInline,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MockAppMainShortTextContentSignature {}

<template>
  <div class="mock-app-sample-content-text">
    <HdsTextBody @tag="p" @size="200">Lorem ipsum dolor sit amet, consectetur
      adipisicing elit.</HdsTextBody>
    <HdsTextBody @tag="p" @size="200">Excepturi
      <HdsLinkInline @href="#" @color="primary">aperiam a molestias quisquam</HdsLinkInline>
      sapiente alias corporis sit aliquid similique esse illum at itaque
      ducimus, eligendi eos.</HdsTextBody>
    <HdsTextBody @tag="p" @size="200">Iure dolor eos
      <HdsLinkInline @href="#" @color="secondary">cumque autem placeat</HdsLinkInline>
      pariatur voluptate deserunt quas, iste quo alias? Sequi, qui ipsa.</HdsTextBody>
    <HdsTextBody @tag="p" @size="200">Laborum, ipsa atque alias nostrum nihil
      repudiandae ratione inventore, qui impedit obcaecati facilis quaerat
      aliquam omnis consequuntur.</HdsTextBody>
    <HdsTextBody @tag="p" @size="200">Ab, deleniti vel. Optio consequuntur sint
      officiis distinctio dolorem nobis porro ipsum natus hic debitis nihil at
      nostrum, reiciendis exercitationem quod deserunt inventore, repellendus
      officia cum temporibus.</HdsTextBody>
    <HdsTextBody @tag="p" @size="200">Molestias voluptate magni earum unde
      officia illum doloribus facere natus molestiae quisquam nobis adipisci non
      distinctio quam asperiores saepe, ab veniam dolor animi sed accusamus
      nulla nam dolorem.</HdsTextBody>
    <HdsTextBody @tag="p" @size="200">Quos reprehenderit molestiae veritatis
      fugiat eligendi temporibus fuga modi, id recusandae dolor mollitia
      accusantium soluta cumque corporis ipsa tempore amet dolorum.</HdsTextBody>
  </div>
</template>
