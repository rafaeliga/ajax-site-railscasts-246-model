// if (history && history.pushState) {
//   $(function() {
//     $("#products th a, #products .pagination a, #categories th a, #categories .pagination a").live("click", function(e) {
//       $.getScript(this.href);
//       history.pushState(null, document.title, this.href);
//       e.preventDefault();
//     });
//     $("#products_search input, #categories_search input").keyup(function() {
//       $.get($("#products_search").attr("action"), $("#products_search").serialize(), null, "script");
//       history.replaceState(null, document.title, $("#products_search").attr("action") + "?" + $("#products_search").serialize());
// 
// 			$.get($("#categories_search").attr("action"), $("#categories_search").serialize(), null, "script");
//       history.replaceState(null, document.title, $("#categories_search").attr("action") + "?" + $("#categories_search").serialize());
//     });
//     $(window).bind("popstate", function() {
//       $.getScript(location.href);
//     });
//   });
// } else {
	
	// IE
	
	
	// $(function() {
	// 
	//   // Hide the form button
	//   $('#products_search input[type="submit"]').hide();
	// 
	//   // Push searches onto the location hash
	//   var inputTimeoutId = -1;
	//   $('#products_search input').keyup(function() {
	//     window.clearTimeout(inputTimeoutId); // Reset the input timer.
	//     // Push the state into bbq - will be caught by hashchange event which triggers ajax
	//     inputTimeoutId = window.setTimeout(function() {
	//       $.bbq.pushState($('#products_search').serialize() + '&page=1'); // New search = start on page 1
	//     }, 250);
	//   });
	// 
	//   // On triggering submit manually it should do the search instantly :)
	//   $('form#products_search').submit(function(e) {
	//     e.preventDefault(); // Disable manual form submission
	//     window.clearTimeout(inputTimeoutId); // Reset the input timer.
	//     $.bbq.pushState($('#products_search').serialize() + '&page=1'); // New search = start on page 1
	//   });
	// 	
	//   // Push search result navigation requests onto the location hash
	//   $('#products th a, #products .pagination a, #menu li a').live('click', function(e) {
	//     // Instead of return false; // http://fuelyourcoding.com/jquery-events-stop-misusing-return-false/
	//     e.preventDefault();
	//     // Push the state into bbq - will be caught by hashchange event which triggers ajax
	//     $.bbq.load('/categories');
	//   });
	// 
	//   // Bind hash state change event
	//   $(window).bind('hashchange', function() {
	//     // Ajax Request on hashchange
	//     $.getScript($.param.querystring(document.location.href, $.param.fragment()));
	//   });
	//   // Catch any hash state change
	//   $(window).trigger('hashchange');
	// 
	// });
	
	// END IE
	
// }

// jquery-bbq

// 
// $(function(){
//   
//   // Keep a mapping of url-to-container for caching purposes.
//   var cache = {
//     // If url is '' (no fragment), display this div's content.
//     '': $('.bbq-default')
//   };
//   
//   // Bind an event to window.onhashchange that, when the history state changes,
//   // gets the url from the hash and displays either our cached content or fetches
//   // new content to be displayed.
//   $(window).bind( 'hashchange', function(e) {
//     
//     // Get the hash (fragment) as a string, with any leading # removed. Note that
//     // in jQuery 1.4, you should use e.fragment instead of $.param.fragment().
//     var url = $.param.fragment();
// 
//     // Remove .bbq-current class from any previously "current" link(s).
//     $( 'a.bbq-current' ).removeClass( 'bbq-current' );
//     
//     // Hide any visible ajax content.
//     $( '#yield' ).children( ':visible' ).hide();
//     
//     // Add .bbq-current class to "current" nav link(s), only if url isn't empty.
//     url && $( 'a[href="#' + url + '"]' ).addClass( 'bbq-current' );
//     
//     if ( cache[ url ] ) {
//       // Since the element is already in the cache, it doesn't need to be
//       // created, so instead of creating it again, let's just show it!
//       cache[ url ].show();
//       
//     } else {
//       // Show "loading" content while AJAX content loads.
//       // $( '.bbq-loading' ).show();
//       
//       // Create container for this url's content and store a reference to it in
//       // the cache.
//       cache[ url ] = $( '<div class="bbq-item"/>' )
//         
//         // Append the content container to the parent container.
//         .appendTo( '#yield' )
//         
//         // Load external content via AJAX. Note that in order to keep this
//         // example streamlined, only the content in .infobox is shown. You'll
//         // want to change this based on your needs.
//         .load( url, function(){
//           // Content loaded, hide "loading" content.
//           // $( '.bbq-loading' ).hide();
// 					alert("end loading");
//         });
//     }
//   })
//   
//   // Since the event is only triggered when the hash changes, we need to trigger
//   // the event now, to handle the hash the page may have loaded with.
//   $(window).trigger( 'hashchange' );
//   
// });

// END jquery-bbq

// History.js

(function(window,undefined){
	
	// Prepare our Variables
	var
		History = window.History,
		$ = window.jQuery,
		document = window.document;

	// Check to see if History.js is enabled for our Browser
	if ( !History.enabled ) {
		return false;
	}

	// Wait for Document
	$(function(){
		// Prepare Variables
		var
			/* Application Specific Variables */
			contentSelector = '#yield,#content,article:first,.article:first,.post:first',
			$content = $(contentSelector).filter(':first'),
			$menu = $('#menu,#nav,nav:first,.nav:first').filter(':first'),
			activeClass = 'active selected current youarehere',
			activeSelector = '.active,.selected,.current,.youarehere',
			menuChildrenSelector = '> li,> ul > li',
			/* Application Generic Variables */
			$body = $(document.body),
			rootUrl = History.getRootUrl(),
			scrollOptions = {
				duration: 800,
				easing:'swing'
			};
		
		// Ensure Content
		if ( $content.length === 0 ) {
			$content = $body;
		}
		
		// Internal Helper
		$.expr[':'].internal = function(obj, index, meta, stack){
			// Prepare
			var
				$this = $(obj),
				url = $this.attr('href')||'',
				isInternalLink;
			
			// Check link
			isInternalLink = url.substring(0,rootUrl.length) === rootUrl || (/[^\:]/).test(url);
			
			// Ignore or Keep
			return isInternalLink;
		};
		
		// HTML Helper
		var documentHtml = function(html){
			// Prepare
			var result = String(html)
				.replace(/<\!DOCTYPE[^>]*>/i, '')
				.replace(/<(html|head|body|title|meta)/gi,'<div id="document-$1"')
				.replace(/<\/(html|head|body|title|meta)/gi,'</div')
			;
			
			// Return
			return result;
		};
		
		// Ajaxify Helper
		$.fn.ajaxify = function(){
			// Prepare
			var $this = $(this);
			
			// Ajaxify
			$this.find('a:internal').click(function(event){
				// Prepare
				var
					$this = $(this),
					url = $this.attr('href'),
					title = $this.attr('title')||null;
				
				// Continue as normal for cmd clicks etc
				if ( event.which == 2 || event.metaKey ) { return true; }
				
				// Ajaxify this link
				History.pushState(null,title,url);
				event.preventDefault();
				return false;
			});
			
			// Chain
			return $this;
		};
		
		// Ajaxify our Internal Links
		$body.ajaxify();
		
		// Hook into State Changes
		$(window).bind('statechange',function(){
			// Prepare Variables
			var
				State = History.getState(),
				url = State.url,
				relativeUrl = url.replace(rootUrl,'');

			// Set Loading
			$body.addClass('loading');

			// Start Fade Out
			// Animating to opacity to 0 still keeps the element's height intact
			// Which prevents that annoying pop bang issue when loading in new content
			$content.animate({opacity:0},800);
			
			// Ajax Request the Traditional Page
			$.ajax({
				url: url,
				success: function(data, textStatus, jqXHR){
					// Prepare
					var
						$data = $(documentHtml(data)).find('#document-body'),
						$menuChildren, contentHtml;
					
					// Fetch the content
					contentHtml = $data.find(contentSelector).filter(':first').html()||$data.html();
					if ( !contentHtml ) {
						document.location.href = url;
						return false;
					}
					
					// Update the menu
					$menuChildren = $menu.find(menuChildrenSelector);
					$menuChildren.filter(activeSelector).removeClass(activeClass);
					$menuChildren = $menuChildren.has('a[href^="'+relativeUrl+'"],a[href^="/'+relativeUrl+'"],a[href^="'+url+'"]');
					if ( $menuChildren.length === 1 ) { $menuChildren.addClass(activeClass); }
					
					// Update the content
					$content.stop(true,true);
					$content.html(contentHtml).ajaxify().css('opacity',100).show(); /* you could fade in here if you'd like */
					
					// Complete the change
					if ( $content.ScrollTo||false ) { $content.ScrollTo(scrollOptions); } /* http://balupton.com/projects/jquery-scrollto */
					$body.removeClass('loading');
	
					// Inform Google Analytics of the change
					if ( typeof window.pageTracker !== 'undefined' ) {
						window.pageTracker._trackPageview(relativeUrl);
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
					document.location.href = url;
					return false;
				}
			}); // end ajax

		}); // end onStateChange

	}); // end onDomLoad

})(window); // end closure

// END History.js