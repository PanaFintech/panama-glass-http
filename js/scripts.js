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
            } else {
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

    (function () {
        var username = "";
        
        function getData() {
            $.get("https://pty.glass/api/id/" + username, function (data) {
                var addresses = data.depositAddresses;
                var address = "";
                if ($("#cryptoMoneda").val() == 2) {
                    address = Object.keys(addresses.DASH)[0]
                } else {
                    address = Object.keys(addresses.BTC)[0]
                }
                $("#qrcodeCanvas").html("");
                new QRCode(document.getElementById("qrcodeCanvas"), address);

                var ticketNumber = $("#cryptoTicketNumber").val();
                var ticketTier = $("#cryptoTicketTier").val();

                var price = 0;

                if (ticketTier == 1) {
                    price = 300;
                } else if (ticketTier == 2) {
                    price = 1500;
                } else if (ticketTier == 3) {
                    price = 2500;
                } else if (ticketTier == 4) {
                    price = 5000;
                } else if (ticketTier == 5) {
                    price = 10000;
                }

                var subtotal = ticketNumber * price;
                var total = 0;

                if ($("#cryptoMoneda").val() == 2) { //DASH
                    total = subtotal / data.prices.DASH;
                } else {
                    total = subtotal / data.prices.BTC;
                }
                total = total.toFixed(8);
                $("#total").text(total);


                $("#pay_crypto .step2").show();

                var d = new Date();
                var epoch = d.getTime() / 1000;

                var secondsSinceLastTimerTrigger = epoch % 600; // 600 seconds (10 minutes)
                var secondsUntilNextTimerTrigger = 600 - secondsSinceLastTimerTrigger;

                setTimeout(function () {
                    getData()
                }, secondsUntilNextTimerTrigger * 1000);
            });
        }

        $('#cryptoregister').on('click', function (e) {
            e.preventDefault();
            $("#pay_crypto .step1").hide();
            username = $("#username").val();
            var commodity = "BTC";
            if ($("#cryptoMoneda").val() == 2) {
                commodity = "DASH";
            }
            $.post("https://pty.glass/api/register", {
                    username: username,
                    commodity: commodity,
                    email: $("#email").val(),
                    fullname: $("#fullname").val()
                })
                .done(function (data) {
                    getData();
                });
        });

    }());

    // --------------------------------------------------------------------
    // Show step1
    // --------------------------------------------------------------------

    (function () {
        $('#back').on('click', function (e) {
            console.log("fired");
            $("#pay_crypto .step2").hide();
            $("#pay_crypto .step1").show();
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
    // Tickets calculator
    // --------------------------------------------------------------------
    (function () {
        function generate() {
            var number = $('#ticketNumber').val();
            var tier = $('#ticketTier').val();
            var fname = $('#cardHolder').val();

            var tierCost = 300;
            if (tier == 2) {
                tierCost = 1500;
            } else if (tier == 3) {
                tierCost = 2500;
            } else if (tier == 4) {
                tierCost = 5000;
            } else if (tier == 5) {
                tierCost = 10000;
            }

            var tot = number * tierCost;
            $('#Amount').val(tot + ".00");

            var modName = fname.replace(/\s/g, '');
            $('#cardHolder').val(modName);

            /*hide submit button if required fields are empty
            $('#cardHolder, #eamil, #cardNumber, #expiration, #cvv2').keyup(function(){
                if($('#cardHolder').val().length < 1){
                    $('#paybutton').attr('disabled', true);
                }
                else if($('#email').val().length < 1){
                    $('#paybutton').attr('disabled', true);
                }
                else if($('#cardNumber').val().length < 1){
                    $('#paybutton').attr('disabled', true);
                }
                else if($('#expiration').val().length < 1){
                    $('#paybutton').attr('disabled', true);
                }
                else if($('#cvv2').val().length < 1 ){
                    $('#paybutton').attr('disabled', true);
                }
                else{
                    $('#paybutton').attr('disabled', false);
                }
            })*/
        }
        generate();

        $('#ticketNumber').on('change', function () {
            generate();
        });

        $('#ticketTier').on('change', function () {
            generate();
        });

        // Response to pay with card submit
        $('#iframe_a').load(function () {
            var iBody = $('#iframe_a');
            var iBod = iBody.text()
            $('#formresp').val(iBod)
            //var pati = iBody.text();
            $('#pay_card').modal('toggle');
            $('#card_confirm').modal('show');
        });

        // POST crypto form

        // Response to pay with crypto submit
        $('#paycbutton').on('click', function () {
            $('#pay_crypto').modal('toggle');
            $('#qrcodeCanvas').qrcode({
                text: "http://jetienne.com"
            });
            $('#paycbutton').attr('disabled', true);
        });

    }());
    // --------------------------------------------------------------------
    // Google Map
    // --------------------------------------------------------------------

    (function () {
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

        if ($('#googleMap').length > 0) {

            //set your google maps parameters
            var $latitude = 8.9936856, //If you unable to find latitude and longitude of your address. Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
                $longitude = -79.5830599,
                $map_zoom = 14;
            /* ZOOM SETTING */

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


        if ($('#googleMap2').length > 0) {

            //set your google maps parameters
            var $latitude2 = 9.002099, //If you unable to find latitude and longitude of your address. Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
                $longitude2 = -79.582579,
                $map_zoom2 = 14;
            /* ZOOM SETTING */

            //set google map options
            var map_options2 = {
                center: new google.maps.LatLng($latitude2, $longitude2),
                zoom: $map_zoom2,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            }
            //initialize the map
            var map2 = new google.maps.Map(document.getElementById('googleMap2'), map_options2);
            //add a custom marker to the map
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude2, $longitude2),
                map: map2,
                visible: true,
                icon: $marker_url
            });
        }

    }());
}); // JQuery end

$('#background').playbackRate = 0.7;

var typed3 = new Typed('#text', {
    strings: ['Panamá <i>Moderna</i>', 'Panamá <strong>Transparente</strong>', 'Panamá Glass'],
    typeSpeed: 80,
    backSpeed: 50,
    smartBackspace: true, // this is a default
    loop: false
});

$(document).ready(function () {
    $(window).resize(function () {
        var height = $(window).height();
        var video = $('#background').outerHeight();
        var welcome = $('#welcome').outerHeight();
        var heightWOButton = height - $('#btnpresentation section').outerHeight();

        if (video >= (height - heightWOButton)) {
            video = heightWOButton;
            $('#background').height(video);
        }

        var free_space = video - (welcome + 62);
        free_space = free_space - (free_space * 0.1) // 0.1 of adjust to top
        var off_top = (free_space / 2);
        if (off_top < 1) {
            off_top = 3;
        }

        $('#welcome').css("padding-top", off_top + "px");

        $(".header").height(heightWOButton);
    });
    $(window).resize();
});