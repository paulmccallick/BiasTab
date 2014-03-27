var edge = require('edge');

var clrMethod = edge.func({
    assemblyFile: '../BiasTab.Web.Test/bin/debug/BiasTab.Web.Test.dll',
    typeName: 'BiasTab.Web.Test.CassiniDevIntegrationTest',
    methodName: 'Edgy'
});

clrMethod('asdf',function (error, result) {
    console.log('here');
    console.log(error);
    console.log(result);
});