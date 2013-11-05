


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



var urllib = require("urllib") ;
var _request = urllib.request ;
urllib.request = function(url,opts,cb) {

    if(arguments.length==2)
	cb = opts ;

    var cli = require('cli') ;
    if( cli.options['dbg-urllib-mockup'] && urllibMockups[url] ){
	cb && cb (null,urllibMockups[url]) ;
    }
    else {
	return _request.apply(this,arguments) ;
    }

}
var urllibMockups = {
    "https://registry.npmjs.org/opencomb": {"_id":"opencomb","_rev":"18-e324132ef9b8bd8404756c79fdf6eade","name":"opencomb","description":"![opencomb logo](public/images/logo.png)","dist-tags":{"latest":"0.9.6"},"versions":{"0.9.0":{"name":"opencomb","version":"0.9.0","description":"OpenComb ========","main":"index.js","directories":{"doc":"doc"},"dependencies":{"octemplate":"0.1","occlass":"0.1","ocplatform":"0.1.3"},"devDependencies":{},"scripts":{"test":"echo \"Error: no test specified\" && exit 1","scripts":{"start":"node index.js"}},"repository":{"type":"git","url":"git://github.com/OpenCombJS/OpenComb.git"},"author":{"name":"aleechou"},"license":"MIT","readmeFilename":"README.md","readme":"![opencomb logo](doc/images/logo.png)\n\n蜂巢(OpenComb)\n===\n\n蜂巢(OpenComb) 不只是一个 Node.js 的 Web 框架。\n\n\n```javascript\nmodule.exports = function(seed,nut,earth)\n{\n\tnut.write(\"hello world\") ;\n\treturn true ;\n}\nmodule.exports.__as_controller = true ;\n```\n\n## 快速开始\n\n在 `~/opencomb` 目录下部署蜂巢\n\n```\nnpm i opencomb && cd ~/opencomb\n```\n\n安装 blog 扩展\n\n```\nnpm i ocxblog\n```\n\n启动蜂巢\n\n```\nnode index.js\n```\n\n在浏览器里访问 url `http://127.0.0.1:6060`\n\n\n## 特性\n\n* 最小程度更新网页，而不是刷新整个网页\n* 服务器仅向前端传送数据\n* 支持浏览器的History和地址栏\n* 对搜索引擎友好，不干扰SEO\n* 控制器（以及视图）能够自由组合\n* 模板引擎在后端支持jQuery操作\n* AOP\n* 完全基于扩展\n* 响应式布局(Responsive Layout)\n* 内容协商(Content Negotiation)\n* 兼容 PC/移动设备 的不同屏幕尺寸和体验\n\n\n## 概念和原则\n\n\n1. 扩展驱动\n\n* “一切皆扩展” —— 所有的功能都由扩展来提供，\n\n* 对扩展进行扩展，\n\n2. 拒绝修改源代码\n\n3. 面向二次开发\n\n4. 简单而优雅\n\n5. 重视体验\n\n\t蜂巢同时重视开发体验和用户体验。\n\n6. 敏捷同时健壮\n\n\t敏捷：\n\t\t* 约定优于配置\n\t\t* 工作总是从写一个函数开始\n\t\t* jQuery 前端/后端(模板)\n\n\t健壮：\n\t\t* 配置高于约定\n\t\t* 依赖注入\n\t\t* 高内聚的控制器\n\t\t* 低耦合的控制器组合\n\t\t* Dont Repeat Your Self !\n\n\n7. 拥抱社区\n\n\n\n\n\n\n---\n\n## 文档目录\n\n### 开发者手册\n\n1. 安装和部署\n\n2. 控制器\n\n3. 视图和模板\n\n4. 前端开发\n\n5. 扩展\n\n### API\n\n\t* 控制器\n\t\t* earth\n\t\t* nut\n\t* 模板\n\t* 前端 API\n\n\n\n\n\n\n\n","_id":"opencomb@0.9.0","dist":{"shasum":"e34bd10cfaf6804007f8c92d269f8e9580dc0e1a","tarball":"http://registry.npmjs.org/opencomb/-/opencomb-0.9.0.tgz"},"_npmVersion":"1.1.65","_npmUser":{"name":"aleechou","email":"zq@alee2002.com"},"maintainers":[{"name":"aleechou","email":"zq@alee2002.com"}]},"0.9.1":{"name":"opencomb","version":"0.9.1","readmeFilename":"README.md","main":"index.js","author":{"name":"alee chou"},"license":"MIT","repository":{"type":"git","url":"git@github.com:OpenComb/OpenComb.git"},"bugs":{"url":"https://github.com/OpenComb/OpenComb/issues"},"dependencies":{"ocframework":"0.9.1"},"readme":"![opencomb logo](public/images/logo.png)\n\n蜂巢(OpenComb)\n===\n\n蜂巢(OpenComb)不只是一个 Node.js 的开发框架。\n\n## 依赖环境\n\n* [Node.js](http://nodejs.org/)\n* [MongoDB](http://www.mongodb.org/)\n* [Git](http://git-scm.com/)\n\n它们都是流行的开源项目，支持几乎所有平台，安装也很简单，你可以直接访问它们的主页，或google。\n\n在开始使用蜂巢以前，你需要花10分钟准备好蜂巢依赖的环境。\n\n## 快速开始\n\n在 `~/opencomb` 目录下部署蜂巢：\n\n```\ngit clone git@github.com:OpenComb/OpenComb.git opencomb\n```\n\n安装蜂巢的依赖：\n\n```\ncd opencomb && npm i\n```\n\n安装一个 blog 扩展\n\n```\nnpm i ocxblog\n```\n\n启动 mongodb\n\n```\nmongod &\n```\n\n启动蜂巢\n\n```\nnode index.js\n```\n\n在浏览器里访问 url `http://127.0.0.1:6060`\n\n\n---\n\n# 特性\n\n* 最小程度更新网页，而不是刷新整个网页\n* 服务器仅向前端传送数据\n* 支持浏览器的History和地址栏\n* 对搜索引擎友好，不干扰SEO\n* 控制器（以及视图）能够自由组合\n* 模板引擎在后端支持jQuery操作\n* AOP\n* 完全基于扩展\n* 响应式布局(Responsive Layout)\n* 内容协商(Content Negotiation)\n* 兼容 PC/移动设备 的不同屏幕尺寸和体验\n\n\n\n## 扩展驱动\n\n蜂巢是一个完全基于扩展的Web框架，用户可以通过安装扩展来搭建一个网站或Web App。\n\n* ___一切皆扩展___\n\n开发者通过开发扩展来为蜂巢提供功能和内容，这些扩展便于分发，和在其他蜂巢系统里安装。\n\n* ___对扩展进行扩展___\n\n扩展还能够“改变”其他扩展的行为。\n当你需要的扩展和你的需求并不完全一致时，你可以写一个新的扩展，来“修改”、“重塑”原有扩展的行为，而不是直接修改他的源代码。\n\n## 拒绝修改源代码\n\n* 蜂巢的模板引擎支持在后端运行`jQuery`，这使你能够用 `$` 来操作其他扩展提供的模板中的内容\n\n* 蜂巢提供的AOP机制，允许你对代码中的任何函数进行“切入”操作（即使是匿名函数），在目标函数的之前、之后，以及外围执行你提供的代码。\n\n* “依赖注入”保证了整个系统都是可以“被管理”的。\n\n这些机制的 API 安全、简单，容易调用和调式；而且还“绿色环保”：只有当你的扩展被安装后他们才生效；扩展被移除（删除扩展目录即可），所有的效果就会还原。\n\n\n## 网页是可以组合和重用的\n\n在蜂巢的MVC模式中，一个控制器对应一个视图 ，\n网页是由视图组成的，控制器的 layout 和 children 属性用于关联其他控制器，通过这种方式，控制器就“聚合”成一颗“树”，而他们的视图也会自动组合，最后“拼合”成一个完整的网页。\n\n所有网页都是由控制器（及其视图）组成的，这意味着你可以：\n\n* 向任意网页添加控制器\n\n* 用来自不同网页的控制器,重新组成一个新的网页\n\n> 蜂巢的控制器保持极高的内聚性，和低耦合度，是为了可以重复使用和组合而设计的。\n\n\n## 面向二次开发\n\n蜂巢是一个“面向二次开发”的框架，你可以通过安装各种扩展来构建一个“接近”的系统，然后创建新的扩展实现剩下的功能，而不是每个项目都从0开始。\n\n蜂巢的扩展机制允许你：\n\n* ___在自己开发的网页里，引用其他的扩展里的控制器___\n\n* ___将自己写的控制器，添加到其他扩展的网页里___\n\n* ___让某个网页里的视图重新布局___\n\n* ___用 jQuery 控制任何扩展的模板___\n\n* ___将你的代码，通过 AOP 机制“切入”到任何地方___\n\n于是，你可以：往某个导航菜单里增加一项内容；在你看中的地方插入一个banner；往某个CMS的内容表单里面增加几项特殊的字段；不喜欢blog扩展使用的富文本编辑器？那就换一个。\n\n完成以上的任务，你都没有“改动”源代码。所以，你能够将这些“改进”打包成一个新扩展，然后发布出去，分享给所有人；\n\n反过来讲，你可以安装别人发布的扩展，以及更多“增强”的扩展。\n\n\n---\n\n# 文档\n\n## 开发者手册\n\n1. [如何开始](doc/manual/how-to-start.md)\n\n2. [控制器](doc/manual/using-controller.md)\n\t* [使用控制器](doc/manual/using-controller.md)\n\t\t* [API:earth](doc/manual/earth-api.md)\n\t\t* [API:nut](doc/manual/nut-api.md)\n\t* [控制器组合](doc/manual/controller-aggregation.md)\n\t\t* [layout](doc/manual/controller-aggregation.md#layout)\n\t\t* [children](doc/manual/controller-aggregation.md#children)\n\t\t* [向 layout 和 child 传递参数](doc/manual/controller-aggregation.md#向+layout+和+child+传递参数)\n\t\t* [actions](doc/manual/controller-aggregation.md#actions)\n\t\t* [控制器路径](doc/manual/controller-aggregation.md#控制器路径)\n\t* [Ajax](doc/manual/ajax.md)\n\t* [Pjax](doc/manual/pjax.md)\n\t* [标题、关键词、描述](doc/manual/title-keywords-description.md)\n\t* XFormer\n\t\t* 增删改查\n\t\t* [二次开发]扩展表单和列表\n\t* 数据校验\n\t\t* 自定义校验插件\n\n3. [视图和模板](doc/manual/template-and-view.md)\n\t* [二次开发]“模板编织”\n\n4. 数据库\n\n5. Session\n\n6. [扩展](doc/manual/extension.md)\n\n7. AOP\n\n8. [高级] 扩展框架\n\t* 增加前端框架入口文件\n\t* 模板引擎的 parser 和 shader\n\n\n\n\n\n\n\n","description":"![opencomb logo](public/images/logo.png)","_id":"opencomb@0.9.1","dist":{"shasum":"c698cad34d60cd75a0aed20ac385ec1723eb2af3","tarball":"http://registry.npmjs.org/opencomb/-/opencomb-0.9.1.tgz"},"_from":".","_npmVersion":"1.2.24","_npmUser":{"name":"aleechou","email":"zq@alee2002.com"},"maintainers":[{"name":"aleechou","email":"zq@alee2002.com"}],"directories":{}},"0.9.4":{"name":"opencomb","version":"0.9.4","readmeFilename":"README.md","scripts":{"test":"make"},"main":"PackageManager.js","author":{"name":"alee chou"},"license":"MIT","repository":{"type":"git","url":"git://github.com/OpenComb/ocFramework.git#0.9.4"},"bugs":{"url":"https://github.com/OpenComb/ocFramework/issues"},"devDependencies":{"should":"*","mocha":"*"},"dependencies":{"send":"0.1.0","connect":"2.7.0","octemplate":"0.1.3","ocsteps":"0.2.21","mongodb":"1.2.14","stack-trace":"0.0.6","mocks":"0.0.11","log4js":"0.6.6"},"logger":{"appenders":[{"type":"console","category":["access"],"category-dev":["access","former"]},{"type":"file","category":"access","filename":"log/access.log","maxLogSize":20480,"backups":10}]},"readme":"![opencomb logo](public/images/logo.png)\n\nocFramework（蜂巢平台的核心框架）\n===\n\nocFramework 是一个Nodejs框架，它是OpenComb平台的核心代码，几乎所有OpenComb平台上的关键特性都由ocFramework实现。\nOpenComb实际上只是 ocFramework 和其他一些扩展（例如 ocUser,ocAuth 等）的集合。\n\nocFramework 也可以脱离OpenComb单独使用。\n\n## 依赖环境\n\n* [Node.js](http://nodejs.org/)\n* [MongoDB](http://www.mongodb.org/)\n* [Git](http://git-scm.com/)\n\n它们都是流行的开源项目，支持几乎所有平台，安装也很简单，你可以直接访问它们的主页，或google。\n\n在开始使用蜂巢以前，你需要花10分钟准备好蜂巢依赖的环境。\n\n## 快速开始\n\n在 `~/opencomb` 目录下部署蜂巢：\n\n```\ngit clone git@github.com:OpenComb/OpenComb.git opencomb\n```\n\n安装蜂巢的依赖：\n\n```\ncd opencomb && npm i\n```\n\n安装一个 blog 扩展\n\n```\nnpm i ocxblog\n```\n\n启动 mongodb\n\n```\nmongod &\n```\n\n启动蜂巢\n\n```\nnode index.js\n```\n\n在浏览器里访问 url `http://127.0.0.1:6060`\n\n\n## 安装部署开发版本\n\n如果你想为蜂巢贡献代码，或是使用最新版本，可以使用以下方法。\n\n\n从github clone OpenComb 库\n```\ngit clone https://github.com/OpenComb/OpenComb.git\ncd OpenComb\n```\n\n切换到对应版本\n```\ngit checkout 0.9.1\n```\n\n执行部署脚本：\n```\nnode script/deployFromGithub.js\n```\n\n启动蜂巢\n```\nnode index.js\n```\n\n\n---\n\n# 开发者资源\n\n* [框架ocFramework文档](doc/manual/README.md)\n\n\n\n","_id":"opencomb@0.9.4","description":"![opencomb logo](public/images/logo.png)","dist":{"shasum":"b447117679d664fa35eab2ddb8fc45ff8a57654c","tarball":"http://registry.npmjs.org/opencomb/-/opencomb-0.9.4.tgz"},"_npmVersion":"1.1.65","_npmUser":{"name":"aleechou","email":"zq@alee2002.com"},"maintainers":[{"name":"aleechou","email":"zq@alee2002.com"}],"directories":{}},"0.9.5":{"name":"opencomb","version":"0.9.5","readmeFilename":"README.md","scripts":{"test":"make"},"main":"PackageManager.js","author":{"name":"alee chou"},"license":"MIT","repository":{"type":"git","url":"git://github.com/OpenComb/ocFramework.git#0.9.5"},"bugs":{"url":"https://github.com/OpenComb/ocFramework/issues"},"devDependencies":{"should":"*","mocha":"*"},"dependencies":{"send":"0.1.0","connect":"2.7.0","octemplate":"0.1.4","ocsteps":"0.2.21","mongodb":"1.2.14","stack-trace":"0.0.6","mocks":"0.0.11","log4js":"0.6.6"},"logger":{"appenders":[{"type":"console","category":["access"],"category-dev":["access","former"]},{"type":"file","category":"access","filename":"log/access.log","maxLogSize":20480,"backups":10}]},"readme":"![opencomb logo](public/images/logo.png)\n\nocFramework（蜂巢平台的核心框架）\n===\n\nocFramework 是一个Nodejs框架，它是OpenComb平台的核心代码，几乎所有OpenComb平台上的关键特性都由ocFramework实现。\nOpenComb实际上只是 ocFramework 和其他一些扩展（例如 ocUser,ocAuth 等）的集合。\n\nocFramework 也可以脱离OpenComb单独使用。\n\n## 依赖环境\n\n* [Node.js](http://nodejs.org/)\n* [MongoDB](http://www.mongodb.org/)\n* [Git](http://git-scm.com/)\n\n它们都是流行的开源项目，支持几乎所有平台，安装也很简单，你可以直接访问它们的主页，或google。\n\n在开始使用蜂巢以前，你需要花10分钟准备好蜂巢依赖的环境。\n\n## 快速开始\n\n在 `~/opencomb` 目录下部署蜂巢：\n\n```\ngit clone git@github.com:OpenComb/OpenComb.git opencomb\n```\n\n安装蜂巢的依赖：\n\n```\ncd opencomb && npm i\n```\n\n安装一个 blog 扩展\n\n```\nnpm i ocxblog\n```\n\n启动 mongodb\n\n```\nmongod &\n```\n\n启动蜂巢\n\n```\nnode index.js\n```\n\n在浏览器里访问 url `http://127.0.0.1:6060`\n\n\n## 安装部署开发版本\n\n如果你想为蜂巢贡献代码，或是使用最新版本，可以使用以下方法。\n\n\n从github clone OpenComb 库\n```\ngit clone https://github.com/OpenComb/OpenComb.git\ncd OpenComb\n```\n\n切换到对应版本\n```\ngit checkout 0.9.1\n```\n\n执行部署脚本：\n```\nnode script/deployFromGithub.js\n```\n\n启动蜂巢\n```\nnode index.js\n```\n\n\n---\n\n# 开发者资源\n\n* [框架ocFramework文档](doc/manual/README.md)\n\n\n\n","_id":"opencomb@0.9.5","description":"![opencomb logo](public/images/logo.png)","dist":{"shasum":"e70909791c759355f2baa24308aa9f7f5dc73eea","tarball":"http://registry.npmjs.org/opencomb/-/opencomb-0.9.5.tgz"},"_npmVersion":"1.1.65","_npmUser":{"name":"aleechou","email":"zq@alee2002.com"},"maintainers":[{"name":"aleechou","email":"zq@alee2002.com"}],"directories":{}},"0.9.6":{"name":"opencomb","version":"0.9.6","readmeFilename":"README.md","scripts":{"test":"make"},"main":"index.js","author":{"name":"alee chou"},"license":"MIT","repository":{"type":"git","url":"git://github.com/OpenComb/ocFramework.git#0.9.6"},"bugs":{"url":"https://github.com/OpenComb/ocFramework/issues"},"devDependencies":{"should":"*","mocha":"*"},"dependencies":{"send":"0.1.0","connect":"2.7.0","octemplate":"0.1.4","ocsteps":"0.2.21","mongodb":"1.2.14","stack-trace":"0.0.6","mocks":"0.0.11","log4js":"0.6.6","oc-ext-messenger":"1.3.5"},"logger":{"appenders":[{"type":"console","category":["access"],"category-dev":["access","former"]},{"type":"file","category":"access","filename":"log/access.log","maxLogSize":20480,"backups":10}]},"readme":"![opencomb logo](public/images/logo.png)\n\nocFramework（蜂巢平台的核心框架）\n===\n\nocFramework 是一个Nodejs框架，它是OpenComb平台的核心代码，几乎所有OpenComb平台上的关键特性都由ocFramework实现。\nOpenComb实际上只是 ocFramework 和其他一些扩展（例如 ocUser,ocAuth 等）的集合。\n\nocFramework 也可以脱离OpenComb单独使用。\n\n## 依赖环境\n\n* [Node.js](http://nodejs.org/)\n* [MongoDB](http://www.mongodb.org/)\n* [Git](http://git-scm.com/)\n\n它们都是流行的开源项目，支持几乎所有平台，安装也很简单，你可以直接访问它们的主页，或google。\n\n在开始使用蜂巢以前，你需要花10分钟准备好蜂巢依赖的环境。\n\n## 快速开始\n\n在 `~/opencomb` 目录下部署蜂巢：\n\n```\ngit clone git@github.com:OpenComb/OpenComb.git opencomb\n```\n\n安装蜂巢的依赖：\n\n```\ncd opencomb && npm i\n```\n\n安装一个 blog 扩展\n\n```\nnpm i ocxblog\n```\n\n启动 mongodb\n\n```\nmongod &\n```\n\n启动蜂巢\n\n```\nnode index.js\n```\n\n在浏览器里访问 url `http://127.0.0.1:6060`\n\n\n## 安装部署开发版本\n\n如果你想为蜂巢贡献代码，或是使用最新版本，可以使用以下方法。\n\n\n从github clone OpenComb 库\n```\ngit clone https://github.com/OpenComb/OpenComb.git\ncd OpenComb\n```\n\n切换到对应版本\n```\ngit checkout 0.9.1\n```\n\n执行部署脚本：\n```\nnode script/deployFromGithub.js\n```\n\n启动蜂巢\n```\nnode index.js\n```\n\n\n---\n\n# 开发者资源\n\n* [框架ocFramework文档](doc/manual/README.md)\n\n\n\n","_id":"opencomb@0.9.6","description":"![opencomb logo](public/images/logo.png)","dist":{"shasum":"65016ab608e1529ab62260e15134b3e294346e75","tarball":"http://registry.npmjs.org/opencomb/-/opencomb-0.9.6.tgz"},"_npmVersion":"1.1.65","_npmUser":{"name":"aleechou","email":"zq@alee2002.com"},"maintainers":[{"name":"aleechou","email":"zq@alee2002.com"}],"directories":{}}},"readme":"![opencomb logo](doc/images/logo.png)\n\n蜂巢(OpenComb)\n===\n\n蜂巢(OpenComb) 不只是一个 Node.js 的 Web 框架。\n\n\n```javascript\nmodule.exports = function(seed,nut,earth)\n{\n\tnut.write(\"hello world\") ;\n\treturn true ;\n}\nmodule.exports.__as_controller = true ;\n```\n\n## 快速开始\n\n在 `~/opencomb` 目录下部署蜂巢\n\n```\nnpm i opencomb && cd ~/opencomb\n```\n\n安装 blog 扩展\n\n```\nnpm i ocxblog\n```\n\n启动蜂巢\n\n```\nnode index.js\n```\n\n在浏览器里访问 url `http://127.0.0.1:6060`\n\n\n## 特性\n\n* 最小程度更新网页，而不是刷新整个网页\n* 服务器仅向前端传送数据\n* 支持浏览器的History和地址栏\n* 对搜索引擎友好，不干扰SEO\n* 控制器（以及视图）能够自由组合\n* 模板引擎在后端支持jQuery操作\n* AOP\n* 完全基于扩展\n* 响应式布局(Responsive Layout)\n* 内容协商(Content Negotiation)\n* 兼容 PC/移动设备 的不同屏幕尺寸和体验\n\n\n## 概念和原则\n\n\n1. 扩展驱动\n\n* “一切皆扩展” —— 所有的功能都由扩展来提供，\n\n* 对扩展进行扩展，\n\n2. 拒绝修改源代码\n\n3. 面向二次开发\n\n4. 简单而优雅\n\n5. 重视体验\n\n\t蜂巢同时重视开发体验和用户体验。\n\n6. 敏捷同时健壮\n\n\t敏捷：\n\t\t* 约定优于配置\n\t\t* 工作总是从写一个函数开始\n\t\t* jQuery 前端/后端(模板)\n\n\t健壮：\n\t\t* 配置高于约定\n\t\t* 依赖注入\n\t\t* 高内聚的控制器\n\t\t* 低耦合的控制器组合\n\t\t* Dont Repeat Your Self !\n\n\n7. 拥抱社区\n\n\n\n\n\n\n---\n\n## 文档目录\n\n### 开发者手册\n\n1. 安装和部署\n\n2. 控制器\n\n3. 视图和模板\n\n4. 前端开发\n\n5. 扩展\n\n### API\n\n\t* 控制器\n\t\t* earth\n\t\t* nut\n\t* 模板\n\t* 前端 API\n\n\n\n\n\n\n\n","maintainers":[{"name":"aleechou","email":"zq@alee2002.com"}],"time":{"0.9.0":"2013-04-19T11:14:16.672Z","0.9.1":"2013-06-14T16:52:45.738Z","0.9.4":"2013-10-10T06:31:53.709Z","0.9.5":"2013-10-16T15:30:35.225Z","0.9.6":"2013-10-28T06:51:42.173Z"},"author":{"name":"alee chou"},"repository":{"type":"git","url":"git://github.com/OpenComb/ocFramework.git#0.9.6"},"_attachments":{"opencomb-0.9.6.tgz":{"content_type":"application/octet-stream","revpos":18,"digest":"md5-dKV0Q3BDCo2H0zHlxKHB+w==","length":244709,"stub":true},"opencomb-0.9.5.tgz":{"content_type":"application/octet-stream","revpos":16,"digest":"md5-hs7muERfwkbErfVx4Yixww==","length":657731,"stub":true},"opencomb-0.9.4.tgz":{"content_type":"application/octet-stream","revpos":14,"digest":"md5-vhQX0C5WRNoHff9xbhM9qw==","length":657687,"stub":true},"opencomb-0.9.1.tgz":{"content_type":"application/octet-stream","revpos":4,"digest":"md5-sfRq2BVYo7hA5GIlkMKnhw==","length":4031,"stub":true},"opencomb-0.9.0.tgz":{"content_type":"application/octet-stream","revpos":3,"digest":"md5-fpLnEv25WeelLKBNzpAsPg==","length":51015,"stub":true}}}


    , "https://api.github.com/repos/OpenComb/OpenComb/tags": [
	{
	    "name": "0.9.6",
	    "zipball_url": "https://api.github.com/repos/OpenComb/OpenComb/zipball/0.9.6",
	    "tarball_url": "https://api.github.com/repos/OpenComb/OpenComb/tarball/0.9.6",
	    "commit": {
		"sha": "0fade3052aec20c6ff9cce9a8a8bccbe64da9e0b",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/0fade3052aec20c6ff9cce9a8a8bccbe64da9e0b"
	    }
	},
	{
	    "name": "0.9.5",
	    "zipball_url": "https://api.github.com/repos/OpenComb/OpenComb/zipball/0.9.5",
	    "tarball_url": "https://api.github.com/repos/OpenComb/OpenComb/tarball/0.9.5",
	    "commit": {
		"sha": "0471dfdbece5a66e6ba4b3bdc6d9178ac3d5f8f4",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/0471dfdbece5a66e6ba4b3bdc6d9178ac3d5f8f4"
	    }
	},
	{
	    "name": "0.9.4",
	    "zipball_url": "https://api.github.com/repos/OpenComb/OpenComb/zipball/0.9.4",
	    "tarball_url": "https://api.github.com/repos/OpenComb/OpenComb/tarball/0.9.4",
	    "commit": {
		"sha": "cef528fefe1b90ebe4226339c9600cf66ed37f3e",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/cef528fefe1b90ebe4226339c9600cf66ed37f3e"
	    }
	},
	{
	    "name": "0.9.3",
	    "zipball_url": "https://api.github.com/repos/OpenComb/OpenComb/zipball/0.9.3",
	    "tarball_url": "https://api.github.com/repos/OpenComb/OpenComb/tarball/0.9.3",
	    "commit": {
		"sha": "4a5f788ac451db02c3a3163a338c7c9ca2615910",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/4a5f788ac451db02c3a3163a338c7c9ca2615910"
	    }
	}
    ]


    , "https://api.github.com/repos/OpenComb/OpenComb/branches": [
	{
	    "name": "develop",
	    "commit": {
		"sha": "9d45d11d78642c3877be5e4ce8f54800b265201b",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/9d45d11d78642c3877be5e4ce8f54800b265201b"
	    }
	},
	{
	    "name": "feature/support-bower",
	    "commit": {
		"sha": "9d875c40769c909bfedeb597349ecdf286a4f530",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/9d875c40769c909bfedeb597349ecdf286a4f530"
	    }
	},
	{
	    "name": "hotfix/use-jqueryui",
	    "commit": {
		"sha": "328c96714bf4ee590b0638b5eeefe68f4aebb671",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/328c96714bf4ee590b0638b5eeefe68f4aebb671"
	    }
	},
	{
	    "name": "master",
	    "commit": {
		"sha": "9bb9d74e32a10eaa4ae219784575f3ac371052e1",
		"url": "https://api.github.com/repos/OpenComb/OpenComb/commits/9bb9d74e32a10eaa4ae219784575f3ac371052e1"
	    }
	}
    ]

} ;
