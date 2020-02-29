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
