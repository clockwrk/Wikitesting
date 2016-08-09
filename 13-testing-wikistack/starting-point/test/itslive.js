var spies = require('chai-spies');
var chai = require('chai');
var expect = chai.expect;

chai.use(spies);


describe('for each', function(){
	it('will invoke a function once per element', function(){
	var arr = [1,2,3];
	function numLogger(val){
		console.log(val);
	}

	spyFunc = chai.spy(numLogger);
	arr.forEach(spyFunc);
	expect(spyFunc).to.have.been.called.exactly(arr.length);
});

});




describe('Testing suite capabilities', function () {
  it('confirms basic arithmetic', function () {
    expect(2+2).to.equal(4);
  });
});

describe("setTimeout", function(){
	it('confirms setTimeout\'s timer accuracy', function (done) {
  var start = new Date();
  setTimeout(function () {
    var duration = new Date() - start;
    expect(duration).to.be.closeTo(1000, 50);
    done();
  }, 1000);
});
});