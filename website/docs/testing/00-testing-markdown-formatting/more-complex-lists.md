* This is an unordered list.
* This is an unordered list.
* This is an unordered list.

1. This is an ordered list.
2. This is an ordered list.
3. This is an ordered list.

This is an unordered list (using `*`):

* Salt-n-Pepa
* Bel Biv DeVoe
* Kid 'N Play

This is also an unordered list (using `-`):

- Salt-n-Pepa
- Bel Biv DeVoe
- Kid 'N Play

And this is also an unordered list (using `+`):

+ Salt-n-Pepa
+ Bel Biv DeVoe
+ Kid 'N Play

This instad is an ordered list:

1. Michael Jackson
2. Michael Bolton
3. Michael Bublé

This is an ordered list that uses the same number for all the items:

1. Michael Jackson
1. Michael Bolton
1. Michael Bublé

This is an ordered list that uses letters instead of numbers (doens't work):

A. Michael Jackson
A. Michael Bolton
A. Michael Bublé

----------------

This is a nested list (using `*`):

* Jackson 5
    * Michael
    * Tito
    * Jackie
    * Marlon
    * Jermaine
* TMNT
    * Leonardo
    * Michelangelo
    * Donatello
    * Raphael

This is a nested list (using `-`):

- Jackson 5
    - Michael
    - Tito
    - Jackie
    - Marlon
    - Jermaine
- TMNT
    - Leonardo
    - Michelangelo
    - Donatello
    - Raphael

This is a deeply nested list:

*   Lorem ipsum dolor sit amet,
    *   Consectetuer adipiscing elit.
    *   Aliquam hendrerit mi posuere lectus.
        *   Vestibulum enim wisi.
        *   Viverra nec, fringilla.
        *   In laoreet vitae risus.
            *   Donec sit amet nisl.
            *   Aliquam semper ipsum
        *   Sit amet velit.
    *   Suspendisse id sem consectetuer
*   Libero luctus adipiscing.

----------------

This is a list with hanging indents:

*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.

This is a list with one item separated by a blank line (this will force it to wrap all the list items in `<p>` tags in the HTML output):

*   Bird

*   Magic
*   Johnson

This is a list that contains other block elements:

*   A normal list item
*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.

* A list item with a code block

    ```js
    var foo = 'bar';
    console.log(foo);
    ```
