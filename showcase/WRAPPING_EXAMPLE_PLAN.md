# FilterBar Wrapping Example Implementation Plan

## Overview
Create a new "Wrapping" example at the top of the FilterBar showcase that demonstrates wrapping behavior with 5 quick filter buttons in the generic slot.

## Implementation Steps

### 1. Create New Code Fragment Component

**File:** `/Users/jorytindall/projects/hds/design-system/showcase/app/components/page-components/filter-bar/code-fragments/with-wrapping.gts`

**Component Structure:**
```typescript
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsButton,
  HdsFilterBar,
} from '@hashicorp/design-system-components/components';

const CodeFragmentWithWrapping: TemplateOnlyComponent = <template>
  <HdsFilterBar as |F|>
    <F.Generic>
      <HdsButton
        @text="101 Needs attention"
        @icon="alert-circle"
        @iconPosition="leading"
        @color="secondary"
        @size="small"
      />
      <HdsButton
        @text="32 Errored"
        @icon="x-circle"
        @iconPosition="leading"
        @color="secondary"
        @size="small"
      />
      <HdsButton
        @text="41 Running"
        @icon="running"
        @iconPosition="leading"
        @color="secondary"
        @size="small"
      />
      <HdsButton
        @text="4 On hold"
        @icon="pause-circle"
        @iconPosition="leading"
        @color="secondary"
        @size="small"
      />
      <HdsButton
        @text="200 Completed"
        @icon="check-circle"
        @iconPosition="leading"
        @color="secondary"
        @size="small"
      />
    </F.Generic>
  </HdsFilterBar>
</template>;

export default CodeFragmentWithWrapping;
```

### 2. Update Demos Section

**File:** `/Users/jorytindall/projects/hds/design-system/showcase/app/components/page-components/filter-bar/sub-sections/demos.gts`

**Changes Required:**
1. Add import for the new component at the top:
   ```typescript
   import CodeFragmentWithWrapping from 'showcase/components/page-components/filter-bar/code-fragments/with-wrapping';
   ```

2. Add the new section at the beginning of the template (after `<ShwTextH2>Demos</ShwTextH2>`):
   ```handlebars
   <ShwTextH3>Wrapping</ShwTextH3>

   <CodeFragmentWithWrapping />

   <ShwDivider @level={{2}} />
   ```

**Complete Updated Template Structure:**
```typescript
const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwTextH3>Wrapping</ShwTextH3>

  <CodeFragmentWithWrapping />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Basic implementation</ShwTextH3>

  <CodeFragmentWithTable />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Live filtering</ShwTextH3>

  <CodeFragmentWithTable @isLiveFilter={{true}} />

  <ShwDivider @level={{2}} />

  <ShwTextH3>All filter types</ShwTextH3>

  <CodeFragmentWithComplexTable />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Generic filters</ShwTextH3>

  <CodeFragmentWithGenericFilters />

  <ShwDivider @level={{2}} />

  <ShwFrame
    @id="demo-filtering"
    @src="/components/advanced-table/frameless/demo-filtering"
    @height="780"
    @label="AdvancedTable with FilterBar in the context of a full App Frame"
  />

  <ShwDivider />
</template>;
```

## Icon Mapping Rationale

| Button Text | Icon | Reasoning |
|-------------|------|-----------|
| "101 Needs attention" | `alert-circle` | Indicates items requiring attention/review |
| "32 Errored" | `x-circle` | Represents error/failure state |
| "41 Running" | `running` | Shows active/in-progress state |
| "4 On hold" | `pause-circle` | Indicates paused/waiting state |
| "200 Completed" | `check-circle` | Represents successful completion |

## Component Specifications

### Button Configuration
- **Variant:** Secondary (`@color="secondary"`)
- **Size:** Small (`@size="small"`)
- **Icon Position:** Leading (`@iconPosition="leading"`)
- **Icons:** From `@hashicorp/flight-icons` library

### FilterBar Configuration
- Uses the `F.Generic` slot for custom content
- No filters or dropdown functionality needed
- Buttons are purely presentational for wrapping demonstration

## Testing Considerations

After implementation, verify:
1. All 5 buttons render correctly with icons
2. Buttons wrap appropriately when viewport is narrow
3. Icons are positioned to the left of text
4. Secondary styling is applied correctly
5. Small size is consistent across all buttons
6. Component follows existing showcase patterns

## Next Steps for User

After switching to `code` mode:
1. Create the `with-wrapping.gts` component file
2. Update the `demos.gts` file with the new import and section
3. Test the implementation in the showcase app
4. Explore different wrapping variations as needed
