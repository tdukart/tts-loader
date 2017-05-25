// Libraries.
var loaderUtils = require( 'loader-utils' ),
	path = require( 'path' ),
	tmp = require( 'tmp' );

// TTS drivers.
var macTts = require( './drivers/mac-tts' );

// Helpers.
var convertToMp3 = require( './helpers/convertToMp3' ),
	convertToOgg = require( './helpers/convertToOgg' );

module.exports = function ( source ) {
	var callback = this.async();
	var _this = this;

	macTts.run( source )
		.then( function ( speechFile ) {
			var conversions = [
				convertToOgg( speechFile ),
				convertToMp3( speechFile )
			];

			return Promise.all( conversions );
		} )
		.then( function ( speechFiles ) {
			var fileNames = speechFiles.map( function ( speechFile ) {
				var outputStream = _this.fs.readFileSync( speechFile.name );
				var extension = path.extname( speechFile.name );

				var fileName = loaderUtils.interpolateName(
					_this, '[name].[hash]' + extension, { content: outputStream }
				);

				_this.emitFile( fileName, outputStream );

				return '__webpack_public_path__ + ' + JSON.stringify( fileName );
			} );

			callback( null, 'export default [' + fileNames.join( ',' ) + ']' );
		} );
};
