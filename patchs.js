


// patch for inquirer
// chanage select list size to 30 from 7
require("inquirer/lib/objects/choices.js").prototype.paginateOutput = function( render ) {
    var pageSize = 30;

    return function( active ) {
	var output = render.apply( this, arguments );
	var lines = output.split("\n");

	// Make sure there's enough line to paginate
	if ( lines.length <= pageSize ) return output;

	// Move the pointer only when the user go down and limit it to 3
	if ( this.pointer < 3 && this.lastIndex < active && active - this.lastIndex < 9 ) {
	    this.pointer = Math.min( 3, this.pointer + active - this.lastIndex);
	}
	this.lastIndex = active;

	// Duplicate the lines so it give an infinite list look
	var infinite = _.flatten([ lines, lines, lines ]);
	var topIndex = Math.max( 0, active + lines.length - this.pointer );

	var section = infinite.splice( topIndex, pageSize ).join("\n");
	return section + "\n" + clc.blackBright("(Move up and down to reveal more choices)");
    }.bind(this);
};
