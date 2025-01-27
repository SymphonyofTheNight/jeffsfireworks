/* eslint-disable */
import $ from 'jquery';
import carousel from '../theme/common/carousel';
import utils from '@bigcommerce/stencil-utils';
import collapsibleFactory from '../theme/common/collapsible';
import 'jquery-countdown';
 
 
export default function (context) {
    // ========================================================================
    // Part of the header displayed only in mobile mode 
    // ========================================================================
	function headerDisplayMobile(){
		const headerContainer = $('header');
		
		if ( window.innerWidth <= 991) {
			headerContainer.addClass('header-mobile');
		} else {
			headerContainer.removeClass('header-mobile');
		}
		
		$(window).resize(function () {
			if ($(window).innerWidth() <= 991) {
				headerContainer.addClass('header-mobile');
			} else {
				headerContainer.removeClass('header-mobile');
			}
		});
	};
	headerDisplayMobile();
    // ========================================================================
    // Show Back To Top
    // ========================================================================
    function backScrollToTop() {
        const backtotop = $('.back-totop');
        const backPanelToggle = $('.back-panel-toggle');
        const backPanelShares = $('.back-panel-shares');
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
         backtotop.addClass("hidden-top");
        $(window).scroll(function () {
            if ($(this).scrollTop() === 0) {
                backtotop.addClass("hidden-top")
            } else {
                backtotop.removeClass("hidden-top")
            }
        });
 
        backtotop.click(function () {
            $('body,html').animate({scrollTop:0}, 500);
            return false;
        });
        backPanelToggle.click(function () {
            $(this).toggleClass('active');
            backPanelShares.toggleClass('active');
        });
         
        if (windowWidth > 1200 ) {
            backPanelToggle.removeClass('active');
            backPanelShares.removeClass('active'); 
        }else{
            backPanelToggle.addClass('active');
            backPanelShares.addClass('active');
        }
    }
     $(window).resize(function() {
        backScrollToTop();
    });
    backScrollToTop();
     
    // ------------------------------------------------------------------------
    // Product CountDown
    // ------------------------------------------------------------------------
    function productCountDown() {
        const countDownProduct = $(".defaultCountdown");
        countDownProduct.each(function(i) {
            $('.defaultCountdown-'+$(this).data("countdown-id")).countdown($(this).data("timer"), function(event) {
                var $this = $(this).html(event.strftime(
                    '<div class="time-item time-day"><div class="num-time">%D</div><div class="name-time">Day%!d </div></div>'
                   + '<div class="time-item time-hour"><div class="num-time">%H</div><div class="name-time">Hour%!H</div></div>'
                   + '<div class="time-item time-min"><div class="num-time">%M</div><div class="name-time">Min%!M </div></div>'
                   + '<div class="time-item time-sec"><div class="num-time">%S</div><div class="name-time">Sec%!S</div></div>'));
                $this.on('finish.countdown', function(event){
                    $(this).hide();
                });
            });
            /*$('.defaultCountdown-'+$(this).data("countdown-id")).countdown('stop');*/
        });
         
    }
    productCountDown();
   
     
    // ========================================================================
    // SB Theme - CardGallery
    // ========================================================================
    function cardGallery() {
        $('.product-card__gallery .item-img').on("mouseover touchstart", function (e) {
            $(this).addClass('thumb-active').siblings().removeClass('thumb-active');
            var thumb_src = $(this).attr("data-src");
            $(this).closest('.product-item-container').find('img.img-responsive').attr("src",thumb_src);
        }); 
    }
    cardGallery();
    
    // ========================================================================
    // SB Theme - getPage Ajax Product
    // ========================================================================
    function getPage($placeholder, tmpl, urlKey = 'itemsSblisting') {
        let template = tmpl;
        if ($placeholder.data('urltemplate')) { template = $placeholder.data('urltemplate'); }
        let url = $placeholder.data(urlKey);
        url = url.replace(/https?:\/\/[^\/]+/, ''); 
 
        utils.api.getPage(url, { template }, (err, resp) => {
            $placeholder.html(resp);
            
            // init products carousel
            $('[data-slick]', $placeholder)
            .slick();
            cardGallery();
            productCountDown();
           
        });
    }
     
     
     
    // ========================================================================
    // SB Theme -  Ajax load Deals
    // ========================================================================
    function initAjaxDeals() {
        const template = 'sbthemes/module/sb_deals/default/default_deals_item';
        const urlKey = 'productsByCategoryTabs';
        $('[data-products-by-category-tabs]').each((i, placeholder) => {
            getPage($(placeholder), template, urlKey);
           
        });
         
    }
    initAjaxDeals();
     
     
    // ========================================================================
    // Ajax load  in sb listing tabs
    // - Only load products in active tab (has class .is-active)
    // - Ajax load products when a tab is open
    // ========================================================================
    function initAjaxListingTabs() {
        const template = 'sbthemes/module/sb_listing_tabs/default_items';
        const urlKey = 'itemsSblisting';
 
        // Ajax request loading products in the active tab
        $('.is-active[data-items-sblisting]').each((i, placeholder) => {
            getPage($(placeholder), template, urlKey);
        });
 
        $('[data-tab-sblisting]').on('toggled', (event, tab) => {
            getPage($($('a', tab).attr('href')), template, urlKey);
        });
    }
    initAjaxListingTabs();
     
    function enableSelectBoxes() {
		$('.sb-listing-tabs').each(function() {
			const tag_id =  $(this).attr('id');
			
			(function (element) {
				const $element = $(element);
				const $tab = $('.tab', $element);
				const $tab_wrap = $('.ltabs-tabs-wrap',$element);
				const $tab_label_select = $('.ltabs-tab-selected',$element);
				
				$tab_label_select.html($tab.filter('.is-active').children('.tab-title').html());
				
				if ( window.innerWidth <= 991) {
					$tab_wrap.addClass('ltabs-selectbox');
				} else {
					$tab_wrap.removeClass('ltabs-selectbox');
				}
				
				$('span.ltabs-tab-selected, span.ltabs-tab-arrow', $element).click(function () {
					if ($('.ltabs-tabs', $element).hasClass('ltabs-open')) {
						$('.ltabs-tabs', $element).removeClass('ltabs-open');
					} else {
						$('.ltabs-tabs', $element).addClass('ltabs-open');
					}
				});
				$tab.click(function () {
					if ($(this).parents('.ltabs-tabs').hasClass('ltabs-open')) {
						$(this).parents('.ltabs-tabs').removeClass('ltabs-open');
					}
					$tab_label_select.html($(this).children('.tab-title').html());
				});
				
				$(window).resize(function () {
					if ($(window).innerWidth() <= 991) {
						$tab_wrap.addClass('ltabs-selectbox');
					} else {
						$tab_wrap.removeClass('ltabs-selectbox');
					}
				});
				
				
			})('#'+tag_id);
		});
	}
	enableSelectBoxes();
	
    // ------------------------------------------------------------------------
    // collapsibles categories on sidebar
    // ------------------------------------------------------------------------
    const $navListToggle = $('.navList .navList-toggle');
    const $curMenuItem = $('.navList .is-current');
    const collapsibles = [];
 
    if ($curMenuItem.hasClass('has-subMenu')) {
        collapsibles.push($curMenuItem.parent('.navList-item').children('[data-collapsible]'));
    }
 
    $navListToggle.parents('.navList-subMenu-item, .navList-item').children('[data-collapsible]').each((i, el) => {
        collapsibles.push(el);
    });
 
    $.each(collapsibleFactory(collapsibles), (i, o) => {
        o.close();
    });
	 
         
	// Resonsive Sidebar aside
	$(".open-sidebar").click(function(e){
		e.preventDefault();
		 
		$(".sidebar-overlay").toggleClass("show");
		$(".sidebar-offcanvas").toggleClass("active");
	});
	   
	$(".sidebar-overlay").click(function(e){
		e.preventDefault();
		$(".sidebar-overlay").toggleClass("show");
		$(".sidebar-offcanvas").toggleClass("active");
	});
	$('#close-sidebar').click(function() {
		$('.sidebar-overlay').removeClass('show');
		$('.sidebar-offcanvas').removeClass('active');
		 
	}); 
	
    // Resonsive footer Top
	$(".collapsed-block .expander").click(function (e) {
		var collapse_content_selector = $(this).parent().next();
		var expander = $(this).parent();
		
		if (!$(collapse_content_selector).hasClass("open")) {
			expander.addClass("open") ;
		}
		else expander.removeClass("open");
		
		if (!$(collapse_content_selector).hasClass("open")) $(collapse_content_selector).addClass("open").slideDown("normal");
		else $(collapse_content_selector).removeClass("open").slideUp("normal");
		e.preventDefault()
	})
    // ========================================================================
    // SB Theme -  Show Megamenu
    // ========================================================================
    const itemver = $('[data-collapsible-limit]').data("collapsible-limit");
    const textmore = $('[data-collapsible-limit]').data("collapsible-textmore");
    const textclose = $('[data-collapsible-limit]').data("collapsible-textclose");
     
    function showMega() {
        var verticalMega =$(".verticalCategories ul.navPages-list > li");
        if(itemver <= $(verticalMega).length) $('.verticalCategories ul.navPages-list').append('<li class="navPages-item loadmore"><div class="navPages-action"><i class="fa fa-plus-circle"></i><span class="more-view"> '+textmore+'</span> </div></li>');
        var show_itemver = itemver-1 ;
        $(verticalMega).each(function(i){
            if(i>show_itemver){
                $(this).css('display', 'none');
            }
        });
         
        $(".verticalCategories .loadmore").click(function(){
            if($(this).hasClass('open')){
                $(verticalMega).each(function(i){
                    if(i>show_itemver){
                        $(this).slideUp(200);
                        $(this).css('display', 'none');
                    }
                });
                $(this).removeClass('open');
                $('.loadmore').html('<div class="navPages-action"><i class="fa fa-plus-circle"></i> <span class="more-view">' +textmore+ '</span></div>');
            }else{
                $(verticalMega).each(function(i){
                    if(i>show_itemver){
                        $(this).slideDown(200);
                    }
                });
                $(this).addClass('open');
                $('.loadmore').html('<div class="navPages-action"><i class="fa fa-minus-circle"></i> <span class="more-view">'+textclose+'</span></div>');
            }
        });
         
        var wd_width = $(window).width();
        if (wd_width <= 1200) {
            $('.megamenuToogle-wrapper').on('touchstart', function(e){
                e.preventDefault();
                e.stopPropagation();
                if (!$(this).next().hasClass("is-open")) {
                    $(this).next().addClass("is-open");
                     
                }else{
                    $(this).next().removeClass("is-open");
                }
                 
            });
            
        }
    }
     
    showMega();
    collapsibleFactory();
    // ========================================================================
    // FBMessage
    // ========================================================================
    function fbMessage(){
        $(document).on('click', '.sb-fb-ms-bottom', function() {
            $(this).prev('.sb-fb-ms-inner').show();
            $(this).hide();
        })
 
        $(document).on('click', '.offline_heading', function() {
            $(this).parent('.sb-fb-ms-inner').hide();
            $(this).parent().next('.sb-fb-ms-bottom').show();
        })
    }
    fbMessage();
     
    
    
    // ========================================================================
    // SB Theme - BONUS PAGE  
    // ========================================================================
    function showAccordion(){
         
        $("ul.yt-accordion li").each(function() {
            if($(this).index() > 0) {
                $(".yt-accordion-inner").hide();
                $(".enable+.yt-accordion-inner").show();
                $(".enable+.yt-accordion-inner").addClass("active");
            }
            else {
                $(".enable").addClass('active');
            }
            var ua = navigator.userAgent,
            event = (ua.match(/iPad/i)) ? "touchstart" : "click";
            $(this).children(".accordion-heading").bind(event, function() {
                 
                if($(this).hasClass("active"))
                {
                    $(this).removeClass("active");
                    $(this).siblings(".yt-accordion-inner").removeClass("active");
                    $(this).siblings(".yt-accordion-inner").slideUp(350);
                }
                else
                {
                    $(this).addClass("active");
                    $(this).siblings(".yt-accordion-inner").addClass("active");
                    $(this).siblings(".yt-accordion-inner").slideDown(350);
                }
                 
                $(this).parent().siblings("li").children(".yt-accordion-inner").slideUp(350);
                $(this).parent().siblings("li").find(".active").removeClass("active");
            });
        });
         
    }
 
    showAccordion();
     
     
}
