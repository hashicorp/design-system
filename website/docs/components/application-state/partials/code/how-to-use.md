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
  <A.Media><img src="/assets/images/avatar.png" alt="portrait of a cat wearing coat and tie" /></A.Media>
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
  <A.Media><img src="/assets/images/avatar.png" alt="portrait of a cat wearing coat and tie" /></A.Media>
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

### titleTag

The `@titleTag` argument changes the HTML element that wraps the `[A].Header` title content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if an Application State is used as an empty state below the main heading of a page, the value should be `"h2"`. 

```handlebars
<div class="doc-application-state-demo-heading">
  <Hds::Text::Display @tag="h1" @size="500">Templates</Hds::Text::Display>
</div>
<Hds::ApplicationState as |A|>
  <A.Header @title="No templates have been created yet" @titleTag="h2" />
  <A.Body @text="Make a template to easily provision infrastructure for any Waypoint application. Youll need a Terraform co-node module and instructions for your application developers." />
  <A.Footer as |F|>
    <F.Button @icon="plus" @text="Create a template" />
    <F.Button @icon="upload" @text="Import" @color="secondary" />
    <F.LinkStandalone @icon="docs-link" @text="Learn more" @href="/components/application-state"
    @iconPosition="trailing" />
  </A.Footer>
</Hds::ApplicationState>
```

!!! Insight

The default `@titleTag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@titleTag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!
