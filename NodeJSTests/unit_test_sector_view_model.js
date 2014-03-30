var mockery = require('mockery');
require('should');

describe('SectorViewModel', function() {

    afterEach(function () {
        mockery.disable();
    });

    describe('when sector updates are published', function () {
        
        var messageCallback;
        mockery.enable();
        var pubsubmock = {
            subscribe: function(messageToSubscribeTo, callback) {
                messageCallback = callback;
            }
        };
        mockery.registerMock('pubsubjs', pubsubmock);
        var SectorViewModel = require('../BiasTab.Web/Scripts/Bias/sector_view_model');
        var sectors = [{ Name: 'A', Weight: 1 }, { Name: 'B', Weight: 2 }];
        var svm = new SectorViewModel();
        it('updates the sectors', function() {
            messageCallback('SECTOR_UPDATES', sectors);
            svm.sectors().length.should.equal(2);
            svm.sectors()[0].name.should.equal('A');
            svm.sectors()[0].weight.should.equal(1);
            svm.sectors()[1].name.should.equal('B');
            svm.sectors()[1].weight.should.equal(2);
        });
    });
});