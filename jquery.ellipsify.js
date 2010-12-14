/*!
*   ellipsify jQuery Plugin
*   V1.3
*   ethagnawl@gmail.com
*   http://ethagnawl.com/ellipsify
*   Copyright 2010, Pete Doherty
*   Date: 12/13/2010 24:22:16 (EST)
*
*   ellipsify is distributed under the terms of the GNU General Public License.
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
*   GNU General Public License for more details.
*
*   http://www.gnu.org/licenses/gpl.txt
*/

(function ($) {
	$.fn.ellipsify = function (options) {
        function truncate(inner, count, $elem) {
            var i
                ,   last_word = inner[count-1]
            ;
            if (config.split_join === no_space) {
                for (i = 0; i < count; i += 1) {
                    if (inner[i] === space) {
                        count += 1;
                    }
                }
            }
            if (/\.$/.test(last_word)) {
                inner[count-1] = last_word.replace('.', no_space);
            }
            if ($elem.next().length) {
                $elem.nextAll().remove();
            }
            $elem.addClass(config.ellipsify_class).html(inner.slice(0, count).join(config.split_join) + config.ellip);
        }		
		var no_space = ''
            ,   space = ' '
            ,   words = 'words'
            ,   config = {
                    count: 25,
                    ellip: '...',
                    ellipsify_class: 'ellipsis',
                    split_join: space,
                    type: words
            }
            ,   length = this.length
        ;
        if (options) {
            $.extend(config, options);
            config.split_join = config.type === words ? space : no_space;
        }
        if (length < 1) {
            return;	
        } else if (length === 1) {
            var inner = this.get(0).innerHTML.split(config.split_join);
            if (inner.length < config.count) {
                return;
            } else {
                truncate(inner, config.count, this);
            }
        } else {
            var loop_vars = {
                count: 0
            };
            $.each(this, function (i) {
                var $this = $(this)
                , inner = $this.get(0).innerHTML.split(config.split_join)
                , inner_length = inner.length;
                loop_vars.prev = i -= 1;
                if (inner_length + loop_vars.count < config.count) {
                    loop_vars.count += inner_length;
                } else {
                    truncate(inner, loop_vars.prev < 0 ? config.count : config.count - loop_vars.previous_length, $this);
                }
                loop_vars.previous_length = inner_length;
            });
        }
        return this;
    };
})(jQuery);
