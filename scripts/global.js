//
// GLOBAL VARIABLES
// --------------------------------------------------

var global = {
    cssClasses: {
        active:     'active',
        open:       'open',
        hidden:     'hidden',
        success:    'success',
        expanded:    'expanded',
        collapsed:    'collapsed',
        modalWindowIs_visible: 'modalWindowIs_visible'
    },
    UIElements: {
        pageOverlay: $('#pageOverlay')
    },
    basket: {
        pricePerPiece:  450,
        currency:       'Kč',
        amount:         0,      // Initial value - Basket is empty
        price:          0,      // Initial value - Basket is empty
        discountCode_1:   'baba',     // this code will be given to ppl on Paul Von Dyk festival - Plzen
        discountCode_2:   'jaga',     // this code will be given to ppl on Paul Von Dyk festival - Plzen
        discount:       10              // discount in percents % 
    }
};