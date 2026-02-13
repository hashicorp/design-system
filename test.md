diff --git a/packages/components/src/components/hds/advanced-table/th-reorder-drop-target.ts b/packages/components/src/components/hds/advanced-table/th-reorder-drop-target.ts
index 835e39a2b..c51a1ecb1 100644
--- a/packages/components/src/components/hds/advanced-table/th-reorder-drop-target.ts
+++ b/packages/components/src/components/hds/advanced-table/th-reorder-drop-target.ts
@@ -11,19 +11,32 @@ import { BORDER_WIDTH } from './index.ts';
 import { requestAnimationFrameWaiter } from './utils.ts';
 import { HdsAdvancedTableColumnReorderSideValues } from './types.ts';
 
-import type HdsAdvancedTableColumn from './models/column.ts';
-import type { HdsAdvancedTableColumnReorderSide } from './types.ts';
+import type {
+  HdsAdvancedTableNormalizedColumn,
+  HdsAdvancedTableColumnReorderSide,
+} from './types.ts';
 import type { HdsAdvancedTableSignature } from './index.ts';
 
 export interface HdsAdvancedTableThReorderDropTargetSignature {
   Args: {
-    column: HdsAdvancedTableColumn;
+    column?: HdsAdvancedTableNormalizedColumn;
+    draggedColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
+    isFirstColumn: boolean;
+    isLastColumn: boolean;
     hasSelectableRows?: HdsAdvancedTableSignature['Args']['isSelectable'];
+    reorderHoveredColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
+    siblingColumnKeys?: {
+      previous?: HdsAdvancedTableNormalizedColumn['key'];
+      next?: HdsAdvancedTableNormalizedColumn['key'];
+    };
     tableHeight?: number;
     onReorderDrop?: (
-      column: HdsAdvancedTableColumn,
+      columnKey: HdsAdvancedTableNormalizedColumn['key'],
       side: HdsAdvancedTableColumnReorderSide
     ) => void;
+    onSetReorderHoveredColumnKey?: (
+      key: HdsAdvancedTableNormalizedColumn['key'] | null
+    ) => void;
   };
   Blocks: {
     default?: [];
@@ -54,24 +67,30 @@ export default class HdsAdvancedTableThReorderDropTarget extends Component<HdsAd
       : HdsAdvancedTableColumnReorderSideValues.Right;
   }
 
+  get isBeingDragged(): boolean {
+    const { column, draggedColumnKey } = this.args;
+
+    return column !== undefined && column.key === draggedColumnKey;
+  }
+
   get isDraggingOver(): boolean {
-    const { table } = this.args.column;
+    const { column, reorderHoveredColumnKey } = this.args;
 
-    return table.reorderHoveredColumn?.key === this.args.column.key;
+    return column !== undefined && column.key === reorderHoveredColumnKey;
   }
 
   get classNames(): string {
-    const { column } = this.args;
+    const { isFirstColumn, isLastColumn } = this.args;
 
     const classes = ['hds-advanced-table__th-reorder-drop-target'];
 
-    if (column.isFirst && !this.args.hasSelectableRows) {
+    if (isFirstColumn && !this.args.hasSelectableRows) {
       classes.push('hds-advanced-table__th-reorder-drop-target--is-first');
-    } else if (column.isLast) {
+    } else if (isLastColumn) {
       classes.push('hds-advanced-table__th-reorder-drop-target--is-last');
     }
 
-    if (column.isBeingDragged) {
+    if (this.isBeingDragged) {
       classes.push(
         'hds-advanced-table__th-reorder-drop-target--is-being-dragged'
       );
@@ -108,24 +127,32 @@ export default class HdsAdvancedTableThReorderDropTarget extends Component<HdsAd
     this._isUpdateQueued = true;
 
     requestAnimationFrameWaiter(() => {
-      const { column } = this.args;
-      const { table } = column;
+      const {
+        column,
+        draggedColumnKey,
+        siblingColumnKeys,
+        onSetReorderHoveredColumnKey,
+      } = this.args;
+
+      if (column === undefined || onSetReorderHoveredColumnKey === undefined) {
+        return;
+      }
 
-      if (table.reorderDraggedColumn !== null) {
-        if (table.reorderDraggedColumn.key === column.key) {
-          table.reorderHoveredColumn = null;
+      if (draggedColumnKey !== null) {
+        if (this.isBeingDragged) {
+          onSetReorderHoveredColumnKey(null);
         } else {
-          table.reorderHoveredColumn = column;
+          onSetReorderHoveredColumnKey(column.key);
 
-          const { next, previous } = table.reorderDraggedColumn.siblings;
+          const { next, previous } = siblingColumnKeys ?? {};
           const dragSide = this._getDragSide(event);
 
           if (
-            (column === previous &&
+            (column.key === previous &&
               dragSide === HdsAdvancedTableColumnReorderSideValues.Left) ||
-            (column === next &&
+            (column.key === next &&
               dragSide === HdsAdvancedTableColumnReorderSideValues.Right) ||
-            (column !== previous && column !== next)
+            (column.key !== previous && column.key !== next)
           ) {
             this._dragSide = dragSide;
           }
@@ -140,20 +167,22 @@ export default class HdsAdvancedTableThReorderDropTarget extends Component<HdsAd
   handleDrop(event: DragEvent): void {
     event.preventDefault();
 
-    const { column, onReorderDrop } = this.args;
+    const { column, onReorderDrop, onSetReorderHoveredColumnKey } = this.args;
     const { _dragSide } = this;
 
     if (
       column === undefined ||
       _dragSide === null ||
-      typeof onReorderDrop !== 'function'
+      typeof onReorderDrop !== 'function' ||
+      typeof onSetReorderHoveredColumnKey !== 'function'
     ) {
       return;
     }
 
-    onReorderDrop(column, _dragSide);
+    onReorderDrop(column.key, _dragSide);
 
     this._dragSide = null;
-    column.table.reorderHoveredColumn = null;
+
+    onSetReorderHoveredColumnKey(null);
   }
 }
