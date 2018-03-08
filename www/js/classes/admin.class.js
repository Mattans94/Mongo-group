class Admin extends REST {
  constructor(app) {
    super();
    this.app = app;
  }

  getProductContents() {
    return {
      name: $('#inputName').val(),
      image: $('#inputPhoto').val(),
      description: $('#inputDescription').val(),
      price: parseInt($('#inputPrice').val()),
      quantity: parseInt($('#inputQuantity').val()),
      flavor: $('#inputFlavor').val(),
      countryOfOrigin: $('#inputCountry').val(),
      type: $('#inputType').val()
    };
  }

  click2(event) {
    const selectedCategori = $("input:radio[name=radio]:checked").val();
    if ($(event.target).is('#add-btn')) {
      switch (selectedCategori) {
        case 'Bönor':
          Bean.create(this.getProductContents());
          break;
        case 'Bryggkaffe':
          Powder.create(this.getProductContents());
          break;
        case 'Kapslar':
          Capsule.create(this.getProductContents());
          break;
      }
    }
  }


      console.log(product);
      Bean.create(product);
    }
  }

}