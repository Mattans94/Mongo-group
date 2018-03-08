class Admin extends REST {
  constructor(app) {
    super();
    this.app = app;
    this.selectedCategori = '';
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

  changeType() {
    if (this.selectedCategori !== 'Kapslar') {
      $('#inputType').empty();
      $('#inputType').append(`
        <option>${this.selectedCategori}</option>
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
    if ($(event.target).is('#add-btn')) {
      event.preventDefault();

      switch (this.selectedCategori) {
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

  change2(event) {
    if ($(event.target).hasClass('custom-control-input')) {
      this.selectedCategori = $("input:radio[name=radio]:checked").val();
      this.changeType(this.selectedCategori);
      return;
    }
  }

  addChoice(categori) {
    $('#inputName').empty();
    categori.forEach(val => {
      $('#inputName').append(`
      <option>${val.name}</option>
    `);
    });
  }

  click3(event) {
    const selectedCategori = $("input:radio[name=radio]:checked").val();
    if ($(event.target).hasClass('custom-control-input')) {
      this.changeType(selectedCategori);
      switch (selectedCategori) {
        case 'Bönor':
          this.addChoice(this.app.beans);
          break;
        case 'Bryggkaffe':
          this.addChoice(this.app.powders);
          break;
        case 'Kapslar':
          this.addChoice(this.app.capsules);
          break;
      }

      if ($(event.target).is('#change-btn')) {
        event.preventDefault();

      }
    }
  }

}