import getData from "./api.js"

getData().then((data) => {
  console.log(data);
});

function graphCreate () {
  const canvasPlot = document.getElementById(`graph`);
  const ctx = canvasPlot.getContext(`2d`);

  const canvasPlotWidth = canvasPlot.clientWidth;
  const canvasPlotHeight = canvasPlot.clientHeight;

  const scaleX = 20;
  const scaleY = 20;

  ctx.beginPath();
  ctx.strokeStyle = '#ff'
}


// export function graphInit () {

// }