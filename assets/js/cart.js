// cart var
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Clean invalid cart items
function cleanCart() {
    cart = cart.filter(item => {
        if (!item.id || !item.name || !item.price || !item.image || !item.quantity) {
            console.warn('Removing invalid cart item:', item);
            return false;
        }
        // Verify product exists in products array
        const product = products.find(p => p.id === item.id);
        if (!product) {
            console.warn('Removing cart item with invalid product ID:', item.id);
            return false;
        }
        return true;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cleaned cart:', cart);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    
    // Verify products array is available
    if (typeof products === 'undefined') {
        console.error('Products array not found. Ensure products.js is loaded.');
        return;
    }

    // Clean cart on page load
    cleanCart();

    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        console.log('Add to cart button found');
        addToCartBtn.addEventListener('click', addToCart);
    } else {
        console.log('Add to cart button not found');
    }

    // Load cart items if on cart page
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        console.log('Cart items container found, loading cart items');
        loadCartItems();
    } else {
        console.error('Cart items container not found');
    }

    // Load order summary if on checkout page
    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary) {
        console.log('Order summary found, loading summary');
        loadOrderSummary();
    } else {
        console.log('Order summary not found');
    }

    // Place order button
    const placeOrderBtn = document.getElementById('place-order');
    if (placeOrderBtn) {
        console.log('Place order button found');
        placeOrderBtn.addEventListener('click', placeOrder);
    } else {
        console.log('Place order button not found');
    }
});

// Add to cart function
function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    console.log('Adding to cart: productId=', productId, 'quantity=', quantity);
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
                console.log('Updated existing item:', existingItem);
            } else {
                const newItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                };
                cart.push(newItem);
                console.log('Added new item:', newItem);
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart saved to localStorage:', cart);
            
            // Show success message
            alert(`${product.name} added to cart!`);
        } else {
            console.error('Product not found for ID:', productId);
        }
    } else {
        console.error('No product ID found in URL');
    }
}

// Load cart items
function loadCartItems() {
    // Always get the latest cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cleanCart(); // Clean cart before rendering
    console.log('Loaded cart:', cart);

    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartDiv = document.querySelector('.empty-cart');
    
    if (!cartItemsContainer || !emptyCartDiv) {
        console.error('Cart items or empty cart div not found');
        return;
    }

    if (cart.length === 0) {
        console.log('Cart is empty, showing empty cart message');
        emptyCartDiv.classList.remove('hidden');
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    console.log('Cart has items, rendering...');
    emptyCartDiv.classList.add('hidden');
    cartItemsContainer.innerHTML = '';
    
cart.forEach(item => {
        // Validation already handled by cleanCart
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
            cartItem.innerHTML = `
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">Tsh${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <div class="quantity-controls">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">REMOVE</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        console.log('Rendered cart item:', item);
    });
    
    // Add event listeners
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    console.log('Found quantity buttons:', quantityButtons.length);
    quantityButtons.forEach(btn => {
        btn.addEventListener('click', updateQuantity);
    });
    
    const removeButtons = document.querySelectorAll('.remove-item');
    console.log('Found remove buttons:', removeButtons.length);
    removeButtons.forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
    
    const quantityInputs = document.querySelectorAll('.cart-item-quantity input');
    console.log('Found quantity inputs:', quantityInputs.length);
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateQuantityInput);
    });
    
    // Update totals
    updateCartTotals();
}

// Update quantity with buttons
function updateQuantity(e) {
    const btn = e.target;
    const input = btn.parentElement.querySelector('input');
    const id = parseInt(input.dataset.id);
    let quantity = parseInt(input.value);
    
    if (btn.classList.contains('plus')) {
        quantity++;
    } else if (btn.classList.contains('minus') && quantity > 1) {
        quantity--;
    }
    
    input.value = quantity;
    console.log('Updating quantity for id=', id, 'to', quantity);
    updateCartItem(id, quantity);
}

// Update quantity with direct input
function updateQuantityInput(e) {
    const input = e.target;
    const id = parseInt(input.dataset.id);
    const quantity = parseInt(input.value) || 1;
    
    if (quantity < 1) {
        input.value = 1;
        updateCartItem(id, 1);
    } else {
        updateCartItem(id, quantity);
    }
    console.log('Updated quantity via input for id=', id, 'to', quantity);
}

// Update cart item quantity
function updateCartItem(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Updated cart item:', item);
        updateCartTotals();
    } else {
        console.error('Cart item not found for id:', id);
    }
}

// Remove item from cart
function removeItem(e) {
    const id = parseInt(e.target.dataset.id);
    console.log('Removing item with id=', id);
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.00; // Flat rate shipping
    const total = subtotal + shipping;
    
    console.log('Updating totals: subtotal=', subtotal, 'shipping=', shipping, 'total=', total);
    
    // Update on cart page
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) {
        subtotalEl.textContent = `Tsh${subtotal.toFixed(2)}`;
    } else {
        console.error('Subtotal element not found');
    }
    
    if (shippingEl) {
        shippingEl.textContent = `Tsh${shipping.toFixed(2)}`;
    } else {
        console.error('Shipping element not found');
    }
    
    if (totalEl) {
        totalEl.textContent = `$${total.toFixed(2)}`;
    } else {
        console.error('Total element not found');
    }
    
    // Update on checkout page
    if (document.getElementById('checkout-subtotal')) {
        document.getElementById('checkout-subtotal').textContent = `Tsh${subtotal.toFixed(2)}`;
        document.getElementById('checkout-shipping').textContent = `Tsh${shipping.toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `Tsh${total.toFixed(2)}`;
    }
}

// Load order summary for checkout
function loadOrderSummary() {
    const summaryItems = document.querySelector('.summary-items');
    if (!summaryItems) {
        console.error('Summary items container not found');
        return;
    }
    
    summaryItems.innerHTML = '';
    
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>Tsh${(item.price * item.quantity).toFixed(2)}</span>
        `;
        summaryItems.appendChild(summaryItem);
        console.log('Rendered summary item:', item);
    });
    
    updateCartTotals();
}

// Place order
function placeOrder() {
    // Validate forms
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    
    if (!shippingForm || !paymentForm) {
        console.warn('Shipping or payment form not found, skipping validation');
    } else if (!shippingForm.checkValidity() || !paymentForm.checkValidity()) {
        alert('Please fill out all required fields');
        return;
    }
    
    // In a real app, you would process payment here
    // For demo, we'll just clear the cart and show a success message
    console.log('Placing order, clearing cart');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert('Order placed successfully! Thank you for your purchase.');
    window.location.href = 'index.html';
}