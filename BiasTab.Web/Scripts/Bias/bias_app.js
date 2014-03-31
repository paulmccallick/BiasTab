var BiasViewModel = require('./bias_view_model');
var SectorViewModel = require('./sector_view_model');
var server = require('./server');
var ko = require('knockout');

module.exports = function() {
    var biasViewModel;
    var sectorViewModel;
    return {
        biasViewModel: biasViewModel,
        sectorViewModel: sectorViewModel,
        initialize: function(options) {
            server.getJSON('/api/BiasReport/1', function (callbackData) {
                biasViewModel = new BiasViewModel({ biasReport: callbackData });
                sectorViewModel = new SectorViewModel();

                if (options.applyBindings) {
                    ko.applyBindings(biasViewModel, $("#bias_table")[0]);
                    ko.applyBindings(sectorViewModel, $("#sector_div")[0]);
                }
            });
        }
    }
}();