(function($){

  "use strict";

  $.fn.fastSlide = function(defaults) {

    var options = {
      'dots':         true,
      'time':         4000,
      'autoPlay':     true,
      'keyboard':     true,
      'delay' :       1000,
    };

    var settings = $.extend( {}, options, defaults );

    var intervalSlide,
        thisStopped = false,
        current = 0,
        currentClass = 'ative',
        animated = false,
        $childBanner = $('.image', '.fastslide'),
        $childDots = $('[data-dot]', '[data-dots]'),
        $buttonNext = $('[data-next]'),
        $buttonPrevious = $('[data-prev]'),
        $allChildren = $childBanner.length,
        $banner = $('.fastslide'),
        widthBanner = $allChildren + '00%',
        syncCurrentAndChild = $allChildren - 1;

    return this.each( function(){

      function init() {
        $banner.css('width', widthBanner);
        $childBanner.css('width', 100/$allChildren + '%');

        if(settings.dots) {
          $childDots.first().addClass(currentClass);
          methods.dots();
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

        play : function() {
          intervalSlide = setInterval( function(){
            if(!animated) {
              methods.nextSlide();
            }
          }, settings.time);
        },

        nextSlide: function() {
          animated = true;
          $childBanner.removeClass(currentClass);
          $childDots.removeClass(currentClass);
          current++;

          if($allChildren === current) {
            current = 0;
          }

          $banner.animate({
            marginLeft: '-' + current + '00%'
          }, settings.delay, function(){
            animated = false;
          });

          if(settings.dots) {
            $childDots.eq(current).addClass(currentClass);
          }          
        },

        previousSlide: function() {
          animated = true;
          $childBanner.removeClass(currentClass);
          $childDots.removeClass(currentClass);
          current--;

          if(current < 0) {
            current = syncCurrentAndChild;
          }

          $banner.animate({
            marginLeft: '-' + current + '00%'
          }, settings.delay, function(){
            animated = false;
          });

          if(settings.dots) {
            $childDots.eq(current).addClass(currentClass);
          }
        },

        keyboard: function() {
          $(document).bind('keyup', function(e){
            if(e.which === 39 && !animated) {
              methods.next();

            } else if(e.which === 37 && !animated) {
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
            if(!animated) {
              methods.next();
            }
          });

          $buttonPrevious.on('click', function(){
            if(!animated) {
              methods.previous();
            }
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
        },

        dots: function() {
          $childDots.click( function(){
            var indexThis = $(this).index();

            if(!animated) {
              animated = true;
              $childDots.removeClass(currentClass);
              $childDots.eq(indexThis).addClass(currentClass);

              $banner.animate({
                marginLeft: '-' + indexThis + '00%'
              }, settings.delay, function(){

                animated = false;
                current = indexThis;
              });

            }
          });
        }
      }

      init();

    });

  };

})(jQuery);