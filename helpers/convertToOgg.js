var ffmpeg = require( 'fluent-ffmpeg' ),
	Promise = require( 'bluebird' ),
	tmp = require( 'tmp' );

module.exports = function ( inputFile ) {
	return new Promise( function ( resolve, reject ) {
		var tmpOgg = tmp.fileSync( {
			postfix: '.tmp.ogg'
		} );

		ffmpeg()
			.input( inputFile )
			.save( tmpOgg.name )
			.on( 'end', function () {
				resolve( tmpOgg );
			} );
	} );
}