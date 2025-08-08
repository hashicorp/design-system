## How to use this component

!!! Info

For guidance on button organization, grouping of button types, and related information please refer to the [button organization](/patterns/button-organization) pattern documentation.

!!!

The basic `ButtonSet` invocation should include two or more buttons to be provided as children. (If used with only one button there will be no noticeable visual difference.)

```handlebars
<Hds::ButtonSet>
  <Hds::Button @text="Submit" type="submit" />
  <Hds::Button @text="Cancel" @color="secondary" @href="https://hashicorp.com" />
</Hds::ButtonSet>
```

Other button-like components, such as the [Dropdown](/components/dropdown), can also be used as children.

```handlebars
<Hds::ButtonSet>
  <Hds::Dropdown as |D|>
    <D.ToggleButton @color="secondary" @text="Select an option" />
    <D.Title @text="Title Text" />
    <D.Description @text="Descriptive text goes here." />
    <D.Interactive @href="#">Add</D.Interactive>
    <D.Interactive @href="#">Add More</D.Interactive>
    <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
    <D.Separator />
    <D.Interactive @route="components" @icon="trash" @color="critical">Delete</D.Interactive>
  </Hds::Dropdown>

  <Hds::Button @text="Submit" type="submit" />
</Hds::ButtonSet>
```

### Equal width buttons

If you want buttons with equal widths, set `@isFullWidth` to `true` on the `Button` components. Since the ButtonSet is full-width (100%) by default, you will likely want to constrain its overall width by adding a `max-width` to the `ButtonSet` container (via an inline style or CSS class).

```handlebars
<Hds::ButtonSet {{style maxWidth="15rem"}}>
  <Hds::Button @text="Save" @isFullWidth={{true}} />
  <Hds::Button @text="Cancel" @color="secondary" @href="https://hashicorp.com" @isFullWidth={{true}} />
</Hds::ButtonSet>
```

#### With loading state

This technique is useful if you need to show a loading state, to avoid the resizing and shifting of the buttons:

```handlebars
<Hds::ButtonSet {{style width="15rem"}}>
  <Hds::Button
    @icon={{if this.isLoading "loading"}}
    @text={{if this.isLoading "Loading" "Save"}}
    @isFullWidth={{true}}
    {{on "click" this.toggleIsLoading}}
  />
  <Hds::Button
    @text="Cancel"
    @color="secondary"
    @isFullWidth={{true}}
    {{on "click" this.cancelLoading}}
  />
</Hds::ButtonSet>
```
