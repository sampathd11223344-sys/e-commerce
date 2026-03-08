import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCIkDJkmm5FvMw1M_F1FviMwcG_httuwcA",
authDomain: "foodie-mart-3e2a0.firebaseapp.com",
projectId: "foodie-mart-3e2a0",
storageBucket: "foodie-mart-3e2a0.appspot.com",
messagingSenderId: "591650958110",
appId: "1:591650958110:web:c453955af7c3bb0c77770f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let products = [];

async function loadProducts(){

const querySnapshot = await getDocs(collection(db,"products"));

products = [];

querySnapshot.forEach((doc)=>{

let data = doc.data();

products.push({
id:doc.id,
name:data.name,
price:data.price,
image:data.image,
category:data.category || "food",
rating:(Math.random()*2+3).toFixed(1)
});

});

displayProducts(products);

}

function displayProducts(list){

const container = document.getElementById("product-list");

if(!container) return;

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="card">

<img src="${p.image}">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<div>⭐ ${p.rating}</div>

<button onclick="addToCart('${p.id}')">Add to Cart</button>

</div>

`;

});

}

window.addToCart=function(id){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

let product=products.find(p=>p.id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

alert("Added to cart");

}

function updateCart(){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

let count=document.getElementById("cart-count");

if(count){
count.innerText=cart.length;
}

}

updateCart();

window.filterProducts=function(){

let search=document.getElementById("searchInput").value.toLowerCase();

let category=document.getElementById("categoryFilter").value;

let filtered=products.filter(p=>{

let matchName=p.name.toLowerCase().includes(search);

let matchCategory=category==="all" || p.category===category;

return matchName && matchCategory;

});

displayProducts(filtered);

}

loadProducts();
