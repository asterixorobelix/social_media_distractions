/**
 * Theme Detection and Application
 * Handles light/dark mode based on system preferences
 */

(function() {
    'use strict';

    /**
     * Detect user's theme preference from system
     * @returns {string} 'light' or 'dark'
     */
    function detectThemePreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Apply theme to document
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const theme = detectThemePreference();
        applyTheme(theme);

        // Listen for theme changes
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

            // Modern browsers
            if (darkModeQuery.addEventListener) {
                darkModeQuery.addEventListener('change', function(e) {
                    applyTheme(e.matches ? 'dark' : 'light');
                });
            }
            // Legacy browsers
            else if (darkModeQuery.addListener) {
                darkModeQuery.addListener(function(e) {
                    applyTheme(e.matches ? 'dark' : 'light');
                });
            }
        }
    }

    // Initialize immediately
    initTheme();
})();
