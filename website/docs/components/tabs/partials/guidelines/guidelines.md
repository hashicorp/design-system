## Usage

### When to use

- Allows users to move between different views within the same context.

### When not to use

- For navigation, consider navigation, [Standalone Links](/components/link/standalone), or [Breadcrumb](/components/breadcrumb).

### Usage examples

!!! Do

Use Tabs to break up content that is related to each other and is on the same hierarchical level.

![Modal Hierarchy in the user flow](/assets/components/tabs/tab-usage-example-01.png)
!!!

!!! Dont

Don't use Tabs to take the user to a new URL or as a primary or secondary navigation.

![Modal Hierarchy in the user flow](/assets/components/tabs/tab-usage-example-02.png)
!!!

!!! Dont

Don't use Tabs for sequential content.

![Modal Hierarchy in the user flow](/assets/components/tabs/tab-usage-example-03.png)
!!!

## Behavior

- Don’t use tabs with only one button. There should be at least two Tabs.

- Always keep the tabs in the same order. Only the content should change.

- One tab should be selected and its related content should be visible on page load.

- There should always be one tab that's already selected and its related content should be visible.

- Use Tabs when users don't need to see the content from multiple tabs at the same time. If users need to constantly view the content behind different tabs, consider using the Accordion.

## Spacing

### Contained

When the content area consists of a contained component (e.g., table, card, etc), we recommend:

- 24px above tabs
- 0px between the tabs and the content area
- Top & right border-radius of the content area be set to 0
- The content area should be flush on the left & right with the tabs

![Tabs contained spacing example](/assets/components/tabs/tabs-spacing-contained.png =587x*)

### Nested

!!! Warning

We don’t recommend using a nested tab structure, but if you must, don’t go beyond 2 levels of nesting. If finding that you need to go beyond 2 levels of nesting, consider using another navigation pattern or re-evaluating the information architecture of your product.
!!!

When nesting tabs, regardless of if your content area consists of contained or non-contained components; we recommend:

- 24px above each Tabs instance
- 16px between each Tabs instance and its corresponding content area
- Top & right border-radius of the content area be set to 0, if contained
- Each content area should be left indented by 16px

![Tabs nested spacing example](/assets/components/tabs/tabs-spacing-nested.png =500x*)

### Not contained

When the content area does not consist of a contained component (ie. text block, form, etc), we recommend:

- 24px above Tabs
- 16px between the Tabs and the content area
- The content area should be flush on the left & right with the Tabs, if only one level of tabs. If nested levels, see "Nested".

![Tabs not contained spacing example](/assets/components/tabs/tabs-spacing-not-contained.png =1150x*)

## Overflow

Tabs will fill 100% of the parent container, unless explicitly set to something else. When there are too many tabs to fit within the TabList, a horizontal scrollbar will help the user navigation hidden tabs.

<Hds::Tabs as |T|>
  <T.Tab>One one-thousand</T.Tab>
  <T.Tab>Two one-thousand</T.Tab>
  <T.Tab>Three one-thousand</T.Tab>
  <T.Tab>Four one-thousand</T.Tab>
  <T.Tab>Five one-thousand</T.Tab>
  <T.Tab>Six one-thousand</T.Tab>
  <T.Tab>Seven one-thousand</T.Tab>
  <T.Tab>Eight one-thousand</T.Tab>
  <T.Tab>Nine one-thousand</T.Tab>
  <T.Tab>Ten one-thousand</T.Tab>
  <T.Panel>Content one</T.Panel>
  <T.Panel>Content two</T.Panel>
  <T.Panel>Content three</T.Panel>
  <T.Panel>Content four</T.Panel>
  <T.Panel>Content five</T.Panel>
  <T.Panel>Content six</T.Panel>
  <T.Panel>Content seven</T.Panel>
  <T.Panel>Content eight</T.Panel>
  <T.Panel>Content nine</T.Panel>
  <T.Panel>Content ten</T.Panel>
</Hds::Tabs>

!!! Insight

Do you have a need for a more elegant overflow experience? Please let us know by [submitting a request](https://go.hashi.co/hds-support).
!!!

## Content

Tabs should be short and concise, and a good indication of what content the user can expect to find within the TabPanel. They should not consist of full sentences.