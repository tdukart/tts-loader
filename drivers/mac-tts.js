var childProcess = require( 'child_process' ),
	commandExists = require( 'command-exists' ),
	Promise = require( 'bluebird' ),
	tmp = require( 'tmp' );

module.exports = {
	run: function ( source ) {
		return commandExists( 'say' ).then( function () {
			var makeTempFile = Promise.promisify( tmp.file, { multiArgs: true } ),
				exec = Promise.promisify( childProcess.exec );
			var tempFile = '';

			return makeTempFile( {
				postfix: '.tmp.aiff'
			} ).then( function ( file ) {
				tempFile = file[ 0 ];
				var command = 'say -o ' + tempFile,
					options = { input: source };

				childProcess.execSync( command, options );
				return tempFile;
			} );
		} );
	}
};
