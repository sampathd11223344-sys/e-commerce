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
category:(data.category || "food").toLowerCase(),
rating:(Math.random()*2+3).toFixed(1)
});

});

displayProducts(products);
showTopRated();

}

function displayProducts(list){

const container = document.getElementById("product-list");

if(!container) return;

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="bg-gray-900 p-4 rounded-lg hover:scale-105 transition cursor-pointer"
onclick="openFood('${p.id}')">

<img src="${p.image}"
class="rounded-lg h-40 w-full object-cover">

<h3 class="mt-2 font-bold">${p.name}</h3>

<p class="text-orange-400">₹${p.price}</p>

<p class="text-yellow-400">⭐ ${p.rating}</p>

<button onclick="event.stopPropagation(); addToCart('${p.id}')"
class="mt-2 bg-orange-500 px-3 py-1 rounded w-full">
Add to Cart
</button>

</div>

`;

});

}

function showTopRated(){

const container = document.getElementById("topFoods");

if(!container) return;

let top = [...products]
.sort((a,b)=>b.rating-a.rating)
.slice(0,4);

container.innerHTML="";

top.forEach(p=>{

container.innerHTML+=`

<div class="bg-gray-900 p-4 rounded-lg hover:scale-105 transition cursor-pointer"
onclick="openFood('${p.id}')">

<img src="${p.image}"
class="rounded-lg h-40 w-full object-cover">

<h3 class="mt-2 font-bold">${p.name}</h3>

<p class="text-orange-400">₹${p.price}</p>

<p class="text-yellow-400">⭐ ${p.rating}</p>

</div>

`;

});

}

window.openFood=function(id){

let product=products.find(p=>p.id===id);

document.getElementById("foodModal").classList.remove("hidden");

document.getElementById("modalImage").src=product.image;

document.getElementById("modalName").innerText=product.name;

document.getElementById("modalPrice").innerText="₹"+product.price;

document.getElementById("modalCartBtn").onclick=function(){
addToCart(id);
};

}

window.closeModal=function(){

document.getElementById("foodModal").classList.add("hidden");

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

let mobile=document.getElementById("mobile-cart-count");

if(mobile){
mobile.innerText=cart.length;
}

}

updateCart();

window.filterProducts=function(){

let search=document.getElementById("searchInput").value.toLowerCase();

let category=document.getElementById("categoryFilter").value.toLowerCase();

let filtered=products.filter(p=>{

let matchName=p.name.toLowerCase().includes(search);

let matchCategory=category==="all" || p.category===category;

return matchName && matchCategory;

});

displayProducts(filtered);

}

loadProducts();
