#!/usr/bin/env node

require("colors") ;
require('./patchs.js') ;
var cli = require("cli") ;
var pkginfo = require("./package.json") ;
var Steps = require("ocsteps") ;


cli.setApp("OpenComb Cli",pkginfo.version) ;
//cli.setUsage("\n"+banner) ;

// parse args for --as-repo-workdir
// find out extensions install as a  repository workdir
var workdirExts = {} ;
var argv = process.argv.slice() ;
for(var i=0;i<argv.length;i++) {
    if( argv[i]=='--as-repo-workdir' || argv[i]=='-R' ) {
	for(i++; i<argv.length && !argv[i].match(/^(\-|\-\-)/) ; ) {
	    workdirExts[argv[i]] = argv[i] ;
	    argv.splice(i,1) ;
	}
	break ;
    }
}

var _getUsage = cli.getUsage ;
cli.getUsage = function() {

    // display logo
    console.error(require('./banner.js')) ;

    _getUsage.call(this) ;
}


cli.setArgv(argv) ;
cli.parse(
    // options and arguments
    {
	"dir": ['d', "Which dir you want to install an opencomb application.","path",process.cwd()]
	, "as-repo-workdir": ['R',"Install extensions as a repository(Git) workdir."]
	, "dbg-urllib-mockup": ['dm',"Use locale mockup data instead fetch package information from remote repositories."]
	, "dbg-clear-here-first": ['dc',"Clear target dir before installition."]
	, "dgb-dont-really-install-packages": ['ddi',"You do not need this, but i need."]
    }

    // commands
    , ['init','install','deply','help']
) ;

if(cli.options["as-repo-workdir"] && !Object.keys(workdirExts).length) {
    for(var i=0;i<cli.args.length;i++)
	workdirExts[ cli.args[i] ] = cli.args[i] ;
}

cli.main(function(args,opts){
    Steps(
	require("./commands/"+this.command+".js")
    )
    .catch(function(error){
	this.spinner("                   \n",true) ;
	console.error(error.stack||error) ;
    })
    .bind(this) () ;
}) ;
