/**
 * Chart Rendering and Animations
 * Handles Chart.js visualizations and counter animations
 */

const VisualizationsModule = (function() {
    'use strict';

    let platformChartInstance = null;

    /**
     * Platform brand colors
     */
    const PLATFORM_COLORS = {
        tiktok: '#FE2C55',
        instagram: '#E4405F', // Simplified gradient color
        snapchat: '#FFFC00',
        facebook: '#1877F2',
        other: '#808080'
    };

    /**
     * Render platform breakdown bar chart
     * @param {Object} platformBreakdown - Minutes per platform
     * @returns {Chart} Chart.js instance
     */
    function renderPlatformChart(platformBreakdown) {
        const canvas = document.getElementById('platform-chart');
        if (!canvas) {
            console.error('Canvas element not found');
            return null;
        }

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (platformChartInstance) {
            platformChartInstance.destroy();
        }

        const labels = Object.keys(platformBreakdown).map(platform =>
            platform.charAt(0).toUpperCase() + platform.slice(1)
        );
        const data = Object.values(platformBreakdown);
        const colors = Object.keys(platformBreakdown).map(platform =>
            PLATFORM_COLORS[platform.toLowerCase()] || PLATFORM_COLORS.other
        );

        platformChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Minutes per Day',
                    data,
                    backgroundColor: colors,
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 1000,
                    easing: 'easeOut'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y} minutes/day`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + ' min';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        return platformChartInstance;
    }

    /**
     * Animate counter with count-up effect
     * @param {HTMLElement} element - DOM element to update
     * @param {number} targetValue - Final value to count to
     * @param {number} duration - Animation duration in ms (default 1500)
     * @param {string} suffix - Optional suffix (e.g., '%')
     */
    function animateCounter(element, targetValue, duration = 1500, suffix = '') {
        if (!element) return;

        const startTime = performance.now();
        const startValue = 0;

        // Ease-out cubic function
        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOut(progress);
            const currentValue = Math.round(startValue + (targetValue - startValue) * easedProgress);

            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure we end at exact target value
                element.textContent = targetValue + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /**
     * Apply slide-in animation to element
     * @param {HTMLElement} element - Element to animate
     */
    function applySlideInAnimation(element) {
        if (!element) return;
        element.classList.add('slide-in');
    }

    /**
     * Render all charts and animate counters
     * @param {Object} displayData - Formatted statistics data
     */
    function renderCharts(displayData) {
        const { metrics, ageRange, dataSource } = displayData;

        // Show results section
        const resultsSection = document.getElementById('results-section');
        const statsContent = document.getElementById('stats-content');
        const loadingIndicator = document.getElementById('loading-indicator');

        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            applySlideInAnimation(resultsSection);
        }

        // Hide loading, show stats
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
        if (statsContent) {
            statsContent.classList.remove('hidden');
            applySlideInAnimation(statsContent);
        }

        // Animate counters
        const dailyMinutesEl = document.getElementById('daily-minutes');
        const notificationsEl = document.getElementById('notifications');
        const distractionRateEl = document.getElementById('distraction-rate');

        if (dailyMinutesEl) animateCounter(dailyMinutesEl, metrics.dailyMinutes, 1500);
        if (notificationsEl) animateCounter(notificationsEl, metrics.notifications, 1500);
        if (distractionRateEl) {
            const rateValue = Math.round(metrics.distractionRateDecimal * 100);
            animateCounter(distractionRateEl, rateValue, 1500, '%');
        }

        // Render platform chart
        renderPlatformChart(metrics.platformBreakdown);

        // Update data source info
        const dataSourceInfo = document.getElementById('data-source-info');
        if (dataSourceInfo) {
            const sourceText = dataSource === 'all'
                ? `Showing general data for ages ${ageRange}`
                : `Showing ${dataSource} data for ages ${ageRange}`;
            dataSourceInfo.textContent = sourceText;
        }

        // Scroll to results
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Public API
    return {
        renderPlatformChart,
        animateCounter,
        applySlideInAnimation,
        renderCharts
    };
})();
