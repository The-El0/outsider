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