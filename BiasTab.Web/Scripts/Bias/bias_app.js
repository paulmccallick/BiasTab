var BiasViewModel = require('./bias_view_model');
var SectorViewModel = require('./sector_view_model');
var server = require('./server');
var ko = require('knockout');

module.exports = (function () {
    var self = {};

    self.initialize = function(options) {
        server.getJSON('/api/BiasReport/1', function(callbackData) {
            self.biasViewModel = new BiasViewModel({ biasReport: callbackData });
            self.sectorViewModel = new SectorViewModel();

            if (options.applyBindings) {
                ko.applyBindings(self.biasViewModel, $("#bias_table")[0]);
                ko.applyBindings(self.sectorViewModel, $("#sector_div")[0]);
            }
        });
    }
    return self;
}());