let cart = JSON.parse(localStorage.getItem('cart')) || [];

function cleanCart() {
    cart = cart.filter(item => {
        if (!item.id || !item.name || !item.price || !item.image || !item.quantity) {
            console.warn('Removing invalid cart item:', item);
            return false;
        }
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

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded: Initializing cart page');
    if (typeof products === 'undefined') {
        console.error('Products array not found. Ensure products.js is loaded.');
        return;
    }

    cleanCart();

    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }

    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        console.log('Cart items container found, loading cart');
        loadCartItems();
    } else {
        console.error('Cart items container not found in DOM');
    }

    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary) {
        console.log('Order summary found, loading summary');
        loadOrderSummary();
    }

    const placeOrderBtn = document.getElementById('place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }
});

function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const quantity = parseInt(document.getElementById('quantity').value) || 1;

    console.log('Adding to cart: productId=', productId, 'quantity=', quantity);

    if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
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
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} added to cart!`);
        } else {
            console.error('Product not found for ID:', productId);
        }
    } else {
        console.error('No product ID found in URL');
    }
}

function loadCartItems() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cleanCart();

    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartDiv = document.querySelector('.empty-cart');

    if (!cartItemsContainer || !emptyCartDiv) {
        console.error('Cart items or empty cart div not found');
        return;
    }

    console.log('Clearing cart-items container');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        console.log('Cart is empty, showing empty-cart div');
        emptyCartDiv.classList.remove('hidden');
        updateCartTotals();
        return;
    }

    console.log('Rendering cart items:', cart);
    emptyCartDiv.classList.add('hidden');

    cart.forEach(item => {
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
    });

    const quantityButtons = document.querySelectorAll('.quantity-btn');
    console.log('Attaching event listeners to', quantityButtons.length, 'quantity buttons');
    quantityButtons.forEach(btn => {
        btn.removeEventListener('click', updateQuantity);
        btn.addEventListener('click', updateQuantity);
    });

    const removeButtons = document.querySelectorAll('.remove-item');
    console.log('Attaching event listeners to', removeButtons.length, 'remove buttons');
    removeButtons.forEach(btn => {
        btn.removeEventListener('click', removeItem);
        btn.addEventListener('click', removeItem);
    });

    const quantityInputs = document.querySelectorAll('.cart-item-quantity input');
    console.log('Attaching event listeners to', quantityInputs.length, 'quantity inputs');
    quantityInputs.forEach(input => {
        input.removeEventListener('change', updateQuantityInput);
        input.addEventListener('change', updateQuantityInput);
    });

    updateCartTotals();
}

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

function removeItem(e) {
    const id = parseInt(e.target.dataset.id);
    console.log('Attempting to remove item with id=', id);
    if (confirm('Are you sure you want to remove this item from the cart?')) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Removed item with id=', id, 'New cart:', cart);
        loadCartItems();
    }
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5000; // Adjusted to Tsh for consistency
    const total = subtotal + shipping;

    console.log('Updating totals: subtotal=Tsh', subtotal.toFixed(2), 'shipping=Tsh', shipping.toFixed(2), 'total=Tsh', total.toFixed(2));

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
        totalEl.textContent = `Tsh${total.toFixed(2)}`;
    } else {
        console.error('Total element not found');
    }
}

function loadOrderSummary() {
    const summaryItems = document.querySelector('.summary-items');
    if (!summaryItems) {
        console.log('No summary-items container found');
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
    });

    updateCartTotals();
}

function placeOrder() {
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');

    if (shippingForm && paymentForm && (!shippingForm.checkValidity() || !paymentForm.checkValidity())) {
        alert('Please fill out all required fields');
        return;
    }

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Order placed successfully! Thank you for your purchase.');
    window.location.href = 'index.html';
}