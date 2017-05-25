var ffmpeg = require( 'fluent-ffmpeg' ),
	Promise = require( 'bluebird' ),
	tmp = require( 'tmp' );

module.exports = function ( inputFile ) {
	return new Promise( function ( resolve, reject ) {
		var tmpMp3 = tmp.fileSync( {
			postfix: '.tmp.mp3'
		} );

		ffmpeg()
			.input( inputFile )
			.audioCodec( 'libmp3lame' )
			.save( tmpMp3.name )
			.on( 'end', function () {
				resolve( tmpMp3 );
			} );
	} );
}