<section data-section="css-custom-properties">
  
  <p class="dummy-paragraph">These are the CSS helper classes that you can use.</p>

  {{#each-in this.groupedTokens as |category categoryList|}}
    <h4 class="dummy-h4">{{capitalize category}}</h4>
    <div class="dummy-tokens-list">
      {{#each categoryList as |token|}}
        <DummyToken @token={{token}} />
      {{/each}}
    </div>
  {{else}}
    <p class="dummy-paragraph">No tokens found 🤷‍♀️</p>
  {{/each-in}}

</section>