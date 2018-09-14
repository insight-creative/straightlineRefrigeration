// Basic fade transition example that barba.js provides, this looks super nice already!!!
$(function() {
  console.log('%c Justin Parsons','background: red; color: white; padding: 5px 10px;');
  var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */
    document.body.scrollTop = 0;

    document.documentElement.scrollTop = 0;

    var _this = this;
    var page = $(location).attr('href');
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */
       /*
       Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {
         //highlight the current link so it shows users where they are on site
         $(function(){
             var url = window.location.href;
             var activePage = url;
             $(".menuLink").each(function() {
                 var linkPage = this.href;
                 if (activePage == linkPage) {
                     $(this).closest("li").addClass("active");

                 }
             });

         });
       });
       */
      _this.done();

    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {

  return FadeTransition;
};
    Barba.Pjax.start();


});
// open our sites mobile menu
$(function() {
    $(".menuTextWrap").click(function(e){
        $(".menu").toggleClass("open");
        	e.stopPropagation();
    });
});
// close our sites mobile menu when the X icon is clicked
$(function() {
    $(".closeMenu").click(function(e){
        	$(".menu").removeClass("open");
    });
});
// close our sites mobile menu when a link item is clicked
$(function() {
    $(".linkList").click(function(e){
        	$(".menu").removeClass("open");
    });
});

// smooth scroll to elements in inner services nav

$(document).on('click', 'a[href^="#container"]', function (event) {

    event.preventDefault();



    $('html, body').animate({

      scrollTop: $($.attr(this, 'href')).offset().top

     }, 1500);

});
