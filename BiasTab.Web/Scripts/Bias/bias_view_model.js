var server = require('./server');
var ko = require('knockout');


function BiasViewModel(options) {
    var self = this;

    baseUrl = options.baseUrl;
    self.biasRows = ko.observableArray(ko.utils.arrayMap(options.biasReport.BiasRows, function (biasRow) {
        return {
            ticker: ko.observable(biasRow.Ticker),
            tradeCount: ko.observable(biasRow.TradeCount),
            benchmarkWeight: ko.observable(biasRow.BenchmarkWeight)
        };
    }));
    self.sectors = ko.observableArray();

    self.biasSessionId = ko.observable(options.biasReport.BiasSessionId);

    self.tradeCount = ko.computed(function() {
        return self.biasRows().length;
    });

    self.tradeValueChanged = function (biasRow) {
        
        var biasTradeEvent = { BiasSessionId: self.biasSessionId(), TradeAmount: biasRow.tradeCount(), Ticker: biasRow.ticker() };
        server.postJSON(baseUrl + "/api/BiasTrade", biasTradeEvent, function (updateResult) {
            biasRow.benchmarkWeight(updateResult.BiasRow.BenchmarkWeight);
            self.sectors(updateResult.Sectors);
        });
    };

}



module.exports = BiasViewModel;