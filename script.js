let PRODUCTS = [
    {
        id: 1,
        name: "Galaxy S22 Ultra",
        price: 630,
        color: "black",
        url: "https://castore.uz/upload/iblock/45a/rjsr0s3m1n35yj8k6q2xt9hf4wdpgziv/6431ea0b1c066.jpg",
        category: "Phone"
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        price: 999,
        color: "titanium",
        url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-select?wid=940&hei=1112&fmt=png-alpha",
        category: "Phone"
    },
    {
        id: 3,
        name: "MacBook Pro 16",
        price: 2499,
        color: "space gray",
        url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
        category: "Laptop"
    },
    {
        id: 4,
        name: "iPad Pro 12.9",
        price: 1099,
        color: "silver",
        url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202210?wid=545&hei=550&fmt=jpeg&qlt=95&.v=1664411207213",
        category: "Tablet"
    },
    {
        id: 5,
        name: "Dell XPS 15",
        price: 1899,
        color: "platinum",
        url: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9520/media-gallery/black/laptop-xps-15-9520-t-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4000&hei=2800&qlt=100,1&resMode=sharp2&size=4000,2800",
        category: "Laptop"
    },
    {
        id: 6,
        name: "Samsung Tab S9 Ultra",
        price: 1199,
        color: "graphite",
        url: "https://images.samsung.com/is/image/samsung/p6pim/uk/sm-x910nzaeeua/gallery/uk-galaxy-tab-s9-ultra-wifi-x910-sm-x910nzaeeua-thumb-537645490",
        category: "Tablet"
    },
    {
        id: 7,
        name: "Google Pixel 8 Pro",
        price: 899,
        color: "obsidian",
        url: "https://lh3.googleusercontent.com/Gn1QE0U5m1UQoNjpIjOJz6O4dZO_2wSQbbM2cbT2bqrnyaFZDUPX_1nGEgmTzj8QFyXlvHjVftTMh9KAGq6_fj-F5Q=w1000",
        category: "Phone"
    },
    {
        id: 8,
        name: "Lenovo ThinkPad X1",
        price: 1699,
        color: "black",
        url: "https://www.lenovo.com/medias/lenovo-laptops-thinkpad-x1-carbon-gen-10-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTY4fGltYWdlL3BuZ3xoOWEvaGI5LzEzMjU1MTI0ODE5OTk4LnBuZ3wzZjU1YzNmYmU2ZTRhOWRmZTc1ZjY3YjYwNzZkZjAwYzc0YWE3YzFiZWE3ZTRhODAxOGVhZGRhNzY1ZjQzZTk2",
        category: "Laptop"
    },
    {
        id: 9,
        name: "iPad Air",
        price: 599,
        color: "blue",
        url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=png-alpha",
        category: "Tablet"
    },
    {
        id: 10,
        name: "OnePlus 12",
        price: 799,
        color: "emerald",
        url: "https://image01.oneplus.net/ebp/202401/16/1-M00-50-E9-CpgM7mWlEyCAEL6yAAJhwFq6qpM460_800_800.png",
        category: "Phone"
    }
];

const productsContainer = document.getElementById('productsContainer');
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.getElementById('productForm');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const darkModeToggle = document.getElementById('darkModeToggle');
const addProductBtn = document.getElementById('addProductBtn');
const closeModal = document.querySelector('.close');
const imagePreview = document.getElementById('imagePreview');

let currentProduct = null;

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

function renderProducts(products = PRODUCTS) {
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <button class="delete-btn" title="Delete Product" onclick="openDeleteModal(event, ${product.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
            <img src="${product.url}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-color">
                    <i class="fas fa-palette"></i>
                    ${product.color}
                </p>
                <p class="product-category">
                    <i class="fas fa-folder"></i>
                    ${product.category}
                </p>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filteredProducts = PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.color.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    renderProducts(filteredProducts);
}

function openProductModal(productId = null) {
    currentProduct = PRODUCTS.find(p => p.id === productId) || {
        id: PRODUCTS.length ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1,
        name: '',
        price: '',
        color: '',
        url: '',
        category: 'Phone'
    };
    
    modalTitle.textContent = productId ? 'Edit Product' : 'Add New Product';
    
    document.getElementById('productName').value = currentProduct.name;
    document.getElementById('productPrice').value = currentProduct.price;
    document.getElementById('productColor').value = currentProduct.color;
    document.getElementById('productCategory').value = currentProduct.category;
    document.getElementById('productImageUrl').value = currentProduct.url;
    
    if (currentProduct.url) {
        imagePreview.src = currentProduct.url;
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }
    
    modal.style.display = 'block';
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

function closeProductModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        currentProduct = null;
        productForm.reset();
        imagePreview.style.display = 'none';
    }, 300);
}

function handleImagePreview(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            document.getElementById('productImageUrl').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function saveProduct(e) {
    e.preventDefault();
    
    // Get form values
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productColor = document.getElementById('productColor').value;
    const productCategory = document.getElementById('productCategory').value;
    const productImageUrl = document.getElementById('productImageUrl').value;

    // Validate required fields
    if (!productName || !productPrice || !productColor || !productCategory || !productImageUrl) {
        alert('Please fill in all required fields');
        return;
    }

    // Create new product object
    const productData = {
        id: currentProduct ? currentProduct.id : (PRODUCTS.length ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1),
        name: productName,
        price: parseFloat(productPrice),
        color: productColor,
        url: productImageUrl,
        category: productCategory
    };

    console.log('Saving product:', productData); // Debug log

    // Update or add product
    if (currentProduct && currentProduct.id) {
        const index = PRODUCTS.findIndex(p => p.id === currentProduct.id);
        if (index !== -1) {
            PRODUCTS[index] = productData;
        } else {
            PRODUCTS.push(productData);
        }
    } else {
        PRODUCTS.push(productData);
    }

    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(PRODUCTS));
    console.log('Updated PRODUCTS array:', PRODUCTS); // Debug log

    // Close modal and refresh display
    closeProductModal();
    renderProducts();
}

darkModeToggle.addEventListener('click', toggleDarkMode);
addProductBtn.addEventListener('click', () => openProductModal());
closeModal.addEventListener('click', closeProductModal);
productForm.addEventListener('submit', saveProduct);
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
document.getElementById('productImageFile').addEventListener('change', function() {
    handleImagePreview(this);
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProductModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        PRODUCTS = JSON.parse(savedProducts);
        console.log('Loaded products from localStorage:', PRODUCTS); // Debug log
    }
    renderProducts();
});

const deleteModal = document.getElementById('deleteModal');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');
let productToDelete = null;

function openDeleteModal(event, productId) {
    event.stopPropagation(); 
    productToDelete = productId;
    deleteModal.style.display = 'block';
    requestAnimationFrame(() => {
        deleteModal.classList.add('active');
    });
}

function closeDeleteModal() {
    deleteModal.classList.remove('active');
    setTimeout(() => {
        deleteModal.style.display = 'none';
        productToDelete = null;
    }, 300);
}

function deleteProduct() {
    if (productToDelete !== null) {
        PRODUCTS = PRODUCTS.filter(p => p.id !== productToDelete);
        localStorage.setItem('products', JSON.stringify(PRODUCTS));
        renderProducts();
        closeDeleteModal();
    }
}

cancelDeleteBtn.addEventListener('click', closeDeleteModal);
confirmDeleteBtn.addEventListener('click', deleteProduct);

window.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        closeDeleteModal();
    }
}); 