/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');
		$headerMobile = $('#header-mobile'),
		$headerDesktop = $('#header-desktop'),
		$banner = $('.banner');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
	$window.on('load', function() {
		$body.removeClass('is-preload');
	});


	// Header.
	if (
		$banner.length > 0
		&& $headerMobile.css('display') !== "none"
		&& $headerMobile.hasClass('alt')
	) {
		$window.on('resize', function() { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom:		$headerMobile.outerHeight(),
			terminate:	function() { $headerMobile.removeClass('alt'); },
			enter:		function() { $headerMobile.addClass('alt'); },
			leave:		function() { $headerMobile.removeClass('alt'); }
		});
	}

	if (
		$banner.length > 0
		&& $headerDesktop.css('display') !== "none"
		&&	$headerDesktop.hasClass('alt')
	) {
		$window.on('resize', function() { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom:		$headerDesktop.outerHeight(),
			terminate:	function() { $headerDesktop.removeClass('alt'); },
			enter:		function() { $headerDesktop.addClass('alt'); },
			leave:		function() { $headerDesktop.removeClass('alt'); }
		});
	}

// Menu.
	var $menu = $('#menu');

	$menu._locked = false;

	$menu._lock = function() {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function() {
			$menu._locked = false;
		}, 0);

		return true;

	};

	$menu._show = function() {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function() {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function() {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menu
		.appendTo($body)
		.on('click', function(event) {

			event.stopPropagation();

			// Hide.
				$menu._hide();

		})
		.find('.inner')
			.on('click', '.close', function(event) {

				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();

				// Hide.
					$menu._hide();

			})
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			});

	$body
		.on('click', 'a[href="#menu"]', function(event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
				$menu._toggle();

		})
		.on('keydown', function(event) {

			// Hide on escape.
				if (event.keyCode == 27)
					$menu._hide();

		});

})(jQuery);