require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"@gabrielcsapo/countdownto":[function(require,module,exports){
(function (process){
class Time {
  /**
   * deals with any time manipulations
   * @class Time
   * @param  {Number}    total - the total time in MS that we are counting down from
   */
  constructor(total) {
    this.total = total;

    this.milleseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.days = 0;
    this.years = 0;

    this.calculate();
  }
  /**
   * calculate the total time in milleseconds into its particular parts
   * @method calculate
   * @param  {Number}  offset - a number in milleseconds that should be subtracted from the total
   */
  calculate(offset) {
    let { total } = this;

    if(offset) total -= offset;

    this.milleseconds = Math.floor(total) % 1000;
    this.seconds = Math.floor(total / 1000) % 60;
    this.minutes = Math.floor(total / 60000) % 60;
    this.hours = Math.floor(total / 3600000) % 24;
    this.days = Math.floor(total / 86400000) % 365;
    this.years = Math.floor(total / 31556952000);

    return this;
  }
  /**
   * renders the countdown in human readable form
   * @method toString
   * @return {String} - human readable date range till completion
   */
  toString() {
    let output = '';
    if(this.years) output += `${this.years}y `;
    if(this.days) output += `${this.days}d `;
    if(this.minutes) output += `${this.minutes}m `;
    if(this.seconds) output += `${this.seconds}s `;
    if(this.milleseconds) output += `${this.milleseconds}ms `;

    return output;
  }
  /**
   * return an ascii clock representation of the time
   * @method clock
   * @return {String} - the ascii string representing the clock
   */
  clock() {
    let output = this.toString();
    // get the horizontal padding
    let horiztonalPadding = process.stdout ? (process.stdout.columns - output.length) / 2 : 0;
    // get the vertical padding
    let verticalPadding = process.stdout ? process.stdout.rows / 2 : 0;

    if(horiztonalPadding > 0) {
      output = '\n'.repeat(verticalPadding) + ' '.repeat(horiztonalPadding) + output + ' '.repeat(horiztonalPadding) + '\n'.repeat(verticalPadding);
    }

    return output;
  }
}

class Countdown {
  constructor(to, from=new Date()) {
    if(!to) throw new Error('to should be passed as a date or date-string');

    this.to = typeof to === Date ? to : new Date(to);
    this.from = typeof from === Date ? from : new Date(from);
    this.time = {};

    this.diff();
  }
  diff() {
    // get the dates in milleseconds
    const now = this.to.getTime();
    const from = this.from.getTime();

    // get the difference in milleseconds
    let difference = now - from;

    this.time = new Time(difference);

    return this.time;
  }
  /**
   * returns a string representation of the time till countdown is complete
   * @method toString
   * @return {String} - human readable representation of the countdown
   */
  toString() {
    this.diff();

    return this.time.toString().trim();
  }
  /**
   * listen for changes in time
   * @method tick
   * @param  {Number=} tickAmount - the tick interval to update date diff with
   * @return {EventEmitter} an event emitter to listen to changes in date diffs with
   */
  tick(callback, tickAmount=1000) {
    this.diff();

    let start = process.hrtime();
    setInterval(() => {
      callback(this.time.calculate(process.hrtime(start)[1] / 1000));
    }, tickAmount);
  }
}

module.exports = Countdown;

}).call(this,require('_process'))
},{"_process":1}]},{},[]);
