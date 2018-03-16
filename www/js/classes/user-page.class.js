class UserPage extends Base {
  constructor(app) {
    super();
    this.app = app;
  }

  makeOrderList() {
    const orderList = [];
    // temporary orders (this.app.orders is all orders in our site)
    const targets = this.app.orders;

    targets.forEach(target => {
      orderList.unshift(`
      <tr>
        <th id="orderNumber">${target.orderNumber}</th>
        <td>${moment(target.orderTime).format('YYYY-MM-DD')}</td>
        <td>3</td>
        <td>${target.total}</td>
        <td>${target.status}</td>
      </tr>
      `);
    });
    return orderList.join('');
  }

  // We use this after user and order connected
  renderList(user) {
    const filterTargets = this.app.orders.filter(order => {
      return order.user === user;
    });
    $('#order-list').empty();
    $('#order-list').append(this.makeOrderList(filterTargets));
  }

}