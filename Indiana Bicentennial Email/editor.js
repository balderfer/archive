$(document).ready(function() {


	

	var preparePage = function(cb) {
		$('#link-editor').remove();
		$('#dl-button').remove();
		$('*[contenteditable]').each(function(index, el) {
			$(this).removeAttr('contenteditable');
		});
		$('img').each(function(index, el) {
			$(this).replaceWith("{% container image-"+index+": 'Image "+index+"' %}");
		});
		cb();
	}

	var download = function() {
		var content = $('body').html();
		var css = $('#css-style').html();
		$('body').html('<textarea id="html-text"><body>'+content+'</body></textarea>');
		$("#html-text").width(window.innerWidth).height(window.innerHeight);
	}

	var initEditor = function(tag) {
		$('#link-editor-text').val($(tag).html());
		$('#link-editor-link').val($(tag).attr('href'));
		$('#link-editor-text').change(function(event) {
			$(tag).html($('#link-editor-text').val())
		});
		$('#link-editor-link').change(function(event) {
			$(tag).attr('href', $('#link-editor-link').val());
		});
	}

	var listen = function() {
		$('#dl-button').click(function(event) {
			preparePage(download);
		});
		$('a').click(function(event) {
		  event.preventDefault();
	      var editor = $('#link-editor');
	      editor.css({
	      	top: $(this).offset().top + $(this).height(),
	      	left: $(this).offset().left
	      });
	      initEditor(this);
	      editor.fadeIn('fast');
	    });

	    $('#link-editor-done').click(function(event) {
	    	$('#link-editor').fadeOut('fast');
	    });
	}


	listen();
});

