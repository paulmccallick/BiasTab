var server = require('./server');
var ko = require('knockout');
var pubsub = require('pubsub-js');


function BiasViewModel(options) {
    var self = this;

    self.biasRows = ko.observableArray(ko.utils.arrayMap(options.biasReport.BiasRows, function (biasRow) {
        return {
            ticker: ko.observable(biasRow.Ticker),
            tradeCount: ko.observable(biasRow.TradeCount),
            benchmarkWeight: ko.observable(biasRow.BenchmarkWeight)
        };
    }));

    self.biasSessionId = ko.observable(options.biasReport.BiasSessionId);

    self.tradeCount = ko.computed(function() {
        return self.biasRows().length;
    });

    self.tradeValueChanged = function (biasRow) {
        
        var biasTradeEvent = { BiasSessionId: self.biasSessionId(), TradeAmount: biasRow.tradeCount(), Ticker: biasRow.ticker() };
        server.postJSON("/api/BiasTrade", biasTradeEvent, function (updateResult) {
            biasRow.benchmarkWeight(updateResult.BiasRow.BenchmarkWeight);
            pubsub.publish('SECTOR_UPDATES',updateResult.Sectors);
        });
    };

}

module.exports = BiasViewModel;