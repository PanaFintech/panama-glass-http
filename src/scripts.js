//SCRIPT FOR GENERATING QR CODE ON CLICK

jQuery(function ($) {
	//jQuery('#qrcode').qrcode("this plugin is great");
	$('#paycbutton').on('click', function(){
		$('#qrcodeCanvas').qrcode({
			text	: "http://jetienne.com"
		});
		$('#paycbutton').attr('disabled', true);
	});	

});