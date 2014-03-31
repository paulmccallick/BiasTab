require('should');
var mockeryHelper = require('./mockery_helper');



describe('Given a bias report', function() {
    

    describe('when the user updates a bias row', function () {
        var serverMock = {
            postJSON: function(url, data, callback) {
                callback({});
            },
            getJSON: function(url, callback) {
                callback({});
            }
        }
        mockery = mockeryHelper.getCleanMockery();
        mockery.registerMock('./server', serverMock);
        var biasApp = require('../BiasTab.Web/Scripts/Bias/bias_app');
        it('determines the appropriate sector weights', function() {
            biasApp.initialize({ applyBindings: false });
            true.should.equal(false); //fail the teamcity build!
        });

    });

});