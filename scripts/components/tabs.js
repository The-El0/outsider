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
