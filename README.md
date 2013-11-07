jquery-dragResize
=================
We have a div which has 8 points on the lines, we need to drag the div to move, also we need drag the points to resize the div.

How to do this? It's fairly easy, just use $("selector").dragResize();
That's all.

Note: when the div's parent container's position is relative, the resize function will not be accurate in "left" and "top" direction.
while 'right' and 'bottom' direction are fine.
why? Due to drag up or left which need to modify div 'top' or 'left', if the div's parent container's position is relative, oops...