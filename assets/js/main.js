document.addEventListener('DOMContentLoaded', function() {
  // Load products based on page type
  if (document.querySelector('.featured-products .product-grid')) {
    loadFeaturedProducts();
  }

  if (document.querySelector('.products .product-grid')) {
    loadAllProducts();
  }

  if (document.querySelector('.product-detail')) {
    loadProductDetails();
  }

  // Initialize category filter if exists
  const categoryFilterForm = document.getElementById('category-filter-form');
  if (categoryFilterForm) {
    const radios = categoryFilterForm.querySelectorAll('input[name="category"]');
    radios.forEach(radio => {
      radio.addEventListener('click', filterProducts);
    });
  }

  // Initialize quantity counter on product detail page
  const minusBtn = document.getElementById('minus-btn');
  const addBtn = document.getElementById('add-btn');
  const quantityInput = document.getElementById('quantity');

  if (minusBtn && addBtn && quantityInput) {
    minusBtn.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    addBtn.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }
});

/* ======================
   PRODUCT DISPLAY FUNCTIONS
   ====================== */

// Load 4 random featured products
function loadFeaturedProducts() {
  const productGrid = document.querySelector('.featured-products .product-grid');
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  shuffled.slice(0, 4).forEach(product => {
    productGrid.appendChild(createProductCard(product));
  });
}

// Load all products with category filtering
function loadAllProducts() {
  const productGrid = document.querySelector('.products .product-grid');
  productGrid.innerHTML = '';
  products.forEach(product => {
    productGrid.appendChild(createProductCard(product));
  });
}

// Create product card HTML element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-image" style="background-image: url('${product.image}')"></div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="category">${formatCategory(product.category)}</p>
      <div class="button-group">
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        <button class="btn view-btn" data-product-id="${product.id}">View</button>
      </div>
    </div>
  `;

  // Add event listener for Add to Cart button
  const addToCartBtn = card.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    addToCart(product.id);
  });

  // Add event listener for View button
  const viewBtn = card.querySelector('.view-btn');
  viewBtn.addEventListener('click', () => {
    window.location.href = `product-detail.html?id=${product.id}`;
  });

  return card;
}

// Add to cart function
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === productId);

  if (product) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  }
}

// Format category for display
function formatCategory(category) {
  const formatted = category.replace(/-/g, ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function filterProducts() {
  const categoryFilterForm = document.getElementById('category-filter-form');
  const selectedCategory = categoryFilterForm.querySelector('input[name="category"]:checked').value;
  const productGrid = document.querySelector('.products .product-grid');
  productGrid.innerHTML = '';
  
  const filtered = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory || p.subcategory === selectedCategory);
  
  filtered.forEach(product => {
    productGrid.appendChild(createProductCard(product));
  });
}

// Load product details page
function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      document.getElementById('product-title').textContent = product.name;
      document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
      document.getElementById('product-description').textContent = product.description;
      document.getElementById('main-image').src = product.image;
      
      // Set category badge
      const categoryBadge = document.createElement('span');
      categoryBadge.className = 'category-badge';
      categoryBadge.textContent = formatCategory(product.category);
      document.querySelector('.product-info').prepend(categoryBadge);
      
      // Load related products (same category)
      loadRelatedProducts(product.category, product.id);
    }
  }
}

// Load related products (same category but different item)
function loadRelatedProducts(category, currentProductId) {
  const relatedGrid = document.querySelector('.related-products .product-grid');
  const related = products.filter(p => 
    (p.category === category || p.subcategory === category) && 
    p.id !== currentProductId
  ).slice(0, 4); // Show max 4 related items
  
  related.forEach(product => {
    relatedGrid.appendChild(createProductCard(product));
  });
}