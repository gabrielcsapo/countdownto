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
