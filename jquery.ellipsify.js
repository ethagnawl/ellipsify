/*!
*   ellipsify jQuery Plugin
*   V1.2
*   ethagnawl@gmail.com
*   http://ethagnawl.com/ellipsify
*   Copyright 2010, Pete Doherty
*   Date: 08/30/2010 23:22:16 (EST)
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

(function($){
	$.fn.ellipsify = function(options){
		var no_space = ''
            ,   space = ' '
            ,   words = 'words'
            ,   config = {
                    count: 25,
                    ellip: '...',
                    ellipsify_class: 'ellipsis',
	                no_ellipsify_count: 'Not enough text to ellipsify, try passing in a lower count arg if ellipsification is desired.',
	                no_ellipsify_elems: 'No elements to ellipsify.',
                    split_join: space,
                    type: words
            }
            ,   length = this.length
	        ,	console = function (msg) {
                    if (window.console) window.console.log(msg);
                }	
	        ,	truncate = function (inner, count, $elem) {
                    var last_word = inner[count-1];
                    if (config.split_join === no_space) for (i = 0; i < count; i++) if (inner[i] === space) count++;
                    if (/\.$/.test(last_word)) inner[count-1] = last_word.replace('.', no_space);
                    if ($elem.next().length) $elem.nextAll().remove();
                    $elem.addClass(config.ellipsify_class).html(inner.slice(0, count).join(config.split_join) + config.ellip);
            }		
        ;
        if (options) {
            $.extend(config, options);
            config.split_join = config.type === words ? space : no_space;
        }
        if (length < 1) {
            console(config.no_ellipsify_elems);	
        } else if (length === 1) {
            var inner = this.get(0).innerHTML.split(config.split_join);
            inner.length < config.count ? console(config.no_ellipsify_count) : truncate(inner, config.count, this);
        } else {
            var loop_vars = {count: 0};
            $.each(this, function (i) {
                var $that = $(this), i = i, inner = $that.get(0).innerHTML.split(config.split_join), inner_length = inner.length;
                loop_vars.prev = i - 1;
                inner_length + loop_vars.count < config.count ? loop_vars.count += inner_length : truncate(inner, loop_vars.prev < 0 ? config.count : config.count - loop_vars.previous_length, $that);
                loop_vars.previous_length = inner_length;
            });
        }
        return this;
    };
})(jQuery);
