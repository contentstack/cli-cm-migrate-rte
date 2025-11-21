/**
 * Test setup file for proper mock cleanup
 * This ensures nock interceptors are properly cleaned between tests
 * Note: sinon cleanup is handled by fancy-test library
 */

const nock = require('nock');

// Global afterEach to clean up nock interceptors
afterEach(function() {
  // Clean up all nock interceptors to prevent leakage between tests
  nock.cleanAll();
});

module.exports = {
  // Export any shared test utilities here if needed
};

