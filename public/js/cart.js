function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]')}
function setCart(cart){localStorage.setItem('cart',JSON.stringify(cart));updateCartCount(cart)}
function updateCartCount(cart){
  const count = cart.reduce((sum,i)=>sum+i.qty,0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}
async function product(id){const res=await fetch('/api/products/'+id);return res.json()}

async function renderCart(){
  const cart=getCart();
  const tbody=document.getElementById('cart-body');
  tbody.innerHTML='';
  let subtotal=0;
  for(const item of cart){
    const p=await product(item.id);
    const line=p.price * item.qty; subtotal += line;
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${p.name}</td>
      <td><input type="number" min="1" value="${item.qty}"></td>
      <td>$ ${p.price.toFixed(2)}</td>
      <td>$ ${line.toFixed(2)}</td>
      <td><button>Remove</button></td>`;
    const qtyInput=tr.querySelector('input'); const rmBtn=tr.querySelector('button');
    qtyInput.onchange=()=>{item.qty=Math.max(1,Number(qtyInput.value)); setCart(cart); renderCart();};
    rmBtn.onclick=()=>{const index=cart.indexOf(item); cart.splice(index,1); setCart(cart); renderCart();};
    tbody.appendChild(tr);
  }
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  updateCartCount(cart);
}
renderCart();
