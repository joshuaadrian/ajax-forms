/*
 * jQuery Anystretch
 * Version 1.2 (@jbrooksuk / me.itslimetime.com)
 * https://github.com/jbrooksuk/jquery-anystretch
 * Based on Dan Millar's Port
 * https://github.com/danmillar/jquery-anystretch
 *
 * Add a dynamically-resized background image to the body
 * of a page or any other block level element within it
 *
 * Copyright (c) 2012 Dan Millar (@danmillar / decode.uk.com)
 * Dual licensed under the MIT and GPL licenses.
 *
 * This is a fork of jQuery Backstretch (v1.2)
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
*/

;(function($) {
    
    $.fn.anystretch = function(src, options, callback) {
        var isBody = this.selector.length ? false : true; // Decide whether anystretch is being called on an element or not

        return this.each(function(i){
            var defaultSettings = {
                positionX: 'center',     // Should we center the image on the X axis?
                positionY: 'center',     // Should we center the image on the Y axis?
                speed: 0,                // fadeIn speed for background after image loads (e.g. "fast" or 500)
                elPosition: 'relative',  // position of containing element when not being added to the body
                dataName: 'stretch'      // The data-* name used to search for
            },
            el = $(this),
            container = isBody ? $('.anystretch') : el.children(".anystretch"),
            settings = container.data("settings") || defaultSettings, // If this has been called once before, use the old settings as the default
            existingSettings = container.data('settings'),
            imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgCSS;

            // Extend the settings with those the user has provided
            if(options && typeof options == "object") $.extend(settings, options);
            
            // Just in case the user passed in a function without options
            if(options && typeof options == "function") callback = options;
        
            // Initialize
            $(document).ready(_init);
      
            // For chaining
            return this;
        
            function _init() {
                // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
                if(src || el.length >= 1) {
                    var img;
                    
                    if(!isBody) {
                        // If not being added to the body set position to elPosition (default: relative) to keep anystretch contained
                        el.css({position: settings.elPosition, background: "none"});
                    }
                    
                    // If this is the first time that anystretch is being called
                    if(container.length == 0) {
                        container = $("<div />").attr("class", "anystretch")
                                                .css({left: 0, top: 0, position: (isBody ? "fixed" : "absolute"), overflow: "hidden", zIndex: (isBody ? -999999 : -999998), margin: 0, padding: 0, height: "100%", width: "100%"});
                    } else {
                        // Prepare to delete any old images
                        container.find("img").addClass("deleteable");
                    }
    
                    img = $("<img />").css({position: "absolute", display: "none", margin: 0, padding: 0, border: "none", zIndex: -999999})
                                      .bind("load", function(e) {                                          
                                          var self = $(this),
                                              imgWidth, imgHeight;
        
                                          self.css({width: "auto", height: "auto"});
                                          imgWidth = this.width || $(e.target).width();
                                          imgHeight = this.height || $(e.target).height();
                                          imgRatio = imgWidth / imgHeight;
    
                                          _adjustBG(function() {
                                              self.fadeIn(settings.speed, function(){
                                                  // Remove the old images, if necessary.
                                                  container.find('.deleteable').remove();
                                                  // Callback
                                                  if(typeof callback == "function") callback();
                                              });
                                          });
                                          
                                      })
                                      .appendTo(container);
                     
                    // Append the container to the body, if it's not already there
                    if(el.children(".anystretch").length == 0) {
                        if(isBody) {
                            $('body').append(container);
                        } else {
                            el.append(container);
                        }
                    }
                    
                    // Attach the settings
                    container.data("settings", settings);
                        
                    var imgSrc = "";
                    if(src) {
                        imgSrc = src;
                    }else if(el.data(settings.dataName)) {
                        imgSrc = el.data(settings.dataName);
                    }else{
                        return;
                    }
                    img.attr("src", imgSrc); // Hack for IE img onload event
                    
                    // Adjust the background size when the window is resized or orientation has changed (iOS)
                    $(window).resize(_adjustBG);
                }
            }
                
            function _adjustBG(fn) {
                try {
                    bgCSS = {left: 0, top: 0};
                    bgWidth = _width();
                    bgHeight = bgWidth / imgRatio;
    
                    // Make adjustments based on image ratio
                    // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
                    if(bgHeight >= _height()) {
                        bgOffset = (bgHeight - _height()) /2;
                        if(settings.positionY == 'center' || settings.centeredY) { // 
                            $.extend(bgCSS, {top: "-" + bgOffset + "px"});
                        } else if(settings.positionY == 'bottom') {
                            $.extend(bgCSS, {top: "auto", bottom: "0px"});
                        }
                    } else {
                        bgHeight = _height();
                        bgWidth = bgHeight * imgRatio;
                        bgOffset = (bgWidth - _width()) / 2;
                        if(settings.positionX == 'center' || settings.centeredX) {
                            $.extend(bgCSS, {left: "-" + bgOffset + "px"});
                        } else if(settings.positionX == 'right') {
                            $.extend(bgCSS, {left: "auto", right: "0px"});
                        }
                    }
    
                    container.children("img:not(.deleteable)").width( bgWidth ).height( bgHeight )
                                                       .filter("img").css(bgCSS);
                } catch(err) {
                    // IE7 seems to trigger _adjustBG before the image is loaded.
                    // This try/catch block is a hack to let it fail gracefully.
                }
          
                // Executed the passed in function, if necessary
                if (typeof fn == "function") fn();
            }
            
            function _width() {
                return isBody ? el.width() : el.innerWidth();
            }
            
            function _height() {
                return isBody ? el.height() : el.innerHeight();
            }
            
        });
    };
    
    $.anystretch = function(src, options, callback) {
        var el = ("onorientationchange" in window) ? $(document) : $(window); // hack to acccount for iOS position:fixed shortcomings
        
        el.anystretch(src, options, callback);
    };
  
})(jQuery);
jQuery(document).ready(function($) {

	//REQUEST INFO FORM AJAX SUBMIT
	function formSubmit( data, form ) {

    $.ajax({
      url: 'assets/scripts/script.php',
      type: "POST",
      data: data,
      timeout: 3000,
      success: function(response) {

        response = JSON.parse(response);

        $('html, body').animate({
          scrollTop: form.find('.form-message').offset().top - 20
        }, 500);

        if ( response.result === 'success' ) {

          $('.input-container').removeClass('error');
          $('.input-info').remove();
          form.find('.form-message').html(response.message).show();
          form[0].reset();
            
        } else {

          form.find('input[type=submit]').removeClass('ajax-form-loading');
          form.find('input').prop('disabled', false);

          $('.form-message').html( response.message ).show();

          if ( response.inputs != 'undefined' ) {
            var inputs = JSON.parse(response.inputs);

            $.each(inputs[0], function(index, value) {
              var val = JSON.parse(value);
              console.log(val[1] );
              $("#"+val[0]+"").parent().addClass('input-error');
              $("#"+val[0]+"").next().css('text-indent','0').html( val[1] );
            });
          }

        }

      },
      error: function( x, t, m ) {

        if ( t === "timeout" ) {

          $('html, body').animate({
            scrollTop: form.find('.form-message').offset().top - 20
          }, 500);

          $('.form-message').html('The internet is really busy right now, try again in a minute.').show();

        } else {

          console.log(x);console.log(t);console.log(m);

        }

      }

    });

	  // $.post('assets/scripts/script.php', data, function(response) {

	  //     console.log(response);
   //      console.log(form);

	  //     //response = JSON.parse(response);
	  //     // $('.ajax-load').remove();
	  //     // $('#submit').show();

	  //     $('html, body').animate({
	  //         scrollTop: form.find('.form-message').offset().top - 20
	  //     }, 500);

	  //     if ( response.result === 'success' ) {

   //    		// $('.input-container').removeClass('error');
   //      //   $('.info').remove();
   //      //   $('.message').html(response.message).show();
   //      //   $('#inquire-form')[0].reset();
	          
	  //     } else {

   //        //form.closest('.form-container').removeClass('ajax-form-loading');
   //        //form.find('input').prop('disabled', false);


   //        $('.form-message').html(response.message).show();

   //        if ( response.inputs ) {
   //          var inputs = JSON.parse(response.inputs);
   //          console.log(inputs);
   //        }
   //        // $('.input-container').removeClass('error');


          


   //        // $.each(inputs[0], function(index, value) {
   //        //   var val = JSON.parse(value);
   //        //   $("#"+val[0]+"").addClass('error').find('input-info').text(val[1]);
   //        // });


	  //     }

	  // });

	}

  $('.ajax-form').on('submit', function(e) {

  	e.preventDefault();

    var form = $(this);
    var data = form.serialize();

    form.find('input[type=submit]').addClass('ajax-form-loading');
    form.find('input').prop('disabled', true);

    if ( window.location.search ) {
      data += '&' + window.location.search.substr(1);
    }

    formSubmit( data, form );

  });

});