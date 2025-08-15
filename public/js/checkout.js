function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]')}
async function product(id){const res=await fetch('/api/products/'+id);return res.json()}

async function renderSummary(){
  const cart=getCart(); let total=0;
  const body=document.getElementById('summary'); body.innerHTML='';
  for(const item of cart){
    const p=await product(item.id);
    const line=p.price * item.qty; total += line;
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${p.name} x ${item.qty}</td><td style="text-align:right">$ ${line.toFixed(2)}</td>`;
    body.appendChild(tr);
  }
  document.getElementById('total').textContent = total.toFixed(2);
}
renderSummary();

document.getElementById('place').onclick = async () => {
  const name=document.getElementById('name').value.trim();
  const email=document.getElementById('email').value.trim();
  if(!name || !email){alert('Name and email required!'); return;}
  const res = await fetch('/api/checkout',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,email,cart:getCart()})
  });
  const data=await res.json();
  alert('Order placed! Your order ID is: '+data.orderId);
  localStorage.removeItem('cart');
  window.location.href='/';
};
