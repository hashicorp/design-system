## How to use this component

This component currently supports two states: empty state and error state.

### Empty state

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="The item you were looking for was not found." />
</Hds::ApplicationState>
```

#### Empty state with link in footer

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="The item you were looking for was not found." />
  <A.Footer as |F|>
    <F.Link @icon="help" @text="Need Help" @href="/components/alert" @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Empty state with yielded body block

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body>
    <p>Your content here</p>
  </A.Body>
  <A.Footer as |F|>
    <F.Link @icon="arrow-left" @text="Go back" @href="/" />
  </A.Footer>
</Hds::ApplicationState>
```

### Error state

To indicate that the message is an error state, add the errorCode to the invocation.

```handlebars
<Hds::ApplicationState @subtitle="404" as |A|>
  <A.Header @title="An error has occurred" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.Link @icon="arrow-left" @text="Go back" @href="/" />
    <F.Link @icon="help" @text="Need Help" @href="/components/alert" @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with customized header icon

```handlebars{data-execute=false}
<Hds::ApplicationState @subtitle="404" as |A|>
  <A.Header @title={{t error.text.title}} @icon="help" />
  <A.Body
    @text={{t error.text.description}}
  />
  <A.Footer @iconName="arrow-left" @footerText={{t link.text.back}} @href="/" 
  @helpIcon="support" @helpText={{t link.text.help}} @helpHref="/url/to/help" />
</Hds::ApplicationState>
```

#### Error state with yielded body block

```handlebars
<Hds::ApplicationState @subtitle="404" as |A|>
  <A.Header @title="An error has occurred" />
  <A.Body>
    <p>Yielded content here</p>
  </A.Body>
  <A.Footer as |F|>
          <F.Link @icon="arrow-left" @text="Go back" @href="/" />
          <F.Link @icon="help" @text="Need Help" @href="/components/alert" @iconPosition="trailing" />
        </A.Footer>
</Hds::ApplicationState>
```
