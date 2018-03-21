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
      <select id="inputConnectType" class="custom-select">
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

  // Common function in add-item-page,change-item-page and stock-list-page
  getSelectedCategory(category) {
    const categories = {
      'Bönor': 'Bean',
      'Bryggkaffe': 'Powder',
      'Kapslar': 'Capsule',
      'Alla': 'All'
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
  setName(products) {
    $('#inputName').empty();
    products.forEach(product => {
    $('#inputName').append(`<option>${product.name}</option>`);
    });
  }

  async click4(event) {
    if ($(event.target).is('#delete-btn')){
      event.preventDefault();
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

  // Functions in stock-list-page
  change5(event) {
    if ($(event.target).hasClass('custom-control-input')) {
      this.selectedCategory = this.getSelectedCategory($("input:radio[name=radio]:checked").val());
      $('#stock-list').empty();
      $('#stock-list').append(this.makeStockList());
    }
  }

  makeStockList() {
    const categoryInstances = {
      'Bean': [this.app.beans],
      'Powder': [this.app.powders],
      'Capsule': [this.app.capsules],
      'All': [this.app.beans, this.app.powders, this.app.capsules]
    };

    const stockList = [];
    categoryInstances[this.selectedCategory].forEach(products => {
      products.forEach((item, index) => {
        stockList.push(`
        <tr>
          <th scope="row">${item.type} ${index + 1}</th>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.stock}</td>
        </tr>
        `)
      });
    });
    return stockList.join('');
  }

  // Functions in orders page
  orderStatusHtml(status) {
    const selectedTag = '<option selected>';
    const nonSelectedTag = '<option>';
    const html = ['Beställt', 'På väg', 'Klar'].map(option => {
      const startTag = (option === status) ? selectedTag : nonSelectedTag
      return startTag + option + '</option>';
    }).join('');

    return html;
  }

  orderHtml(order) {
    return `
    <tr>
      <th id="orderNumber">${order.orderNumber}</th>
      <td>${moment(order.orderTime).format('YYYY-MM-DD')}</td>
      <td>${order.quantity}</td>
      <td>${order.total}</td>
      <td>
        <div class="input-group mb-3">
          <select class="custom-select" id="inputStatus${order.orderNumber}">
            ${this.orderStatusHtml(order.status)}
          </select>
        </div>
      </td>
    </tr>
    `;
  }

  createOrderList() {
    if (this.currentStatus === 'Alla') {
      this.filterOrders = this.app.orders;
    } else {
      this.filterOrders = this.app.orders.filter(order => {
        return order.status === this.currentStatus;
      });
    }

    if (this.sortDirection === 'Äldsta överst') {
      this.filterOrders = this.filterOrders.sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      this.filterOrders = this.filterOrders.sort((a, b) => b.orderNumber - a.orderNumber);
    }
  }

  appendOrderListHtml() {
    const ordersListHtml = [];
    this.filterOrders.forEach(order => {
      ordersListHtml.push(this.orderHtml(order));
    });

    $('#order-list').empty();
    $('#order-list').append(ordersListHtml.join(''));
  }

  async change(event) {
    if ($(event.target).hasClass('custom-control-input')) {
      this.currentStatus = $("input:radio[name=radio]:checked").val();
      this.createOrderList();
      this.appendOrderListHtml();
    }

    if ($(event.target).is('#input-sort')) {
      this.sortDirection = $('#input-sort').val();
      this.createOrderList();
      this.appendOrderListHtml();
    }

    if ($(event.target).is("select[id^='inputStatus']")) {
      event.preventDefault();

      const orderNumber = $(event.target).parents("td").siblings("th")[0].innerText;
      let targetOrder = await Order.find({orderNumber})
      .then(result => {
        return result[0];
      });
      targetOrder.status = $(`#inputStatus${orderNumber}`).val();

      // update current status by user input
      const order = new Order(targetOrder);
      await order.save()
      .then(() => {
        this.app.updateOrders();
      });
      return;
    }
  }
}