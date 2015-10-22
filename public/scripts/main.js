function LetsMakeItShort () {
	var enteredUrl = $('#enteredUrl').val();

	//Url control must be done!

	$.get( "/add", { newUrl: enteredUrl} )
			.done(function( key ) {
    			$('#outputUrl').text(key);
    			$('#outputDiv').show();
  		});
}