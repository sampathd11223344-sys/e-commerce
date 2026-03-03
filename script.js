// ================= PRODUCTS =================

let products = JSON.parse(localStorage.getItem("products")) || [
    {id:1, name:"Burger", price:120},
    {id:2, name:"Pizza", price:250},
    {id:3, name:"Sandwich", price:90},
    {id:4, name:"Juice", price:70}
];

localStorage.setItem("products", JSON.stringify(products));

// ================= LOAD PRODUCTS =================

function loadProducts() {
    let container = document.getElementById("product-list");
    if(!container) return;

    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });

    updateCartCount();
}

// ================= CART =================

function addToCart(id) {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!user){
        alert("Please login first!");
        window.location = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
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

// ================= CART PAGE =================

function loadCart() {
    let container = document.getElementById("cart-items");
    if(!container) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    container.innerHTML = "";

    cart.forEach(id => {
        let p = products.find(x => x.id == id);
        if(p){
            total += Number(p.price);
            container.innerHTML += `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p>₹${p.price}</p>
                </div>
            `;
        }
    });

    let totalBox = document.getElementById("total");
    if(totalBox){
        totalBox.innerText = "Total: ₹" + total;
    }
}

// ================= LOGIN CHECK =================

function checkLogin() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let nav = document.getElementById("user-section");

    if(nav && user){
        nav.innerHTML = `
            Welcome, ${user.name}
            <button onclick="logout()">Logout</button>
        `;
    }
}

function logout(){
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location = "index.html";
}

// ================= ADMIN =================

function addProduct(){
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;

    if(name === "" || price === ""){
        alert("Fill all fields");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
        id: Date.now(),
        name: name,
        price: Number(price)
    });

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product Added!");
    location.reload();
}

// ================= AUTO LOAD =================

loadProducts();
loadCart();
checkLogin();
updateCartCount();