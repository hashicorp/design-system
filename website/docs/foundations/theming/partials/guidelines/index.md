## Theming in HDS

Theming allows applications to switch between visual appearances at runtime, e.g., light vs dark theme. Introduced in HDS [v7.0](whats-new/release-notes#700), it supports our transition from the "classic" Helios visual language to [IBM's visual language](https://www.ibm.com/design/language/). 

See [From Helios to Carbon](/carbonization/introduction) for more details about this process.

We expect product teams to "carbonize" their applications at their own pace. This means that some applications will continue using the "classic" HDS visual language for some time, while others will start migrating and will need both visual languages to co-exist in the same application, and once fully migrated they will use only the "carbonized" HDS.

This means that two visual languages need to be supported in HDS, at the same time:

- **"classic" HDS** – the original, light-only visual language (doesn't have theming)
- **"carbonized" HDS** – the IBM Carbon visual language applied to HDS, with support for both light and dark variants (more precisely, multiple color modes; see [Themes and modes](#themes-and-modes) below).