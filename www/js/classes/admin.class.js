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

  getType(selectedCategori) {
    if (selectedCategori !== 'Kapslar') {
      $('#inputType').empty();
      $('#inputType').append(`
        <option>${selectedCategori}</option>
        `);
    } else {
      $('#inputType').empty();
      $('#inputType').append(`
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        `);
    }
  }

  click2(event) {
    const selectedCategori = $("input:radio[name=radio]:checked").val();
    if ($(event.target).hasClass('custom-control-input')) {
      this.getType(selectedCategori);
    }

    if ($(event.target).is('#add-btn')) {
      event.preventDefault();
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