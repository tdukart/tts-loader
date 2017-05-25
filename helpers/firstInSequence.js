var Promise = require( 'bluebird' );

// Borrowed from https://www.abeautifulsite.net/executing-promises-in-sequence-and-stopping-at-the-first-resolved-promise.
var firstInSequence = function ( values, asyncFn ) {
	return new Promise( function ( resolve, reject ) {
		// Are there any values to check?
		if ( values.length === 0 ) {
			// All were rejected
			reject();
		}
		// Try the first value
		asyncFn( values[ 0 ] ).then( function ( val ) {
			// Resolved, we're all done
			resolve( val );
		} ).catch( function () {
			// Rejected, remove the first item from the array and recursively
			// try the next one
			values.shift();
			firstInSequence( values, asyncFn ).then( resolve ).catch( reject );
		} );
	} );
};

module.exports = firstInSequence;
