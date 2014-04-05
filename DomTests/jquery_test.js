require('should');
$ = require('jquery');

describe('Jquery',function(){
	var a = {x:'y'};
	var b = {y:'z'};
	$.extend(b,a);
	it('is available during this test',function(){
		b.x.should.equal('y');
	});
});