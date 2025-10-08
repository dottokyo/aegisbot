import  { getData } from './api.js';

let chartInstance;
let portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || [];

export async function graphInit () {
 const data = await getData();
  
 if (data.portfolioValue != null) {
  if (portfolioData.length >= 7) {
    portfolioData.shift();
  }
  portfolioData.push(data.portfolioValue);

   let storedData = JSON.parse(localStorage.getItem('portfolioData')) || [];
  if (storedData.length >= 10) {
    storedData.shift();  
  }
  storedData.push(data.portfolioValue);

  // Сохраняем обновленные данные в localStorage
  localStorage.setItem('portfolioData', JSON.stringify(storedData));

  console.log(portfolioData);
  }
  // // Получаем первое значение для центрирования
  // const alignValue = portfolioData[4];
  
  // // Устанавливаем минимальное и максимальное значения оси Y
  // const minY = Math.round(alignValue - Math.abs(alignValue) * 0.001);  // 10% меньше первого значения
  // const maxY = Math.round(alignValue + Math.abs(alignValue) * 0.001);  // 10% больше первого значения

   if (chartInstance) {
    chartInstance.data.datasets[0].data = [...portfolioData];
    chartInstance.update();
  } else {
    const ctx = document.getElementById('graph').getContext('2d');

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
          label: '',
          data: portfolioData,
          borderWidth: 3,
          borderColor: '#e7c69c',
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: false
            },
            grid: {
              display: true
            },
            display: true
          },
          y: {
            beginAtZero: false,
            ticks: {
              display: true
            },
            grid: {
              display: true
            },
            display: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0
          }
        },
      }
    });
  }
}
