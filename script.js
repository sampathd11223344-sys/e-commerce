import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, onSnapshot }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCIkDJkmm5FvMw1M_F1FviMwcG_httuwcA",
authDomain: "foodie-mart-3e2a0.firebaseapp.com",
projectId: "foodie-mart-3e2a0",
storageBucket: "foodie-mart-3e2a0.firebasestorage.app",
messagingSenderId: "591650958110",
appId: "1:591650958110:web:c453955af7c3bb0c77770f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsRef = collection(db,"products");

let products = [];

// Load products from Firebase
onSnapshot(productsRef,(snapshot)=>{

let container=document.getElementById("product-list");

if(!container) return;

container.innerHTML="";
products=[];

snapshot.forEach(doc=>{

let p=doc.data();

products.push({
id:doc.id,
name:p.name,
price:p.price,
image:p.image
});

container.innerHTML+=`

<div class="card">

<img src="${p.image}" width="100%">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<button onclick="addToCart('${doc.id}')">
Add to Cart
</button>

</div>

`;

});

});

// Add to cart
window.addToCart=function(id){

let cart=JSON.parse(localStorage.getItem("cart")) || [];

let product=products.find(p=>p.id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

alert("Added to cart");

}

// Update cart icon number
function updateCartCount(){

let cart=JSON.parse(localStorage.getItem("cart")) || [];

let count=document.getElementById("cart-count");

if(count) count.innerText=cart.length;

}

updateCartCount();
