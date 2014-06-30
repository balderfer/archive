$(document).ready(function() {
	$('.run-functions-button').on('click', function(event) {
	    var $this             = $(this);
	    $this.text('...');
	    var $imageSection     = $this.closest('.image-section');
	    var $colorThiefOutput = $imageSection.find('.color-thief-output');
	    var $targetimage      = $imageSection.find('.target-image');
	    showColorsForImage($targetimage, $imageSection);
    });

    var colorThief = new ColorThief();

    var showColorsForImage = function($image, $imageSection ) {
    	var image                    = $image[0];
    	var palette                  = colorThief.getPalette(image);
      var rgb0                     = '('+palette[0][0].toString()+','+palette[0][1].toString()+','+palette[0][2].toString()+')';
      var rgb1                     = '('+palette[1][0].toString()+','+palette[1][1].toString()+','+palette[1][2].toString()+')';
      var rgb2                     = '('+palette[2][0].toString()+','+palette[2][1].toString()+','+palette[2][2].toString()+')';
      var rgb3                     = '('+palette[3][0].toString()+','+palette[3][1].toString()+','+palette[3][2].toString()+')';
      var rgb4                     = '('+palette[4][0].toString()+','+palette[4][1].toString()+','+palette[4][2].toString()+')';
      var rgb5                     = '('+palette[5][0].toString()+','+palette[5][1].toString()+','+palette[5][2].toString()+')';
      var rgb6                     = '('+palette[6][0].toString()+','+palette[6][1].toString()+','+palette[6][2].toString()+')';
      var rgb7                     = '('+palette[7][0].toString()+','+palette[7][1].toString()+','+palette[7][2].toString()+')';
      var rgb8                     = '('+palette[8][0].toString()+','+palette[8][1].toString()+','+palette[8][2].toString()+')';

      var hex0                     = '#'+(palette[0][0].toString(16))+(palette[0][1].toString(16))+(palette[0][2].toString(16));
      var hex1                     = '#'+(palette[1][0].toString(16))+(palette[1][1].toString(16))+(palette[1][2].toString(16));
      var hex2                     = '#'+(palette[2][0].toString(16))+(palette[2][1].toString(16))+(palette[2][2].toString(16));
      var hex3                     = '#'+(palette[3][0].toString(16))+(palette[3][1].toString(16))+(palette[3][2].toString(16));
      var hex4                     = '#'+(palette[4][0].toString(16))+(palette[4][1].toString(16))+(palette[4][2].toString(16));
      var hex5                     = '#'+(palette[5][0].toString(16))+(palette[5][1].toString(16))+(palette[5][2].toString(16));
      var hex6                     = '#'+(palette[6][0].toString(16))+(palette[6][1].toString(16))+(palette[6][2].toString(16));
      var hex7                     = '#'+(palette[7][0].toString(16))+(palette[7][1].toString(16))+(palette[7][2].toString(16));
      var hex8                     = '#'+(palette[8][0].toString(16))+(palette[8][1].toString(16))+(palette[8][2].toString(16));

    	var colorThiefOutput = {
    		palette: palette,

        rgb0: rgb0,
        rgb1: rgb1,
        rgb2: rgb2,
        rgb3: rgb3,
        rgb4: rgb4,
        rgb5: rgb5,
        rgb6: rgb6,
        rgb7: rgb7,
        rgb8: rgb8,

        hex0: hex0,
        hex1: hex1,
        hex2: hex2,
        hex3: hex3,
        hex4: hex4,
        hex5: hex5,
        hex6: hex6,
        hex7: hex7,
        hex8: hex8
    	};

      $imageSection.removeClass('with-color-thief-output');

    	var colorThiefOuputHTML = Mustache.to_html($('#color-thief-output-template').html(), colorThiefOutput);
    	$imageSection.addClass('with-color-thief-output');
    	$imageSection.find('.run-functions-button').addClass('hide');
    	$imageSection.find('.color-thief-output').append(colorThiefOuputHTML).slideDown();

    	var windowHeight          = $(window).height();
    	var currentScrollPosition = $('body').scrollTop()
    	var outputOffsetTop       = $imageSection.find('.color-thief-output').offset().top
    	if ((currentScrollPosition < outputOffsetTop) && (currentScrollPosition + windowHeight - 250 < outputOffsetTop)) {
    		$('body').animate({scrollTop: outputOffsetTop - windowHeight + 200 + "px"});
    	}

      $('#swatch0').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb0);
        $('#swatch0 p').text(rgb0);
      });

      $('#swatch1').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb1);
        $('#swatch1 p').text(rgb1); 
      });

      $('#swatch2').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb2); 
        $('#swatch2 p').text(rgb2); 
      });

      $('#swatch3').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb3); 
        $('#swatch3 p').text(rgb3); 
      });

      $('#swatch4').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb4); 
        $('#swatch4 p').text(rgb4); 
      });

      $('#swatch5').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb5); 
        $('#swatch5 p').text(rgb5); 
      });

      $('#swatch6').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb6);
        $('#swatch6 p').text(rgb6);  
      });

      $('#swatch7').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb7); 
        $('#swatch7 p').text(rgb7); 
      });

      $('#swatch8').on('toggle2', function(event) {
        $(this).attr('data-clipboard-text', rgb8);
        $('#swatch8 p').text(rgb8);  
      });

      $('.dropdown-option1').on('toggle2', function(event) {
        $(this).css('font-weight', 300);
      })

      $('.dropdown-option2').click(function(){
        $(this).css('font-weight', 700);
        $('.dropdown-option1').trigger('toggle2');
        $('#swatch0').trigger('toggle2');
        $('#swatch1').trigger('toggle2');
        $('#swatch2').trigger('toggle2');
        $('#swatch3').trigger('toggle2');
        $('#swatch4').trigger('toggle2');
        $('#swatch5').trigger('toggle2');
        $('#swatch6').trigger('toggle2');
        $('#swatch7').trigger('toggle2');
        $('#swatch8').trigger('toggle2');
      });

      $('#swatch0').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex0); 
        $('#swatch0 p').text(hex0);
      });

      $('#swatch1').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex1); 
        $('#swatch1 p').text(hex1);
      });

      $('#swatch2').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex2); 
        $('#swatch2 p').text(hex2);
      });

      $('#swatch3').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex3);
        $('#swatch3 p').text(hex3); 
      });

      $('#swatch4').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex4);
        $('#swatch4 p').text(hex4); 
      });

      $('#swatch5').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex5); 
        $('#swatch5 p').text(hex5);
      });

      $('#swatch6').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex6); 
        $('#swatch6 p').text(hex6);
      });

      $('#swatch7').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex7);
        $('#swatch7 p').text(hex7); 
      });

      $('#swatch8').on('toggle1', function(event) {
        $(this).attr('data-clipboard-text', hex8); 
        $('#swatch8 p').text(hex8);
      });

      $('.dropdown-option2').on('toggle1', function(event) {
        $(this).css('font-weight', 300);
      });

      $('.dropdown-option1').click(function(){
        $(this).css('font-weight', 700);
        $('.dropdown-option2').trigger('toggle1');
        $('#swatch0').trigger('toggle1');
        $('#swatch1').trigger('toggle1');
        $('#swatch2').trigger('toggle1');
        $('#swatch3').trigger('toggle1');
        $('#swatch4').trigger('toggle1');
        $('#swatch5').trigger('toggle1');
        $('#swatch6').trigger('toggle1');
        $('#swatch7').trigger('toggle1');
        $('#swatch8').trigger('toggle1');
      });

      var client0 = new ZeroClipboard($('.swatch'), {
        moviePath: 'ZeroClipboard.swf'
      });
      client0.on('load', function(client0) {
        client0.on('complete', function(client0, args) {
          alert('Copied text to clipboard: ' + args.text);
        });
      });

    };

    if (Modernizr.draganddrop && !!window.FileReader && !isMobile()) {

	    $('#drag-drop').show();
	    var $dropZone = $('#drop-zone');
	    var handleDragEnter = function(event){
      		$dropZone.addClass('dragging');
      		return false;
    	};
    	var handleDragLeave = function(event){
      		$dropZone.removeClass('dragging');
      		return false;
    	};
    	var handleDragOver = function(event){
      		return false;
    	};
    	var handleDrop = function(event){
      		$dropZone.removeClass('dragging');
      		handleFiles(event.originalEvent.dataTransfer.files);
      		return false;
    	};
    	$dropZone
      	.on('dragenter', handleDragEnter)
      	.on('dragleave', handleDragLeave)
      	.on('dragover', handleDragOver)
      	.on('drop', handleDrop);
  	}

  	function handleFiles(files) {
	    var $draggedImages = $('#dragged-images');
	    var imageType      = /image.*/;
	    var fileCount      = files.length;

    	for (var i = 0; i < fileCount; i++) {
      		var file = files[i];

      		if (file.type.match(imageType)) {
        		var reader = new FileReader();
        		reader.onload = function(event) {
            		imageInfo = { images: [
                		{'class': 'dropped-image', file: event.target.result}
              		]};

	            	var imageSectionHTML = Mustache.to_html($('#image-section-template').html(), imageInfo);
	            	$draggedImages.prepend(imageSectionHTML);

	            	var $imageSection = $draggedImages.find('.image-section').first();
	            	var $image        = $('.dropped-image .target-image');

	            	// Must wait for image to load in DOM, not just load from FileReader
	            	$image.on('load', function() {
	              		showColorsForImage($image, $imageSection);
	            	});
          		};
        		reader.readAsDataURL(file);
      		}
      		else {
        		alert('File must be a supported image type.');
      		}
    	}
  	}

    function isMobile(){
    // if we want a more complete list use this: http://detectmobilebrowsers.com/
    // str.test() is more efficent than str.match()
    // remember str.test is case sensitive
    var isMobile = (/iphone|ipod|ipad|android|ie|blackberry|fennec/).test
         (navigator.userAgent.toLowerCase());
    return isMobile;
  }
});