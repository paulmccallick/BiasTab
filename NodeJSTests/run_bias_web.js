var edge = require('edge');

var controlWebServer = edge.func({
    assemblyFile: '../BiasTab.Web.Test/bin/debug/BiasTab.Web.Test.dll',
    typeName: 'BiasTab.Web.Test.JavaScriptHandle',
    methodName: 'ControlWebServer'
});
controlWebServer('start', function (error, result) {
    if (error) {
        console.error("" + error);
        process.exit(1);
    }
    console.log('Web Server has been started');
    process.stdin.resume();
    process.stdout.write("Press any key to shut down server");
    process.stdin.once("data", function (data) {
        controlWebServer('stop', function (error, result) {
            console.log('Web Server is stopping');
        })
    });
});


