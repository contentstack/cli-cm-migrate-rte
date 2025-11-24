/**
 * Test setup file for proper stub cleanup
 * This ensures sinon stubs are properly restored between tests
 */

const sinon = require('sinon');

// Set default region for tests to avoid "Region not configured" error
process.env.CSDX_REGION = 'NA';

// Global afterEach to restore all stubs after each test
afterEach(function() {
  // Restore all sinon stubs/spies/mocks
  sinon.restore();
});

// Optionally, add a beforeEach for consistency
beforeEach(function() {
  // This ensures we start with a clean slate
  sinon.restore();
});

module.exports = {
  // Export any shared test utilities here if needed
};

