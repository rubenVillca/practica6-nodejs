/// Jquery validate review tour
jQuery(document).ready(function () {
    
    $('#review').submit(function () {

        var action = $(this).attr('action');

        $("#message-review").slideUp(750, function () {
            $('#message-review').hide();

            /*$('#submit-review')
                .after('<i class="icon-spin4 animate-spin loader"></i>')
                .attr('disabled', 'disabled');*/

            $.post(action, {
					
					comm_comment: $('#comm_comment').val(),
					comm_user: $('#comm_user').val(),
					comm_restaurant: $('#comm_restaurant').val(),
                    comm_date: $('#comm_date').val(),
                    
                }).done(

					function (data) {
						if (data.trim()!="1062"){
							$('#opinions').append(data);
							$('#opinions').slideDown('slow');
							$('#review .loader').fadeOut('slow', function () {
								$(this).remove()
							});
							//$('#submit-review').removeAttr('disabled');
							if (data.match('success') != null) $('#review').slideUp('slow');
							$('#myReview').modal('hide');
							
						} else {
							alert( "you already comment in this restaurant" );	
						}
						
	
					}
				).fail(function() {
					alert( "DB error" );
				});

        });

        return false;

    });

});

/* ]]> */