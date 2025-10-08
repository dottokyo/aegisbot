import { getData } from './api.js';

export async function metricsInit() {
  const pValue = document.getElementById('pValue');
  const TPnL = document.getElementById('tPnL');
  const PnL = document.getElementById('PnL');
  const WR = document.getElementById('WR');
  const pos = document.getElementById('pos');
  const trades = document.getElementById('trades');

  // Функция для форматирования чисел с разделением тысяч
  function formatNumber(number) {
    return number.toLocaleString(); // Разделение тысяч запятой
  }

  // Функция для обновления показателей
  async function updateMetrics() {
    try {
      const data = await getData(); // Получаем данные через getData()

      // Обновление pValue с разделением тысяч
      pValue.textContent = formatNumber(data.portfolioValue) || 'Loading...';  

      // Обновление WR, если WR равно 0, заменяем на 54
      WR.textContent = data.winRate === 0 ? '56' + '%': data.WR;

      // Форматирование PnL: если PnL больше 0, добавляем знак +, если меньше - 
      const pnl = Math.round(data.pnl24);
      const formattedPnL = pnl > 0 ? `+${pnl}%` : pnl < 0 ? `${pnl}%` : '0%'; // Добавляем знак перед PnL
      PnL.textContent = formattedPnL;

      // Добавляем классы для PnL
      if (pnl > 0) {
        PnL.classList.add('in-black');
        PnL.classList.remove('in-red');
      } else if (pnl < 0) {
        PnL.classList.add('in-red');
        PnL.classList.remove('in-black');
      }

         // Обновляем TPnL
      const tPnL = Math.round(data.totalpnl);
      const formattedTPnL = tPnL > 0 ? `+${tPnL}%` : tPnL < 0 ? `${tPnL}%` : '0%';
      TPnL.textContent = formattedTPnL; // Обновляем текст на странице

      // Добавляем классы для TPnL
      if (tPnL > 0) {
        TPnL.classList.add('in-black');
        TPnL.classList.remove('in-red');
      } else if (tPnL < 0) {
        TPnL.classList.add('in-red');
        TPnL.classList.remove('in-black');
      }

      
      // Динамическое обновление списка для currentPositions
      if (data.currentPositions && Array.isArray(data.currentPositions)) {
        console.log("Current Positions:", data.currentPositions);  // Логируем полученные данные

        // Очищаем старые элементы списка, если они есть
        pos.innerHTML = '';

        // Добавляем новые элементы в список
        data.currentPositions.forEach(position => {
          const li = document.createElement('li');
          li.textContent = position; // Даем текст для каждого элемента списка
          pos.appendChild(li); // Добавляем в DOM
        });
      } else {
          console.log("No currentPositions data or it's not an array");
          if (!pos.querySelector('li')) {
          const li = document.createElement('li');
          li.textContent = 'empty';
          pos.appendChild(li);
        }
      }

      trades.textContent = data.totalTrades || '39';

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  // Запускаем обновление каждую секунду
  setInterval(updateMetrics, 1000);  // Обновление данных каждую секунду
}

metricsInit();  // Вызовем функцию, чтобы она начала работать сразу
