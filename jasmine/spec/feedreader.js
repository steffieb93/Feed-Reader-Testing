/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("URL defined", function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.url).toBeDefined();
                 expect(feed.url.length).not.toBe(0);
             });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it("name defined", function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The Menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it("is hidden", function() {
             let hidden = document.querySelector('body');

             expect(hidden.classList.contains('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it("menu changes visibility", function() {
              let hidden = document.querySelector('body');
              let visible = document.querySelector('.menu-icon-link');

              // Clicks to see if the hidden class will go away
              visible.click();
              expect(hidden.classList.contains('menu-hidden')).toBe(false);

              // Clicks again to see if hidden class comes back
              visible.click();
              expect(hidden.classList.contains('menu-hidden')).toBe(true);
          });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
             loadFeed(0, done);
         });

         it("LoadFeed completes its work", function() {
             let feed = document.querySelector('.feed');
             let entry = feed.querySelectorAll('.entry');  // Checks everything that has an enty class within the query selector that has the feed class.

             expect(entry.length).not.toBe(0);
         });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var feedOne, feedTwo;
         let feed = document.querySelector('.feed');

         beforeEach(function(done) {
             loadFeed(1, function() {
                 feedOne = feed.innerHTML;  // Copies wording on feedOne
                 loadFeed(0, function() {
                     feedTwo = feed.innterHTML;  // Copies wording on feedTwo
                     done();
                 });
             });
         });

         it("New feed loaded", function() {
             expect(feedOne).not.toBe(feedTwo);   // Checks to see if wording does not match between the two.
         });
    });
}());
