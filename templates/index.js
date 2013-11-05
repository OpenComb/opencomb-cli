#!/usr/bin/env node

var pkgmeta = require("./package.json") ;
var fs =  require("fs") ;
var helpers = require("opencomb/lib/helpers") ;

fs.exists(__dirname+"/config.json",function(exists){

    require("opencomb")
	.createApplication (__dirname,exists? require( "./config.json" ): {})
	.startup(function(err,app){

            var helper= new helpers.Helper(module) ;

	    if(err) {
		if(err.message.match("EADDRINUSE"))
		    console.error("端口"+app.config.server.port+"被占用，可能重复启动OpenComb，或其他程序占用了相同的网络端口。") ;
		else
		    console.error(err) ;
	    }
	    else
                helper.log.info("OpenComb("+pkgmeta.version+") has startuped at "+app.config.server.port+":)") ;
	}) ;
}) ;
