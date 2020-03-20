// DOCS & Source:
// https://github.com/magicbruno/mb-comingsoon

/// <reference path="../../Scripts/jquery-1.10.2-vsdoc.js" />

/**************************************************************************


 *------------------------ COUNT DOWN for INFOGRAPHICS 1.1 ------------------------

=== USAGE ===


    // CONSTRUCTOR:
    // ------------------

    // Expiry date of counter:
    $('iCounter--candies').iCounter( [--expiryDate--] || [--String--] );



    // iCounter SETTINGS:
    // ------------------
    $('iCounter--candies').iCounter({
        expiryDate: Date,   // Expiry Date required
        interval: Number,   // Update interval in milliseconds (default = 1000))
        //Localize labels of counter
        localization: {
            years:  "años",
            months:  "meses",
            days:   "dias",
            hours:  "horas",
            minutes: "minutes",
            seconds: "secondas"
        },
        callBack: {
            // What should happend, when counter expires?
            // alert( 'It's time to...!' );
        }
    });




   // METHODS:
   // ------------------

   // START the counter
   .iCounter('start') // start counter

        usage:
        $('#myCounter').iCounter('stop');


   // STOP the counter
   .iCounter('stop') // stop counter

        usage:
        $('#myCounter').iCounter('start');


    // Change/Update options on the fly
   .iCounter(options)

        usage:

        $('#myCounter').iCounter({
            speed: 300;
        });




   // DEVELOPERS NOTES:
   // ------------------

    #1 |    Max time that the counter can display is 999 days 23h 59' 59".
            If time is greater hours, minutes and seconds will be displayed
            correctly, but days will be 999 until decrease under this quota.






 */


// Create CLOSURE -- will pervent conflicts with duplicate variable names
(function ($) {
    // Class Definition
    var SB_iCounter;

    SB_iCounter = function (element, opt) {
        this.$el = $(element);
        this.end = opt.expiryDate;
        this.interval = opt.interval;
        this.speed = opt.speed;
        this.timer = 0;
        if (jQuery.isFunction(opt.callBack))
            this.callBack = opt.callBack;
        else
            this.callBack = null;
        this.localization = { years: "years", months: "months", days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" };
        $.extend(this.localization, this.localization, opt.localization);
    }

    SB_iCounter.prototype = {
        // Returns an object containing counter data
        getCounterNumbers: function () {
            var result = {
                years: {
                    tens: 0,
                    units: 0,
                    hundreds: 0
                },
                months: {
                    tens: 0,
                    units: 0,
                    hundreds: 0
                },
                days: {
                    tens: 0,
                    units: 0,
                    hundreds: 0
                },
                hours: {
                    tens: 0,
                    units: 0
                },
                minutes: {
                    tens: 0,
                    units: 0
                },
                seconds: {
                    tens: 0,
                    units: 0
                }
},  millyear = 1000 * 60 * 60 * 24,
                millmonth = 1000 * 60 * 60 * 12,
                millday = 1000 * 60 * 60 * 24,
                millhour = 1000 * 60 * 60,
                millminutes = 1000 * 60,
                millseconds = 1000,
                rest = 0
            ;
            var now = new Date()
            var diff = this.end.getTime() - now.getTime();

            // CountDown expired !!
            if (diff <= 0) {
console.log('countdown expired!');
                return result;
            }
            /*
            else {
alert('countdown expired');
            }
            */




// Max number of years is 99
var years = Math.min(Math.floor(diff / millyear), 999);
rest = diff % millyear;

result.years.hundreds = Math.floor(years / 100);
var yearrest = years % 100;
result.years.tens = Math.floor(yearrest / 10);
result.years.units = yearrest % 10;



// MONTHS
var months = Math.min(Math.floor(diff / millmonth), 999);
rest = diff % millmonth;

result.months.hundreds = Math.floor(months / 100);
var monthrest = months % 100;
result.months.tens = Math.floor(monthrest / 10);
result.months.units = monthrest % 10;



            // Max number of days is 99 (i will expand in future versions)
            var days = Math.min(Math.floor(diff / millday), 999);
            rest = diff % millday;

            result.days.hundreds = Math.floor(days / 100);
            var dayrest = days % 100;
            result.days.tens = Math.floor(dayrest / 10);
            result.days.units = dayrest % 10;




            var hours = Math.floor(rest / millhour);
            rest = rest % millhour;
            result.hours.tens = Math.floor(hours / 10);
            result.hours.units = hours % 10;

            var minutes = Math.floor(rest / millminutes);
            rest = rest % millminutes;
            result.minutes.tens = Math.floor(minutes / 10);
            result.minutes.units = minutes % 10;

            var seconds = Math.floor(rest / 1000);
            result.seconds.tens = Math.floor(seconds / 10);
            result.seconds.units = seconds % 10;
            return result;
        },
        // If changed update a part (day, hours, minutes, seconds) of counter
        updatePart: function (part) {
            var cn = this.getCounterNumbers();
            var $part = $('.' + part, this.$el);
            if (part == 'days') {
                this.setDayHundreds(cn.days.hundreds > 0);
                if ($part.find('.number.hundreds.show').html() != cn[part].hundreds) {
                    var $n1 = $('.n1.hundreds', $part);
                    var $n2 = $('.n2.hundreds', $part);
                    this.scrollNumber($n1, $n2, cn[part].hundreds);
                }
            }
            if ($part.find('.number.tens.show').html() != cn[part].tens) {
                var $n1 = $('.n1.tens', $part);
                var $n2 = $('.n2.tens', $part);
                this.scrollNumber($n1, $n2, cn[part].tens);

            }
            if ($part.find('.number.units.show').html() != cn[part].units) {
                var $n1 = $('.n1.units', $part);
                var $n2 = $('.n2.units', $part);
                this.scrollNumber($n1, $n2, cn[part].units);
            }
            // Only forn day part update hundreds
        },
        // True if countdown is expired
        timeOut: function () {
            var now = new Date()
            var diff = this.end.getTime() - now.getTime();
            if (diff <= 0)
                return true;
            return false;
        },
        setDayHundreds: function (action) {
            if (action)
                $('.counter.days', this.$el).addClass('with-hundreds');
            else
                $('.counter.days', this.$el).removeClass('with-hundreds');
        },
        // Update entire counter
        updateCounter: function () {
            this.updatePart('years');
            this.updatePart('months');
            this.updatePart('days');
            this.updatePart('hours');
            this.updatePart('minutes');
            this.updatePart('seconds');
            if (this.timeOut()) {
                this.stop();
                if (this.callBack)
                    this.callBack(this);
            }
        },
        localize: function (localization) {
            if($.isPlainObject(localization))
                $.extend(this.localization, this.localization, localization);
            $('.years', this.$el).siblings('.counter-caption').text(this.localization.years);
            $('.months', this.$el).siblings('.counter-caption').text(this.localization.months);
            $('.days', this.$el).siblings('.counter-caption').text(this.localization.days);
            $('.hours', this.$el).siblings('.counter-caption').text(this.localization.hours);
            $('.minutes', this.$el).siblings('.counter-caption').text(this.localization.minutes);
            $('.seconds', this.$el).siblings('.counter-caption').text(this.localization.seconds);
        },
        // Start automatic update (interval in milliseconds)
        start: function (interval) {
            var me = this;
            me.stop();
            if (me.timer == 0)
                me.timer = setInterval(function () { me.updateCounter() }, me.interval);
            me.updateCounter();
        },
        // Stop automatic update 
        stop: function () {
            //this.active = false;
            if (this.timer > 0) {
                clearInterval(this.timer);
                this.timer = 0;
            }
        },
        // Animation of a single 
        scrollNumber: function ($n1, $n2, value) {
            if ($n1.hasClass('show')) {
                $n2.removeClass('hidden-down')
                    .css('top', '-100%')
                    .text(value)
                    .stop()
                    .animate({ top: 0 }, this.speed, function () {
                        $n2.addClass('show');
                    });
                $n1.stop().animate({ top: "100%" }, this.speed, function () {
                    $n1.removeClass('show')
                        .addClass('hidden-down');
                });
            } else {
                $n1.removeClass('hidden-down')
                    .css('top', '-100%')
                    .text(value)
                    .stop()
                    .animate({ top: 0 }, this.speed, function () {
                        $n1.addClass('show');
                    });
                $n2.stop().animate({ top: "100%" }, this.speed, function () {
                    $n2.removeClass('show')
                        .addClass('hidden-down');
                });
            }
        }
    }

    // jQuery plugin
    jQuery.fn.iCounter = function (opt) {
        var defaults = {
            interval: 1000,
            callBack: null,
            localization: { years: "years", months: "months", days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" },
            speed:500
        }
        var options = {};
        var content = '   <div class="counter-group">' +
                        '       <div class="counter-block">' +
                        '           <div class="counter years">' +
                        '               <div class="number show n1 hundreds">0</div>' +
                        '               <div class="number show n1 tens">0</div>' +
                        '               <div class="number show n1 units">0</div>' +
                        '               <div class="number hidden-up n2 hundreds">0</div>' +
                        '               <div class="number hidden-up n2 tens">0</div>' +
                        '               <div class="number hidden-up n2 units">0</div>' +
                        '           </div>' +
                        '           <div class="counter-caption">years</div>' +
                        '       </div>' +
                        '       <div class="counter-block">' +
                        '           <div class="counter months">' +
                        '               <div class="number show n1 hundreds">0</div>' +
                        '               <div class="number show n1 tens">0</div>' +
                        '               <div class="number show n1 units">0</div>' +
                        '               <div class="number hidden-up n2 hundreds">0</div>' +
                        '               <div class="number hidden-up n2 tens">0</div>' +
                        '               <div class="number hidden-up n2 units">0</div>' +
                        '           </div>' +
                        '           <div class="counter-caption">months</div>' +
                        '       </div>' +
                        '       <div class="counter-block">' +
                        '           <div class="counter days">' +
                        '               <div class="number show n1 hundreds">0</div>' +
                        '               <div class="number show n1 tens">0</div>' +
                        '               <div class="number show n1 units">0</div>' +
                        '               <div class="number hidden-up n2 hundreds">0</div>' +
                        '               <div class="number hidden-up n2 tens">0</div>' +
                        '               <div class="number hidden-up n2 units">0</div>' +
                        '           </div>' +
                        '           <div class="counter-caption">days</div>' +
                        '       </div>' +
                        '       <div class="counter-block">' +
                        '           <div class="counter hours">' +
                        '               <div class="number show n1 tens">0</div>' +
                        '               <div class="number show n1 units">0</div>' +
                        '               <div class="number hidden-up n2 tens">0</div>' +
                        '               <div class="number hidden-up n2 units">0</div>' +
                        '           </div>' +
                        '           <div class="counter-caption">hours</div>' +
                        '       </div>' +
                        '       <div class="counter-block">' +
                        '           <div class="counter minutes">' +
                        '               <div class="number show n1 tens">0</div>' +
                        '               <div class="number show n1 units">0</div>' +
                        '               <div class="number hidden-up n2 tens">0</div>' +
                        '               <div class="number hidden-up n2 units">0</div>' +
                        '           </div>' +
                        '           <div class="counter-caption">minutes</div>' +
                        '       </div>' +
                        '       <div class="counter-block">' +
                        '           <div class="counter seconds">' +
                        '               <div class="number show n1 tens">0</div>' +
                        '               <div class="number show n1 units">0</div>' +
                        '               <div class="number hidden-up n2 tens">0</div>' +
                        '               <div class="number hidden-up n2 units">0</div>' +
                        '           </div>' +
                        '           <div class="counter-caption">seconds</div>' +
                        '       </div>' +
                        '   </div>';
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('iCounter');
            if (typeof data === "undefined") {
                if (opt instanceof Date)
                    options.expiryDate = opt;
                else if ($.isPlainObject(opt))
                    $.extend(options, defaults, opt);
                else if (typeof opt == "string")
                    options.expiryDate = new Date(opt);
                if (!options.expiryDate)
                    throw new Error('Expiry date is required!');
                data = new SB_iCounter($this, options);
                $this.data('iCounter', data);
                $this.html(content);
                data.localize();
                data.start();
            } else if (opt == 'start')
                data.start();
            else if (opt == 'stop')
                data.stop();
            else if ($.isPlainObject(opt)) {
                if (opt.expiryDate instanceof Date)
                    data.end = opt.expiryDate;
                if ($.isNumeric(opt.interval))
                    data.interval = opt.interval;
                if ($.isFunction(opt.callBack))
                    data.callBack = opt.callBack;
                if ($.isPlainObject(opt.localization))
                    this.localize(opt.localization);
                data.start();
            }
        })
    }

})(jQuery)