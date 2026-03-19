import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
apiKey:"AIzaSyCIkDJkmm5FvMw1M_F1FviMwcG_httuwcA",
authDomain:"foodie-mart-3e2a0.firebaseapp.com",
projectId:"foodie-mart-3e2a0",
storageBucket:"foodie-mart-3e2a0.appspot.com",
messagingSenderId:"591650958110",
appId:"1:591650958110:web:c453955af7c3bb0c77770f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let products=[];

async function loadProducts(){

const querySnapshot = await getDocs(collection(db,"products"));

products=[];

querySnapshot.forEach(doc=>{

let data=doc.data();

products.push({
id:doc.id,
name:data.name,
price:data.price,
image:data.image,
category:(data.category||"food").toLowerCase(),
rating:(Math.random()*2+3).toFixed(1)
});

});

displayProducts(products);
showTopRated();

}

function displayProducts(list){

const container=document.getElementById("product-list");

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="bg-[#1a1a1a] rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer"
onclick="openFood('${p.id}')">

<img src="${p.image}" class="h-40 w-full object-cover">

<div class="p-3">

<h3 class="font-semibold">${p.name}</h3>

<p class="text-orange-500 text-sm">₹${p.price}</p>

<p class="text-yellow-400 text-sm">⭐ ${p.rating}</p>

<button onclick="event.stopPropagation(); addToCart('${p.id}')"
class="mt-2 w-full bg-orange-500 py-1 rounded hover:bg-orange-600">
Add to Cart
</button>

</div>

</div>

`;

});

}

function showTopRated(){

const container=document.getElementById("topFoods");

let top=[...products].sort((a,b)=>b.rating-a.rating).slice(0,4);

container.innerHTML="";

top.forEach(p=>{

container.innerHTML+=`

<div class="bg-[#1a1a1a] rounded-xl overflow-hidden shadow">

<img src="${p.image}" class="h-40 w-full object-cover">

<div class="p-3">

<h3 class="font-semibold">${p.name}</h3>

<p class="text-orange-500 text-sm">₹${p.price}</p>

<p class="text-yellow-400 text-sm">⭐ ${p.rating}</p>

</div>

</div>

`;

});

}

window.openFood=function(id){

let p=products.find(x=>x.id===id);

document.getElementById("foodModal").classList.remove("hidden");

document.getElementById("modalImage").src=p.image;
document.getElementById("modalName").innerText=p.name;
document.getElementById("modalPrice").innerText="₹"+p.price;

document.getElementById("modalCartBtn").onclick=()=>{
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

let c=document.getElementById("cart-count");
if(c) c.innerText=cart.length;

let m=document.getElementById("mobile-cart-count");
if(m) m.innerText=cart.length;

}

updateCart();

window.filterProducts=function(){

let search=document.getElementById("searchInput").value.toLowerCase();

let category=document.getElementById("categoryFilter").value.toLowerCase();

let filtered=products.filter(p=>{

return p.name.toLowerCase().includes(search) &&
(category==="all"||p.category===category);

});

displayProducts(filtered);

}

loadProducts();
