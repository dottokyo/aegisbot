import getDataG from "./api.js"

let chartInstance;

export async function graphInit () {
 const data = await getDataG();

  if (chartInstance) {
    chartInstance.data.datasets[0].data = [...chartInstance.data.datasets[0].data.slice(1), data[data.length - 1]];
    chartInstance.update();
  } else {
    const ctx = document.getElementById('graph').getContext('2d');

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
          label: '',
          data: data,
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
              display: false
            },
            display: false
          },
          y: {
            beginAtZero: true,
            ticks: {
              display: false
            },
            grid: {
              display: false
            },
            display: false
          }
        },
        plugins: {
          legend: {
            display: false
          }
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
