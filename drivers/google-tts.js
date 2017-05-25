var childProcess = require( 'child_process' ),
	commandExists = require( 'command-exists' ),
	download = require( 'download' ),
	fs = require( 'fs' ),
	googleTts = require( 'google-tts-api' ),
	Promise = require( 'bluebird' ),
	tmp = require( 'tmp' );

module.exports = {
	run: function ( source, options ) {
		var makeTempFile = Promise.promisify( tmp.file, { multiArgs: true } ),
			writeFile = Promise.promisify( fs.writeFile );

		var tempFile = '';

		return makeTempFile( {
			postfix: '.tmp.aiff'
		} )
			.then( function ( file ) {
				tempFile = file[ 0 ];
				return googleTts( source );
			} )
			.then( function ( url ) {
				return download( url );
			} )
			.then( function ( downloadData ) {
				return writeFile( tempFile, downloadData );
			} )
			.then( function () {
				return tempFile;
			} );
	}
};
