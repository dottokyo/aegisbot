import { metricsInit } from metrics.js
import { graphInit } from graph.js

async function initialize() {
  metricsInit();
  graphInit();
};

initialize();