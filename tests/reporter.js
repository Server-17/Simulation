const chalk = require('chalk');

class CustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunComplete(contexts, results) {
        results.testResults.forEach(testFileResult => {
            console.log()
            testFileResult.testResults.forEach(testCase => {
                const functionName = testCase.title;
                if (testCase.status === 'passed') {
                    console.log(`${chalk.green('✓')} ${functionName}`);
                } else if (testCase.status === 'failed') {
                    try {
                        const errorData = JSON.parse(testCase.failureMessages[0].split('\n')[0].replace('Error: ', ''));
                        console.log(`${chalk.red('✗')} ${errorData.functionName} (passed ${errorData.total - errorData.failures.length}/${errorData.total})`);
                        const failure = errorData.failures[0];
                        console.log(`  Input: ${failure.input}`);
                        console.log(`  Expected output: ${failure.expected}`);
                        console.log(`  Actual output:   ${failure.received}`);
                        console.log();
                    } catch (error) {
                        console.log(`${chalk.red('✗')} ${functionName} ${chalk.red.bold.inverse("Error in code:")}`);
                        console.log(testCase.failureMessages[0].split('\n').slice(0, 2).join('\n'));
                    }
                }
            });
        });
    }
}

module.exports = CustomReporter;