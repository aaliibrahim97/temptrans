const defaultOptions = {
  timeout: 10, //seconds
  key: '_timeout',
  events: ['mousemove', 'scroll', 'keydown'],
  eventTimeout: 150, //miliseconds
};

export class AtlpIdleTimeoutManager {
  private _eventHanlders: any;
  options: any;
  interval: NodeJS.Timeout;
  private _updateGuard: any;
  constructor(options) {
    this.options = Object.assign(defaultOptions, options);
    this._eventHanlders = this._updateTimeout.bind(this);
    this.options.timeout = 86400;
    this._start();
  }

  _start() {
    this._updateTimeout();
    this._tracker();

    this.interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem(this.options.key));
      const currentTime = Date.now();
      if (expiredTime < currentTime) {
        this.clear();
        if (this.options.onExpired) {
          this.options.onExpired(expiredTime);
        }
      }
    }, 1000);
  }

  _updateTimeout() {
    if (this._updateGuard) {
      clearTimeout(this._updateGuard);
    }

    this._updateGuard = setTimeout(() => {
      localStorage.setItem(
        this.options.key,
        (Date.now() + this.options.timeout * 1000).toString()
      );
    }, this.options.eventTimeout);
  }

  _tracker() {
    for (let event of this.options.events) {
      window.addEventListener(event, this._eventHanlders);
    }
  }

  _clearTracker() {
    for (let event of this.options.events) {
      window.removeEventListener(event, this._eventHanlders);
    }
  }

  clear() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this._updateGuard) {
      clearTimeout(this._updateGuard);
    }

    this._clearTracker();
  }
}

