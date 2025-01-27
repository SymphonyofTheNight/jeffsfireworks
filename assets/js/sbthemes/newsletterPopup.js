/* eslint-disable */
import $ from 'jquery';

export default function (t, ev) {

   function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
   }

   function getCookie(cname) {
      const name = cname + '=';
      const ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) === ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
         }
      }
      return '';
   }

   const deleteCookie = function(name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   };

  
   if ((ev === true) && (getCookie('sbNewsletterPopup') === '')) {
      setTimeout(function() {
         $('#sb-newletter-popup').removeClass('hide').addClass('animated fadeIn');
         $('body').addClass('has-newsletter');
      }, 500);

      $('#popupSubcribeFormSubmit').submit(function(event) {
         if ($('#popupSubcribeFormSubmit').find('#nl_email').val() === '') {
            alert('Please enter you Email Address!');
            return false;
         } else {
            setCookie('sbNewsletterPopup', 'closed', t);

            $('#sb-newletter-popup').addClass('animated fadeOut');
            setTimeout(function() {
               $('#sb-newletter-popup').addClass('hide');
               $('body').removeClass('has-newsletter');
               return true;
            }, 300);
         }
      });

      function setClosePopup() {
         //setCookie('sbNewsletterPopup', 'closed', t);
         $('#sb-newletter-popup').addClass('animated fadeOut');
         setTimeout(function() {
            $('#sb-newletter-popup').addClass('hide');
            $('body').removeClass('has-newsletter');
         }, 300);
      }

      $(document).on('click', '[data-close-newsletter-popup]', function() {
         setClosePopup();
      });
      
      $('.popup-overlay').on('click', function(ev) {
         if ($('body').hasClass('has-newsletter')) {
            setClosePopup();
         }
      });

      $(document).keyup(function(e) {
         if (e.keyCode === 27) { // escape key maps to keycode `27`
            setClosePopup();
         }
      });
	  
	   $('input[name=\'hidden-popup\']').on('change', function(){
			if ($(this).is(':checked')) {
				setCookie('sbNewsletterPopup', 'closed', t);
			} 
		});
   }

   if (ev === false) {
      deleteCookie('sbNewsletterPopup');
   }
}
