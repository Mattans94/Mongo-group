class Info extends REST {
	constructor(){
		super();
		this.app = app;
	}

	click(e) {
		if ($(e.target).is('#plus-btn') || $(e.target).parent().is('#plus-btn')){
			console.log('plus');
			$("#quantity").val(parseInt($('#quantity').val(), 10)+1);
		}
		else if ($(e.target).is('#minus-btn') || $(e.target).parent().is('#minus-btn')){
			console.log('minus');
			$("#quantity").val(parseInt($('#quantity').val(), 10)-1)
		}
	}
}

//<button id="plus-btn">+</button>
//<button id="minus-btn">-</button>
