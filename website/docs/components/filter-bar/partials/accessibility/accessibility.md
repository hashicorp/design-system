## Conformance Rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component. Consumers are responsible for the conformance of any content in a block yield.

## Keyboard navigation

### Accessing the dropdown menu

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus on the dropdown toggle button.

![Filter bar with focus on the dropdown toggle button](/assets/components/filter-bar/filter-bar-a11y-default.png)

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>
<Doc::Badge @type="neutral">Enter</Doc::Badge>

Open the dropdown menu.

![Filter bar with the dropdown opened](/assets/components/filter-bar/filter-bar-a11y-dropdown-opened.png)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus on the selected tab.

![Filter bar with the dropdown opened and the selected tab focused](/assets/components/filter-bar/filter-bar-a11y-tab-focused.png)

<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-left" @title="Left arrow" /></Doc::Badge>
<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-right" @title="Right arrow" /></Doc::Badge>
<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-up" @title="Up arrow" /></Doc::Badge>
<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-down" @title="Down arrow" /></Doc::Badge>

Move between tabs.

![Filter bar with the dropdown opened and the focus moved to the second tab](/assets/components/filter-bar/filter-bar-a11y-tab-changed.png)

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>
<Doc::Badge @type="neutral">Enter</Doc::Badge>

Select a tab.

![Filter bar with the dropdown opened and the second tab selected](/assets/components/filter-bar/filter-bar-a11y-tab-selected.png)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Move to the selected tab content.

![Filter bar with the dropdown opened and the focus inside the second tab panel](/assets/components/filter-bar/filter-bar-a11y-selected-tab-focused.png)

<Doc::Badge @type="neutral">Esc</Doc::Badge>

Close the dropdown.

![Filter bar with the dropdown closed and focus on the dropdown toggle button](/assets/components/filter-bar/filter-bar-a11y-default.png)

### Executing a search

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus the search input.

![Filter bar with focus on the search input](/assets/components/filter-bar/filter-bar-a11y-search-focused.png)

<Doc::Badge @type="neutral">\[a-z\]</Doc::Badge>

Enter a search term into the input.

![Filter bar with search input containing "lorem ipsum" value](/assets/components/filter-bar/filter-bar-a11y-search-input.png)

<Doc::Badge @type="neutral">Enter</Doc::Badge>

Execute the search.

![Filter bar with a new filter added for "Search: lorem ipsum"](/assets/components/filter-bar/filter-bar-a11y-search-execute.png)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.4.3" "2.4.7" "3.2.1" "3.2.2" "3.3.2" "4.1.2" }} />

---

<Doc::A11ySupport />
