function LetsMakeItShort () {
	var enteredUrl = $('#enteredUrl').val();

	//Url control must be done!

	$.get( "/add", { newUrl: enteredUrl} )
			.done(function( key ) {
    			$('#output').text(document.URL +key);
    			$('#outputDiv').css('visibility','visible').removeClass('panel-danger');
					$('#outputHeader').text('The Shorter Url');
  		})
			.fail(function( response ){
				$('#output').text(response.responseText.slice(1,-1));
				$('#outputDiv').css('visibility','visible').addClass('panel-danger');
				$('#outputHeader').text('Error');
			});
}
