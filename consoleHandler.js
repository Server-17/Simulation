document.addEventListener('DOMContentLoaded', () => {
    (function () {
        const consoleView = document.getElementById('console-view');
        const consoleLogContainer = document.getElementById('console-log-container');
        const toggleBtn = document.getElementById('console-toggle');
        let isConsoleVisible = true;

        // Handle case where elements might not be found
        if (!consoleView || !consoleLogContainer || !toggleBtn) {
            console.error("Console handler elements not found in the DOM.");
            return;
        }

        toggleBtn.addEventListener('click', () => {
            isConsoleVisible = !isConsoleVisible;
            if (isConsoleVisible) {
                consoleView.style.display = 'block';
                document.body.style.marginRight = '400px';
                toggleBtn.style.right = '410px';
                toggleBtn.textContent = 'Hide Console';
            } else {
                consoleView.style.display = 'none';
                document.body.style.marginRight = '0';
                toggleBtn.style.right = '10px';
                toggleBtn.textContent = 'Show Console';
            }
        });

        function logToView(message, type = 'log') {
            const entry = document.createElement('div');
            const colorMap = {
                error: '#ff8a80',
                warn: '#ffd700',
                info: '#87cefa',
            };
            const defaultColor = '#f0f0f0';

            entry.style.color = colorMap[type] || defaultColor;
            entry.style.whiteSpace = 'pre-wrap';
            entry.style.wordBreak = 'break-word';
            entry.style.padding = '2px 0';
            entry.style.borderBottom = '1px solid #444';

            entry.textContent = message;
            consoleLogContainer.appendChild(entry);
            consoleLogContainer.scrollTop = consoleLogContainer.scrollHeight;
        }

        const originalConsole = {};
        const methods = ['log', 'warn', 'error', 'info', 'debug'];

        methods.forEach(method => {
            const original = console[method].bind(console);
            originalConsole[method] = original;

            console[method] = (...args) => {
                const message = args.map(arg => {
                    if (arg instanceof Error) {
                        return arg.stack || arg.message;
                    }
                    try {
                        return JSON.stringify(arg, null, 2);
                    } catch (e) {
                        return String(arg);
                    }
                }).join(' ');

                logToView(message, method);
                original(...args);
            };
        });

        window.onerror = (message, source, lineno, colno, error) => {
            let fullMessage = `${message}`;
            if (error && error.stack) {
                const formattedStack = formatStack(error.stack);
                if (formattedStack) {
                    fullMessage += `\n\n${formattedStack}`;
                }
            } else if (source && source.includes(window.location.origin)) {
                fullMessage += `\n at ${source.split('/').pop()}:${lineno}`;
            }
            logToView(fullMessage, 'error');
            return false;
        };

        window.addEventListener('unhandledrejection', event => {
            const reason = event.reason || 'No reason provided';
            let message = 'Unhandled Promise Rejection: ';
            if (reason instanceof Error) {
                message += reason.message;
                const formattedStack = formatStack(reason.stack);
                if (formattedStack) {
                    message += `\n\n${formattedStack}`;
                }
            } else {
                message += String(reason);
            }
            logToView(message, 'error');
        });

        function formatStack(stack) {
            if (!stack) return '';

            const ownOrigin = window.location.origin;
            const lineRegex = /\s*at (?:(.*?) \()?(.*):(\d+):\d+\)?/;

            return stack.split('\n')
                .map(line => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine.startsWith('at ')) {
                        return null; // Ignore message line if present at top of stack
                    }
                    if (!trimmedLine.includes(ownOrigin)) {
                        return null; // Filter out external scripts
                    }

                    const match = trimmedLine.match(lineRegex);
                    if (match) {
                        const functionName = match[1] || 'anonymous';
                        const filePath = match[2];
                        const fileName = filePath.split('/').pop();
                        const lineNumber = match[3];
                        return `at ${functionName}, ${fileName}, line ${lineNumber}`;
                    }
                    return null;
                })
                .filter(Boolean)
                .join('\n');
        }

    })();
});