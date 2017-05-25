// Libraries.
var loaderUtils = require( 'loader-utils' ),
	path = require( 'path' ),
	Promise = require( 'bluebird' ),
	tmp = require( 'tmp' );

// TTS drivers.
var drivers = {
	google: require( './drivers/google-tts' ),
	mac: require( './drivers/mac-tts' )
};

// Helpers.
var convertToMp3 = require( './helpers/convertToMp3' ),
	convertToOgg = require( './helpers/convertToOgg' ),
	firstInSequence = require( './helpers/firstInSequence' );

function tryTts( source, options, context ) {
	return firstInSequence( options.drivers, function ( driverName ) {
		if ( !drivers.hasOwnProperty( driverName ) ) {
			context.emitWarning( 'TTS driver not recognized: ' + driverName );
			return Promise.reject();
		} else {
			return drivers[ driverName ].run( source, options );
		}
	} );
}

module.exports = function ( source ) {
	var callback = this.async();
	var _this = this;

	var options = Object.assign(
		{},
		{
			drivers: [ 'mac', 'google' ]
		},
		loaderUtils.getOptions( _this )
	);

	tryTts( source, options, _this )
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
