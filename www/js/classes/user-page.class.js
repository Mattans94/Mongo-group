class UserPage extends Base {
  constructor(app) {
    super();
    this.app = app;
  }

  makeOrderList(orders) {
    const orderList = [];

    orders.forEach(order => {
      orderList.unshift(`
      <tr>
        <th id="orderNumber">${order.orderNumber}</th>
        <td>${moment(order.orderTime).format('YYYY-MM-DD')}</td>
        <td>${order.quantity}</td>
        <td>${order.total}</td>
        <td>${order.status}</td>
      </tr>
      `);
    });
    return orderList.join('');
  }

  // We use this after user and order connected
  renderList() {
    const currentUsersOrders = this.app.orders.filter(order => {
      return order.user === this.app.currentUser;
    });

    if (currentUsersOrders) {
      $('#order-list').empty();
      $('#order-list').append(this.makeOrderList(currentUsersOrders));
    }
  }
}