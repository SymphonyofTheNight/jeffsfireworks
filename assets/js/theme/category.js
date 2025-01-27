/* eslint-disable */
import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';

export default class Category extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
        this.SubcategoryCol();
		 this.reinitView();
        
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                    
                },
                    products: {
                    top_sellers: {
                        limit: productsPerPage,
                    },
                    
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }
    
    // ------------------------------------------------------------------------
    // Subcategory  Column
    // ------------------------------------------------------------------------
    SubcategoryCol(){
        console.log(this.context.settings_subcategory_col);
        const catalog_refine_number = this.context.settings_subcategory_col;
        const text_refine_more = this.context.text_refine_more;
        const text_refine_less = this.context.text_refine_less;
        if(catalog_refine_number <= $('.refine-search__content > .refine-search__subitem').length)
        $('.refine-search__content').append('<div class="refine-loadmore"><i class="fa fa-plus"></i> <span class="more-view"> '+text_refine_more+' </span></div>');

        const show_catalog_refine_number = catalog_refine_number-1 ;
        $('.refine-search__content > .refine-search__subitem').each(function(i){
            if(i>show_catalog_refine_number){
                $(this).css('display', 'none');
            }
        });

        $(".refine-search__content .refine-loadmore").click(function(){
            if($(this).hasClass('open')){
                $('.refine-search__content .refine-search__subitem').each(function(i){
                    if(i>show_catalog_refine_number){
                        $(this).slideUp(200);
                        $(this).css('display', 'none');
                    }
                });
                $(this).removeClass('open');
                $('.refine-loadmore').html('<i class="fa fa-plus"></i> <span class="more-view">'+text_refine_more+' </span>');

            }else{
                $('.refine-search__content .refine-search__subitem').each(function(i){
                    if(i>show_catalog_refine_number){
                        $(this).slideDown(200);
                    }
                });
                $(this).addClass('open');
                $('.refine-loadmore').html('<i class="fa fa-minus"></i> <span class="more-view">'+text_refine_less+' </span>');
            }
        }); 
     }
    
	// ========================================================================
    // Show ReinitView
    // ========================================================================
 
    reinitView() {
        const viewAs = $('.filters-panel .view-mode').attr("data-reinitview");
        $('.view-mode .list-view button').bind("click", function() {
            $(this).parent().find('button').removeClass('active');
            $(this).addClass('active');
        }); 
        // Product List
        $('#list-view').click(function() {
            $('#product-listing-container .product-layout').attr('class', 'product-layout product-list col-sm-12');
            localStorage.setItem('listview', 'list');
        });
 
        // Product Grid
        $('#grid-view').click(function() {
            var cols = $('.left_column , .right_column ').length;
 
            if (cols == 2) {
                $('#product-listing-container .product-layout').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-12 ');
            } else if (cols == 1) {
                $('#product-listing-container .product-layout').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-12 ');
            } else {
                $('#product-listing-container .product-layout').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-12 ');
            }
             
            localStorage.setItem('listview', 'grid');
        });
 
        // Product Grid 2
        $('#grid-view-2').click(function() {
            $('#product-listing-container .product-layout').attr('class', 'product-layout product-grid product-grid-2 col-lg-6 col-md-6 col-12');
            localStorage.setItem('listview', 'grid-2');
        });
 
        // Product Grid 3
        $('#grid-view-3').click(function() {
            $('#product-listing-container .product-layout').attr('class', 'product-layout product-grid product-grid-3 col-lg-4 col-md-4 col-12');
            localStorage.setItem('listview', 'grid-3');
        });
 
        // Product Grid 4
        $('#grid-view-4').click(function() {
            $('#product-listing-container .product-layout').attr('class', 'product-layout product-grid product-grid-4 col-lg-3 col-md-4 col-12');
            localStorage.setItem('listview', 'grid-4');
        });
 
        // Product Table
        $('#table-view').click(function() {
            $('#product-listing-container .product-layout').attr('class', 'product-layout product-table col-sm-12');
            localStorage.setItem('listview', 'table');
        })
         
        if(localStorage.getItem('listview')=== null) localStorage.setItem('listview', viewAs);
         
        if (localStorage.getItem('listview') == 'table') {
            $('#table-view').trigger('click');
        } else if (localStorage.getItem('listview') == 'grid'){
            $('#grid-view').trigger('click');
        } else if (localStorage.getItem('listview') == 'grid-2'){
            $('#grid-view-2').trigger('click');
        } else if (localStorage.getItem('listview') == 'grid-3'){
            $('#grid-view-3').trigger('click');
        }else if (localStorage.getItem('listview') == 'grid-4'){
            $('#grid-view-4').trigger('click');
        } else if (localStorage.getItem('listview') == 'list'){
            $('#list-view').trigger('click');
        }else {
            $('#grid-view-4').trigger('click');
             
        }
         
        
    }
}
