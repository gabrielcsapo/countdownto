# countdownto

> ⏳ the countdown starts, when will it end?

[![Npm Version](https://img.shields.io/npm/v/@gabrielcsapo/countdownto.svg)](https://www.npmjs.com/package/@gabrielcsapo/countdownto)
[![Build Status](https://travis-ci.org/gabrielcsapo/countdownto.svg?branch=master)](https://travis-ci.org/gabrielcsapo/countdownto)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/countdownto.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/countdownto)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/countdownto/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/countdownto)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/countdownto/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/countdownto#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/@gabrielcsapo/countdownto.svg)]()
[![npm](https://img.shields.io/npm/dm/@gabrielcsapo/countdownto.svg)]()

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
- [Usage](#usage)
	- [CLI](#cli)

<!-- /TOC -->

## Installation

```
npm install @gabrielcsapo/countdownto -g
```

## Usage

```js
const Countdownto = require('@gabrielcsapo/countdownto');

let countdown = new Countdownto(new Date('12/21/2020'));

console.log(countdown.diff());
```

To get a constantly updating diff use the tick function as such:

```js
const Countdownto = require('@gabrielcsapo/countdownto');

let countdown = new Countdownto(new Date('12/21/2020'));

countdown.tick((time) => {
	console.log(time.toString());
});
```

### CLI

```
Usage: countdownto [options]

Commands:
  -h, --help, help                Output usage information
  -v, --version, version          Output the version number

Options:
  -t, --to [date]                 The date that the countdown will aim for
  -f, --from [date]               The date that the countdown will start from, by default it is the time when the command was initiated at
  -c, --clock                     Will output an ascii clock that will update
```

Running the cli options like `countdownto --to 01/01/2017 --clock` will output:

![example](./docs/example.gif)
