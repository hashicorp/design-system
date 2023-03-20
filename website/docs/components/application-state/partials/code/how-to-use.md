## How to use this component

This component currently supports two states: empty state and error state.

### Empty state

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @titleText="Empty state title text" />
  <A.Body @bodyText="The item you were looking for was not found." />
</Hds::ApplicationState>
```

#### Empty state with link in footer

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @titleText="Empty state title text" />
  <A.Body @bodyText="The item you were looking for was not found." />
  <A.Footer @iconName="search" @footerText="Try a different search" @href="/" />
</Hds::ApplicationState>
```

#### Empty state with yielded body block

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @titleText="Empty state title text" />
  <A.Body>
    <p>Your content here</p>
  </A.Body>
  <A.Footer @iconName="search" @footerText="Try a different search" @href="/" />
</Hds::ApplicationState>
```

### Error state

To indicate that the message is an error state, add the errorCode to the invocation.

```handlebars
<Hds::ApplicationState @errorCode="404" as |A|>
  <A.Header @titleText="An error has occurred" />
  <A.Body
    @bodyText="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer @iconName="arrow-left" @footerText="Go back" @href="/" 
  @helpHref="/components/alert" />
</Hds::ApplicationState>
```

#### Error state with customized help link

```handlebars{data-execute=false}
<Hds::ApplicationState @errorCode="404" as |A|>
  <A.Header @titleText={{t error.text.title}} />
  <A.Body
    @bodyText={{t error.text.description}}
  />
  <A.Footer @iconName="arrow-left" @footerText={{t link.text.back}} @href="/" 
  @helpIcon="support" @helpText={{t link.text.help}} @helpHref="/url/to/help" />
</Hds::ApplicationState>
```

#### Error state with yielded body block

```handlebars
<Hds::ApplicationState @errorCode="404" as |A|>
  <A.Header @titleText="An error has occurred" />
  <A.Body>
    <p>Yielded content here</p>
  </A.Body>
  <A.Footer @iconName="arrow-left" @footerText="Go back" @href="/" 
  @helpHref="/components/alert" />
</Hds::ApplicationState>
```
