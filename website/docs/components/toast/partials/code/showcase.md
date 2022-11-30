<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Color</h4>
  <div class="dummy-toast-base-sample">
    {{#each @model.COLORS as |color|}}
      <Hds::Toast @color={{color}} @onDismiss={{this.noop}} as |T|>
        <T.Title>{{capitalize color}}</T.Title>
        <T.Description>This is the toast with <em>{{color}}</em> color.</T.Description>
      </Hds::Toast>
    {{/each}}
  </div>

  <h4 class="dummy-h4">Icon</h4>
  <div class="dummy-toast-base-sample">
    <Hds::Toast @color="highlight" @onDismiss={{this.noop}} as |T|>
      <T.Title>Default icon</T.Title>
      <T.Description>Lorem ipsum dolor sit amet.</T.Description>
    </Hds::Toast>
    <Hds::Toast @color="highlight" @icon="meh" @onDismiss={{this.noop}} as |T|>
      <T.Title>With icon override</T.Title>
      <T.Description>Lorem ipsum dolor sit amet.</T.Description>
    </Hds::Toast>
    <Hds::Toast @color="highlight" @icon="running" @onDismiss={{this.noop}} as |T|>
      <T.Title>With animated icon</T.Title>
      <T.Description>Lorem ipsum dolor sit amet.</T.Description>
    </Hds::Toast>
    <Hds::Toast @color="highlight" @icon="" @onDismiss={{this.noop}} as |T|>
      <T.Title>Without icon</T.Title>
      <T.Description>Lorem ipsum dolor sit amet.</T.Description>
    </Hds::Toast>
  </div>

  <h4 class="dummy-h4">Content</h4>
  <div class="dummy-toast-sample-grid dummy-toast-sample-grid--wide-content">
    <div class="dummy-toast-sample-grid__column">
      <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
        <T.Title>A simple title</T.Title>
        <T.Description>A simple description text</T.Description>
      </Hds::Toast>
      <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
        <T.Title>A toast with a title and no description text.</T.Title>
      </Hds::Toast>
      <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
        <T.Description>A toast with no title and just a description text</T.Description>
      </Hds::Toast>
      <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
        <T.Title>A toast with a very long title and a long description text that should go on multiple lines</T.Title>
        <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat elit, lacinia at magna
          eget, porttitor lobortis nulla.</T.Description>
      </Hds::Toast>
    </div>
    <div class="dummy-toast-sample-grid__column">
      <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
        <T.Title>A toast with a rich description (HTML)</T.Title>
        <T.Description>Using the
          <code>A.Description</code>
          contextual component it's possible to have content that contains HTML tags, like
          <strong>strong text</strong>
          and
          <em>emphasized text</em>
          as well as
          <code>code</code>,
          <pre>pre</pre>
          and
          <a href="#">inline links</a>.</T.Description>
      </Hds::Toast>
      <Hds::Toast @onDismiss={{this.noop}} @color="success" as |T|>
        <T.Title>Multiple lines of description using more than one 'description' contextual component</T.Title>
        <T.Description>This is the first line of description, yielded to a
          <code>A.Description</code>
          contextual component.</T.Description>
        <T.Description>And this is the second line of description, yielded to another
          <code>A.Description</code>
          contextual component.</T.Description>
      </Hds::Toast>
      <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
        <T.Title>A toast with extra/custom content</T.Title>
        <T.Description>In special cases, you can pass extra content to the toast using the
          <code>A.Generic</code>
          contextual component.</T.Description>
        <T.Generic>
          <Doc::Placeholder @text="some generic content" @height="50" @background="#eee" />
        </T.Generic>
      </Hds::Toast>
    </div>
  </div>

  <h4 class="dummy-h4">Actions</h4>
  <div class="dummy-toast-sample-grid dummy-toast-sample-grid--wide-content">
    <Hds::Toast @color="warning" @onDismiss={{this.noop}} as |T|>
      <T.Title>Action passed as yielded component</T.Title>
      <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</T.Description>
      <T.Button @text="Action" @color="secondary" />
    </Hds::Toast>
    <Hds::Toast @color="warning" @onDismiss={{this.noop}} as |T|>
      <T.Title>With multiple actions passed as yielded components</T.Title>
      <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</T.Description>
      <T.Button @text="Secondary" @color="secondary" />
      <T.Button @icon="plus" @text="Tertiary" @color="tertiary" />
      <T.Link::Standalone @icon="plus" @text="Standalone" @href="#" @color="secondary" />
    </Hds::Toast>
  </div>
</section>