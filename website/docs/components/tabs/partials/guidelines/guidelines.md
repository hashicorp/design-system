## Usage

### When to use

- To move between different views within the same context.

!!! Do

Use Tabs to break up content that is related to each other and is on the same hierarchical level.

![Tab usage example](/assets/components/tabs/tab-usage-example-01.png)
!!!

### When not to use

- For navigation, consider [SideNav](/components/side-nav), [Standalone Links](/components/link/standalone), or [Breadcrumb](/components/breadcrumb).
- As a stepper or progress bar for multi-step workflows, consider a stepper, using the [Stepper Indicator](/components/stepper).
- To see multiple content areas at the same time or to fully collapse the content area, use [Accordion](/components/accordion).

!!! Dont

Don’t use Tabs for primary or secondary navigation.

![Tab usage example](/assets/components/tabs/tab-usage-example-02.png)
!!!

!!! Dont

Don’t use Tabs for sequential content.

![Tab usage example](/assets/components/tabs/tab-usage-example-03.png)
!!!

## Tab best practices

!!! Dont

We don’t recommend using a singular Tab; instead consider using a heading.

![Tabs with only one tab](/assets/components/tabs/tab-behavior-single-button.png)
!!!

!!! Dont

Don’t trigger a Tab change via an external action, such as a submit or next button. Tab changes should only be triggered by the Tab itself as that is the expected user interaction.

![Tabs with external trigger](/assets/components/tabs/tabs-external-trigger.png)
!!!

## Sizes

Medium-sized tabs work best in most contexts. Large tabs can be used when needed to emphasize important sections, enhance clarity, and convey hierarchical distinction.

![Tabs sizes example](/assets/components/tabs/tab-size.png)

## Spacing

### Contained

When the content area consists of a contained component (e.g., table, card, etc), we recommend:

- 24px above tabs
- 0px between the tabs and the content area
- Top & right border-radius of the content area be set to 0
- The content area should be flush on the left & right with the tabs

![Tabs contained spacing example](/assets/components/tabs/tabs-spacing-contained.png)

### Nested

!!! Warning

We don’t recommend using a nested tab structure, but if you must, don’t go beyond 2 levels of nesting. If finding that you need to go beyond 2 levels of nesting, consider using another navigation pattern or re-evaluating the information architecture of your product.
!!!

When nesting tabs, regardless of if your content area consists of contained or non-contained components; we recommend:

- 24px above each Tabs instance
- 16px between each Tabs instance and its corresponding content area
- Top & right border-radius of the content area be set to 0, if contained
- Each content area should be left indented by 16px

![Tabs nested spacing example](/assets/components/tabs/tabs-spacing-nested.png)

### Not contained

When the content area does not consist of a contained component (ie. text block, form, etc), we recommend:

- 24px above Tabs
- 16px between the Tabs and the content area
- The content area should be flush on the left & right with the Tabs, if only one level of tabs. If nested levels, see "Nested".

![Tabs not contained spacing example](/assets/components/tabs/tabs-spacing-not-contained.png)

## Overflow

Tabs will fill 100% of the parent container, unless explicitly set to something else. When there are too many tabs to fit within the TabList, a horizontal scrollbar will help the user navigation hidden tabs.

<Hds::Tabs class="doc-tabs-demo-overflow" as |T|>
  <T.Tab>The Wonderful Wizard of Oz</T.Tab>
  <T.Tab>The Bell Jar</T.Tab>
  <T.Tab>The Little Prince</T.Tab>
  <T.Tab>Alice in Wonderland</T.Tab>
  <T.Tab>Lady Windermere’s Fan</T.Tab>
  <T.Tab>Dune</T.Tab>
  <T.Tab>To Kill a Mockingbird</T.Tab>
  <T.Tab>Fahrenheit 451</T.Tab>
  <T.Tab>Handle With Care</T.Tab>
  <T.Tab>Oh, the Places You’ll Go!</T.Tab>
  <T.Tab>I am No One You Know</T.Tab>
  <T.Tab>Twilight of the Idols</T.Tab>
  <T.Tab>Song of Myself</T.Tab>
  <T.Tab>The Secret History</T.Tab>
  <T.Tab>Poems of Arthur O’Shaughnessy</T.Tab>
  <T.Panel>“A heart is not judged by how much you love; but by how much you are loved by others” – <em>L. Frank Baum, The Wonderful Wizard of Oz</em></T.Panel>
  <T.Panel>“I took a deep breath and listened to the old brag of my heart. I am, I am, I am.” – <em>Sylvia Plath, The Bell Jar</em></T.Panel>
  <T.Panel>“The most beautiful things in the world cannot be seen or touched, they are felt with the heart.” – <em>Antoine de Saint-Exupéry, The Little Prince</em></T.Panel>
  <T.Panel>“Why, sometimes I’ve believed as many as six impossible things before breakfast.” – <em>Lewis Carroll, Alice in Wonderland</em></T.Panel>
  <T.Panel>“We are all in the gutter, but some of us are looking at the stars.” – <em>Oscar Wilde, Lady Windermere’s Fan</em></T.Panel>
  <T.Panel>“I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.” – <em>Frank Herbert, Dune</em></T.Panel>
  <T.Panel>“Atticus said to Jem one day, “I’d rather you shot at tin cans in the backyard, but I know you’ll go after birds. Shoot all the blue jays you want, if you can hit ‘em, but remember it’s a sin to kill a mockingbird.” That was the only time I ever heard Atticus say it was a sin to do something, and I asked Miss Maudie about it. “Your father’s right,” she said. “Mockingbirds don’t do one thing except make music for us to enjoy. They don’t eat up people’s gardens, don’t nest in corn cribs, they don’t do one thing but sing their hearts out for us. That’s why it’s a sin to kill a mockingbird.” – <em>Harper Lee, To Kill a Mockingbird</em></T.Panel>
  <T.Panel>“Stuff your eyes with wonder, he said, live as if you’d drop dead in ten seconds. See the world. It’s more fantastic than any dream made or paid for in factories.” – <em>Ray Bradbury, Fahrenheit 451</em></T.Panel>
  <T.Panel>“You can tell yourself that you would be willing to lose everything you have in order to get something you want. But it’s a catch-22: all of those things you’re willing to lose are what make you recognizable. Lose them, and you’ve lost yourself.” – <em>Jodi Picoult, Handle With Care</em></T.Panel>
  <T.Panel>“You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You’re on your own. And you know what you know. And YOU are the one who’ll decide where to go…” – <em>Dr. Seuss, Oh, the Places You’ll Go!</em></T.Panel>
  <T.Panel>“I had forgotten that time wasn’t fixed like concrete but in fact was fluid as sand, or water. I had forgotten that even misery can end. ” – <em>Joyce Carol Oates, I am No One You Know</em></T.Panel>
  <T.Panel>“Without music, life would be a mistake.” – <em>Friedrich Nietzsche, Twilight of the Idols</em></T.Panel>
  <T.Panel>“This is what you shall do; Love the earth and sun and the animals, despise riches, give alms to every one that asks, stand up for the stupid and crazy, devote your income and labor to others, hate tyrants, argue not concerning God, have patience and indulgence toward the people, take off your hat to nothing known or unknown or to any man or number of men, go freely with powerful uneducated persons and with the young and with the mothers of families, read these leaves in the open air every season of every year of your life, re-examine all you have been told at school or church or in any book, dismiss whatever insults your own soul, and your very flesh shall be a great poem and have the richest fluency not only in its words but in the silent lines of its lips and face and between the lashes of your eyes and in every motion and joint of your body.” – <em>Walt Whitman, Song of Myself</em></T.Panel>
  <T.Panel>“It’s a very Greek idea, and a very profound one. Beauty is terror. Whatever we call beautiful, we quiver before it. And what could be more terrifying and beautiful, to souls like the Greeks or our own, than to lose control completely? To throw off the chains of being for an instant, to shatter the accident of our mortal selves? Euripides speaks of the Maenads: head thrown I back, throat to the stars, “more like deer than human being.” To be absolutely free! One is quite capable, of course, of working out these destructive passions in more vulgar and less efficient ways. But how glorious to release them in a single burst! To sing, to scream, to dance barefoot in the woods in the dead of night, with no more awareness of mortality than an animal! These are powerful mysteries. The bellowing of bulls. Springs of honey bubbling from the ground. If we are strong enough in our souls we can rip away the veil and look that naked, terrible beauty right in the face; let God consume us, devour us, unstring our bones. Then spit us out reborn.” – <em>Donna Tartt, The Secret History</em></T.Panel>
  <T.Panel>“We are the music-makers, And we are the dreamers of dreams, Wandering by lone sea-breakers, And sitting by desolate streams. World-losers and world-forsakers, Upon whom the pale moon gleams; Yet we are the movers and shakers, Of the world forever, it seems.” – <em>Arthur O’Shaughnessy, Poems of Arthur O’Shaughnessy</em></T.Panel>
</Hds::Tabs>

!!! Insight

Do you have a need for a more elegant overflow experience? Please let us know by [submitting a request](https://go.hashi.co/hds-support).
!!!

## Content

Tabs should be short and concise, and a good indication of what content the user can expect to find within the TabPanel. They should not consist of full sentences.