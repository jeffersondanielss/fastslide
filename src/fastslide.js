(function($){

  "use strict";

  $.fn.fastSlide = function(defaults) {

    var options = {
      'dots':         !1,
      'time':         4000,
      'autoPlay':     !0,
      'keyboard':     !0,
      'delay' :       1000,
    };

    var settings = $.extend( {}, options, defaults );

    var intervalSlide,
        thisStopped = !1,
        current = 0,
        currentClass = 'ative',
        animated = !1,
        $childBanner = $('.image', '.fastslide'),
        $childDots = $('[data-dot]', '[data-dots]'),
        $buttonNext = $('[data-next]'),
        $buttonPrev = $('[data-prev]'),
        $buttonPlay = $('[data-play]'),
        $buttonStop = $('[data-stop]'),
        $allChildren = $childBanner.length,
        $banner = $('.fastslide');

    return this.each( function(){

      function init() {
        $banner.css('width', $allChildren + '00%');
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
              animated = !0;
              current++;

              if($allChildren === current) {
                console.log($allChildren);
                current = 0;
              }

              methods.move();
            }
          }, settings.time);
        },

        move: function() {
          $banner.animate({
              marginLeft: '-' + current + '00%'
          }, settings.delay,

          function(){
              animated = !1;
          });

          if(settings.dots) {
            $childDots.removeClass(currentClass);
            $childDots.eq(current).addClass(currentClass);
          }
        },

        next: function() {
          clearInterval(intervalSlide);
          animated = !0;
          current++;

          if($allChildren === current) {
            console.log($allChildren);
            current = 0;
          }

          methods.move();

          if(settings.autoPlay) {
            methods.play();
          }
        },

        prev: function() {
          clearInterval(intervalSlide);
          animated = !0;
          current--;

          if(current < 0) {
            console.log(current);
            current = $allChildren - 1;
          }

          methods.move();

          if(settings.autoPlay) {
            methods.play();
          }
        },

        keyboard: function() {
          $(document).bind('keyup', function(e){
            if(e.which === 39 && !animated) {
              methods.next();

            } else if(e.which === 37 && !animated) {
              methods.prev();

            } else if(e.which === 32) {

              if(settings.autoPlay) {

                if(thisStopped){
                  methods.play();
                  thisStopped = !1;

                } else {
                  clearInterval(intervalSlide);
                  thisStopped = !0;

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

          $buttonPrev.on('click', function(){
            if(!animated) {
              methods.prev();
            }
          });

          $buttonPlay.on('click', function(){
            methods.play();
          });

          $buttonStop.on('click', function(){
            clearInterval(intervalSlide);
          });
        },

        dots: function() {
          $childDots.click( function(){
            var indexThis = $(this).index();

            if(!animated) {
              animated = !0;
              $childDots.removeClass(currentClass);
              $childDots.eq(indexThis).addClass(currentClass);

              $banner.animate({
                marginLeft: '-' + indexThis + '00%'
              }, settings.delay, function(){

                animated = !1;
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
