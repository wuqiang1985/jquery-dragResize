/*! 
 *
 * author:  wuqiang
 * email:   112055730@qq.com
 * date:    2013-11-05
 * Version: 1.0
 *
 */
;(function($) {
    $.fn.dragResize = function(options) {
        return this.each(function() {
            var doc = document,
                defaultSettings = {
                    onMouseUp: null
                },
                settings = $.extend({}, defaultSettings, options),
                position = false,
                size = false,
                direction,
                positionX,
                positionY,
                left,
                top,
                right,
                bottom,
                innerHTML = '<i data-id="rd" class="dot rd"></i>\
                             <i data-id="ld" class="dot ld"></i>\
                             <i data-id="ru" class="dot ru"></i>\
                             <i data-id="lu" class="dot lu"></i>\
                             <i data-id="r" class="dot r"></i>\
                             <i data-id="l" class="dot l"></i>\
                             <i data-id="u" class="dot u"></i>\
                             <i data-id="d" class="dot d"></i>',
                $this = $(this);

            $this.html(innerHTML);
            var dots = $this.find('.dot');

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

                var offset = $this.offset();

                size = true;
                left = parseInt(offset.left, 10);
                top = parseInt(offset.top, 10);
                right = left + $this.width();
                bottom = top + $this.height();
                direction = $(this).attr('data-id');
            });

            $(doc).mouseup(function() {
                position = size = false;
                $this.fadeTo(20, 1);
                window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();
                $.isFunction(settings.onMouseUp) && settings.onMouseUp();
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
        });
    };
})(jQuery);