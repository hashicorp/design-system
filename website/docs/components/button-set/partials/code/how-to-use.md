## How to use this component

The basic invocation requires two or more buttons to be provided as children:

```handlebars
<Hds::ButtonSet>
  <Hds::Button @text="Submit" type="submit" />
  <Hds::Button @text="Cancel" @color="secondary" @href="https://hashicorp.com" />
</Hds::ButtonSet>
```

### Equal width buttons

If you want to have buttons with equal width, apply a width (via inline style or CSS class) to the `ButtonSet` container and the argument `@isFullWidth={{true}}` to the `Button` components:

```handlebars
<Hds::ButtonSet {{style width="15rem"}}>
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
