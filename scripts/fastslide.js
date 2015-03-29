(function($){

  "use strict";

  $.fn.fastSlide = function(defaults) {

    var options = {
      'dots':         true,
      'time':         3000,
      'autoPlay':     true,
      'keyborad':     true,
      'fullScreen':   false,
      'currentClass': 'ative',
    };

    var settings = $.extend( {}, options, defaults );

    var _this = this,
        intervalSlide,
        thisStopped = false,
        current = 0,
        $childBanner = $('.image', '.banner'),
        $childDots = $('.dot', '.dots'),
        $buttonNext = $('.next'),
        $buttonPrevious = $('.previous'),
        allChildren = $childBanner.length,
        syncCurrentAndChild = allChildren - 1;

    return this.each( function(){

      function init() {
        $childBanner.first().addClass(settings.currentClass);

        if(settings.dots) {
          $childDots.first().addClass(settings.currentClass);
        }

        if(settings.fullScreen) {
          methods.fullScreen();
        }

        if(settings.autoPlay) {
          methods.play();
        }

        if(settings.keyborad) {
          methods.keyboard();
        }

        methods.mouseEvents();
      }

      var methods = {

        fullScreen: function() {
          if(settings.fullScreen) {
            $('html').addClass('mySlide-fullscreen');
          }
        },

        play : function() {
          intervalSlide = setInterval( function(){
            methods.nextSlide();
          }, settings.time);
        },

        nextSlide: function() {
          $childBanner.removeClass(settings.currentClass);
          $childDots.removeClass(settings.currentClass);
          current++;

          if(allChildren === current) {
            current = 0;
          }

          $childBanner.eq(current).addClass(settings.currentClass);

          if(settings.dots) {
            $childDots.eq(current).addClass(settings.currentClass);
          }
        },

        previousSlide: function() {
          $childBanner.removeClass(settings.currentClass);
          $childDots.removeClass(settings.currentClass);
          current--;

          if(current < 0) {
            current = syncCurrentAndChild;
          }

          $childBanner.eq(current).addClass(settings.currentClass);

          if(settings.dots) {
            $childDots.eq(current).addClass(settings.currentClass);
          }
        },

        keyboard: function() {
          $(document).bind('keyup', function(e){
            if(e.which === 39) {
              clearInterval(intervalSlide);
              methods.nextSlide();

              if(settings.autoPlay) {
                methods.play();
              }

            } else if(e.which === 37) {
              clearInterval(intervalSlide);
              methods.previousSlide();

              if(settings.autoPlay) {
                methods.play();
              }

            } else if(e.which === 32) {

              if(settings.autoPlay) {

                if(thisStopped){
                  methods.play();
                  console.log('play');
                  thisStopped = false;

                } else {
                  clearInterval(intervalSlide);
                  thisStopped = true;
                  console.log('pause');

                }
              }

            }
          });
        },

        mouseEvents: function() {
          $buttonNext.on('click', function(){
            clearInterval(intervalSlide);
            methods.nextSlide();

            if(settings.autoPlay) {
              methods.play();
            }
          });

          $buttonPrevious.on('click', function(){
            clearInterval(intervalSlide);
            methods.previousSlide();

            if(settings.autoPlay) {
              methods.play();
            }
          });
        }
      }

      // init all functions
      init();

    });

  };

})(jQuery);
