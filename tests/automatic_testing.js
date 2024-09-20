const { spawn } = require('child_process');
const path = require('path');

function run(filename) {
    // turn path to file including extension into a name without extension
    const name = path.basename(filename).replace(/\..+$/, '');
    const testProcess = spawn('npm', ['run', 'test', '--', `.*${name}.test.js`], {
        env: { ...process.env, FORCE_COLOR: '1' },
        stdio: 'inherit',
        shell: true,
    });
}


function testWrapper(functionName, testCases, testFunction) {
    test(functionName, () => {
        const failures = [];
        testCases.forEach(([input, expected]) => {
            // const originalInput = JSON.parse(JSON.stringify(input));
            const mappedInput = input.map((i) => (("" + i).startsWith("class ") ? i.name : i));
            const originalInput = mappedInput.join(", ");
            try {
                const result = testFunction(...input);
                expect(result).toEqual(expected);
            } catch (error) {
                if (error.matcherResult) {
                    failures.push({ input: originalInput, expected: JSON.stringify(expected), received: JSON.stringify(error.matcherResult.actual) });
                } else {
                    throw error;
                }
            }
        });
        if (failures.length >= 1) {
            throw new Error(JSON.stringify({ functionName, failures, total: testCases.length }));
        }
    });
};

module.exports = { run, testWrapper };
