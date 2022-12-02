<section data-test-percy data-section="showcase">
  

  <h4 class="dummy-h4">Size</h4>
  {{#each this.SIZES as |size|}}
    <p class="dummy-paragraph">{{capitalize size}}</p>
    <br />
    <div class="dummy-modal-sample-item">
      <Hds::Modal open @size={{size}} id="modal-example-{{size}}" as |M|>
        <M.Header>
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
        </M.Body>
        <M.Footer>
          <Hds::ButtonSet>
            <Hds::Button type="submit" @text="Confirm" />
            <Hds::Button type="button" @text="Cancel" @color="secondary" />
          </Hds::ButtonSet>
        </M.Footer>
      </Hds::Modal>
    </div>
  {{/each}}

  <h4 class="dummy-h4">Color</h4>
  {{#each @model.COLORS as |color|}}
    <p class="dummy-paragraph">{{capitalize color}}</p>
    <br />
    <div class="dummy-modal-sample-item">
      <Hds::Modal open @color={{color}} id="modal-example-{{color}}" as |M|>
        <M.Header
          @icon={{concat (if (eq color "warning") "alert-triangle") (if (eq color "critical") "alert-diamond")}}
        >
          Title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
        </M.Body>
        <M.Footer>
          <Hds::ButtonSet>
            <Hds::Button type="submit" @text="Confirm" @color={{if (eq color "critical") "critical"}} />
            <Hds::Button type="button" @text="Cancel" @color="secondary" />
          </Hds::ButtonSet>
        </M.Footer>
      </Hds::Modal>
    </div>
  {{/each}}

  <h4 class="dummy-h4">Title</h4>
  <p class="dummy-paragraph">With icon</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-icon" as |M|>
      <M.Header @icon="info">
        Title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
          <Hds::Button type="button" @text="Cancel" @color="secondary" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>
  <p class="dummy-paragraph">With tagline</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-tagline" as |M|>
      <M.Header @tagline="Tagline">
        Title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
          <Hds::Button type="button" @text="Cancel" @color="secondary" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>
  <p class="dummy-paragraph">With tagline and icon</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-tagline-icon" as |M|>
      <M.Header @tagline="Tagline" @icon="info">
        Title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
          <Hds::Button type="button" @text="Cancel" @color="secondary" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>

  <h4 class="dummy-h4">Content</h4>
  <p class="dummy-paragraph">With basic style</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-basic-content" as |M|>
      <M.Header @tagline="Tagline" @icon="info">
        A very, very long title that spans multiple lines to test this element
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">HashiCorp uses data collected by cookies and
          JavaScript libraries to improve your browsing experience, analyze site traffic, and increase the overall
          performance of our site. By using our website, you’re agreeing to our Privacy Policy and Cookie Policy.</p>
        <br />
        <p class="hds-typography-body-300 hds-foreground-primary">The categories below outline which companies and tools
          we use for collecting data. To opt out of a category of data collection, set the toggle to “Off” and save your
          preferences.</p>
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
          <Hds::Button type="button" @text="Cancel" @color="secondary" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>

  <p class="dummy-paragraph">With generic content</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-generic-content" as |M|>
      <M.Header>
        Title
      </M.Header>
      <M.Body>
        <Doc::Placeholder @text="some generic content" @height="50" @background="#eee" />
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
          <Hds::Button type="button" @text="Cancel" @color="secondary" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>

  <h4 class="dummy-h4">Actions</h4>
  <p class="dummy-paragraph">One action</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-one-action" as |M|>
      <M.Header>
        Title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>

  <p class="dummy-paragraph">Two action</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-two-actions" as |M|>
      <M.Header>
        Title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
          <Hds::Button type="button" @text="Cancel" @color="secondary" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>

  <p class="dummy-paragraph">Three action</p>
  <br />
  <div class="dummy-modal-sample-item">
    <Hds::Modal open id="modal-example-three-actions" as |M|>
      <M.Header>
        Title
      </M.Header>
      <M.Body>
        <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
      </M.Body>
      <M.Footer>
        <Hds::ButtonSet>
          <Hds::Button type="submit" @text="Confirm" />
          <Hds::Button type="button" @text="Cancel" @color="secondary" />
          <Hds::Button type="button" @text="Tertiary" @color="tertiary" @icon="plus" />
        </Hds::ButtonSet>
      </M.Footer>
    </Hds::Modal>
  </div>
</section>