var BiasViewModel = require('../BiasTab.Web/Scripts/Bias/bias_tab');
require('should');
ko = require('knockout');


describe('BiasViewModel', function(){
	var biasReport = {
		BiasSessionId:5,
		BiasRows: []
	};
	var bvm = new BiasViewModel(biasReport);

	it('should set the BiasSessionId correctly', function(){
	    bvm.biasSessionId().should.equal(5);
	});
	
});
