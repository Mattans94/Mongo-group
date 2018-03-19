class Startsida extends REST{
  constructor(app){
    super();
    this.app = app;
  }

  callCarousel(){
		$(document).ready(function() {
			$('#carouselExampleControls').carousel('cycle');
		});
	}

	click(e){ 
    if($(e.target).hasClass('card-btn')){ 
      this.category = $(e.target).attr('id'); 
    } 
  } 
 
}
