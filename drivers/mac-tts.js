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
				tempFile = file.name;
				var command = 'say -o ' + tempFile,
					options = { input: source };

				return exec( command, options );
			} ).then( function () {
				return tempFile;
			} );
		} );
	}
};
