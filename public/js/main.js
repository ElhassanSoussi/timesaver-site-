function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]')}
function setCart(cart){localStorage.setItem('cart',JSON.stringify(cart));updateCartCount(cart)}

function updateCartCount(cart){
  const count = cart.reduce((sum,i)=>sum+i.qty,0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

// load products and render cards
async function loadProducts(){
  const res = await fetch('/api/products');
  const products = await res.json();
  const grid = document.getElementById('grid');
  grid.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">$ ${p.price.toFixed(2)}</p>
      <button data-id="${p.id}">Add to Cart</button>
    </div>
  `).join('');
  grid.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      const cart = getCart();
      const found = cart.find(i => i.id === id);
      if(found) found.qty++; else cart.push({id,qty:1});
      setCart(cart);
      alert('Added to cart!');
    };
  });
  updateCartCount(getCart());
}
loadProducts();
