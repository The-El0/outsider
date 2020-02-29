/*=========================================================================================================================================================
 
 functions.js
 
 
 Index of FUNCTIONS:
 ===================
 
 // #01.00 - PRIMARY NAVIGATION - Hamburger
 // #02.00 - XYZ Function
 
 
 =========================================================================================================================================================*/


//
// GLOBAL VARIABLES
// --------------------------------------------------


// Get language version and store it as global variable
//var lang = document.getElementsByTagName("html")[0].getAttribute("lang");

var class_active        = 'active',
    class_open          = 'open';





//
// #01.00 - PRIMARY NAVIGATION - Hamburger
// --------------------------------------------------
function primaryNavigation() {
    console.info('primaryNavigation()');

    var burger = $('#burger'),
        nav = $('#nav-primary'),
        navCol = $('.navigationCol');   // grid column, in which the menu is presented


    burger.click(function () {
        var burger = $(this);

        // Show Menu
        nav.slideToggle('fast');

        // Change text in Burger
        if ( !$('body').hasClass('navOpen') ) {
            navCol.attr('class', 'col-xs-12 navigationCol');
            burger.text('Zavřít');
        }
        else {
            navCol.attr('class', 'col-xs-4 col-sm-8 navigationCol');
            burger.text('Menu');
        }

        $('body').toggleClass('navOpen');
    });
}   // END of primaryNavigation();



//
// #02.00 - SWIPER
// --------------------------------------------------


// #02.01 - Fit HP Swiper height to 100% of viewport height
// -------------------------
function swiper_hp_setMaxHeight() {
    console.info('swiper_hp_setMaxHeight()');

    var swiperWrap = $('#swiper-hp'),
        headerHeight = $('#header').height(),
        availHeight = $(window).height() - headerHeight;

    swiperWrap.height(availHeight);
}   // END of swiper_hp_setMaxHeight();


// #02.02 - SWIPER on HP
// -------------------------
// API Doc: http://www.idangero.us/swiper/api/#.VSTyI_lv67k

function swiper_hp() {
    console.info('swiper_hp()');


    swiper_hp_setMaxHeight();


    // Initialize Swiper plugin
    // -------------------------
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        //paginationClickable: true,
        spaceBetween: 0,
        loop: true,
        keyboardControl: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
        // Cursor - Hand - Grab
        //grabCursor: true
//        // Disable preloading of all images
//        preloadImages: false,
//        // Enable lazy loading
//        lazyLoading: true
                //parallax:	true
                // AUTOPLAY - uncoment If needed
                //        autoplay: 2500,
                //        autoplayDisableOnInteraction: true		
    });
}   // END of swiper_hp();



//
// IMAGE & VIDEO viewer (in modal window)
// --------------------------------------------------
// DOCS: http://dimsemenov.com/plugins/magnific-popup/


// #03.01 - IMAGE VIEWER in MODAL window
// -------------------------
function modalViewer_images(e) {
    console.info('modalViewer_images()');

    var modalViewerWrapper = $(e);

    if (modalViewerWrapper.length > 0) {
        modalViewerWrapper.magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            //mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
				
				// TO DO:
				// Add Copyright.... load it from <a data-copyright="...">
            },
            callbacks: {
                change: function () {
                    // GA Tracking events
                    //trackEvent('media', 'photo', this.currItem.src);
                }
            }
        });
    }
} // END of modalViewer_images();



// #03.02 - VIDEO PLAYER in MODAL window
// -------------------------
// How to add title to iFrame:
// http://codepen.io/dimsemenov/pen/zjtbr


function modalViewer_video(e) {
    console.info('modalViewer_video()');

    var video = $(e);

    if (video.length > 0) {
        video.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });


        // With Title
        // -------------------------
        //        video.magnificPopup({
        //            type: 'iframe',
        //            iframe: {
        //                markup: '<div class="mfp-iframe-scaler">' +
        //                        '<div class="mfp-close"></div>' +
        //                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        //                        '<div class="mfp-title">Some caption</div>' +
        //                        '</div>'
        //            },
        //            callbacks: {
        //                markupParse: function (template, values, item) {
        //                    values.title = item.el.attr('title');
        //                }
        //            }
        //        });
    }
} // END of modalViewer_video();











    // #05.01 - Resize Google Map
    // -------------------------
    function resizeGoogleMap(){	
        console.info('resizeGoogleMap()');

        var gmapWrap = $('#w-googleMap iframe'),
            viewportWidth = $(window).width();

        gmapWrap.attr('width', viewportWidth);
    }   // END of resizeGoogleMap();




// --------------------------------------------------------------------------------------------------------------------------------------------------------
//
//          Direct.cz Functions
//
// --------------------------------------------------------------------------------------------------------------------------------------------------------



// Swap text
// -------------------------
// HTML:    <button data-text="Show less">Show more</button>
// JS:      swap_text( $('button') );

function swap_text(e) {
    console.info('swap_text()');

    var newText = e.attr('data-text'),
        oldText = e.text();

    // Store previous text in "data-" attribute
    e.text(newText);
    e.attr('data-text', oldText);
}



// Swap CLASS
// -------------------------
// HTML:    <button data-class-new="up" data-class-old="down">Expand</button>
// JS:      swap_class( $('button') );
//
// {e} - Element
// {initialClass} - Default Class

function swap_class( e, initialClass ) {
    console.info('swap_class()');

    var newClass = e.attr('data-class'),
        oldClass = initialClass;


    // Set flag, that element was clicked
    e.attr( 'data-class-initial', initialClass );

    if( e.hasClass(initialClass) ){
        e.removeClass( oldClass );
        e.addClass( newClass );
    }
    else {
        e.removeClass( newClass );
        e.addClass( initialClass );
    }
}



// HP - Activities bottom bar
// -------------------------
var HP_showMoreActivities = function() {
    console.info('HP_showMoreActivities()');

    var parent          = $('#nav-services-wrap'),
        activities      = $('.service', parent),
        otherActivities = $('.otherActivities', parent),
        showMoreLink    = $('.showMoreActivities', parent);
    
    
    if ( parent.length > 0) {
        
        // Handle Show more link
        showMoreLink.click(function(){
            parent.toggleClass(global.cssClasses.open);
            otherActivities.toggleClass(global.cssClasses.hidden);

            showMoreLink.parent().toggleClass(global.cssClasses.hidden);


            // SHOW Other activities
            if ( $('#nav-services').hasClass(global.cssClasses.open) ) {
                
            } 
            // HIDE Other activities
            else {
      
            }

            return  false;
        }); 
    }
};  // END of HP_showMoreActivities();