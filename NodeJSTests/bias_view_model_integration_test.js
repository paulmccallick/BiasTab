var BiasViewModel = require('../BiasTab.Web/Scripts/Bias/bias_view_model');
var path = require('path');
var webServer = require('./iis_express');
require('should');
ko = require('knockout');


describe('BiasViewModel', function () {
    var biasReport = {
        BiasSessionId: 1,
        BiasRows: []
    };
    var bvm = new BiasViewModel({ biasReport: biasReport, baseUrl: "http://localhost/8080" });



    //before(function (done) {
    //    options = {
    //        path: path.join(__dirname, '../', 'BiasTab.Web'),
    //        port: 8080
    //    }
    //    webServer.start(options, function() {
    //        bvm.targettradeValueChanged({ tradeCount: 1, ticker: "A" }, done);
    //    });
        
    //});
    
    
    it('should set the BiasSessionId correctly', function () {
        bvm.biasSessionId().should.equal(1);
        console.log(bvm.biasRows());
    });

});
