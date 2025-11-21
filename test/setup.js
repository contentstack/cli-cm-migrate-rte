/**
 * Test setup file for proper stub and mock cleanup
 * This ensures sinon stubs and nock interceptors are properly restored between tests
 */

const sinon = require('sinon');
const nock = require('nock');

// Global afterEach to restore all stubs and clean up nock interceptors
afterEach(function() {
  // Restore all sinon stubs/spies/mocks
  sinon.restore();
  
  // Clean up all nock interceptors to prevent leakage between tests
  nock.cleanAll();
});

// Optionally, add a beforeEach for consistency
beforeEach(function() {
  // This ensures we start with a clean slate
  sinon.restore();
});

module.exports = {
  // Export any shared test utilities here if needed
};

