/*!
*	Ellipsify jQuery Plugin
*	ethagnawl@gmail.com
*	http://ethagnawl.com/ellipsify
*	Copyright 2010, Peter Doherty
*	Date: Wed Aug 18 2010 17:42:59
*/

(function($){

	$.fn.Ellipsify = function(options){

		var ellip = '...'
			,	config = {
					count: 25,
					type: 'words',
					split_on: ' ',
					join_on: ' ',
				}
			,	words = config.count
			,	split_on = (config.type === 'words') ? ' ' : ''
			,	join_on = split_on
			,	count = 0
			,	inner
			,	item = []
			,	join_on
			,	elems = this
			,	split_on
			,	four_check = function (string_plus_ellipsis) {
					return (/\....$/.test(string_plus_ellipsis)) ? (string_plus_ellipsis.replace('....', ellip)) : string_plus_ellipsis;
				}
			,	build_node = function(arr, counter){
					return (arr.splice(0, counter)).join(join_on)+ellip;
				}
			,	maker = function(inner, count, that){
					var string_plus_ellipsis = build_node(inner, count);
					string_plus_ellipsis = four_check(string_plus_ellipsis);
					$(that).addClass('ellipsis').text(string_plus_ellipsis).nextAll().remove();
				}
		;

		// if user supplied options, override config
		if(options){
			$.extend(config, options);
			words = config.count
				,	split_on = (config.type === 'words') ? ' ' : ''
				,	join_on = split_on
			;
		}

		// more than 1 element in jQuery collection?
		if(elems.length > 1){

			$.each(elems, function(i){

				// local vars	
				inner = $(this).text().split(split_on)
					, inner_count = inner.length
					, total = inner_count + count, prev = i - 1
				;

				// add elem's inner length to item arr <--- NEEDS TO BE RENAMED
				item.push(inner_count);

				// if the end point is in this elem...
				if(total > words){

					// loop through each split in array until end point
					for (var z = 0; z < inner.length; z++){

						count++;

						// if this split point is the end... 
						if (count === words){

							// if this elem is the first in the collection
							if (prev === -1 || 0){

								maker(inner, count, this);

							}

							// if this elem is not the first in the collection
							else{

								maker(inner, count - item[prev], this);

							}

						}

					}
	
				}

				else{

					count += inner_count;

				}

			});

		}

		// only 1 html element
		else{

			inner = $(this).text().split(split_on);
			maker(inner, words, this);

		}

		return this;

	};

})(jQuery);
