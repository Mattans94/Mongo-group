class Admin extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.selectedCategory = '';
  }

  // Common function in add-item and change-item pages
  AddInputConnectType() {
    if (this.selectedCategory !== 'Capsule') {
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

  // Common function in add-item and change-item pages
  getProductContents() {
    return {
      name: $('#inputName').val(),
      image: $('#inputPhoto').val(),
      description: $('#inputDescription').val(),
      price: parseInt($('#inputPrice').val()),
      quantity: parseInt($('#inputQuantity').val()),
      flavor: $('#inputFlavor').val(),
      countryOfOrigin: $('#inputCountry').val(),
      type: this.selectedCategory,
      stock: parseInt($('#inputStock').val()),
      connectType: parseInt($('#inputConnectType').val())
    };
  }

  // Common function in add-item and change-item pages
  getSelectedCategory(category) {
    const categories = {
      'Bönor': 'Bean',
      'Bryggkaffe': 'Powder',
      'Kapslar': 'Capsule'
    }
    return this.selectedCategory = categories[category];
  }

  // Functions in add-item-page
  click2(event) {
    if ($(event.target).is('#add-btn')) {
      event.preventDefault();

      Product.create(this.getProductContents())
      .then(() => {
        this.app.updateProducts();
      });
      return;
    }
  }

  change2(event) {
    if ($(event.target).hasClass('custom-control-input')) {
      this.selectedCategory = this.getSelectedCategory($("input:radio[name=radio]:checked").val());
      this.AddInputConnectType();
      return;
    }
  }
  // End of functions in add-item-page

  // Functions in change-item-page
  addChoice(category) {
    $('#inputName').empty();
    category.forEach((item) => {
      $('#inputName').append(`<option>${item.name}</option>`);
    });
  }

  setCurrentItemValue(category) {
    const currentItemName = $('#inputName').val();
    const currentItem = category.find(item => {
      return item.name === currentItemName;
    });

    $('#inputPhoto').val(currentItem.image);
    $('#inputDescription').val(currentItem.description);
    $('#inputPrice').val(currentItem.price);
    $('#inputQuantity').val(currentItem.quantity);
    $('#inputFlavor').val(currentItem.flavor);
    $('#inputCountry').val(currentItem.countryOfOrigin);
    $('#inputStock').val(currentItem.stock);
    $('#inputConnectType').val(`${currentItem.connectType}`);
  }

  async click3(event) {
    if ($(event.target).is('#change-btn')) {
      event.preventDefault();

      let currentItem = await Product.find({name: $('#inputName').val()})
      .then(result => {
        return result[0];
      });

      // update current item by user input
      currentItem = { ...currentItem, ...this.getProductContents()};
      const product = new Product(currentItem);
      product.save()
      .then(() => {
        this.app.updateProducts();
      });
      return;
    }
  }

  change3(event) {
    if ($(event.target).hasClass('custom-control-input')) {
      this.selectedCategory = this.getSelectedCategory($("input:radio[name=radio]:checked").val());
      this.AddInputConnectType();

      switch (this.selectedCategory) {
        case 'Bean':
          this.addChoice(this.app.beans);
          this.setCurrentItemValue(this.app.beans);
          break;
        case 'Powder':
          this.addChoice(this.app.powders);
          this.setCurrentItemValue(this.app.powders);
          break;
        case 'Capsule':
          this.addChoice(this.app.capsules);
          this.setCurrentItemValue(this.app.capsules);
          break;
      }
      return;
    }

    if ($(event.target).is('#inputName')) {
      switch (this.selectedCategory) {
        case 'Bean':
          this.setCurrentItemValue(this.app.beans);
          break;
        case 'Powder':
          this.setCurrentItemValue(this.app.powders);
          break;
        case 'Capsule':
          this.setCurrentItemValue(this.app.capsules);
          break;
      }
      return;
    }
  }
  // End of functions in change-item-page

  // Functions in delete-item-page
  async click4(event) {
    if ($(event.target).is('#delete-btn')){
      const currentItem = await Product.find({name: $('#inputName').val()})
      .then(result => {
        return result[0];
      });
      const product = new Product(currentItem);
      product.delete()
      .then(() => {
        this.app.updateProducts();
      });
      return;
    }
  }

  makeStockList() {
    const stockList = [];
    this.app.beans.forEach((bean, index) => {
      stockList.push(`
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${bean.name}</td>
        <td>${bean.price}</td>
        <td>${bean.stock}</td>
      </tr>
      `)
    });
    return stockList.join('');
  }

}