class Info extends REST {
	constructor(){
		super();
		this.app = app;
	}

	click(e) {
		if ($(e.target).is('#plus-btn') || $(e.target).parent().is('#plus-btn')){
			$("#quantity").val(parseInt($('#quantity').val())+1);
			val++;
		}
		else if ($(e.target).is('#minus-btn') || $(e.target).parent().is('#minus-btn')){
			$("#quantity").val(parseInt($('#quantity').val())-1)
		}
	}
}

//<button id="plus-btn">+</button>
//<button id="minus-btn">-</button>
