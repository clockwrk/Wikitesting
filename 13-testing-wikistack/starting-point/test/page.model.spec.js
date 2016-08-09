var Page = require("../models/").Page;
var spies = require('chai-spies');
var chai = require('chai');
var expect = chai.expect;

chai.use(spies);

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack',{logging: false});




describe('Page model', function () {

	beforeEach('Sync tables', function(done){
		Page.sync({force: true}).then(function(){
			done();
		}).catch(done);
	});

// getterMethods: {
//         route: function () {
//             return '/wiki/' + this.urlTitle;
//         },
//         renderedContent: function () {
//             return marked(this.content);
//         }

  describe('Virtuals', function () {
  		var page;
		beforeEach(function(done){
		page = Page.build().then(function(){
			done();
		}).catch(done);
		
	});

  	describe("route", function(){
  		it("returns the url_name prepended by '/wiki/'", function(done){
  			page.urlTitle = "some_title";
  			page.save().then(function(){
  				expect(page.route).to.not.equal('/wiki/some_title');
  			});
  			done();
  		});
  	});
  });
  describe('A different subcategory');
});
describe('A different category');