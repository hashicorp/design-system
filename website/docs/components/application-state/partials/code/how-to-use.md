## How to use this component

This component intends to replace a few different simple error and empty/zero state components that exist across product UIs, while providing flexibility to adapt to additional application states. While we’re referring to these as "error state" and "empty state" this is just to help consumers relate to the components that have been replaced. Really, this component can be used to reflect any kind of application state message that is needed.

### As an empty state

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="The item you were looking for was not found." />
</Hds::ApplicationState>
```

#### Empty state with header icon

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" @icon="alert-circle" />
  <A.Body @text="The item you were looking for was not found." />
</Hds::ApplicationState>
```

#### Empty state with a footer link

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="The item you were looking for was not found." />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="help" @text="Need Help" @href="/components/alert"
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
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Empty state with body text

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="Some sentence that conveys a good message to the user" />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Empty state with center alignment

```handlebars
<Hds::ApplicationState @align="center" as |A|>
  <A.Header @title="Empty state title text" />
  <A.Body @text="Some sentence that conveys a good message to the user" />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Empty state with media

```handlebars
<Hds::ApplicationState as |A|>
  <A.Media><img src="/assets/images/avatar.png" /></A.Media>
  <A.Header @title="Empty state title text" />
  <A.Body @text="Some sentence that conveys a good message to the user" />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
  </A.Footer>
</Hds::ApplicationState>
```

### As an error state

To indicate that the message is an error state, add `@errorCode` to the `[A].Header` component invocation.

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="An error has occurred" @errorCode="404" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
    <F.LinkStandalone @icon="help" @text="Need Help" @href="/components/alert" 
      @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with header icon

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="An error has occurred" @icon="help" @errorCode="404" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
    <F.LinkStandalone @icon="help" @text="Need Help" @href="/components/alert" 
      @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with yielded body block

```handlebars
<Hds::ApplicationState as |A|>
  <A.Header @title="An error has occurred" @errorCode="404" />
  <A.Body>
    <Doc::Placeholder @text="block yield" @height="100" @background="#eee" />
  </A.Body>
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
    <F.LinkStandalone @icon="help" @text="Need Help" 
      @href="/components/alert" @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with center alignment

```handlebars
<Hds::ApplicationState @align="center" as |A|>
  <A.Header @title="An error has occurred" @errorCode="404" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
    <F.LinkStandalone @icon="help" @text="Need Help" 
      @href="/components/alert" @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

#### Error state with media

```handlebars
<Hds::ApplicationState as |A|>
  <A.Media><img src="/assets/images/avatar.png" /></A.Media>
  <A.Header @title="An error has occurred" @errorCode="404" />
  <A.Body
    @text="Sorry, an unexpected error has occurred.
    Please try again later or contact support for assistance."
  />
  <A.Footer as |F|>
    <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
    <F.LinkStandalone @icon="help" @text="Need Help" 
      @href="/components/alert" @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```
