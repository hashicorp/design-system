## How to use this component

The basic invocation should include two or more buttons to be provided as children:

```handlebars
<Hds::ButtonSet>
  <Hds::Button @text="Submit" type="submit" />
  <Hds::Button @text="Cancel" @color="secondary" @href="https://hashicorp.com" />
</Hds::ButtonSet>
```

Other button-like components can also be used as children such as the `Dropdown`.

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

Note: .

```handlebars
<Hds::ButtonSet {{style maxWidth="15rem"}}>
  <Hds::Button @text="Save" @isFullWidth={{true}} />
  <Hds::Button @text="Cancel" @color="secondary" @href="https://hashicorp.com" @isFullWidth={{true}} />
</Hds::ButtonSet>
```

Issue: The `Dropdown` does not have an `isFullWidth` option for the outer wrapper. Setting isFullWidth to “true” on the nested ToggleButton does not have the same effect.

```handlebars
<Hds::ButtonSet>
  <Hds::Dropdown as |D|>
    <D.ToggleButton @isFullWidth={{true}} @color="secondary" @text="Select an option" />
    <D.Title @text="Title Text" />
    <D.Description @text="Descriptive text goes here." />
    <D.Interactive @href="#">Add</D.Interactive>
    <D.Interactive @href="#">Add More</D.Interactive>
    <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
    <D.Separator />
    <D.Interactive @route="components" @icon="trash" @color="critical">Delete</D.Interactive>
  </Hds::Dropdown>

  <Hds::Button @isFullWidth={{true}} @text="Submit" type="submit" />
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
