Disabling elements should be avoided; elements that are disabled are not presented to the user with assistive technology. No user can navigate to or interact with a disabled element, which can cause confusion and frustration. Additionally, our users have given us explicit feedback that they prefer our current approach of not presenting disabled elements in the UI.

Here are our recommend approaches:
- Show the content/element as enabled and usable.
- Hide the content/element, but show information about their limited access.
- Hide the content/element, but with no provided context.

This documentation will explain how we approach these decisions and why these alternatives are preferred.