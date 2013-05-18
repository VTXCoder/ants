
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
				if (data.errors) {
					_.each(data.errors,function(err) {
						Notifier.error(err);
					});
				}
			}
		});
	});


});
