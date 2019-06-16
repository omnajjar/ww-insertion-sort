const domFind = selector => document.querySelector(selector);

const domCreate = (type, props = {}) => {
  const el = document.createElement(type);
  Object.entries(props).forEach(prop => {
    el[prop[0]] = prop[1];
  });
  return el;
};

const domOn = (el, event, cb) => {
  el.addEventListener(event, cb);
};

const domAppend = (parent, child) => {
  parent.append(child);
};

export {domFind, domCreate, domOn, domAppend};
