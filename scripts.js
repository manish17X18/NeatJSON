document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const jsonOutput = document.getElementById('jsonOutput');
    const formatBtn = document.getElementById('formatBtn');
    const copyBtn = document.getElementById('copyBtn');
    const errorDiv = document.getElementById('error');

    // Format JSON with proper indentation
    function formatJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed, null, 4);
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
    }

    // Show error message
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        setTimeout(() => {
            errorDiv.classList.remove('show');
        }, 5000);
    }

    // Format button click handler
    formatBtn.addEventListener('click', () => {
        const input = jsonInput.value.trim();
        if (!input) {
            showError('Please enter some JSON to format');
            return;
        }

        try {
            const formatted = formatJSON(input);
            jsonOutput.textContent = formatted;
            errorDiv.classList.remove('show');
        } catch (error) {
            showError(error.message);
        }
    });

    // Copy button click handler
    copyBtn.addEventListener('click', () => {
        const output = jsonOutput.textContent;
        if (!output) {
            showError('No formatted JSON to copy');
            return;
        }

        navigator.clipboard.writeText(output)
            .then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            })
            .catch(() => {
                showError('Failed to copy to clipboard');
            });
    });

    // Auto-format on paste
    jsonInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            const input = jsonInput.value.trim();
            if (input) {
                try {
                    const formatted = formatJSON(input);
                    jsonOutput.textContent = formatted;
                    errorDiv.classList.remove('show');
                } catch (error) {
                    // Don't show error on paste, wait for format button
                }
            }
        }, 100);
    });
}); 