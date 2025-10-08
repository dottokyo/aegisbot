import { graphInit } from './graph.js'

async function initialize() {
  setInterval(graphInit, 1000); 
};

initialize();