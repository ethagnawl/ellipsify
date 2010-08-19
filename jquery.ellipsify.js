/*!
*	ellipsify jQuery Plugin
*	V1.1
*	ethagnawl@gmail.com
*	http://ethagnawl.com/ellipsify
*	Copyright 2010, Pete Doherty
*	Date: Thu Aug 19 2010 02:14:04
*/

(function($){

	$.fn.ellipsify = function(options){

		var config = {
					count: 25,
					ellip: '...',
					no_ellipsify: 'Not enough text to ellipsify, try passing in a lower count arg if ellipsification is desired.',
					split_join: ' ',
					type: 'words'
				}
			,	count = 0
			,	inner
			,	inner_count_arr = []
			,	prev
			,	console = function(msg){
					if(window.console){
						window.console.log(msg);
					}	
				}	
			,	maker = function(inner, count, elem){

					var	$elem = $(elem)
						,	last_word = inner[(count-1)]
					;

					//	check to see if last word ends with "." and if so, remove it
					//	"last_word..." is prettier than "last_word...."
					if((/\.$/.test(last_word))){

						inner[(count-1)] = last_word.replace('.', '');

					}

					//	add "string..." or "string <a href='/'>Link</a>" back into elem
					$elem.addClass('ellipsis').html((inner.splice(0, count)).join(config.split_join)+config.ellip);

					//	if elem has subsequent siblings, remove them
					if($elem.next().length>0){
						$elem.nextAll().remove();
					}	

				}		
		;
		
		//	override config if user supplied options
		if(options){
		
			$.extend(config, options);
			
			//	set split/join on chars or words	
			config.split_join = (config.type === 'words') ? ' ' : '';
			
		}

		//	1 elem
		if(this.length === 1){

			inner = $(this).text().split(config.split_join);
			
			if(inner.length >= config.count){

				maker(inner, config.count, this);

			}

			else{

				console(config.no_ellipsify);

			}	

		}

		//	more than 1 elem
		else if(this.length > 1){

			$.each(this, function(i){

				inner = $(this).text().split(config.split_join)
					,	inner_count = inner.length
					,	total = inner_count + count
					,	prev = i - 1
				;

				// add elem's inner length to inner_count_arr
				inner_count_arr.push(inner_count);

				//	if the end point is in this elem...
				if(total > config.count){

					//	loop through indices until count matches config.count
					while(count<config.count){

						count++;

						//	if this index matches config.count... 
						if (count === config.count){

							//	if this elem is the first in the collection
							//	operate normally 
							if (prev < 0){

								maker(inner, count, this);

							}

							//	else operate on the elem containing the break point
							//	and not prior elems
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
		
			console('No elements to ellipsify.');	
			
		}

		return this;

	};

})(jQuery);
