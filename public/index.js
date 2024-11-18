// Select button element for viewing the available items from the server
const viewButton = document.getElementById('view');

// select items placeholder
const itemsListContainer = document.getElementById('items-list');

const quantityModal = document.getElementById('quantityModal');
const itemModal = document.getElementById('itemModal');
const cartItemsContainer = document.getElementById('cartItems');
const quantityInput = document.getElementById('quantityInput');
const confirmQuantityButton = document.getElementById('confirmQuantity');
const openCartButton = document.getElementById('openCart');
const userForm = document.getElementById('userForm');
const selectedItemName = document.getElementById('selectedItemName');

// Store cart items
let cart = []; 

// Display items from server
viewButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/items');
        const items = await response.json();

        itemsListContainer.innerHTML = '';
        let itemsHTML = '';

        // Use data from the server to create elements to display available items to the user
        items.forEach(item => {
            itemsHTML += `
                <div class="item" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><strong>Price:</strong> ${item.price} KSH</p>
                    <button class="cartBtn">Add to Cart</button>
                </div>
            `;
        });
        
        // itemsListContainer.appendChild(itemsHTML);
        itemsListContainer.innerHTML = itemsHTML;

        

        // Code to display a pop-up form for user to enter the quantity for a specific item
        document.querySelectorAll('.cartBtn').forEach(button => {    // code to select the button named "Add to cart"
            button.addEventListener('click', (event) => { //Add onclick event listener to the button
                const itemDiv = event.target.closest('.item');
                const itemName = itemDiv.dataset.name;
                const itemPrice = itemDiv.dataset.price;

                // Show quantity modal and set item details
                selectedItemName.textContent = `${itemName} Quantity`;
                quantityModal.style.display = 'block';
                confirmQuantityButton.dataset.name = itemName;
                confirmQuantityButton.dataset.price = itemPrice;
            });
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        itemsListContainer.innerHTML = '<p>Sorry, cannot load items!</p>';
    }
});

// function to close form
function closeForm(modal) {
    modal.style.display = 'none';
}

// Function to confirm quantity and add item to cart
confirmQuantityButton.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    const itemName = confirmQuantityButton.dataset.name;
    const itemPrice = parseFloat(confirmQuantityButton.dataset.price);

    // Condition. User must enter quantity in form of a number. the number should be greater than zero
    if (quantity && quantity > 0) {

        // Calculate total cost for a specific item
        const totalCost = quantity * itemPrice;

        // Display the total cost to the user
        cart.push({ name: itemName, quantity, totalCost });

        // Alert to show that the item has been addedto cart successfully
        alert(`${quantity} x ${itemName} added to cart. Total cost: ${totalCost} KSH`);

        // call the function to close the form
        closeForm(quantityModal);  
    } 
    // If the condition is not met
    else {
        alert('Invalid quantity!');
    }

    // Clear quantity input for the next use
    quantityInput.value = '';
});


// Open cart modal and display cart items
openCartButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items to the cart before viewing.');
    } else {
        // Populate and display the cart modal if there are items in the cart
        cartItemsContainer.innerHTML = '<h2>Items added to cart</h2>';
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div>
                    <p>${item.quantity} x ${item.name} - ${item.totalCost} KSH</p>
                </div>
            `;
        });
        itemModal.style.display = 'block';
    }
});


// Form submission in the cart modal
userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Order placed successfully!');
    closeForm(itemModal);
    // Clear cart after submission
    cart = []; 
});

// Close modals when clicking the close button
document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        closeForm(closeButton.closest('.modal'));
    });
});
