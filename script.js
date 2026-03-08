tegory===category;

return matchSearch&&matchCategory;

});

displayProducts(filtered);

}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getFirestore,
collection,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const firebaseConfig = {
apiKey:"AIzaSyCIkDJkmm5FvMw1M_F1FviMwcG_httuwcA",
authDomain:"foodie-mart-3e2a0.firebaseapp.com",
projectId:"foodie-mart-3e2a0",
storageBucket:"foodie-mart-3e2a0.firebasestorage.app",
messagingSenderId:"591650958110",
appId:"1:591650958110:web:c453955af7c3bb0c77770f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


let products=[];

const productsRef = collection(db,"products");


onSnapshot(productsRef,(snapshot)=>{

products=[];

snapshot.forEach(doc=>{

let p = doc.data();

let rating=(Math.random()*2+3).toFixed(1);

products.push({
id:doc.id,
name:p.name,
price:p.price,
image:p.image,
category:(p.category||"").toLowerCase(),
rating:rating
});

});

displayProducts(products);
showTopRated();

});


function displayProducts(list){

let container=document.getElementById("product-list");

if(!container) return;

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="card" onclick="openFood('${p.id}')">

<img src="${p.image}">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<div class="rating">⭐ ${p.rating}</div>

<button onclick="event.stopPropagation(); addToCart('${p.id}')">
Add to Cart
</button>

</div>

`;

});

}



function showTopRated(){

let container=document.getElementById("topFoods");

if(!container) return;

let top=[...products]
.sort((a,b)=>b.rating-a.rating)
.slice(0,3);

container.innerHTML="";

top.forEach(p=>{

container.innerHTML+=`

<div class="card" onclick="openFood('${p.id}')">

<img src="${p.image}">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<div class="rating">⭐ ${p.rating}</div>

</div>

`;

});

}



window.openFood=function(id){

let product=products.find(p=>p.id===id);

document.getElementById("foodModal").style.display="flex";

document.getElementById("modalImage").src=product.image;

document.getElementById("modalName").innerText=product.name;

document.getElementById("modalPrice").innerText="₹"+product.price;

document.getElementById("modalCartBtn").onclick=function(){
addToCart(id);
};

}



window.closeModal=function(){
document.getElementById("foodModal").style.display="none";
}



window.addToCart=function(id){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

let product=products.find(p=>p.id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

alert("Added to cart");

}



function updateCartCount(){

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


updateCartCount();



window.filterProducts=function(){

const search=document.getElementById("searchInput").value.toLowerCase();

const category=document.getElementById("categoryFilter").value.toLowerCase();

let filtered=products.filter(p=>{

let matchSearch=p.name.toLowerCase().includes(search);

let matchCategory=category==="all"||p.category===category;

return matchSearch&&matchCategory;

});

displayProducts(filtered);

}
