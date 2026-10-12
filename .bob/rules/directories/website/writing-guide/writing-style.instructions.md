---
applyTo: "website/docs"
description: "Writing style rules and guidelines"
---

# Writing style guidelines and rules

## Writing rules

IMPORTANT: All of the following rules must be followed for all written content

- Spell all words correctly with proper grammar
  - Use American-English for spelling of words
  - Ignore words included in `website/cspell-config`
- Use active voice
  - Do: "We recommend configuring VCS access when first setting up an organization."
  - Don't: "It is recommended to configure VCS access when first setting up an organization."
- Use descriptive link text
  - Links should provide information on the associated action or destination. Don’t say “click here” or “learn more” for link text.
  - Do: "For more information about this feature, see [our Button documentation](#)."
  - Don't: "We have more information, [learn more](#)."
- Use sentence case for headings, titles, subtitles, and labels
  - Do: "How to use this component"
- For lists, use sentence case unless part of a sentence, then use lowercase
  - Do:
    ```md
      ## How to use this component
      - To indicate status, such as “Running”, “Applied”, “Errored”, etc.
      - As feature flags, such as “In Preview”, “Beta”, “New”, etc.
    ```
  - Do:
    ```md
      End alignment can also be used in the last column of a table to:
      - highlight a "more options" function for the content within a row.
      - as a means to visually "bookend" the row with similar content, e.g., timestamps, TTL (time-to-live) values, and dates.
    ```
- Use the oxford comma in a list
  - Do: "I was working with the Terraform team, Sally, and Bob."
- Break up long sentences instead of using a comma
  - Do: "Bill was going to the store, market, and barber. Bill likes his barber because he cuts his hair with scissors instead of clippers."
  - Don't: "Bill was going to the store, going to the market, and going to the barber, which he really likes, because his barber always cuts his hair with the scissors and never with the clippers."
- Use contractions
  - Do: "Don't use BadgeCount for anything non-numeric except version number."
- "e.g" vs. "i.e"
  - Use lowercase when formatting "e.g" or "i.e"
  - Use "e.g" to introduce a few examples, not a complete list.
    - Do: "After work, I'll walk to a sports arena, e.g., Thunderdome or Victory Court."
  - Use "i.e" to provide more precise information.
    - Do: "I had so much fun performing in the school play, i.e., my singing and dancing were highly applauded."
- Order adjectives in order of strength of descriptiveness and attitudes
  - Descriptive opinions or attitudes come first, followed by neutral, factual ones.
  - Do: "She was wearing an amazing red coat."
  - Don't: "She was wearing a red amazing coat."
- Refer to the design system in the first person
  - Use "we" or "our" over "the Helios design system team"
  - Do: "We don't currently offer border-radius tokens."
  - Don't: "The Helios Design System doesn't yet publish tokens for border-radius."
- Use "Design System Team" as a proper noun
- Refer to the consumer in the second person
  - Address the reader directly with "you"
  - Do: "Terraform Cloud's API lets you create workspaces without a VCS connection."
  - Don't: "Terraform Cloud's API allows one to create workspaces without a VCS connection."

## Content guidelines

- Be brief
  - Avoid complex sentence structures. Use short paragraphs. If paragraphs have more than 6 sentences, work to break them up where natural.
  - Do: "Following this convention makes it easier to contribute back to Terraform's core."
  - Don't: "If you want to contribute your code back to the Terraform repo, it makes things easier if you follow this convention."
- Don't oversimplify
  - Avoid the following words
    - easy, easily, simply, simple
    - just (as in “just run this command”)
    - obviously
- Be precise
  - Avoid flowery sentences, unnecessary adjectives, and enhancements, and remove any words that do not add value to the content.
  - Do: "Vault's unsealing process is not complex."
  - Don't: "Like a butterfly in the wind, Vault's unsealing process replicates the pristine ease of a silk worm combined with the juxtapose of a mongoose."