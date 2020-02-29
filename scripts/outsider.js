
/*!
 * JavaScript Cookie v2.1.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

!function(a,b){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module unless amdModuleId is set
define([],function(){return a.svg4everybody=b()}):"object"==typeof exports?module.exports=b():a.svg4everybody=b()}(this,function(){/*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
function a(a,b){
// if the target exists
if(b){
// create a document fragment to hold the contents of the target
var c=document.createDocumentFragment(),d=!a.getAttribute("viewBox")&&b.getAttribute("viewBox");
// conditionally set the viewBox on the svg
d&&a.setAttribute("viewBox",d);
// copy the contents of the clone into the fragment
for(
// clone the target
var e=b.cloneNode(!0);e.childNodes.length;)c.appendChild(e.firstChild);
// append the fragment into the svg
a.appendChild(c)}}function b(b){
// listen to changes in the request
b.onreadystatechange=function(){
// if the request is ready
if(4===b.readyState){
// get the cached html document
var c=b._cachedDocument;
// ensure the cached html document based on the xhr response
c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),
// clear the xhr embeds list and embed each item
b._embeds.splice(0).map(function(d){
// get the cached target
var e=b._cachedTarget[d.id];
// ensure the cached target
e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),
// embed the target into the svg
a(d.svg,e)})}},
// test the ready state change immediately
b.onreadystatechange()}function c(c){function d(){
// while the index exists in the live <use> collection
for(
// get the cached <use> index
var c=0;c<l.length;){
// get the current <use>
var g=l[c],h=g.parentNode;if(h&&/svg/i.test(h.nodeName)){var i=g.getAttribute("xlink:href");if(e&&(!f.validate||f.validate(i,h,g))){
// remove the <use> element
h.removeChild(g);
// parse the src and get the url and id
var m=i.split("#"),n=m.shift(),o=m.join("#");
// if the link is external
if(n.length){
// get the cached xhr request
var p=j[n];
// ensure the xhr request exists
p||(p=j[n]=new XMLHttpRequest,p.open("GET",n),p.send(),p._embeds=[]),
// add the svg and id as an item to the xhr embeds list
p._embeds.push({svg:h,id:o}),
// prepare the xhr ready state change event
b(p)}else
// embed the local id into the svg
a(h,document.getElementById(o))}}else
// increase the index when the previous value was not "valid"
++c}
// continue the interval
k(d,67)}var e,f=Object(c),g=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,h=/\bAppleWebKit\/(\d+)\b/,i=/\bEdge\/12\.(\d+)\b/;e="polyfill"in f?f.polyfill:g.test(navigator.userAgent)||(navigator.userAgent.match(i)||[])[1]<10547||(navigator.userAgent.match(h)||[])[1]<537;
// create xhr requests object
var j={},k=window.requestAnimationFrame||setTimeout,l=document.getElementsByTagName("use");
// conditionally start the interval if the polyfill is active
e&&d()}return c});
/*! WOW - v1.1.2 - 2015-04-07
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);
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


/*!
    help--form.js - https://bitbucket.org/tenfingers/components/UI/help--form
    Licensed under the Trade Secret license - https://en.wikipedia.org/wiki/Trade_secret

    Copyright (c) 2016 Simply Brilliant ( www.SimplyBrilliant.cz )
*/




// --------------------------------------------------------------------------------------------------------------------------------------------------------
//
//	Name: Tabs
//  
//  DEV NOTES:
//      - Content may have tree states (data-content-loaded):
//          {undefined}:  content was NOT LOADED yet
//          {loaded}:     content was LOADED. Don't execute AJAX call again
//	
//
// --------------------------------------------------------------------------------------------------------------------------------------------------------

var help__form = {
    // Global VARIABLES
    container: $('.help--form'), // container for Help
    // INITIALIZE
    init:
        function(){
            // Are there any tabs?
            if ( this.container.length > 0 ) {
                console.log( 'help__form.init()' );
                
                $( '.help--form' ).click(function(){
                    $( this ).toggleClass( global.cssClasses.collapsed );
                });
            }
        }
        /*
            expand: 
                function( context ){
                    // context = div.tabs
                    console.log( 'help__form.expand()' );
                    

                },
            collapse: 
                function( element ){
                    console.log( 'help__form.collapse()' );
                    
                    element.click(function(){
                        $( this ).addClass( global.cssClasses.collapsed );
                    });
                }
        */
};  // END of help__form()

/*!
    navigation__primary.js - https://bitbucket.org/tenfingers/components/navigation__primary
    Licensed under the Trade Secret license - https://en.wikipedia.org/wiki/Trade_secret

    Copyright (c) 2016 Simply Brilliant ( www.SimplyBrilliant.cz )
*/




// --------------------------------------------------------------------------------------------------------------------------------------------------------
//
//	Name: Primary Navigation
//  
//  DEV NOTES:
//      - Content may have tree states (data-content-loaded):
//          {undefined}:  content was NOT LOADED yet
//          {loaded}:     content was LOADED. Don't execute AJAX call again
//	
//
// --------------------------------------------------------------------------------------------------------------------------------------------------------

var nav__primary = {
    // Global VARIABLES
    //trigger__navVisibility: '#burger'   // Element, which triggers Show / Hide Navigation
    container: $('#nav__primary'), // Primary Nav container
    burger: $('#burger'),   // Element, which triggers Show / Hide Navigation
    offCanvas: $('.offCanvas'),   // Off Canvas NAV container
    // INITIALIZE
    init:
        function(){
            // Is NAV presented?
            if ( nav__primary.container.length > 0 ) {
                console.info('nav__primary.init()');

                // Uncheck Burger input ( when Nav was opened && page was reloaded > helper checkbox is :checked >> uncheck it, so Hamburger icon is always displayed (when input is checked, Close icon is showed instead)
                this.setDefaultState( this.burger );

                // Handle Hamburger Click (this = Hamburger element)
                this.handleClick__burger( this.burger );


                // Handle SubMenu - Expand / Collapse
                this.subMenu.init();



// Viewport height = height of the Off Canvase nav
//$( '.offCanvas', nav__primary.container ).height('1000px');
            }
        },
    // Set form to default state
    setDefaultState:
        function ( context ) {
            console.log('nav__primary.setDefaultState()');

                //uncheck all checkboxes
                $('input:checkbox', context ).removeAttr('checked');
                //$('#p-order input:checkbox').prop( 'checked', '' );       // Will work??
        },
    // Handle Tab Click
    handleClick__burger: 
        function( context ){
            console.log( 'handleClick__burger()' );
            
var trigger = $('label', context);

            // Handle Burger Click event
            $('label', context).click( function( e ){
                //e.preventDefault();

                // Toggle Swap text "MENU" >> "ZAVŘÍT"
                swap_text( $('.text', this) );


                // Show / Hide NAV
                nav__primary.offCanvas.toggleClass( global.cssClasses.open );

                global.UIElements.pageOverlay.toggle();
            });


// [TO DO: Refactor this] - -- CLOSE NAV when PageOverlay is :clicked
global.UIElements.pageOverlay.on( 'click', function(){
    trigger.click();
});
        },
    // Toggle content visibility
    content_showHide: 
        function( context, _thisParent, targetDiv ){
            console.log( 'tabs.content_showHide()' );

            // remove active class
            $( '.tabsHeader .tab', context ).removeClass( global.cssClasses.active );

            // set Active class
            _thisParent.addClass( global.cssClasses.active );

            // Hide currect active Tab's content
            $( '.tabContent.active', context ).removeClass( global.cssClasses.active );

            // Hide currect active Tab's content
            targetDiv.addClass( global.cssClasses.active );
        }
};  // END of nav__primary()





nav__primary.subMenu = {
    // Global VARIABLES
    trigger: $( '.trigger', nav__primary.container ), // Primary Nav container
    // INITIALIZE
    init:
        function(){
            // Is any SubMenu presented?
            if ( nav__primary.subMenu.trigger.length > 0 ) {
                console.info('nav__primary.subMenu.init()');


                // Collapse all SubMenus
                this.setDefaultState();

                // Handle Hamburger Click (this = Hamburger element)
                //this.handleClick__burger( this.burger );
            }
        },
    // Set form to default state
    setDefaultState:
        function ( context ) {
            console.log('nav__primary.subMenu.setDefaultState()');

// Collapse all SubMenus
nav__primary.subMenu.trigger.each( function(){
    var _this = $( this ),      // Refers to "div.trigger"
        submenuContainer = $( this ).parent(),      // Parent li element
        submenu = $( '> ul', submenuContainer );              // Submenu itself

    // Hide Submenu
    $( '> ul', submenuContainer ).hide();


    _this.on( 'click', function(){
        submenuContainer.toggleClass( global.cssClasses.open );
        submenu.slideToggle( 'fast' );

        //.toggleClass('up')

        // Swap CLASS of the Caret;
        swap_class( $('.caret', this), 'down' );
    });
});
        },
    // Handle Tab Click
    handleClick__burger: 
        function( context ){
            console.log( 'handleClick__burger()' );
            
            //...
        },
    // Toggle SubMenu visibility
    content_showHide: 
        function( context, _thisParent, targetDiv ){
            console.log( 'tabs.content_showHide()' );

            //...
        }
};  // END of nav__primary.subMenu()
/*!
    tabs.js - https://bitbucket.org/tenfingers/components/tabs
    Licensed under the Trade Secret license - https://en.wikipedia.org/wiki/Trade_secret

    Copyright (c) 2016 Simply Brilliant ( www.SimplyBrilliant.cz )
*/




// --------------------------------------------------------------------------------------------------------------------------------------------------------
//
//	Name: Tabs
//  
//  DEV NOTES:
//      - Content may have tree states (data-content-loaded):
//          {undefined}:  content was NOT LOADED yet
//          {loaded}:     content was LOADED. Don't execute AJAX call again
//	
//
// --------------------------------------------------------------------------------------------------------------------------------------------------------

var tabs = {
    // Global VARIABLES
    class: {
        container: '.tabs', // container for Tabs & Tabs Content
        targetDiv: '.tabsContent'   // DIV, where content is loaded via AJAX
    },
    // INITIALIZE
    init:
        function(){
            // Are there any tabs?
            if ( $( tabs.class.container ).length > 0 ) {
                console.log( 'tabs.init()' );
                
                $( tabs.class.container ).each( function(){
                    // Handle Tab Click (this = context = div.tabs)
                    tabs.handle_click( this );
                });
            }
        },
    // Handle Tab Click
    handle_click: 
        function( context ){
            // context = div.tabs
            console.log( 'tabs.handle_click( _hookClickFunction_ )' );
            
            
            // Handle Tab Click event
            $( '.tabsHeader a', context ).click( function( e ){
                e.preventDefault();
                console.log( 'tabs.handle_click(' + $( this ).text().trim() + ') > clicked' );      // $.trim() will remove new line characters
               

                // Get URL & Target DIV
                var _this = $( this ),
                    _thisParent = _this.parent(),       // li.tab
                    targetURL = _this.attr( 'href' ),     // where get the data?
                    targetDivID = '#' + _thisParent.data('target-div-id'),   // where store the data? (ID of target DIV)
                    targetDiv = $( targetDivID );   // Create jQuery object


                // Content of this tab WAS LOADED before, just show it
                if ( _thisParent.data( 'content-loaded' ) === true ) {
                    console.log( 'content was already loaded >> show it' );
                    
                    // Show / Hide content; Activate tab
                    tabs.content_showHide( context, _thisParent, targetDiv );
                }
                // Active tab (content WAS LOADED before and is visible => do nothing)
                else if( _thisParent.hasClass( 'active' ) ){
                    console.log( 'active tab -> do nothing' );
                }
                // undefined: content was NOT LOADED yet;
                else {
                    console.log( 'Tab Content NOT present. Load it!' );

                    // Call content loader
                    tabs.content_load( _thisParent, targetURL, targetDiv );

                    // Show / Hide content; Activate tab
                    tabs.content_showHide( context, _thisParent, targetDiv );
                }
            });
        },
    // Load Tab Content via AJAX
    content_load: 
        function( tab, url, targetDiv ){
            console.log( 'tabs.content_load( ' + url + ' )' );

            // Load content via AJAX and place it into target DIV
            targetDiv.load( url, function( response, status, xhr ) {
                if ( status == "success" ) {
                    console.log( 'Content loaded succesfully!' );

                    // Set flag, that content was loaded
                    tab.attr( 'data-content-loaded', 'true' );
                }
                // if ( status == "error" )
                else {
                    targetDiv.html( '<div class="alert danger" role="alert">Sorry but there was an error: ' + xhr.status + " " + xhr.statusText + '</div>' );
                }
            });
        },
    // Toggle content visibility
    content_showHide: 
        function( context, _thisParent, targetDiv ){
            console.log( 'tabs.content_showHide()' );

            // remove active class
            $( '.tabsHeader .tab', context ).removeClass( global.cssClasses.active );

            // set Active class
            _thisParent.addClass( global.cssClasses.active );

            // Hide currect active Tab's content
            $( '.tabContent.active', context ).removeClass( global.cssClasses.active );

            // Hide currect active Tab's content
            targetDiv.addClass( global.cssClasses.active );
        }
};  // END of tabs()

//
// CONSOLE LOG - Fix for IE <=9 (IE donesn't have concole object, which couses Bug alert windows)
// --------------------------------------------------
if (typeof console == "undefined") {
    this.console = {log: function () {}};
    this.console = {info: function () {}};
    this.console = {error: function () {}};
}

 



/*=========================================================================================================================================================
 
 init.js - Initialize functions
 
 
 Index of FUNCTIONS TO INITIALIZE:
 =================================
 
 #00.00 - GLOBAL VARIABLES & SETTINGS
 #01.00 - EXECUTE when DOM is READY
 
 
 ==========================================================================================================================================================*/





/*=========================================================================================================================================================
 
 #01.00 - EXECUTE when DOM is READY
 
 =========================================================================================================================================================*/

$(function () {



                            // TO DO: CLEAN UP!!!!  ---- FOR DEMONSTRATION PURPOSES ONLY !!!!

                            $('.btn-checkbox').bind('click', function(){
                                $(this).toggleClass('active');
                            });


                            $('#noBirthCertificateNumber').bind('click', function(){
                                $('#birthCertificateNumber').closest('.row').slideToggle();
                                $('#date').closest('.row').slideToggle();
                            });





                            $('#personType--person').bind('click', function(){
                                $('#businessID').parent().slideToggle();
                            });



                            $('#personType--legal').bind('click', function(){
                                $('#businessID').parent().slideToggle();
                            });







                            // Add CLASS on input focus => will show help text below the input.
                            $('input').focus(function(){
                                var input = $(this);

                                setTimeout(function(){
                                    input.closest('.formGroup').addClass('formGroupHovered');
                                }, 600);
                            });




// ON PAGE LOAD: Check if input was filled previously - if YES - add class
$( 'input' ).each( function(){
    var input = $(this),
        parent = input.closest('.formGroup');


    // Check if input was filled or not
    var value = $.trim( input.val() );  //will trim the white spaces.


    // FILLED input
    if( value.length > 0 ) {
        //alert('NOT empty');
        parent.addClass('filled');
    } 
})





                            // BLUR
                            $('input').blur(function(){
                                var input = $(this),
                                    parent = input.closest('.formGroup');


                                parent.removeClass('formGroupHovered');


// Check if input was filled or not
var value = $.trim( input.val() );  //will trim the white spaces.


// FILLED input
if( value.length > 0 ) {
    //alert('NOT empty');
    parent.addClass('filled');
} 
// EMPTY input
else if( value.length === 0 ) {
    parent.removeClass('filled');
}

                            });





// Dotaz se týká mojí pojistné smlouvy 
$('#question--myInsuranceContract').on('click', function(){
    $('#infoAboutYourContract').slideToggle();
    $('#birthCertificateNumber').closest('.row').slideToggle();
    $('#noBirthCertificateNumber').closest('.row').slideToggle();
});






                            // Toggle DEV notes
                            // -------------------------
                            $('.devNotes--toggle').on('click', function(){
                                $('.devNote').slideToggle();
                            });                            






    // GENERAL functions
    // -------------------------	
nav__primary.init();


    // Support of external SVG              source: https://github.com/jonathantneal/svg4everybody  -- TO DO: Explore attributes (like role="img")
    svg4everybody();

    
    // Images & Video Viewer
    //modalViewer_images('.popup-gallery');
    //modalViewer_video('.viewer-video');

    // Tabs
    tabs.init();  


    // HOMEPAGE
    // -------------------------
    //swiper_hp_setMaxHeight();
    //swiper_hp();
    //HP_showMoreActivities();



    // ORDER
    // -------------------------
    //Order.init();


    // Google MAP
    if ( $('#w-googleMap').length > 0 ) {
        //GoogleMap.init();
    }


    // Search in Swiper
    //search_small();



    // Stretch Google Map to 100% width
    //resizeGoogleMap();
    //mapFilter_toggleVsibility();    // Show hide Filter
    //mapFilter_extendedSearch();     // Handle show/hide Extended Search
    



    // Page - Activity Detail
    // -------------------------
    //stripePhotos_showStripe();


    // Form - Help text next to inputs - handle Expand/Collapse 
    help__form.init();





    //Passing an object containing full options
    $('#counter--magazineLaunch .iCounter').iCounter({
            // new Date(year, month, day, hours, minutes, seconds, milliseconds);
            expiryDate: new Date("September 1, 2016 10:50:00"), 
            //expiryDate: new Date(86400000);, // in seconds - 86400000 = 1 day
            //Counter update interval
            interval: 500,       
            //Localize labels of counter
            /*
            localization: {
                years:  "años",    
                months:  "meses",       
                days:   "dias",           
                hours:  "horas",
                minutes: "minutes",
                seconds: "secondas"
            },
            */
            //Animation duration in milliseconds from 0 to interval
            speed: 250,     // has to be lower than  mbComingsoon.interval 
            callBack: Function          //Function executed on expiry or if espired
                            //Callback function pass e reference to the 
                            //mbComingSoon object itself as parameter 
                            // Example:
                            // function(t) {
                            //  $(t).mbComingSoon({expiryDate:  a New Date})
                            //  $(t).mbComingSoon('start');
                            // }
        }); 
    



/*

    //Passing an object containing full options
    $('#sale-countDown').mbComingsoon({
            // new Date(year, month, day, hours, minutes, seconds, milliseconds);
            //expiryDate: new Date(2016, 3, 23, 20, 30),
            expiryDate: new Date("April 7, 2026 11:11:00"),
            //expiryDate: new Date(86400000);, // in seconds - 86400000 = 1 day
            //Counter update interval
            interval: 500,       
            //Localize labels of counter
            localization: {
                years: "days",       
                days: "days",       
                hours: "hours",
                minutes: "minutes",
                seconds: "seconds"
            },
            //Animation duration in milliseconds from 0 to interval
            speed: 250,     // has to be lower than  mbComingsoon.interval 
            callBack: Function          //Function executed on expiry or if espired
                            //Callback function pass e reference to the 
                            //mbComingSoon object itself as parameter 
                            // Example:
                            // function(t) {
                            //  $(t).mbComingSoon({expiryDate:  a New Date})
                            //  $(t).mbComingSoon('start');
                            // }
        }); 
*/




}); // End of DOM ready



//
// window RESIZE
// --------------------------------------------------
$(window).resize(function () {
    // Recalculate slider height on window resize
    //swiper_hp_setMaxHeight();
    
    // Resize Google Map
    //resizeGoogleMap();
});