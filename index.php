<!DOCTYPE HTML>
<html lang="ru-RU">
<head>
	<title></title>
	<meta charset="UTF-8">
</head>
<body>
<p>1 this is a paragraph 2 t dskhds ka asikdh gaskj <span>get</span> <a>it</a> poppin his is a paragraph 3 this.</p>	
<p>2 this is a paragraph 2 t dskhds ka asikdh gaskj get it poppin his is a paragraph 3 this.</p>	
<p>3 this is a paragraph 2 t dskhds ka asikdh gaskj get it poppin his is a paragraph 3 this.</p>	
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
(function ($) {

	$.fn.ellipsis = function (options) {

		var ellip = '...',
			config = {
				count: 25,
				split_on: ' ',
				join_on: ' ',
			},
			//           x,
			inner,
			split_on,
			join_on,
			obj = this,
			//           count = 0,
			//          item = [],
			four_check = function (string_plus_ellipsis) {
				return (/\....$/.test(string_plus_ellipsis)) ? (string_plus_ellipsis.replace('....', ellip)) : string_plus_ellipsis;
			},
			build_node = function (arr, counter) {
				return (arr.splice(0, counter)).join(join_on) + ellip;
			},
			maker = function (inner, count, that) {
				var string_plus_ellipsis = build_node(inner, count);
				string_plus_ellipsis = four_check(string_plus_ellipsis);
				$(that).addClass('ellipsis').text(string_plus_ellipsis).nextAll().remove();
			}
		;
           
		if (options) {
			$.extend(config, options);
		}
			
		var words = config.count;
		split_on = (config.type === 'words') ? ' ' : '';
		join_on = split_on; 

		if (obj.length > 1) {

			$.each(obj, function (i) {

				inner = $(this).text().split(split_on),
				inner_count = inner.length,
				total = inner_count + count, prev = i - 1;

				item.push(inner_count);

				if (total > words) {

					for (var z = 0; z < inner.length; z++) {

						count++;

						if (count === words) {

							if (prev === -1 || 0) {

								maker(inner, count, this);

							}

							else {

								maker(inner, count - item[prev], this);

							}

						}

					}

				}

			   else {

				   count += inner_count;

			   }

		   });

		}

		else {

		   inner = $(this).text().split(split_on);

		   maker(inner, words, this);
		}

	   return this;

   };
})(jQuery);

$('p').ellipsis({
	count:59,
	type:'chars'
});

</script>
</body>
</html>
