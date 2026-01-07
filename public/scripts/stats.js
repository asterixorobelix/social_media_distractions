/**
 * Statistics Data Handler
 * Loads, parses, and queries statistical data
 */

const StatsModule = (function() {
    'use strict';

    let statisticsData = null;

    /**
     * Load statistics.json file
     * @returns {Promise<Object>} Resolves to full data object
     */
    async function loadStatisticsData() {
        if (statisticsData) {
            return statisticsData;
        }

        try {
            const response = await fetch('data/statistics.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            statisticsData = await response.json();
            return statisticsData;
        } catch (error) {
            console.error('Failed to load statistics data:', error);
            throw new Error('Unable to load statistics. Please try again later.');
        }
    }

    /**
     * Map age to closest age group key
     * @param {number} age - User's age (13-99)
     * @returns {string} Age group key (e.g., "18-24")
     */
    function mapAgeToGroup(age) {
        if (age >= 13 && age <= 17) return '13-17';
        if (age >= 18 && age <= 24) return '18-24';
        if (age >= 25 && age <= 34) return '25-34';
        if (age >= 35 && age <= 99) return '35-44'; // Map 35+ to 35-44 group
        return '18-24'; // Default fallback
    }

    /**
     * Get statistics for given age and gender
     * @param {number} age - User's age (13-99)
     * @param {string|null} gender - "male", "female", or null
     * @returns {Promise<Object>} Statistics data with ageRange, metrics, dataSource
     */
    async function getStatisticsForAge(age, gender = null) {
        const data = await loadStatisticsData();
        const ageRange = mapAgeToGroup(age);
        const ageGroupData = data.ageGroups[ageRange];

        if (!ageGroupData) {
            throw new Error(`No data available for age ${age}`);
        }

        // Select gender-specific data if available, else use "all"
        let metrics;
        let dataSource;

        if (gender && (gender === 'male' || gender === 'female') && ageGroupData[gender]) {
            metrics = ageGroupData[gender];
            dataSource = gender;
        } else {
            metrics = ageGroupData.all;
            dataSource = 'all';
        }

        return {
            ageRange,
            metrics,
            dataSource
        };
    }

    /**
     * Format metrics for display
     * @param {Object} metrics - StatisticsMetrics object
     * @returns {Object} Display-ready formatted data
     */
    function formatMetricsForDisplay(metrics) {
        const hours = Math.floor(metrics.dailyMinutes / 60);
        const minutes = metrics.dailyMinutes % 60;
        const dailyTime = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

        return {
            dailyTime,
            dailyMinutes: metrics.dailyMinutes,
            notifications: metrics.notifications,
            distractionRate: `${Math.round(metrics.distractionRate * 100)}%`,
            distractionRateDecimal: metrics.distractionRate,
            topPlatforms: metrics.topPlatforms,
            platformBreakdown: metrics.platformBreakdown
        };
    }

    // Public API
    return {
        loadStatisticsData,
        getStatisticsForAge,
        formatMetricsForDisplay
    };
})();
