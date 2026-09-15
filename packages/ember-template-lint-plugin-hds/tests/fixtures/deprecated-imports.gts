import {
  HdsAdvancedTable as DataGrid,
  HdsAdvancedTableTh as HeaderCell,
  HdsFlyoutDescription as OldDescription,
  HdsModalHeader as OldHeader,
} from '@hashicorp/design-system-components/components';

const Unrelated = {};

<template>
  <OldHeader>Title</OldHeader>
  <OldDescription>Description</OldDescription>
  <HeaderCell @isVisuallyHidden={{true}}>Actions</HeaderCell>
  <DataGrid as |Grid|><Grid.Th @isVisuallyHidden={{true}}>Name</Grid.Th></DataGrid>
  <Unrelated.Header @isVisuallyHidden={{true}}>Other</Unrelated.Header>
</template>
