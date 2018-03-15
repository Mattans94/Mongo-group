class Info extends REST {
	constructor(){
		super();
		this.app = app;
	}

	click(e) {
		if ($(e.target).is('#plus-btn') || $(e.target).parent().is('#plus-btn')){
			let oldValue = parseInt($('#quantity').val());
			if(oldValue <= 19){
				$("#quantity").val(parseInt($('#quantity').val())+1);
			}else{return;}
		}
		else if ($(e.target).is('#minus-btn') || $(e.target).parent().is('#minus-btn')){
			let oldValue = parseInt($('#quantity').val());
				if(oldValue >= 1){
					$("#quantity").val(parseInt($('#quantity').val())-1);
				}else{return;}
		}
	}
}

//<button id="plus-btn">+</button>
//<button id="minus-btn">-</button>
