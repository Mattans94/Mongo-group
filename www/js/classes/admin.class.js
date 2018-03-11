class Admin extends REST {
  constructor(app) {
    super();
    this.app = app;
    this.selectedCategori = '';
  }

  // Common function in add-item and change-item pages
  AddInputConnectType() {
    if (this.selectedCategori !== 'Kapslar') {
      $('#type').empty();
    } else {
      $('#type').empty();
      $('#type').append(`
      <div class="input-group-prepend">
        <span class="input-group-text" id="connectType">Compatibility</span>
      </div>
      <select id="inputConnectType" class="form-control">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      `);
    }
  }

  // Functions in add-item-page
  getProductContents() {
    return {
      name: $('#inputName').val(),
      image: $('#inputPhoto').val(),
      description: $('#inputDescription').val(),
      price: parseInt($('#inputPrice').val()),
      quantity: parseInt($('#inputQuantity').val()),
      flavor: $('#inputFlavor').val(),
      countryOfOrigin: $('#inputCountry').val(),
      type: this.selectedCategori,
      stock: parseInt($('#inputStock').val()),
      connectType: parseInt($('#inputConnectType').val())
    };
  }

  click2(event) {
    if ($(event.target).is('#add-btn')) {
      event.preventDefault();

      switch (this.selectedCategori) {
        case 'Bönor':
          Product.create(this.getProductContents());
          break;
        case 'Bryggkaffe':
          Product.create(this.getProductContents());
          break;
        case 'Kapslar':
          Product.create(this.getProductContents());
          break;
      }
      return;
    }
  }

  change2(event) {
    if ($(event.target).hasClass('custom-control-input')) {
      this.selectedCategori = $("input:radio[name=radio]:checked").val();
      this.AddInputConnectType();
      return;
    }
  }
  // End of functions in add-item-page

  // Functions in change-item-page
  addChoice(categori) {
    $('#inputName').empty();
    categori.forEach((item) => {
      $('#inputName').append(`<option>${item.app.name}</option>`);
    });
  }

  setCurrentItemValue(categori) {
    const currentItemName = $('#inputName').val();
    const currentItem = categori.find(item => {
      return item.app.name === currentItemName;
    });

    $('#inputPhoto').val(currentItem.app.image);
    $('#inputDescription').val(currentItem.app.description);
    $('#inputPrice').val(currentItem.app.price);
    $('#inputQuantity').val(currentItem.app.quantity);
    $('#inputFlavor').val(currentItem.app.flavor);
    $('#inputCountry').val(currentItem.app.countryOfOrigin);
    $('#inputStock').val(currentItem.app.stock);
    $('#inputConnectType').val(`${currentItem.app.connectType}`);
  }

  click3(event) {
    if ($(event.target).is('#change-btn')) {
      event.preventDefault();
      return;
    }
  }

  change3(event) {
    if ($(event.target).hasClass('custom-control-input')) {
      this.selectedCategori = $("input:radio[name=radio]:checked").val();
      this.AddInputConnectType();

      switch (this.selectedCategori) {
        case 'Bönor':
          this.addChoice(this.app.beans);
          this.setCurrentItemValue(this.app.beans);
          break;
        case 'Bryggkaffe':
          this.addChoice(this.app.powders);
          this.setCurrentItemValue(this.app.powders);
          break;
        case 'Kapslar':
          this.addChoice(this.app.capsules);
          this.setCurrentItemValue(this.app.capsules);
          break;
      }
      return;
    }

    if ($(event.target).is('#inputName')) {
      switch (this.selectedCategori) {
        case 'Bönor':
          this.setCurrentItemValue(this.app.beans);
          break;
        case 'Bryggkaffe':
          this.setCurrentItemValue(this.app.powders);
          break;
        case 'Kapslar':
          this.setCurrentItemValue(this.app.capsules);
          break;
      }
      return;
    }
  }
  // End of functions in change-item-page

}