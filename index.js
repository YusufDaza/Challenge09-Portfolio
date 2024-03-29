const inquirer = require('inquirer');
const fs = require('fs');

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a short description of your project:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use:'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide guidelines for others to contribute to your project:'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide any tests written for your application and provide examples on how to run them:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None']
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub username?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    }
];

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('README.md successfully generated!');
        }
    });
}
function renderLicenseBadge(license) {
    if (license === "MIT") {
        return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    }

    if (license === "Apache 2.0") {
        return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    }
    if (license === "GPL 3.0") {
        return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
    }
    if (license === "BSD 3") {
        return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
    }
    if (license === "None") {
        return `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`
    }
}
// Function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        const readmeContent = `
# ${answers.title}
${renderLicenseBadge(answers.license)}
## Description

${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## License

This project is licensed under the ${answers.license} license.

## Questions

For questions about this project, please contact [${answers.githubUsername}](https://github.com/${answers.githubUsername}) at ${answers.email}.
`;
        writeToFile('README.md', readmeContent);
    });
}

// Function call to initialize app
init();
