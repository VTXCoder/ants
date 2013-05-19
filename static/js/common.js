
var gridEvents={};

$(function() {
	
	// Highlight the correct menu item
	$("ul.nav li[data-navpage="+serverData.page+"]").addClass("active");
	
	$("body [data-navigate-url]").on("click",function(){
		window.location=($(this).data("navigate-url"));
	});

	$("button[type='call']").on("click",function(){
		vtx.update($(this).data("call"),$(this).data("id"),$('form'),function(data) {
			if (data.ok) {
				if (data.redirect) {
					window.location=data.redirect;
				} else {
					if (data.message) Notifier.success(data.message);
						else Notifier.success("Update successful.");
				}
			} else {
				if (data.validationError) {

					console.log(data.validationError);

					if (data.validationError && data.validationError.errors) {
						_.each(data.validationError.errors,function(err) {
							Notifier.error(err.message,data.validationError.message);
						});
					} else {
						Notifier.error(data.validationError.message);
					}

				}
			}
		});
	});


});



(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

