## Spacing

### Contained

When the content area consists of a contained component (ie. table, card, etc), we recommend:

- 24px above tabs
- **0px between the tabs and the content area**
- top & right border-radius of the content area be set to 0
- the content area should be flush on the left & right with the tabs

![Tabs contained spacing example](/assets/components/tabs/tabs-spacing-contained.png)

### Nested

!!! Warning

We don’t recommend using a nested tab structure, but if you must, don’t go beyond 2 levels of nesting. If finding that you need to go beyond 2 levels of nesting, consider using another navigation pattern or re-evaluating the information architecture of your product.

!!!

when nesting tabs, regardless of if your content area consists of contained or non-contained components; we recommed:

- 24px above each Tabs instance
- 16px between each Tabs instance and its corresponding content area
- top & right border-radius of the content area be set to 0 (if contained)
- each content area should be left indented by 16px

![Tabs nested spacing example](/assets/components/tabs/tabs-spacing-nested.png)

### Not contained

When the content area does not consist of a contained component (ie. text block, form, etc), we recommend:

- 24px above Tabs
- **16px between the Tabs and the content area**
- the content area should be flush on the left & right with the Tabs, **if only 1 level of tabs.** If nested levels, see "Nested".

![Tabs not contained spacing example](/assets/components/tabs/tabs-spacing-not_contained.png)

---

## Overflow

Tabs will fill 100% of the parent container, unless explicitly set to something else. When there are too many tabs to fit within the TabList, a horizontal scrollbar will help the user navigation hiddne tabs.

!!! Info

Do you have a need for a more elegant overflow experience? Please let us know by [submitting a request](https://docs.google.com/forms/d/e/1FAIpQLScpMXgrUTVT5fYriu4Pp48r4Nl_eCPluVnJLg0Yg3NXsRWvIA/viewform)

!!!

---

## Content

Tabs should be short and concise, and a good indication of what content the user can expect to find within the TabPanel. They should not consist of full sentences.

Refer to [HashiCorp’s Style, Language, and Voice Guidelines](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?usp=sharing) for more content tips.

---

### Keyboard navigation

Focus

<Hds::Badge @color="neutral" @text="Tab" @size="small" />

![Keyboard tab navigation example](/assets/components/tabs/tabs-accessibility-tab-01.png)

Activate tab to display matching content area

<Hds::Badge @color="neutral" @text="Spacebar" @size="small" />
<Hds::Badge @color="neutral" @text="Enter" @size="small" />

![Keyboard tab navigation example](/assets/components/tabs/tabs-accessibility-spacebar_enter.png)

Move between tabs

<Hds::Badge @color="neutral" @text="Arrow left" @isIconOnly={{true}} @icon="arrow-left" @size="small" />
<Hds::Badge @color="neutral" @text="Arrow right" @isIconOnly={{true}} @icon="arrow-right" @size="small" />

![Keyboard tab navigation example](/assets/components/tabs/tabs-accessibility-arrow_keys.png)

Move to interactive element within the content area

<Hds::Badge @color="neutral" @text="Tab" @size="small" />

![Keyboard tab navigation example](/assets/components/tabs/tabs-accessibility-tab-02.png)

!!! Info

 If focus is on the first tab, `left arrow` moves focus to the last tab. If focus is on the last tab, `right arrow` moves focus to the first tab.
!!!