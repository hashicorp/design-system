## Conformance

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::Select` is conformant when used as directed.

## Accessibility

### Mouse

Hover

![Image of hover interaction on the select](/assets/components/select/accessibility/mouse/select-hover.png)

Click to open OptionList

![Image of the interaction of opening the OptionList](/assets/components/select/accessibility/mouse/select-click-to-open.png)

Hover between items

![Image of the hover interaction between two items in an OptionList](/assets/components/select/accessibility/mouse/select-hover-between-items.png)

Click to select OptionList/Item

![Image of the selected state of a item in the OptionList](/assets/components/select/accessibility/mouse/select-click-to-select.png)

### Keyboard

Focus

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Tab" @size="small" />
</div>

![Example image of focusing on the select with tab on a keyboard](/assets/components/select/accessibility/keyboard/select-focus.png)

Open OptionList

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Spacebar" @size="small" />
  <Hds::Badge @color="neutral" @type="filled" @text="↓" @size="small" />
</div>

![Example image of selecting an item in the OptionList with spacebar](/assets/components/select/accessibility/keyboard/select-spacebar.png)

Move between items

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="↑" @size="small" />
  <Hds::Badge @color="neutral" @type="filled" @text="↓" @size="small" />
</div>

![Example image of moving between items with up and down arrow keys](/assets/components/select/accessibility/keyboard/select-arrow-keys.png)

Select OptionList/Item

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Enter" @size="small" />
</div>

![Example image of selecting an item in an OptionList with enter](/assets/components/select/accessibility/keyboard/select-enter.png)

Close with changing

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Esc" @size="small" />
</div>

![Example image of closing the select with the escape key](/assets/components/select/accessibility/keyboard/select-focus.png)


#### Applicable WCAG Success Criteria (Reference)

This section is for reference only, some descriptions have been truncated for brevity. The `Form::Select::Base` variation of this component is conditionally conformant; that is, it is not conformant until it has an accessible name. Otherwise, this component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.4" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.2.4" "3.3.2" "4.1.1" "4.1.2" }} />
