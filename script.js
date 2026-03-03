// PRODUCTS
let products = JSON.parse(localStorage.getItem("products")) || [
    {id:1, name:"Burger", price:120, category:"fastfood"},
    {id:2, name:"Pizza", price:250, category:"fastfood"},
    {id:3, name:"Sandwich", price:90, category:"fastfood"},
    {id:4, name:"Juice", price:70, category:"drinks"}
];

localStorage.setItem("products", JSON.stringify(products));

// LOAD PRODUCTS
function loadProducts(filtered = products) {
    let container = document.getElementById("product-list");
    if(!container) return;

    container.innerHTML = "";

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <div class="img-box">
                    <img src="https://source.unsplash.com/400x300/?${p.name}" alt="">
                </div>
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <div class="qty">
                    <button onclick="changeQty(-1, ${p.id})">-</button>
                    <span id="qty-${p.id}">1</span>
                    <button onclick="changeQty(1, ${p.id})">+</button>
                </div>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });

    updateCartCount();
}

// SEARCH + FILTER
function filterProducts() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let category = document.getElementById("categoryFilter").value;

    let filtered = products.filter(p => {
        let matchSearch = p.name.toLowerCase().includes(search);
        let matchCategory = category === "all" || p.category === category;
        return matchSearch && matchCategory;
    });

    loadProducts(filtered);
}

// QUANTITY
function changeQty(change, id) {
    let qtyElement = document.getElementById(`qty-${id}`);
    let current = parseInt(qtyElement.innerText);
    current += change;
    if(current < 1) current = 1;
    qtyElement.innerText = current;
}

// CART
function addToCart(id) {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!user){
        alert("Please login first!");
        window.location = "login.html";
        return;
    }

    let qty = parseInt(document.getElementById(`qty-${id}`).innerText);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    for(let i=0; i<qty; i++){
        cart.push(id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart!");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.getElementById("cart-count");
    if(count){
        count.innerText = cart.length;
    }
}

// AUTO LOAD
loadProducts();
updateCartCount();
