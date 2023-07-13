---
"@hashicorp/design-system-components": minor
---

Update default value of `Card` `@overflow` argument to `visible` to address an area of consumer confusion and better support the most common use cases. Technically, this is a breaking change as it will require consumers relying upon the previous `hidden` default value to now manually set the value. The result of not setting the a `hidden` value can cause square edges of some images to "stick out" and overlap the rounded corners of the Card itself. We considered this to be a fairly minor, low-impact issue however which would not affect functionality or usability.
