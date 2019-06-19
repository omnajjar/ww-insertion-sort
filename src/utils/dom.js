export function domFind(selector) {
  return document.querySelector(selector);
}

export function domFindAll(selector) {
  return document.querySelectorAll(selector);
}

export function domCreate(type, props = {}) {
  const el = document.createElement(type);
  Object.entries(props).forEach(prop => {
    el[prop[0]] = prop[1];
  });
  return el;
}

export function domOn(el, event, cb) {
  el.addEventListener(event, cb);
}

export function domAppend(parent, child) {
  parent.append(child);
}

export function domEmpty(element) {
  element.innerHTML = "";
}

export function domAppendBefore(selector, child) {
  const theAfterNode = domFind(selector);
  const parentNode = theAfterNode.parentNode;
  parentNode.insertBefore(child, theAfterNode);
}
