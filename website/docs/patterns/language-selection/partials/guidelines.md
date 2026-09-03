!!! Warning

**Consumer responsibility**

While HDS components support [internationalization](/getting-started/for-engineers#internationlization), the technical implementation and translations are a consumer responsibility.
!!!

Use the language selection pattern to provide users with a method to switch the application's language from anywhere within the product without leaving their current page or context.

![An example of the open language selection menu in the App Header with a list of available language options](/assets/patterns/language-selection/language-selection.png)

## Placement

Place the language selector in the App Header's utility actions section along with other similar application-level controls like user settings, help, and support, and more.

## Components

Compose the language selection pattern using these HDS components:

- **Dropdown ToggleIcon (icon only):** entry point for selecting a language from a list of options; use the `globe` icon to communicate internationalization.
- **Title List Item:** used as a section label within the list with the text set to "Language".
- **Checkmark List Item:** used to display the list of available languages and highlight the current or active language. One instance per supported language. Only one language can be active at a time.

## Language list format

Each list item displays the language in two forms (with the exception of English): the native language name first, followed by the English name in parentheses, e.g., "Español (Spanish)" or "日本語 (Japanese)". English is listed simply as "English".

## Default language

!!! Warning

**Avoid inferring language from geographic location**

Determining a user's language from their IP address or geographic region is unreliable. A user's location does not indicate their language preference. For example, a user in Germany may prefer English or Japanese.
!!!

Avoid making assumptions about user preference based on factors outside of the application and default to English even when other languages and translations are available. HashiCorp products are built and documented in English, making it a logical default and fallback choice.

## Persistence

When a user selects a language, persisting that choice ensures they won't have to re-select it the next time they open the application which can be disruptive. Storing the selection so that it is restored on the next visit ensures a consistent experience and signals to the user that their preference has been respected.
