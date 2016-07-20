# haiku_generator
usage: node haiku_generator.js <structure> [corpus]
Example: node haiku_generator.js [5,7,5] fifty_shades.txt
Example: node haiku_generator.js [[1,2,2],[3,1,3],[1,4]]

Structure format 1:
With a 1D array of positive integers, [/d,/d,/d]
Each line only has to add up to the syllable count for that line.
Recommended when a [corpus] is included.
Example: [5,7,5] can return:
A KITTY FOLLOWS, ANYWHERE AND EVERYWHERE, BUT BEGRUDINGLY

Structure format 2:
With a 2D array of positive integers, [[/d,/d,..],[/d,/d,..],[/d,/d,..]]
Each word in a line will match exactly the syllables specified for that line.
Example: [[1,2,2],[3,1,3],[1,4]] can return:
A KITTY FOLLOWS, ANYWHERE AND EVERYWHERE, BUT BEGRUDINGLY

The inclusion of an optional [corpus] file provides an input
from which the haiku is generated.

For educational and entertainment purposes only.