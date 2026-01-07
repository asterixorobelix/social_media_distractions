/**
 * Main Entry Point & User Input Handler
 * Handles form submission, validation, and orchestrates data flow
 */

(function() {
    'use strict';

    /**
     * Validate age input
     * @param {string} age - Raw input from form field
     * @returns {Object} { valid: boolean, error: string|null }
     */
    function validateAge(age) {
        // Check if empty
        if (!age || age.trim() === '') {
            return {
                valid: false,
                error: 'Please enter your age'
            };
        }

        // Check if numeric
        const ageNum = Number(age);
        if (isNaN(ageNum) || !Number.isInteger(ageNum)) {
            return {
                valid: false,
                error: 'Please enter a valid age between 13 and 99'
            };
        }

        // Check range
        if (ageNum < 13 || ageNum > 99) {
            return {
                valid: false,
                error: 'Please enter a valid age between 13 and 99'
            };
        }

        return {
            valid: true,
            error: null
        };
    }

    /**
     * Display error message
     * @param {string} message - Error message to display
     */
    function displayError(message) {
        const errorEl = document.getElementById('age-error');
        if (!errorEl) return;

        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        errorEl.setAttribute('role', 'alert');

        // Add error styling to input
        const input = document.getElementById('age-input');
        if (input) {
            input.setAttribute('aria-invalid', 'true');
            input.classList.add('error');
        }
    }

    /**
     * Clear error message
     */
    function clearError() {
        const errorEl = document.getElementById('age-error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
        }

        const input = document.getElementById('age-input');
        if (input) {
            input.setAttribute('aria-invalid', 'false');
            input.classList.remove('error');
        }
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    async function handleAgeSubmit(event) {
        event.preventDefault();
        clearError();

        // Get form values
        const ageInput = document.getElementById('age-input');
        const age = ageInput ? ageInput.value : '';

        // Validate age
        const validation = validateAge(age);
        if (!validation.valid) {
            displayError(validation.error);
            return;
        }

        const ageNum = Number(age);

        // Get gender selection (for future use - Phase 5)
        const genderInputs = document.getElementsByName('gender');
        let gender = null;
        for (const input of genderInputs) {
            if (input.checked) {
                gender = input.value;
                break;
            }
        }

        try {
            // Show loading state
            const resultsSection = document.getElementById('results-section');
            const loadingIndicator = document.getElementById('loading-indicator');
            const statsContent = document.getElementById('stats-content');

            if (resultsSection) resultsSection.classList.remove('hidden');
            if (loadingIndicator) loadingIndicator.classList.remove('hidden');
            if (statsContent) statsContent.classList.add('hidden');

            // Fetch statistics
            const statsData = await StatsModule.getStatisticsForAge(ageNum, gender);
            const formattedMetrics = StatsModule.formatMetricsForDisplay(statsData.metrics);

            // Render visualizations
            VisualizationsModule.renderCharts({
                metrics: formattedMetrics,
                ageRange: statsData.ageRange,
                dataSource: statsData.dataSource
            });

        } catch (error) {
            console.error('Error loading statistics:', error);
            displayError(error.message || 'Unable to load statistics. Please try again.');

            // Hide loading state
            const loadingIndicator = document.getElementById('loading-indicator');
            if (loadingIndicator) loadingIndicator.classList.add('hidden');
        }
    }

    /**
     * Initialize app on DOM ready
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Set up form submission handler
        const form = document.getElementById('age-form');
        if (form) {
            form.addEventListener('submit', handleAgeSubmit);
        }

        // Clear error on input
        const ageInput = document.getElementById('age-input');
        if (ageInput) {
            ageInput.addEventListener('input', clearError);
        }

        // Focus age input on load
        if (ageInput) {
            ageInput.focus();
        }

        // Preload statistics data
        StatsModule.loadStatisticsData().catch(error => {
            console.warn('Failed to preload statistics:', error);
        });
    }

    // Initialize
    init();
})();
