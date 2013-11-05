var inquirer = require("inquirer") ;
var urllib = require('urllib') ;
var fs = require('fs') ;
var childprocess = require('child_process') ;
var rimraf = require('rimraf') ;
var util = require('util') ;
var path = require('path') ;
var rbower = require('rbower') ;



module.exports = function() {

    console.log(require('../banner.js')) ;
    console.log("Initializing an OpenComb Application in this dir\n") ;

    this.step(
	actDbgClearHereFirst
	, actCollectionVersionInfo
	, actDoQuestions
	, actInstallPackagesViaNPM
	, actInstallBowerPackages
	, actCreateAppFiles
    ) ;

}


function actDbgClearHereFirst(){
    if(!this.options['dbg-clear-here-first'] && this.options.dir)
	return ;

    var spinner = waiting("clear dir :"+this.options.dir) ;
    
    childprocess.exec('rm -rf *',this.holdButThrowError(function(err){
	spinner = spinner.done() ;
    })) ;
}


function actCollectionVersionInfo(){

    var spinner = waiting("Collecting versions information from npmjs.org and github.com") ;

    // npm versions
    urllib.request(
	"https://registry.npmjs.org/opencomb"
	, {
	    dataType: 'json'
	    , timeout: 30000
	}
	, this.holdButThrowError('-','npminfo')
    ) ;

    // github tags
    urllib.request(
	"https://api.github.com/repos/OpenComb/OpenComb/tags"
	, {
	    dataType: 'json'
	    , timeout: 30000
	}
	, this.holdButThrowError('-','githubtags')
    ) ;

    // github branches
    urllib.request(
	"https://api.github.com/repos/OpenComb/OpenComb/branches"
	, {
	    dataType: 'json'
	    , timeout: 30000
	}
	, this.holdButThrowError('-','githubbranches')
    ) ;

    this.step(function(){

	spinner.done() ;
	
	var verlist = [] ;

	// npm versions
	for(var vername in this.recv.npminfo.versions)
	    verlist.unshift('  '+vername) ;
	verlist.unshift(new inquirer.Separator( 
	    "[From npmjs.org:]".blue
		+ " (stable)".green
	))

	// github tags and branches
	for(var refname in {tags:1,branches:1}) {
	    var argname = 'github'+refname ;

	    verlist.push(new inquirer.Separator((
		'[From Github.com/'+refname+":]").blue
						+ "(meybe stable)".yellow
					       ))

	    for(var i=0;i<this.recv[argname].length;i++)
		verlist.push('  clone '+this.recv[argname][i].name) ;
	}
	

	return verlist ;
    }) ;
}


function actDoQuestions(versions) {
    versions.push(
	new inquirer.Separator("[Other:]".blue+"(unstale!)".grey)
	, "  <enter a git commit id ...>"
    ) ;

    console.log('') ;

    inquirer.prompt(
	[
	    // step 1
	    {
		name: "ocversion",
		type: "list",
		message: "Select OpenComb Version",
		paginated: true,
		choices: versions,
		filter: function(value){
		    value = value.trim() ;
		    var res ;
		    if( value=="<enter a git commit id ...>" )
			return { type: 'github/commit' } ;
		    else if( res=/clone (.+)$/.exec(value) )
			return { type: 'github/refs', version: res[1] } ;
		    else
			return { type: 'npm', version: value } ;
		}
	    }

	    // step 1.5
	    , {
		type: "input",
		name: "ocversion",
		message: "Commit id of git repository on github.com",
		validate: function(value) {
		    return value.trim().match(/^[0-9a-f]{40}$/i)? true: "Please enter a valid repository(Git) commit id" ;
		} ,
		when: function(answers) {
		    return answers.ocversion.type=='github/commit';
		} ,
		filter: function(value) {
		    return { type: "github/commit", version: value.trim().toLowerCase() } ;
		}
	    }
	    
	    // step 2
	    , {
		message: "Listen tcp port for web server"
		, type: "input"
		, name: "httpport"
		, "default": "6060"
		, filter: Number
		, validate: function(pass){
		    var port = parseInt(pass.trim()) ;
		    if( isNaN(port) || port<0 || port>65535 )
			return "Please enter a valid TCP port number (0-65535)" ;
		    else
			return true ;
		}
	    }

	    // step 3
	    , {
		message: "Database(MongoDB) name"
		, type: "input"
		, name: "dbname"
		, "default": "opencomb-app"
	    }

	    // step 4
	    , {
		message: "Database(MongoDB) server"
		, type: "input"
		, name: "dbserver"
		, "default": "localhost"
	    }

	    // step 5
	    , {
		message: "Database(MongoDB) username"
		, type: "input"
		, name: "dbusername"
	    }

	    // step 6
	    , {
		message: "Database(MongoDB) password"
		, type: "password"
		, name: "dbpassword"
	    }

	    // step 7
	    , {
		message: "Install extensions as repository(Git) work dir"
		, type: "confirm"
		, name: "as-repo-workdir"
		, "default": !!this.options["as-repo-workdir"]
	    }

	]
	, this.hold('answers',function(answers){
	    // fetch package.json from remote repository, and prompt deps to check
	    if( answers["as-repo-workdir"] )
		this.step([answers],actSelectedRepoWorkdir) ;
	})
    ) ;
}



function actSelectedRepoWorkdir(answers){

    var deps ;

    // from npm
    if(answers.ocversion.type=='npm'){
	var packagejson = this.recv.npminfo.versions[answers.ocversion.version] ;
	answers.ocversion.number = packagejson.version ;
	deps = packagejson.dependencies ;
    }

    // from github, fetch again
    else {
	var url ;
	if(answers.ocversion.type=='github/commit'){
	    url = "https://raw.github.com/OpenComb/OpenComb/"+answers.ocversion.version+"/package.json" ;
	}
	else{
	    // concat tags and branches
	    var vers = this.recv.githubtags.concat(this.recv.githubbranches) ;
	    // find out commit id
	    for(var i=0;i<vers.length;i++){
		if( vers[i].name == answers.ocversion.version ){
		    url = "https://raw.github.com/OpenComb/OpenComb/"+vers[i].commit.sha+"/package.json" ;
		    break ;
		}
	    }
	    if(!url)
		throw new Error("invalid version of opencomb, can not found git commit: "+answers.ocversion.version) ;
	}

	console.log('') ;
	var spinner = waiting("Fetching dependencies of this verion opencomb from github.com") ;

	urllib.request(
	    url
	    , {
		dataType:"json"
		, timeout: 30000
	    }
	    , this.holdButThrowError(function(err,json,res){

		spinner.done() ;

		console.log('') ;

		deps = json.dependencies ;
		answers.ocversion.number = json.version ;
	    })
	) ;
	
    }

    //
    this.step(function(){

	var depslist = [{
	    name: "  opencomb @"+answers.ocversion.version
	    , value: "opencomb"
	}] ;
	for(pkgname in deps){
	    depslist.push({
		name: '  '+pkgname+" @"+deps[pkgname]
		, value: pkgname
	    }) ;
	}
	
	inquirer.prompt(
	    [{
		message: "Which extensions shuld be installed as repositor(Git) work dir"
		, type: "checkbox"
		, name: "repowds"
		, choices: depslist
	    }]
	    , this.hold
	    (function(depsAnswers){
		answers.asrepos = depsAnswers.repowds ;
	    })
	) ;
    }) ;
}

function actInstallPackagesViaNPM() {

    if( this.options['dgb-dont-really-install-packages'] )
	return ;

    var answers = this.recv.answers ;

    // install packages by npm
    var argv = [ 
	require.resolve('repo-npm/bin/npm-cli.js')
	, "install"
	//, "--loglevel"
	//, "verbose"
    ] ;
    var options = {
	cwd: this.options.dir
	, env: process.env
    } ;

    // opencomb url
    if(answers.ocversion.type=='npm')
	argv.push('opencomb@'+answers.ocversion.version) ;
    else
	argv.push('git+https://github.com/OpenComb/OpenComb.git#'+answers.ocversion.version) ;

    // distro
    if(this.options.distro){
	argv.push(this.options.distro) ;
    }

    // as repo workdirs
    if( answers["as-repo-workdir"] && answers.asrepos && answers.asrepos.length ){
	argv = argv.concat("--as-repo-workdir",answers.asrepos) ;
    }
    
    console.log("exec command: ",'node',argv.join(' ')) ;
    
    var reponpm = childprocess.spawn('node',argv,options) ;
    var spinner = waiting("Install NPM packages") ;
    this.done(spinner.stop) ;

    reponpm.stdout.on('data',function(data){
	spinner.write(data.toString()) ;
    }) ;
    reponpm.stderr.on('data',function(data){
	spinner.write(data.toString()) ;
    }) ;
    reponpm.on('close', this.holdButThrowError(function(){
	spinner.done() ;
    })) ;
}

function actInstallBowerPackages(){
    
    if( this.options['dgb-dont-really-install-packages'] )
	return ;

    // install bower packages
    var spinner = waiting("Install bower packages") ;
    this.done(spinner.stop) ;

    rbower.install(this.holdButThrowError(function(){
	spinner.done() ;
    })) ;
}

function actCreateAppFiles(){

    var answers = this.recv.answers ;
    var spinner = waiting("create your OpenComb application files") ;
    this.done(spinner.stop) ;

    // copy files
    ["index.js"].forEach((function(filename){
	// copy file
        util.pump(
            fs.createReadStream(__dirname+"/../templates/"+filename)
            , fs.createWriteStream(this.options.dir+"/"+filename)
            , this.holdButThrowError()
        );
    }).bind(this)) ;


    // mkdir data folders
    this.each(
	['bin','public','public/data','log']
	, function(i,name){
	    process.stdout.write('mkdir '+name+' ... ') ;
	    fs.mkdir(this.options.dir+'/'+name,this.hold(function(err){
		if( err ) {
		    if( err.code=='EEXIST' )
			console.log('aleady exists'.yellow) ;
		    else
			throw err ;
		}
		else
		    console.log( 'done.'.green ) ;
	    })) ;
	}
    ) ;


    // create config.json
    var configjson = require(this.options.dir+"/node_modules/opencomb/config.tpl.json") ;
    configjson.db.username = answers.dbusername ;
    configjson.db.password = answers.dbpassword ;
    configjson.server.port = answers.httpport ;

    fs.writeFile(
	this.options.dir+"/config.json"
	, JSON.stringify(configjson)
	, this.holdButThrowError()
    ) ;

    // create package.json
    var packagejson = {
	name : path.basename(__dirname)
	, version : '1.0.0'
	, dependencies : {
	    'opencomb' : answers.ocversion.number
	}
    }
    fs.writeFile(
	this.options.dir+"/package.json"
	, JSON.stringify(packagejson)
	, this.holdButThrowError()
    ) ;
    

    // done
    this.step(function(){
	spinner.done() ;
    }) ;
}






function waiting(msg) {

    msg = msg + ' ' || '';
    var spinner = ['-','\\','|','/'], i = 0 ;
    var spinnerInterval = setInterval(function () {
        process.stdout.write( '\u000D' + msg + ', ' + 'pls waiting a moment ... '.magenta + spinner[i++].magenta );
	_prefix = '\u000D' ;
        if (i == spinner.length) i = 0 ;
    }, 200) ;

    var _prefix = '' ;

    return {
	write: function(msg) {
	    process.stdout.write(_prefix+msg) ;
	    _prefix = '' ;
	}

	, done: function() {
            process.stdout.write(_prefix+'\u000D'+msg + ", "+"done.".green+"                      \n") ;
            clearInterval(spinnerInterval);
	    spinnerInterval = null ;
	}

	, stop: function(){
	    spinnerInterval && clearInterval(spinnerInterval);
	}
    }
}
