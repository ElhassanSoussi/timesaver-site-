const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name=document.getElementById('contact-name').value.trim();
  const email=document.getElementById('contact-email').value.trim();
  const message=document.getElementById('contact-message').value.trim();
  const res = await fetch('/api/contact',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ name, email, message })
  });
  const data=await res.json();
  const statusEl=document.getElementById('contact-status');
  if(data.ok){
    statusEl.textContent='Thanks! We will respond soon.';
    statusEl.style.color='var(--accent)';
    form.reset();
  }else{
    statusEl.textContent='There was a problem, please try again.';
    statusEl.style.color='red';
  }
});
