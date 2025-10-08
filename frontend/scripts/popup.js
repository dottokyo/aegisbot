const popupBtn = document.getElementById('connect-btn');

// Функция открытия попапа
function openPopup() {
  const popup = document.querySelector('.soon-popup');
  const overlay = document.createElement('div');
  overlay.classList.add('soon-popup-overlay');
  document.body.appendChild(overlay);

  popup.classList.remove('hidden');  // Убираем класс hidden, показываем попап
  overlay.style.display = 'block';  // Показываем фон с блюром

  // Сохраняем обработчик для правильного удаления
  const closeHandler = () => closePopup(overlay);

  // Добавляем обработчики
  overlay.addEventListener('click', closeHandler); 
  document.addEventListener('keydown', closeHandler); 
}

// Функция закрытия попапа
function closePopup(overlay) {
  const popup = document.querySelector('.soon-popup');

  if (popup && overlay) {
    popup.classList.add('hidden');  // Добавляем класс hidden, скрываем попап
    overlay.style.display = 'none';  // Скрываем фон с блюром
  }

  // Убираем обработчики после закрытия
  document.removeEventListener('keydown', closePopup); // Закрытие при нажатии клавиши
  overlay.removeEventListener('click', closePopup); // Закрытие при клике на фон
}

// Экспортируем функцию для вызова при клике на кнопку
export function showPopupOnClick() {
  popupBtn.addEventListener('click', openPopup);
}
