const Timer = function() {
  //locals
  let startTime, endTime, timeAccumulator;

  const resetTimer = () => {
    startTime = 0;
    endTime = 0;
    timeAccumulator = [];
  };

  // set initial state
  resetTimer();

  // expose
  return {
    reset: resetTimer,
    start: () => {
      startTime = Date.now();
    },
    stop: () => {
      endTime = Date.now();
    },
    pause: () => {
      timeAccumulator.push(Date.now() - startTime);
      startTime = 0;
    },
    resume: () => {
      startTime = Date.now();
    },
    getDuration: () => {
      timeAccumulator.push(endTime - startTime);
      return timeAccumulator.reduce((durationsSum, duration) => durationsSum + duration, 0);
    }
  };
};

export default Timer;
