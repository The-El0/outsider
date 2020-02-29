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