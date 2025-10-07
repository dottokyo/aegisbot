import { graphInit } from './graph.js'
import { showPopup } from './popup.js'

async function initialize() {
  setInterval(graphInit, 1000); 
  await showPopup();
};

initialize();