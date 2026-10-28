## Typography in Carbon

When the Carbon HDS themes/modes are applied to the UI, typography is aligned with the [Carbon type system](https://carbondesignsystem.com/elements/typography/overview/). The main differences compared to HDS are:

- **Font family**: display, text, and code font families are replaced by the IBM Plex typefaces.
- **Font weight**: heavier font weights are consolidated, reducing the available weights from four to two.
- **Font size**: HDS type styles are roughly mapped to the closest equivalent in the Carbon type set.

The names of the tokens and helper classes don't change, so no code updates are needed beyond [loading the IBM Plex fonts](/foundations/theming?tab=code).

## Font family

In Carbon, [IBM Plex](https://carbondesignsystem.com/elements/typography/overview/#typeface:-ibm-plex) replaces the system font stack used in HDS. IBM Plex Sans is used for both display and text styles, while IBM Plex Mono is used for code.

| Font stack | HDS | Carbon |
|---|---|---|
| Display | System sans-serif | IBM Plex Sans |
| Text | System sans-serif | IBM Plex Sans |
| Code | System monospace | IBM Plex Mono |

## Font weight

Carbon uses fewer font weights than HDS. The `medium` weight is mapped to `regular` and the `bold` weight is mapped to `semibold`.

| Font weight | HDS | Carbon |
|---|---|---|
| Regular | 400 | 400 |
| Medium | 500 | 400 |
| Semibold | 600 | 600 |
| Bold | 700 | 600 |

## Font size

Each HDS font size is mapped to the closest equivalent in the Carbon type scale. Display styles map to Carbon heading styles, body styles map to Carbon body styles, and code styles map to Carbon code styles.

| Style | Carbon equivalent | HDS size / line height | Carbon size / line height |
|---|---|---|---|
| Display 500 | `heading-05` | 30px / 38px | 32px / 40px |
| Display 400 | `heading-04` | 24px / 32px | 28px / 36px |
| Display 300 | `heading-03` | 18px / 24px | 20px / 28px |
| Display 200 | `heading-02` | 16px / 24px | 16px / 24px |
| Display 100 | `heading-01` | 13px / 18px | 14px / 20px |
| Body 300 | `body-02` | 16px / 24px | 16px / 24px |
| Body 200 | `body-01` | 14px / 20px | 14px / 20px |
| Body 100 | `body-compact-01` | 13px / 18px | 13px / 17px |
| Code 300 | `code-02` | 16px / 20px | 14px / 20px |
| Code 200 | `code-02` | 14px / 16px | 14px / 20px |
| Code 100 | `code-02` / `code-01` | 13px / 16px | 14px / 19px |

Carbon has fewer code styles than HDS, so the code styles are a rough mapping rather than a one-to-one match:

- **Code 300** and **Code 200** both map to `code-02`, so they render identically (14px / 20px).
- **Code 100** uses the font size of `code-02` and the line height of `code-01`, resulting in 14px / 19px. This doesn't match a specific Carbon style.
