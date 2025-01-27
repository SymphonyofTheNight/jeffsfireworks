/* eslint-disable */
import PageManager from './page-manager';
//import collapsibleFactory from './common/collapsible';
import 'foundation-sites/js/foundation/foundation.alert';
export default class Home extends PageManager {
	loaded(next) {
        $('.default--style #verticalCategories').removeClass('is-open');
		$(window).resize(function () {
			if ($(window).innerWidth() > 1026) {
				$('.default--style #verticalCategories').removeClass('is-open');
			} 
		});
	}
}
