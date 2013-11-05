/*! 
 * author: wuqiang
 * Version: 1.0
 *
 */
;(function(doc) {
    $.fn.DragResize = function() {
        var position = false,
            size = false,
            direction,
            positionX,
            positionY,
            left,
            top,
            right,
            bottom,
            innerHTML = '<i id="rd" class="dot"></i>\
                         <i id="ld" class="dot"></i>\
                         <i id="ru" class="dot"></i>\
                         <i id="lu" class="dot"></i>\
                         <i id="r" class="dot"></i>\
                         <i id="l" class="dot"></i>\
                         <i id="u" class="dot"></i>\
                         <i id="d" class="dot"></i>',
            $this = $(this);

        $this.html(innerHTML);
        var dots = $('.dot');

        function moveUp(y) {
            var height = bottom - y;
            if (height > 0) {
                $this.css({
                    top: y,
                    height: height
                });
            } else {
                $this.css({
                    top: bottom,
                    height: y - bottom
                });
            }
        }

        function moveDown(y) {
            var height = y - top;
            if (height > 0) {
                $this.css({
                    height: height
                });
            } else {
                $this.css({
                    top: y,
                    height: top - y
                });
            }
        }

        function moveLeft(x) {
            var width = right - x;
            if (width > 0) {
                $this.css({
                    left: x,
                    width: width
                });
            } else {
                $this.css({
                    left: right,
                    width: x - right
                });
            }
        }

        function moveRight(x) {
            var width = x - left;
            if (width > 0) {
                $this.css({
                    width: width
                });
            } else {
                $this.css({
                    left: x,
                    width: left - x
                });
            }
        }

        $this.mousedown(function(event) {
            event.stopPropagation();
            $this.fadeTo(20, 0.3);

            position = true;
            positionX = event.pageX - (parseInt($this.css("left"), 10) || 0);
            positionY = event.pageY - (parseInt($this.css("top"), 10) || 0);
        });

        dots.mousedown(function(event) {
            event.stopPropagation();
            $this.fadeTo(20, 0.3);

            size = true;
            left = parseInt($this.css("left"), 10);
            top = parseInt($this.css("top"), 10);
            right = left + $this.width();
            bottom = top + $this.height();
            direction = this.id;
        });

        $(doc).mouseup(function() {
            position = size = false;
            $this.fadeTo(20, 1);
        });

        $(doc).mousemove(function(event) {
            var x = event.pageX,
                y = event.pageY;

            if (position) {
                // move position
                $this.css({
                    top: y - positionY,
                    left: x - positionX
                });
            }

            if (size) {
                // move size
                switch (direction) {
                    case 'u':
                        // move top-center dot
                        moveUp(y);
                        break;
                    case 'd':
                        // move bottom-center dot
                        moveDown(y);
                        break;
                    case 'l':
                        // move left-center dot
                        moveLeft(x);
                        break;
                    case 'r':
                        // move right-center dot
                        moveRight(x);
                        break;
                    case 'lu':
                        // move left-top dot
                        moveLeft(x);
                        moveUp(y);
                        break;
                    case 'ld':
                        // move left-bottom dot
                        moveLeft(x);
                        moveDown(y);
                        break;
                    case 'ru':
                        // move right-top dot
                        moveRight(x);
                        moveUp(y);
                        break;
                    case 'rd':
                        // move right-bottom dot
                        moveRight(x);
                        moveDown(y);
                        break;
                    default:
                        return;
                }
            }
        });
    };
})(document);
