jQuery(function ($) {

    'use strict';

    // --------------------------------------------------------------------
    // PreLoader
    // --------------------------------------------------------------------

    (function () {
        $('#preloader').delay(200).fadeOut('slow');
    }());

    // --------------------------------------------------------------------
    // One Page Navigation
    // --------------------------------------------------------------------

    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 50) {
                $('nav.navbar').addClass('sticky-nav');
            }
            else {
                $('nav.navbar').removeClass('sticky-nav');
            }
        });
    }());

    // --------------------------------------------------------------------
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    // --------------------------------------------------------------------

    (function () {
        $('a.page-scroll').on('click', function (e) {
            e.preventDefault();
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
        });
    }());

    // --------------------------------------------------------------------
    // Closes the Responsive Menu on Menu Item Click
    // --------------------------------------------------------------------

    (function () {
        $('.navbar-collapse ul li a').on('click', function () {
            if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
                $('.navbar-toggle:visible').trigger('click');
            }
        });
    }());

    // --------------------------------------------------------------------
    // Google Map
    // --------------------------------------------------------------------

    (function () {
        if ($('#googleMap').length > 0) {

            //set your google maps parameters
            var $latitude = 9.002099, //If you unable to find latitude and longitude of your address. Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
                $longitude = -79.582579,
                $map_zoom = 14;
            /* ZOOM SETTING */

            //google map custom marker icon
            var $marker_url = 'img/google-map-marker.png';

            //we define here the style of the map
            var style = [{
                "stylers": [{
                    "hue": "#000"
                }, {
                    "saturation": 100
                }, {
                    "gamma": 1.15
                }, {
                    "lightness": 5
                }]
            }];

            //set google map options
            var map_options = {
                center: new google.maps.LatLng($latitude, $longitude),
                zoom: $map_zoom,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            }
            //initialize the map
            var map = new google.maps.Map(document.getElementById('googleMap'), map_options);
            //add a custom marker to the map
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude, $longitude),
                map: map,
                visible: true,
                icon: $marker_url
            });
        }
    }());
}); // JQuery end


var background = document.getElementById('background');
background.playbackRate = 0.7;

var typed3 = new Typed('#text', {
    strings: ['Panamá <i>Moderna</i>', 'Panamá <strong>Transparente</strong>', 'Panamá Glass'],
    typeSpeed: 80,
    backSpeed: 50,
    smartBackspace: true, // this is a default
    loop: false
});

$( document ).ready(function() {
    $(window).resize(function() {
        var video = $('#background').height();
        var welcome = $('#welcome').height();

        var free_space = video - (welcome + 82);  
        free_space = free_space - (free_space * 0.2) // 0.1 of adjust to top
        var off_top = (free_space / 2);
        if (off_top < 1) {
            off_top = 3;
        }

        $('#welcome').css("padding-top", off_top + "px");
        
        $(".header").height($("#background").height());
    });
    $(window).resize();
});