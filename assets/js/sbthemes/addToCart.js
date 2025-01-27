/* eslint-disable */
import $ from 'jquery';
import modalFactory from '../theme/global/modal';
import utils from '@bigcommerce/stencil-utils';

export default function () {

    // ------------------------------------------------------------------------
    // Product Add To Cart
    // ------------------------------------------------------------------------
    const $previewModal = modalFactory('#previewModal')[0];
    $(document).on("click", "[data-addtocart]", function(event) {
        event.preventDefault();
        var $target = $(event.currentTarget),
            $productID = $target.data('product-id'),
            $message = $target.data('wait-message');
             
        if (void 0 !== window.FormData && $productID) {
            
            $target.attr("disabled", "disabled");
             
            var formdata = new FormData;
            formdata.append("action", "add"),
            formdata.append("product_id", $productID),
            formdata.append("qty", 1);
             
            utils.api.cart.itemAdd(formdata, function(event, response) {
                $previewModal && ($previewModal.open(), updateCartContent($previewModal, response.data.cart_item.hash), $target.text($message).removeAttr("disabled"))
            })
        }
    });
     
    /**
     * Get cart contents
     *
     * @param {String} cartItemHash
     * @param {Function} onComplete
     */
    function getCartContent(cartItemHash, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemHash,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };
 
        utils.api.cart.getContent(options, onComplete);
    }
     
    function updateCartContent(modal, cartItemHash, onComplete) {
        getCartContent(cartItemHash, (err, response) => {
            if (err) {
                return;
            }
 
            modal.updateContent(response);
 
            // Update cart counter
            const $body = $('body');
            const $cartQuantity = $('[data-cart-quantity]', modal.$content);
            const $cartCounter = $('.navUser-action .cart-count');
            const quantity = $cartQuantity.data('cartQuantity') || 0;
			
			const $cartSubTotal = $('[data-subtotal]', modal.$content);
			const subTotal = $cartSubTotal.data('subtotal') ;
			
            $cartCounter.addClass('cart-count--positive');
            $body.trigger('cart-quantity-update', quantity);
            $body.trigger('cart-subtotal-update', subTotal);
      
            if (onComplete) {
                onComplete(response);
                 
            }
        });
    }
     
     /**
     * Since $productView can be dynamically inserted using render_with,
     * We have to retrieve the respective elements
     *
     * @param $scope
     */
    function getViewModel($scope) {
        return {
            $priceWithTax: $('[data-product-price-with-tax]', $scope),
            $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
            rrpWithTax: {
                $div: $('.rrp-price--withTax', $scope),
                $span: $('[data-product-rrp-with-tax]', $scope),
            },
            rrpWithoutTax: {
                $div: $('.rrp-price--withoutTax', $scope),
                $span: $('[data-product-rrp-price-without-tax]', $scope),
            },
            nonSaleWithPrice: {
                $div: $('.non-sale-price---withTax', $scope),
                $span: $('[data-product-non-sale-price-with-tax]', $scope),
            },
            nonSaleWithoutPrice: {
                $div: $('.non-sale-price---withoutTax', $scope),
                $span: $('[data-product-non-sale-price-without-tax]', $scope),
            },
            priceSaved: {
                $div: $('.price-section--saving', $scope),
                $span: $('[data-product-price-saved]', $scope),
            },
            priceNowLabel: {
                $span: $('.price-now-label', $scope),
            },
            $weight: $('.productView-info [data-product-weight]', $scope),
            $increments: $('.form-field--increments :input', $scope),
            $addToCart: $('#form-action-addToCart', $scope),
            $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
            stock: {
                $container: $('.form-field--stock', $scope),
                $input: $('[data-product-stock]', $scope),
            },
            $sku: $('[data-product-sku]'),
            $upc: $('[data-product-upc]'),
            quantity: {
                $text: $('.incrementTotal', $scope),
                $input: $('[name=qty\\[\\]]', $scope),
            },
            $bulkPricing: $('.productView-info-bulkPricing', $scope),
        };
    }
     
   
}
