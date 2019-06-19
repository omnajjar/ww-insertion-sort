import {generateRandomIntNumberArray, generateRandomIntNumber} from "./utils/math";
import {isValidInput, clearValidation, showValidationError} from "./app/validation";
import {MESSAGE_TYPE} from "./utils/messages";
import {domFind, domOn} from "./utils/dom";
import {clearLogs, createLog} from "./app/logs";
import {createReport, clearReport} from "./app/report";
import Worker from "./worker/worker";

//import styles
import "./style/bootstrap.min.css";
import "./style/style.css";

// default app state.
let interval;
let numStack = [];
let unresolvedMessagesStack = [];
let lastMessageId = 1;
let nonStableMessageCount = 0;
let totalMessageCount = 0;
let sortWorker;
let arrSize;
let intervalDuration;

const {RESET, SET_DATA, CHECK, CONTINUE, DONE, ACKNOWLEDGEMENT, ADD_NUMBER, START_SORT} = MESSAGE_TYPE;

const startButton = domFind("#startButton");
const arraySizeInput = domFind("#arraySizeInput");
const intervalDurationInput = domFind("#intervalInput");

// Start the app
initWorker();
domOn(startButton, "click", hadnleSubmit);
// App is ready

function hadnleSubmit(e) {
  e.preventDefault();
  arrSize = parseInt(arraySizeInput.value, 10);
  intervalDuration = parseInt(intervalDurationInput.value, 10);

  if (isValidInput(arrSize, intervalDuration)) {
    clearValidation();
    clearReport();
    clearLogs();
    disableSorter();
    start(arrSize, intervalDuration);
  } else {
    showValidationError();
  }
}

function start(max, intervalDuration) {
  const arr = generateRandomIntNumberArray(max, max);
  //1. tell the worker to reset its state
  sendMessage({type: RESET});

  //2. set the new data
  sendMessage({
    type: SET_DATA,
    data: arr
  });

  //3. Tell the worker to start sorting
  sendMessage({type: START_SORT});

  //4. the trigger interval of sending a random number to the worker
  interval = setInterval(() => {
    numStack.push(generateRandomIntNumber(max));
  }, intervalDuration);
}

// creates a message and send it to the worker
// push the message the message stack as unresolved message
// set a startTime timestamp which indicates the moment this message was initiated
// will be resolved once we got acknowledgment back from the worker
function sendMessage(message) {
  const nextMessage = {...message, id: generateMessageId(), startTime: Date.now()};
  sortWorker.postMessage(nextMessage);
  unresolvedMessagesStack.push(nextMessage);
}

// retrive the unresolved message with the given id from the stack and mark it as resolved
// resolve the message (take it out from the unresolved messages stack)
// this moment will indicate how much time did processing this message take
function resolveMessage(messageId) {
  const resolvedMessageIndex = unresolvedMessagesStack.findIndex(({id}) => id === messageId);
  const resolvedMessage = unresolvedMessagesStack[resolvedMessageIndex];
  unresolvedMessagesStack.splice(resolvedMessageIndex, 1);
  return resolvedMessage;
}

// And simple ids generator to mark messsages.
function generateMessageId() {
  const nextid = lastMessageId;
  lastMessageId++;
  return nextid;
}

// handle the incoming messsages from the worker
// the worker perform atomic operation (sorts one element at a time)
// and asks the UI whether to CONTINUE or to PAUSE to handle the a new number
// so it will check if the number stack is empty ('CONTINUE') or there is a number to be added before continue on sorting
function handleMessage(message) {
  const {type, data, id} = message.data;
  let workerShouldPause = numStack.length > 0;

  switch (type) {
    case CHECK:
      if (workerShouldPause) {
        sendMessage({type: ADD_NUMBER, data: numStack.pop()});
      } else {
        sendMessage({type: CONTINUE});
      }
      break;
    case ACKNOWLEDGEMENT:
      const resolvedMessage = resolveMessage(id);
      const messageType = resolvedMessage.type;
      if (messageType === RESET || messageType === SET_DATA || messageType === START_SORT) {
        createLog(resolvedMessage);
        totalMessageCount--;
      } else if (Date.now() - resolvedMessage.startTime > 13) {
        createLog(resolvedMessage);
        nonStableMessageCount++;
      }
      totalMessageCount++;
      break;
    case DONE:
      createLog({type: DONE, duration: data.duration});
      resetWorker();
      clearInterval(interval);
      createReport({...data, originalArraySize: arrSize, intervalDuration, totalMessageCount, nonStableMessageCount});
      clearInputs();
      resetMessageCounters();
      enableSorter();
      window.WWInsertionSort = data;
      break;
    default:
      console.warn(`Unknow Action Type: '${type}'`);
      break;
  }
}

function initWorker() {
  if (sortWorker) {
    sortWorker.terminate();
    sortWorker = null;
  }
  sortWorker = new Worker();
  sortWorker.addEventListener("message", handleMessage);
}

function resetWorker() {
  initWorker();
}

function clearInputs() {
  arraySizeInput.value = "";
  intervalDurationInput.value = "";
}

function resetMessageCounters() {
  totalMessageCount = 0;
  nonStableMessageCount = 0;
}

function enableSorter() {
  startButton.innertText = "Start";
  startButton.disabled = false;
  arraySizeInput.disabled = false;
  intervalDurationInput.disabled = false;
}

function disableSorter() {
  startButton.innerText = "Sorting...";
  startButton.disabled = true;
  arraySizeInput.disabled = true;
  intervalDurationInput.disabled = true;
}
