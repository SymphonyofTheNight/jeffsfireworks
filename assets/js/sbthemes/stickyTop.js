/* eslint-disable */
import $ from 'jquery';

export default function (t, ev) {

   // ========================================================================
    // Show On Top Header
    // ========================================================================
   
    const stickyHeader = $('[data-sticky-header]');
    const stickymHeader = $('[data-sticky-mheader]');
    
    
    function topPanel(stickyHeader) {
        var duration = {headerTransform: 500},
        $window = $(window),
        $header = stickyHeader,
        $wrapper = $("body"),
        active = false,
        headerStaticHeight = $header.outerHeight(),
        headerHeight = $header.outerHeight(),
        latent = $window.scrollTop() >= headerHeight;
        var $heightNew = $header.outerHeight();
        var windowWidth = window.innerWidth || document.documentElement.clientWidth; 
        var positionHeader = - $header.height();
        
        var reculcPosHeader = function () {
            var headerCompact = false;
            if (!$header.hasClass("navbar-compact")) {
                headerCompact = true;
                $header.addClass("navbar-compact");
            }
            positionHeader = - $header.height() - 100;
            if (headerCompact) $header.removeClass("navbar-compact");
            if (parseInt($header.css("top")) < -1) $header.css("top", positionHeader + "px");
        };
        
      
		$window.scroll(function () {
			if (!latent && $window.scrollTop() >= headerStaticHeight) {
				$header.addClass("navbar-compact");
				reculcPosHeader();
				$header.css("top", positionHeader + "px");
				//push the header giving it a top-margin
				if (windowWidth > 1200 )  $wrapper.css("margin-top", headerStaticHeight + "px");
				latent = true;
				if (!$(".navbar-switcher-container").length){
					active = !active;
					$header.animate({
						top: active ? "0" : positionHeader
					}, {
						duration: duration.headerTransform
					})
				}
			} else if (latent && $window.scrollTop() < headerStaticHeight) {
				//push the header giving it a top-margin
				$wrapper.css("margin-top", "0px");
				$header.removeClass("navbar-compact");
				$header.css("top", "0px");
				active = false;
				latent = false;
			}
			
		});
    }

   topPanel(stickyHeader);
   topPanel(stickymHeader);
}
