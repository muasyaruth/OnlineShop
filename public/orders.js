// const h1 = document.getElementById('active');
// // h1.style.color='red'
// const viewOrdersBtn = document.getElementById('viewOrders');

// const userName = document.getElementById('name');
// const userMail = document.getElementById('email');
// const userAddress = document.getElementById('address');
// const userLocation = document.getElementById('location');

// const orderContainer = document.getElementById('orders')
// const submit = document.getElementById('submit');
// const openCartButton = document.getElementById('openCart');

// function retrieve(){
//     const ordersDaata = localStorage.getItem('orders');
//     if (ordersDaata){
//         const orderData = JSON.parse(ordersDaata)
//     }
//     else{alert('nothing')}
// }
// viewOrdersBtn.addEventListener('click', retrieve);

// let orders = [];
// orders.forEach(user => {
//     orderContainer.innerHTML += `
//     <div>
//     <p></p>
//     </div>

//     `;
// })

const ordersContainer = document.getElementById('orders-container');
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Display the orders
        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p>No orders placed yet.</p>';
        } else {
            orders.forEach((order, index) => {
                ordersContainer.innerHTML += `
                    <div class="order">
                        <h2>Order ${index + 1}</h2>
                        <p><strong>Name:</strong> ${order.name}</p>
                        <p><strong>Email:</strong> ${order.email}</p>
                        <p><strong>Address:</strong> ${order.address}</p>
                        <p><strong>Location:</strong> ${order.location}</p>
                        <h3>Items:</h3>
                        ${order.cart
                            .map(
                                (item) =>
                                    `<p>${item.quantity} x ${item.name} - ${item.totalCost} KSH</p>`
                            )
                            .join('')}
                    </div>
                `;
            });
        }