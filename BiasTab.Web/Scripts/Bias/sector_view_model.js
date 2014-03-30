var ko = require('knockout');
var pubsub = require('pubsub-js');

function SectorViewModel() {
    var self = this;
    self.count = ko.observable();

    self.sectors = ko.observableArray();

    pubsub.subscribe('SECTOR_UPDATES', function(msg, sectorData) {
        self.sectors([]);
        self.count(sectorData.length);
        self.sectors(ko.utils.arrayMap(sectorData, function(sector) {
            return { name: sector.Name, weight: sector.Weight };
        }));
    });
}

module.exports = SectorViewModel;