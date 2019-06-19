import {domAppend, domCreate, domFind, domEmpty} from "../utils/dom";

export function createReport({
  duration,
  originalArraySize,
  intervalDuration,
  totalMessageCount,
  nonStableMessageCount,
  sortedArray
}) {
  let reportTitle, stablityIndicator, intervalInfo, progressWrapper, progressInfo, reportBox;
  let percentage = (duration / 1000 / 20) * 100;

  reportTitle = domCreate("h3", {
    className: "report-title",
    innerHTML: `📉 Sorting Report (<small>done in <strong>${(duration / 1000).toFixed(2)}</strong></small>):`
  });

  stablityIndicator = domCreate("div", {
    className: "stability-indicator",
    innerHTML: `Message Processing Stability Indicator: ${nonStableMessageCount /
      totalMessageCount}% (unstable messages count  = <b>${nonStableMessageCount}</b> / total number of messages = <b>${totalMessageCount}</b> ) <small>(The more this percentage is close to zero is the better)</small><br/>`
  });

  intervalInfo = domCreate("div", {
    className: "interval-info",
    innerHTML: `The Interval of sending random number is: ${intervalDuration} milliseconds, during which ${sortedArray.length -
      originalArraySize} numbers where added.
      <br/>
      `
  });

  progressWrapper = domCreate("div", {
    className: "progress",
    innerHTML: `<div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ${percentage}%" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>`
  });

  progressInfo = domCreate("div", {
    className: "progress-info",
    innerHTML: `<div class="text-center">(${percentage}% of the limit 20 seconds)</div>`
  });

  reportBox = domFind("#reportBox");
  domAppend(reportBox, reportTitle);
  domAppend(reportBox, stablityIndicator);
  domAppend(reportBox, intervalInfo);
  domAppend(reportBox, progressWrapper);
  domAppend(reportBox, progressInfo);
}

export function clearReport() {
  const reportBox = domFind("#reportBox");
  domEmpty(reportBox);
}
