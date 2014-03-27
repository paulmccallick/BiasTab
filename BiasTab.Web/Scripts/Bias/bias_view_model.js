function BiasViewModel(biasReport) {
    var self = this;
    
    self.biasRows = ko.observableArray(ko.utils.arrayMap(biasReport.BiasRows, function (biasRow) {
        return {
            ticker: ko.observable(biasRow.Ticker),
            tradeCount: ko.observable(biasRow.TradeCount),
            benchmarkWeight: ko.observable(biasRow.BenchmarkWeight)
        };
    }));
    self.sectors = ko.observableArray();

    self.biasSessionId = ko.observable(biasReport.BiasSessionId);

    self.tradeValueChanged = function (biasRow) {

        var biasTradeEvent = { BiasSessionId: self.biasSessionId(), TradeAmount: biasRow.tradeCount, Ticker: biasRow.ticker };
        $.postJSON("/api/BiasTrade", biasTradeEvent, function (updateResult) {
            console.log(updateResult);
            biasRow.benchmarkWeight(updateResult.BiasRow.BenchmarkWeight);
            self.sectors(updateResult.Sectors);
        });
    };

}



module.exports = BiasViewModel;