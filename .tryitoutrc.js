const { name, description } = require('./package.json');

module.exports = {
  title: name,
  description: description,
  nav: {
    Source: "https://github.com/gabrielcsapo/countdownto"
  },
  body: [{
    type: "text",
    value: `
      \`\`\`
      npm install countdownto --save
      \`\`\`

      <img src="./example.gif" alt="example" style="width: 100%;">
      \`\`\`
      countdownto --to ../../.... --clock
      \`\`\`
    `
  }, {
    type: "code",
    title: "Creating a simple countdownto object",
    subtitle: "This shows how to get the human readable diff between the dates",
    value: `
        const Countdownto = require('countdownto');

        let countdown = new Countdownto(new Date('12/20/2020'), new Date('12/19/2020'));

        console.log(countdown.toString());
      `
  }],
  output: "./docs",
  options: {
    width: '80%'
  },
  externals: [
    "./dist/countdownto.min.js",
    "./docs/main.css"
  ]
};
