var childProcess = require( 'child_process' ),
	commandExistsSync = require( 'command-exists' ).sync,
	tmp = require( 'tmp' );

module.exports = {
	test: function () {
		return commandExistsSync( 'say' );
	},
	run: function ( source ) {
		var tmpAiff = tmp.fileSync( {
			postfix: '.tmp.aiff'
		} );

		var command = 'say -o ' + tmpAiff.name,
			options = { input: source };

		childProcess.execSync( command, options );

		return tmpAiff.name;
	}
};
