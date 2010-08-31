/*!
*	ellipsify jQuery Plugin
*	V1.2
*	ethagnawl@gmail.com
*	http://ethagnawl.com/ellipsify
*	Copyright 2010, Pete Doherty
*	Date: 08/30/2010 23:22:16 (EST)
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
					split_join: space,
					type: words
				}
			,   length = this.length
			,   no_ellipsify = 'Not enough text to ellipsify, try passing in a lower count arg if ellipsification is desired.'
			,	console = function (msg) {
		            if (window.console) window.console.log(msg);
	            }	
			,	maker = function (inner, count, $elem) {
			        var last_word = inner[count-1];
					if (/\.$/.test(last_word)) inner[count-1] = last_word.replace('.', no_space);
					$elem.addClass(config.ellipsify_class).html(inner.slice(0, count).join(config.split_join) + config.ellip);
					if ($elem.next().length) $elem.nextAll().remove();
				}		
		;
		if (options) {
			$.extend(config, options);
			config.split_join = config.type === words ? space : no_space;
		}
		if (length < 1) {
			console('No elements to ellipsify.');	
		} else if (length === 1) {
			var inner = this.get(0).innerHTML.split(config.split_join);
			inner.length < config.count ? console(no_ellipsify) : maker(inner, config.count, this);
		} else {
			var count = 0, inner_count_arr = [], inner_length, prev, $that;
			$.each(this, function (i) {
                var $that = $(this), inner = $that.get(0).innerHTML.split(config.split_join);
                inner_length = inner.length, prev = i - 1;
				inner_count_arr.push(inner_length);
				if (inner_length + count < config.count) {
                    count += inner_length;
                } else {
					while (count < config.count) {
						count++;
					}
                    maker(inner, prev < 0 ? config.count : count - inner_count_arr[prev], $that);
				}
			});
		}
		return this;
	};
})(jQuery);
