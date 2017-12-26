#!/usr/bin/env node

let Countdown = require('../index');

const args = process.argv.slice(2);

let options = {
  to: '',
  from: new Date(),
  clock: false
};

args.forEach((arg, i) => {
  switch (arg) {
    case '-v':
    case '--version':
    case 'version':
      console.log(`v${require('../package.json').version}`); // eslint-disable-line
      process.exit(0);
      break;
    case '-h':
    case '--help':
    case 'help':
      console.log(`` + // eslint-disable-line
        `
  Usage: countdownto [options]

  Commands:
    -h, --help, help                Output usage information
    -v, --version, version          Output the version number

  Options:
    -t, --to [date]                 The date that the countdown will aim for
    -f, --from [date]               The date that the countdown will start from, by default it is the time when the command was initiated at
    -c, --clock                     Will output an ascii clock that will update
`);
      process.exit(0);
      break;
    case '-t':
    case '--to':
      options.to = new Date(args[i + 1]);
      break;
    case '-f':
    case '--from':
      options.from = new Date(args[i + 1]);
      break;
    case '-c':
    case '--clock':
      options.clock = true;
      break;
  }
});

if (!options.to) {
  console.error('please provide to date \n countdownto --to 12/12/2020'); // eslint-disable-line
  process.exit(1);
}

let countdown = new Countdown(new Date(options.to));

if (options.clock) {
  process.stdout.write('\x1Bc');
  process.stdout.write(countdown.time.clock());

  countdown.tick((time) => {
    process.stdout.write('\x1Bc');
    process.stdout.write(time.clock());
  });
}

if (!options.clock) {
  console.log(countdown.toString()); // eslint-disable-line
}
