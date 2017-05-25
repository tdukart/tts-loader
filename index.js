var execSync = require( 'child_process' ).execSync,
	ffmpeg = require( 'fluent-ffmpeg' ),
	loaderUtils = require( 'loader-utils' ),
	tmp = require( 'tmp' );

module.exports = function ( source ) {
	var callback = this.async();
	var _this = this;

	var tmpAiff = tmp.fileSync( {
		postfix: '.tmp.aiff'
	} );

	var command = 'say -o ' + tmpAiff.name,
		options = { input: source };

	execSync( command, options );

	var tmpMp3 = tmp.fileSync( {
		postfix: '.tmp.mp3'
	} );

	ffmpeg()
		.input( tmpAiff.name )
		.audioCodec( 'libmp3lame' )
		.save( tmpMp3.name )
		.on( 'end', function () {
			var outputStream = _this.fs.readFileSync( tmpMp3.name );

			var fileName = loaderUtils.interpolateName(
				_this, '[name].[hash].mp3', { content: outputStream }
			);

			_this.emitFile( fileName, outputStream );

			var path = '__webpack_public_path__ + ' + JSON.stringify( fileName );

			callback( null, 'export default ' + path );
		} );
};
