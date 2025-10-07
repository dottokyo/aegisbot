async function openPopup() {
  const popup = document.querySelector('.soon-popup');
  const overlay = document.createElement('div');
  overlay.classList.add('soon-popup-overlay');
  document.body.appendChild(overlay);

  popup.style.display = 'block'; 
  overlay.style.display = 'block';

  overlay.addEventListener('click', closePopup);
  
  document.addEventListener('keydown', closePopup);
}

async function closePopup() {
  const popup = document.querySelector('.soon-popup');
  const overlay = document.querySelector('.soon-popup-overlay');
  
  if (popup && overlay) {
    popup.style.display = 'none';
    overlay.style.display = 'none'; 
  }

  // Убираем обработчики событий
  document.removeEventListener('keydown', closePopup);
  overlay.removeEventListener('click', closePopup);
}


export async function showPopup() {
  await openPopup();
}