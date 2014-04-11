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