(function () {
	function checkForInvalidChars( params ) { // character checking
		var invalidChars = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','q','r','s','t','u','v','w','x','y','z' ];
		var result;
		params = params.toLowerCase();
		params = params.replace(/[0-9]/g, '');
		params = params.split('');
		$.each( params, function( i,v ) {
			if ( $.inArray( v, invalidChars ) !== -1 ) {
				result = false;
			} else {
				result = true;
			}
		} );
		return result;
	}	
	function getAmount() {
		$('#submitBtn').click( function(e) {
			e.preventDefault();
			$('#resultsBody').html( '' );				
			var parentForm = '#'+$(this).closest( 'form' ).attr('id');
			var amount = $( parentForm + ' input[name="amount"]' ).val().toLowerCase();
			var amount2 = amount; // duplicate of amount
			var denominations = [ 200,100,50,20,10,5,2,1 ]; // denominations array
			var denominations2 = [ '£2','£1','50p','20p','10p','5p','2p','1p' ]; // equivalent denominations array
			var count, totalVal, check, template;					
			if ( amount2 === '0' || amount2 === '' || amount2 === 0 ) { //check if the input is zero
				$( parentForm ).addClass( 'hasError' ); // form has error
				return true;
			} else if ( checkForInvalidChars( amount2 ) === false ) { //check if character is existing in invalidChars array
				$( parentForm ).addClass( 'hasError' );
				return true;
			} else {
				$( parentForm ).removeClass( 'hasError' );  // remove form error
				$('.resultsList').removeClass( 'hidden' );
				if ( amount.indexOf('£') !== -1 ) { //check if character has pound sign 
					amount = amount.replace( '£' ,'');
					amount = amount.replace( 'p' ,'');													
				} else if (  amount.indexOf('p') !== -1 && amount.indexOf('£') === -1  ) { //check if character is pence
					amount = amount.replace( 'p' ,'');												
				} 	
				if ( amount % 1 !== 0 ) { // if input has decimal, convert to whole number
					amount = amount * 100;
					amount = Math.round( amount );			
				}
				for( var i = 0; i < 8; i++ )  { // loop to the length of denominations array
					count = amount / denominations[i]; // divide each amount to denominations array
					check = count % 1; // checking if there's remainder - I never used this though				
					if ( count >= 1 ) {					
						template += '<tr>';
						template += '<td>' + denominations2[i] + '</td><td>x</td><td>' + parseInt( count ) + '</td>';  // get each calculated amount and append to be appended to the template
						template += '</tr>';				
						console.log( denominations2[i] + " x " + parseInt( count ) );								
					}
					totalVal = totalVal + count;
					amount = amount % denominations[i];
				}	
				$('#resultsBody').append( template );											
			}
			console.log( 'amount: ' + amount  );
		} );
	}
	getAmount();
})();