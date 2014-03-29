
var mockery = require('mockery');
require('should');

describe('BiasViewModel', function(){
    var options = {
            biasReport: {
		        BiasSessionId:5,
		        BiasRows: [{Ticker:"A",TradeCount:2}]
        }
    }

    afterEach(function() {
        mockery.disable();
    });
    describe('when calling constructor', function () {
        var BiasViewModel = require('../BiasTab.Web/Scripts/Bias/bias_view_model');
        var bvm = new BiasViewModel(options);

        it('should set the BiasSessionId correctly', function() {
            bvm.biasSessionId().should.equal(5);
        });

        it('should calculate the bias rows correctly', function() {
            bvm.tradeCount().should.equal(1);
        });
    });

    describe('when a trade is updated', function () {
        var jsonArg;
        var serverMock = {
            postJSON: function(url, data, callback) {
                var serverData  = {
                    Sectors: 'sectors',
                    BiasRow: { BenchmarkWeight: .05}
                }
                jsonArg = data;
                callback(serverData);
            }
        };
        var bvm;
        
        before(function (done) {
            mockery.registerMock('../server', serverMock);
            mockery.enable({ useCleanCache: true });
            var BiasViewModel = require('../BiasTab.Web/Scripts/Bias/bias_view_model');
            bvm = new BiasViewModel(options);
            bvm.tradeValueChanged(bvm.biasRows()[0], done);
        });

        it('should update the bias row from the server', function () {
            bvm.biasRows()[0].benchmarkWeight().should.equal(.05);
        });

        it('should call postJSON with the correct arguments', function () {
            jsonArg.TradeAmount.should.equal(2);
        });
    });

});