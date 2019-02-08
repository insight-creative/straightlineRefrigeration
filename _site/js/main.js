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

      _this.done();

    });
    //run scripts that should be run before new barba content is shown
    pageCheckBefore();
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {

  return FadeTransition;
};
    Barba.Pjax.start();

    function pageCheckBefore(){
      //run script for vanilla-tilt
      'use strict';

      var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };

      /**
       * Created by Șandor Sergiu (micku7zu) on 1/27/2017.
       * Original idea: https://github.com/gijsroge/tilt.js
       * MIT License.
       * Version 1.4.1
       */

      var VanillaTilt = function () {
        function VanillaTilt(element) {
          var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          classCallCheck(this, VanillaTilt);

          if (!(element instanceof Node)) {
            throw "Can't initialize VanillaTilt because " + element + " is not a Node.";
          }

          this.width = null;
          this.height = null;
          this.left = null;
          this.top = null;
          this.transitionTimeout = null;
          this.updateCall = null;

          this.updateBind = this.update.bind(this);
          this.resetBind = this.reset.bind(this);

          this.element = element;
          this.settings = this.extendSettings(settings);

          this.reverse = this.settings.reverse ? -1 : 1;

          this.glare = this.isSettingTrue(this.settings.glare);
          this.glarePrerender = this.isSettingTrue(this.settings["glare-prerender"]);

          if (this.glare) {
            this.prepareGlare();
          }

          this.addEventListeners();
        }

        VanillaTilt.prototype.isSettingTrue = function isSettingTrue(setting) {
          return setting === "" || setting === true || setting === 1;
        };

        VanillaTilt.prototype.addEventListeners = function addEventListeners() {
          this.onMouseEnterBind = this.onMouseEnter.bind(this);
          this.onMouseMoveBind = this.onMouseMove.bind(this);
          this.onMouseLeaveBind = this.onMouseLeave.bind(this);
          this.onWindowResizeBind = this.onWindowResizeBind.bind(this);

          this.element.addEventListener("mouseenter", this.onMouseEnterBind);
          this.element.addEventListener("mousemove", this.onMouseMoveBind);
          this.element.addEventListener("mouseleave", this.onMouseLeaveBind);
          if (this.glare) {
            window.addEventListener("resize", this.onWindowResizeBind);
          }
        };

        VanillaTilt.prototype.removeEventListeners = function removeEventListeners() {
          this.element.removeEventListener("mouseenter", this.onMouseEnterBind);
          this.element.removeEventListener("mousemove", this.onMouseMoveBind);
          this.element.removeEventListener("mouseleave", this.onMouseLeaveBind);
          if (this.glare) {
            window.removeEventListener("resize", this.onWindowResizeBind);
          }
        };

        VanillaTilt.prototype.destroy = function destroy() {
          clearTimeout(this.transitionTimeout);
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }

          this.reset();

          this.removeEventListeners();
          this.element.vanillaTilt = null;
          delete this.element.vanillaTilt;

          this.element = null;
        };

        VanillaTilt.prototype.onMouseEnter = function onMouseEnter(event) {
          this.updateElementPosition();
          this.element.style.willChange = "transform";
          this.setTransition();
        };

        VanillaTilt.prototype.onMouseMove = function onMouseMove(event) {
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }

          this.event = event;
          this.updateCall = requestAnimationFrame(this.updateBind);
        };

        VanillaTilt.prototype.onMouseLeave = function onMouseLeave(event) {
          this.setTransition();

          if (this.settings.reset) {
            requestAnimationFrame(this.resetBind);
          }
        };

        VanillaTilt.prototype.reset = function reset() {
          this.event = {
            pageX: this.left + this.width / 2,
            pageY: this.top + this.height / 2
          };

          this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(0deg) " + "rotateY(0deg) " + "scale3d(1, 1, 1)";

          if (this.glare) {
            this.glareElement.style.transform = 'rotate(180deg) translate(-50%, -50%)';
            this.glareElement.style.opacity = '0';
          }
        };

        VanillaTilt.prototype.getValues = function getValues() {
          var x = (this.event.clientX - this.left) / this.width;
          var y = (this.event.clientY - this.top) / this.height;

          x = Math.min(Math.max(x, 0), 1);
          y = Math.min(Math.max(y, 0), 1);

          var tiltX = (this.reverse * (this.settings.max / 2 - x * this.settings.max)).toFixed(2);
          var tiltY = (this.reverse * (y * this.settings.max - this.settings.max / 2)).toFixed(2);
          var angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

          return {
            tiltX: tiltX,
            tiltY: tiltY,
            percentageX: x * 100,
            percentageY: y * 100,
            angle: angle
          };
        };

        VanillaTilt.prototype.updateElementPosition = function updateElementPosition() {
          var rect = this.element.getBoundingClientRect();

          this.width = this.element.offsetWidth;
          this.height = this.element.offsetHeight;
          this.left = rect.left;
          this.top = rect.top;
        };

        VanillaTilt.prototype.update = function update() {
          var values = this.getValues();

          this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " + "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " + "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";

          if (this.glare) {
            this.glareElement.style.transform = "rotate(" + values.angle + "deg) translate(-50%, -50%)";
            this.glareElement.style.opacity = "" + values.percentageY * this.settings["max-glare"] / 100;
          }

          this.element.dispatchEvent(new CustomEvent("tiltChange", {
            "detail": values
          }));

          this.updateCall = null;
        };

        /**
         * Appends the glare element (if glarePrerender equals false)
         * and sets the default style
         */


        VanillaTilt.prototype.prepareGlare = function prepareGlare() {
          // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
          if (!this.glarePrerender) {
            // Create glare element
            var jsTiltGlare = document.createElement("div");
            jsTiltGlare.classList.add("js-tilt-glare");

            var jsTiltGlareInner = document.createElement("div");
            jsTiltGlareInner.classList.add("js-tilt-glare-inner");

            jsTiltGlare.appendChild(jsTiltGlareInner);
            this.element.appendChild(jsTiltGlare);
          }

          this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
          this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

          if (this.glarePrerender) {
            return;
          }

          Object.assign(this.glareElementWrapper.style, {
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%",
            "overflow": "hidden"
          });

          Object.assign(this.glareElement.style, {
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'pointer-events': 'none',
            'background-image': "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
            'width': this.element.offsetWidth * 2 + "px",
            'height': this.element.offsetWidth * 2 + "px",
            'transform': 'rotate(180deg) translate(-50%, -50%)',
            'transform-origin': '0% 0%',
            'opacity': '0'
          });
        };

        VanillaTilt.prototype.updateGlareSize = function updateGlareSize() {
          Object.assign(this.glareElement.style, {
            'width': "" + this.element.offsetWidth * 2,
            'height': "" + this.element.offsetWidth * 2
          });
        };

        VanillaTilt.prototype.onWindowResizeBind = function onWindowResizeBind() {
          this.updateGlareSize();
        };

        VanillaTilt.prototype.setTransition = function setTransition() {
          var _this = this;

          clearTimeout(this.transitionTimeout);
          this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
          if (this.glare) this.glareElement.style.transition = "opacity " + this.settings.speed + "ms " + this.settings.easing;

          this.transitionTimeout = setTimeout(function () {
            _this.element.style.transition = "";
            if (_this.glare) {
              _this.glareElement.style.transition = "";
            }
          }, this.settings.speed);
        };

        VanillaTilt.prototype.extendSettings = function extendSettings(settings) {
          var defaultSettings = {
            reverse: false,
            max: 35,
            perspective: 1000,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            scale: "1",
            speed: "300",
            transition: true,
            axis: null,
            glare: false,
            "max-glare": 1,
            "glare-prerender": false,
            reset: true
          };

          var newSettings = {};
          for (var property in defaultSettings) {
            if (property in settings) {
              newSettings[property] = settings[property];
            } else if (this.element.hasAttribute("data-tilt-" + property)) {
              var attribute = this.element.getAttribute("data-tilt-" + property);
              try {
                newSettings[property] = JSON.parse(attribute);
              } catch (e) {
                newSettings[property] = attribute;
              }
            } else {
              newSettings[property] = defaultSettings[property];
            }
          }

          return newSettings;
        };

        VanillaTilt.init = function init(elements, settings) {
          if (elements instanceof Node) {
            elements = [elements];
          }

          if (elements instanceof NodeList) {
            elements = [].slice.call(elements);
          }

          if (!(elements instanceof Array)) {
            return;
          }

          elements.forEach(function (element) {
            if (!("vanillaTilt" in element)) {
              element.vanillaTilt = new VanillaTilt(element, settings);
            }
          });
        };

        return VanillaTilt;
      }();

      if (typeof document !== "undefined") {
        /* expose the class to window */
        window.VanillaTilt = VanillaTilt;

        /**
         * Auto load
         */
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
      }

      module.exports = VanillaTilt;


    }
// end of our barba script
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

// close our sites mobile menu when the logo is clicked
$(function() {
    $("#mobileMenuLogo").click(function(e){
        	$(".menu").removeClass("open");
    });
});

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

// Use our detect's results. passive applied if supported, capture will be false either way.
elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false); 
