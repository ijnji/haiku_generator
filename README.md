# haiku_generator.js
<b>usage:</b> `node haiku_generator.js <structure> [corpus]`

Example: `node haiku_generator.js [5,7,5] fifty_shades.txt`<br />
Example: `node haiku_generator.js [[1,2,2],[3,1,3],[1,4]]`<br />

<b>Structure format 1:</b><br />
With a 1D array of positive integers, [/d,/d,/d]<br />
Each line only has to add up to the syllable count for that line.<br />
Recommended when a `[corpus]` is included.<br />

Example: A `<structure>` of `[5,7,5]` can return:<br />

`A KITTY FOLLOWS`<br />
`ANYWHERE AND EVERYWHERE`<br />
`BUT BEGRUDINGLY`<br />

<b>Structure format 2:</b><br />
With a 2D array of positive integers, [[/d,/d,..],[/d,/d,..],[/d,/d,..]]<br />
Each word in a line will match exactly the syllables specified for that line.<br />

Example: A `<structure>` of `[[1,2,2],[3,1,3],[1,4]]` can return:<br />

`A KITTY FOLLOWS`<br />
`ANYWHERE AND EVERYWHERE`<br />
`BUT BEGRUDINGLY`<br />

The inclusion of an optional, plain-text `[corpus]` file provides an input
from which the haiku is generated.

For educational and entertainment purposes only.
