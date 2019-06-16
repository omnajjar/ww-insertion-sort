class Timer {
  constructor() {
    this.reset();
  }
  reset() {
    this._startTime = null;
    this._endTime = null;
  }
  start() {
    this._startTime = Date.now();
  }
  stop() {
    this._endTime = Date.now();
  }
  getDuration() {
    if (this._startTime === null || this._endTime === null) return 0;
    return this._endTime - this._startTime;
  }
}

export default Timer;
