# Colours

This seems like a good thing to have in your design system or style guide, so we have a handy tool to help you build a colour page!

<ColorPallet @color="#E04E39" @name="Brand" @variable="--color-brand" @class-name="bg-brand"/>

That's cool! Did you notice that you're rendering an Ember Component directly from your documentation, pretty cool! Also, notice that text example at the top of the colour sample? It is checking the contrast ratio against the [WCAG recommendations](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).

If you want to try different text sizes you can pass in `@textClasses` with an array of text classes you want to test this colour against

<style>
  .field-guide-small {
    font-size: xx-small;
  }

  .field-guide-large {
    font-size: xx-large;
  }

  .field-guide-white {
    color: white;
  }
</style>

<ColorPallet @color="#E04E39" @name="Brand" @variable="--color-brand" @class-name="bg-brand" @textClasses={{array 'field-guide-small' 'field-guide-medium' 'field-guide-large'}}/>

You can even pass multiple colours of text as classes too using `@textColorClasses`:

<ColorPallet
  @color="#E04E39"
  @name="Brand"
  @variable="--color-brand"
  @class-name="bg-brand"
  @textClasses={{array 'field-guide-small' 'field-guide-medium' 'field-guide-large'}}
  @textColorClasses={{array 'field-guide-default' 'field-guide-white'}}
/>
