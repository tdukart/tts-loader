var execSync = require( 'child_process' ).execSync,
	loaderUtils = require( 'loader-utils' ),
	tmp = require( 'tmp' );

module.exports = function ( source ) {
	var tempFile = tmp.tmpNameSync( {
		postfix: '.tmp.aiff'
	} );

	var command = 'say -o ' + tempFile,
		options = { input: source };

	execSync( command, options );

	var fileContent = this.fs.readFileSync( tempFile );

	var fileName = loaderUtils.interpolateName(
		this, '[name].[hash].aiff', { content: fileContent }
	);

	this.emitFile( fileName, fileContent );

	var path = '__webpack_public_path__ + ' + JSON.stringify( fileName );

	return 'export default ' + path;
};
