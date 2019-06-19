import {domAppend, domEmpty, domFind, domCreate} from "../utils/dom";

export function isValidInput(arrSize, IntervalDuration) {
  return arrSize > 1 && IntervalDuration >= 1;
}

export function showValidationError() {
  clearValidation();
  const feedbackBox = domFind("#feedbackBox");
  domAppend(
    feedbackBox,
    domCreate("div", {
      className: "alert alert-error",
      innerText: "Invalid input, 'Array size' must be > 1 and 'The interval' must be >= 1."
    })
  );
}

export function clearValidation() {
  const feedbackBox = domFind("#feedbackBox");
  const reportBox = domFind("#reportBox");
  domEmpty(feedbackBox);
  domEmpty(reportBox);
}
