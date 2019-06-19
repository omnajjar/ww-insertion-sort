import {domAppend, domAppendBefore, domCreate, domFind, domEmpty} from "../utils/dom";
import {MESSAGE_TYPE} from "../utils/messages";

const {DONE} = MESSAGE_TYPE;

export function createLog(logData) {
  let typeBadge, dataBadge, durationBadge, logWrapper;
  const sharedClass = "log-badge badge badge-pill";
  const {type, data, startTime} = logData;
  const duration = type === DONE ? logData.duration : Date.now() - startTime;

  typeBadge = domCreate("div", {className: `${sharedClass} badge-primary`, innerHTML: `Type: ${type}`});
  durationBadge = domCreate("div", {
    className: `${sharedClass} badge-info`,
    innerHTML: `Duration: ${duration / 1000} sec`
  });

  logWrapper = domCreate("div", {className: `log alert alert-success`});

  if (data) {
    const displayData = Array.isArray(data) ? [data[0], "...", data[data.length - 1]] : data;
    dataBadge = domCreate("div", {
      className: `${sharedClass} badge-secondary`,
      innerHTML: `Data: ${JSON.stringify(displayData)}`
    });
  }

  domAppend(logWrapper, typeBadge);
  if (dataBadge) domAppend(logWrapper, dataBadge);
  domAppend(logWrapper, durationBadge);

  domAppendBefore(".log", logWrapper);
}

export function clearLogs() {
  const logsList = domFind("#message-log-list");
  domEmpty(logsList);
  domAppend(logsList, domCreate("div", {className: "log"})); //append hook
}
