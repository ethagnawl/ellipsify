/*!
*	Ellipsify jQuery Plugin
*	V1.1
*	ethagnawl@gmail.com
*	http://ethagnawl.com/Ellipsify
*	Copyright 2010, Pete Doherty
*	Date: Thu Aug 19 2010 02:14:04
*/

(function($){

	$.fn.Ellipsify = function(options){

		var config = {
					count: 25,
					ellip: '...',
					join_on: ' ',
					no_ellipsify: 'Not enough text to Ellipsify, try passing in a lower count arg if Ellipsification is desired.',
					split_on: ' ',
					type: 'words'
				}
			,	console = function(msg){
					if(window.console){
						window.console.log(msg);
					}	
			}	
			,	count = 0
			,	elems = this
			,	inner
			,	inner_count_arr = []
			,	maker = function(inner, count, elem){

					var	$elem = $(elem)
						,	last_word = inner[(count-1)]
					;

					// check to see if last word ends with "." and if so, remove it
					// "last_word..." is prettier than "last_word...."
					if((/\.$/.test(last_word))){

						inner[(count-1)] = last_word.replace('.', '');

					}

					// add "string..." or "string <a href='/'>Link</a>" back into elem
					$elem.addClass('ellipsis').html((inner.splice(0, count)).join(config.join_on)+config.ellip);

					// if elem has subsequent siblings, remove them
					if($elem.next().length>0){
						$elem.nextAll().remove();
					}	

				}		
		;
		
		// override config if user supplied options
		if(options){
			$.extend(config, options);
			
			// set split/join on chars or words	
			var split = (config.type === 'words') ? ' ' : '';
			config.split_on = split
				,	config.join_on = split
			;
			
		}

		// only 1 elem
		if(elems.length === 1){

			inner = $(this).text().split(config.split_on);
			
			if(inner.length >= config.count){

				maker(inner, config.count, this);

			}

			else{

				console(config.no_ellipsify);

			}	

		}

		// more than 1 elem
		else if(elems.length > 1){

			$.each(elems, function(i){

				// loop vars	
				inner = $(this).text().split(config.split_on)
					,	inner_count = inner.length
					,	total = inner_count + count
					,	prev = i - 1
				;

				// add elem's inner length to inner_count_arr
				inner_count_arr.push(inner_count);

				// if the end point is in this elem...
				if(total > config.count){

					// loop through each split in the array until break point
					for (var z = 0; z < inner.length; z++){

						count++;

						// if this split point is the end... 
						if (count === config.count){

							// if this elem is the first in the collection
							// operate normally 
							if (prev === -1){

								maker(inner, count, this);

							}

							// else operate on the elem containing the break point
							// and not prior elems
							else{

								maker(inner, count - inner_count_arr[prev], this);

							}

						}

					}
	
				}

				else{

					count += inner_count;

				}
				
			});

			if(count < config.count){

				console(config.no_ellipsify);

			}
		
		}

		else{
		
			console('No elements to Ellipsify.');	
			
		}

		return this;

	};

})(jQuery);
