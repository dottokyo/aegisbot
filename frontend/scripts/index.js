import { graphInit } from './graph.js';
import { metricsInit } from './metrics.js'

async function initialize() {
  metricsInit();
  await graphInit();
  setInterval(graphInit, 10000);
};

initialize();