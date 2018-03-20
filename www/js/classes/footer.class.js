class Footer extends REST{
	constructor(){
		super();
		Footer.footerFix();
		this.fixOnResize();
	}

	static footerFix(){
    let height = $('footer').outerHeight() + 130;
    $('main').css({marginBottom: height});
  }

  fixOnResize(){
    $(window).on('resize',function(){
      Footer.footerFix();
    });
  }
}
