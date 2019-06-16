import {generateRandomIntNumberArray} from "./utils/math";
import {domFind, domCreate, domOn, domAppend} from "./utils/dom";

import Worker from "./worker";
import "./style/style.css";

const wrapper = domCreate("div", {className: "container"});
const header = domCreate("h1", {className: "h1", innerText: "WW Insertion Sort"});
const btnSend = domCreate("button", {innerText: "Send Data", className: "btn btn-primary"});

const worker = new Worker();
worker.addEventListener("message", e => console.log(e));

domOn(btnSend, "click", () => {
  const max = 100 * 1000;
  const arr = generateRandomIntNumberArray(max, max);
  worker.postMessage({arr});
});

domAppend(wrapper, header);
domAppend(wrapper, domCreate("br"));
domAppend(wrapper, btnSend);

domAppend(domFind("#app"), wrapper);
