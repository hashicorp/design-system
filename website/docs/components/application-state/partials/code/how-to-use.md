## How to use this component

This component currently supports two states: empty state and error state.

### Empty state

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="The item you were looking for was not found." />
</Hds::ApplicationState>
```

#### Empty state with a footer link

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="The item you were looking for was not found." />
  <A.Footer as |F|>
    <F.Link @icon="help" @text="Need Help" @href="/components/alert"
    @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Empty state with a footer link and divider

```handlebars
<Hds::ApplicationState @hasDivider={{true}} as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="The item you were looking for was not found." />
  <A.Footer as |F|>
    <F.Link @icon="help" @text="Need Help" @href="/components/alert"
    @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Empty state with yielded body block

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body>
    <Doc::Placeholder @text="block yield" @height="100" @background="#eee" />
  </A.Body>
  <A.Footer as |F|>
    <F.Link @icon="arrow-left" @text="Go back" @href="/" />
  </A.Footer>
</Hds::ApplicationState>
```

### Error state

To indicate that the message is an error state, add `@errorCode` to the invocation.

```handlebars
<Hds::ApplicationState @errorCode="404" as |A|>
  <A.Header @title="An error has occurred" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.Link @icon="arrow-left" @text="Go back" @href="/" />
    <F.Link @icon="help" @text="Need Help" @href="/components/alert" 
      @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with customized header icon

```handlebars
<Hds::ApplicationState @errorCode="404" as |A|>
  <A.Header @title="An error has occurred" @icon="help" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.Link @icon="arrow-left" @text="Go back" @href="/" />
    <F.Link @icon="help" @text="Need Help" @href="/components/alert" 
      @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with yielded body block

```handlebars
<Hds::ApplicationState @errorCode="404" as |A|>
  <A.Header @title="An error has occurred" />
  <A.Body>
    <Doc::Placeholder @text="block yield" @height="100" @background="#eee" />
  </A.Body>
  <A.Footer as |F|>
    <F.Link @icon="arrow-left" @text="Go back" @href="/" />
    <F.Link @icon="help" @text="Need Help" 
      @href="/components/alert" @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with a footer divider

```handlebars
<Hds::ApplicationState @errorCode="404" @hasDivider={{true}} as |A|>
  <A.Header @title="An error has occurred" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.Link @icon="arrow-left" @text="Go back" @href="/" />
    <F.Link @icon="help" @text="Need Help" @href="/components/alert" 
      @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```