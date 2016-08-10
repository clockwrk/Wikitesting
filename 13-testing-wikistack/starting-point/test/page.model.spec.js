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
    

    describe('Virtuals', function () {
      
      var page;
      
      beforeEach("creating an entry",function(done){
        page  = Page.build({title:"Jose Page", content: "I am at fullstack"});
        done();
      });

      // afterEach("clearing the page table", function(done){
      //   Page.destroy({
      //     where: {
      //       title: "Jose Page"
      //     }
      //   });
      //   done();
      // });

      describe("route", function(){
        it("returns the url_name prepended by '/wiki/'", function(done){
          //page.title = "some title";
          page.save().then(function(){
            expect(page.route).to.equal('/wiki/Jose_Page');
            done();
          }).catch(done);
        });
      });
      

      describe("renderedContent", function(){
      
        it("returns Page data values as marked up html", function(done){
          page.content = "# some title";
          page.save().then(function(){
            console.log(page.renderedContent);
            expect(""+(page.renderedContent)).to.equal('<h1 id="some-title">some title</h1>\n');
            done();
          }).catch(done);
        });
      });
    });
  
  describe('Class methods', function () {
    
    
    //     findByTag: function (tag) {
    //         return Page.findAll({
    //             where: {
    //                 tags: {
    //                     $overlap: [tag]
    //                 }
    //             }
    //         });
    //     }
    // },
    describe('findByTag', function (done) {
      var page;

      beforeEach(function (done) {
        Page.create({
          title: 'foo',
          content: 'bar',
          tags: ['foo', 'bar']
        })
        .then(function () {
          done();
        })
        .catch(done);
      });

      it('gets pages with the search tag', function(done){
        
          Page.findByTag('foo').then(function(page){
            expect(page[0].title).to.equal('foo');
            done();
          }).catch(done);
      });      

      it('does not get pages without the search tag', function(done){
         Page.findByTag('chocolate').then(function(page){
              console.log(page);
              expect(page).to.lengthOf(0);
              done();
            }).catch(done);
         });
    });
  });

  describe('Instance methods', function () {


    describe('findSimilar', function () {


    beforeEach('save new instances', function(done){
      var page1 = Page.create({
          title: 'foo',
          content: 'bar',
          tags: ['whatever', 'otherTag']
        });


    var page2 = Page.create({
          title: 'Jose',
          content: 'bar',
          tags: ['foo', 'bar']
        });


    var page3 = Page.create({
          title: 'Mason',
          content: 'bar',
          tags: ['foo', 'barf']
        });



      Promise.all([page1, page2, page3]).then(function(newPages){
        console.log(newPages);
        done();
      }).catch(done);
    });


      it('never gets itself',function(done){
        page2.findSimilar().then(function(similar){
          similar.should.not.include(page2);
          done();
        }).catch(done);

      });
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});