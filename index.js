// Libraries.
var loaderUtils = require( 'loader-utils' ),
	tmp = require( 'tmp' );

// TTS drivers.
var macTts = require( './drivers/mac-tts' );

// Helpers.
var convertToMp3 = require( './helpers/convertToMp3' );

module.exports = function ( source ) {
	var callback = this.async();
	var _this = this;

	macTts.run( source )
		.then( function ( speechFile ) {
			return convertToMp3( speechFile );
		} )
		.then( function ( speechFile ) {
			var outputStream = _this.fs.readFileSync( speechFile );

			var fileName = loaderUtils.interpolateName(
				_this, '[name].[hash].mp3', { content: outputStream }
			);

			_this.emitFile( fileName, outputStream );

			var path = '__webpack_public_path__ + ' + JSON.stringify( fileName );

			callback( null, 'export default ' + path );
		} );
};
