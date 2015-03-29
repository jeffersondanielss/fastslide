(function($){

  "use strict";

  $.fn.fastSlide = function(defaults) {

    var options = {
      'dots':         true,
      'time':         2000,
      'autoPlay':     true,
      'keyboard':     true,
      'fullScreen':   false
    };

    var settings = $.extend( {}, options, defaults );

    var intervalSlide,
        thisStopped = false,
        current = 0,
        $childBanner = $('[data-image]', '[data-banner]'),
        $childDots = $('[data-dot]', '[data-dots]'),
        $buttonNext = $('[data-next]'),
        $buttonPrevious = $('[data-prev]'),
        allChildren = $childBanner.length,
        syncCurrentAndChild = allChildren - 1,
        currentClass = 'ative';

    return this.each( function(){

      function init() {
        $childBanner.first().addClass(currentClass);
        $childBanner.not('.' + currentClass).css('left', '100%');

        if(settings.dots) {
          $childDots.first().addClass(currentClass);
        }

        if(settings.fullScreen) {
          methods.fullScreen();
        }

        if(settings.autoPlay) {
          methods.play();
        }

        if(settings.keyboard) {
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

          $childBanner.removeClass(currentClass);
          $childDots.removeClass(currentClass);
          current++;

          if(allChildren === current) {
            current = 0;
          }

          setTimeout( function(){
            $childBanner.not('.' + currentClass).css('left', '100%');
          }, 500);

          $childBanner.eq(current)
          .addClass(currentClass)
          .animate({
            left: '0%'
          }, 500);

          if(settings.dots) {
            $childDots.eq(current).addClass(currentClass);
          }
        },

        previousSlide: function() {
          $childBanner.removeClass(currentClass);
          $childDots.removeClass(currentClass);
          current--;

          setTimeout( function(){
            $childBanner.not('.' + currentClass).css('left', '100%');
          }, 500);

          if(current < 0) {
            current = syncCurrentAndChild;
          }

          $childBanner.eq(current)
          .addClass(currentClass)
          .animate({
            left: '0%'
          }, 500);

          if(settings.dots) {
            $childDots.eq(current).addClass(currentClass);
          }
        },

        keyboard: function() {
          $(document).bind('keyup', function(e){
            if(e.which === 39) {
              methods.next();

            } else if(e.which === 37) {
              methods.previous();

            } else if(e.which === 32) {

              if(settings.autoPlay) {

                if(thisStopped){
                  methods.play();
                  thisStopped = false;

                } else {
                  clearInterval(intervalSlide);
                  thisStopped = true;

                }
              }

            }
          });
        },

        mouseEvents: function() {
          $buttonNext.on('click', function(){
            methods.next();
          });

          $buttonPrevious.on('click', function(){
            methods.previous();
          });
        },

        next: function() {
          clearInterval(intervalSlide);
          methods.nextSlide();

          if(settings.autoPlay) {
            methods.play();
          }
        },

        previous: function(){
          clearInterval(intervalSlide);
          methods.previousSlide();

          if(settings.autoPlay) {
            methods.play();
          }
        }
      }

      init();

    });

  };

})(jQuery);