var mockery = require('mockery');

module.exports =  {
    getCleanMockery: function() {
        mockery.deregisterAll();
        mockery.disable();
        mockery.enable({
            useCleanCache: true, warnOnReplace: false,
            warnOnUnregistered: false
        });
        return mockery;
    }
};