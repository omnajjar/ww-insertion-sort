import {MESSAGE_TYPE} from "../utils/messages";
import ControlledInsertionSort from "../utils/controlledInsertioSort";
import Timer from "../utils/timer";

const {RESET, SET_DATA, ADD_NUMBER, START_SORT, CHECK, CONTINUE, DONE, ACKNOWLEDGEMENT} = MESSAGE_TYPE;

let arr;
let controlledInsertionSort;
let sortTimer;

setDefaultState();

export default function handleMessage(messageData) {
  const {type, data, id} = messageData;
  let messageHandledSuccessfully = true;

  switch (type) {
    case RESET:
      setDefaultState();
      break;
    case SET_DATA:
      setData(data);
      break;
    case ADD_NUMBER:
      sortTimer.pause();
      controlledInsertionSort.addNumber(data);
      sortTimer.resume();
      check();
      break;
    case START_SORT:
      sortTimer.start();
      controlledInsertionSort.sortOne();
      check();
      break;
    case CONTINUE:
      controlledInsertionSort.sortOne();
      check();
      break;
    default:
      messageHandledSuccessfully = false;
      break;
  }
  if (messageHandledSuccessfully) {
    sendAcknowledgment(id);
  }
}

function setDefaultState() {
  arr = [];
  controlledInsertionSort = null;
  sortTimer = null;
}

function setData(data) {
  arr = [...data];
  controlledInsertionSort = new ControlledInsertionSort(arr, onSortingDone);
  sortTimer = new Timer();
}

function onSortingDone() {
  sortTimer.stop();
  sendDone({...controlledInsertionSort.getStats(), duration: sortTimer.getDuration()});
}

function check() {
  postMessage({type: CHECK});
}

function sendDone(data) {
  postMessage({type: DONE, data: data});
}

function sendAcknowledgment(messageId) {
  postMessage({type: ACKNOWLEDGEMENT, id: messageId});
}
