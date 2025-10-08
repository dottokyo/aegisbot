import { graphInit } from './graph.js';

async function initialize() {
  await graphInit();
  setInterval(graphInit, 10000);
};

initialize();