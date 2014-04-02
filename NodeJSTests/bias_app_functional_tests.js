require('should');
var mockeryHelper = require('./mockery_helper');
var _ = require('lodash');

describe('Given a bias report', function() {
    mockery = mockeryHelper.getCleanMockery();
    var serverMock = {
        postJSON: function(url, data, callback) {
            //assume this is for trade events.  yes this is a hack
            callback({
                BiasRow: { BenchmarkWeight: .05 },
                Sectors: [{ Name: 'Sec 1', Weight: .03 }, { Name: 'Sec 2', Weight: .07 }]
            });
        },
        getJSON: function(url, callback) {
            //assume this is for getting a bias report. yes, that is a hack too.
            callback({
                BiasRows: [
                    { Ticker: 'A', Sector: 'Sec 1', TradeCount: 2 },
                    { Ticker: 'B', Sector: 'Sec 1', TradeCount: 5 },
                    { Ticker: 'C', Sector: 'Sec 2', TradeCount: 1 },
                    { Ticker: 'D', Sector: 'Sec 2', TradeCount: 0 }
                ],
                BiasSessionId: 1
            });
        }
    };

    mockery.registerMock('./server', serverMock);
    var biasApp = require('../BiasTab.Web/Scripts/Bias/bias_app');
    biasApp.initialize({ applyBindings: false });


    describe('when the user updates a bias row', function () {
    
        var biasRow = _.find(biasApp.biasViewModel.biasRows(),function(row) {
            return row.ticker() === 'A';
        });

        biasRow.tradeCount(5);
        biasApp.biasViewModel.tradeValueChanged(biasRow);
        it('determines the appropriate sector weights', function() {
            var sector1 = _.find(biasApp.sectorViewModel.sectors(), function(sector) {
                return sector.name === 'Sec 1';
            });
            sector1.weight.should.equal(.03);
        });

        it('determines the correct sector count', function () {

            biasApp.sectorViewModel.count().should.equal(2);
        });
    });

});