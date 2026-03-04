import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore, collection, onSnapshot }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const productsRef = collection(db,"products");

onSnapshot(productsRef,(snapshot)=>{

let container=document.getElementById("product-list");

container.innerHTML="";

snapshot.forEach(doc=>{

let p=doc.data();

container.innerHTML+=`

<div class="card">

<img src="${p.image}" width="100%">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<button onclick="addToCart('${doc.id}')">Add to Cart</button>

</div>

`;

});

});
