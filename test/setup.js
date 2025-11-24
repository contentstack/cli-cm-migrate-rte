// test/setup.js

const { Command } = require('@contentstack/cli-command');

// Set default region for tests to avoid "Region not configured" error
process.env.CSDX_REGION = 'NA';

// Set the default host for Command instances to avoid region configuration errors
const testApiUrl = 'https://api.contentstack.io';

// Stub the Command class's cmaHost getter globally for all tests
// This prevents "Region not configured" errors during test execution
Object.defineProperty(Command.prototype, 'cmaHost', {
  get: function() {
    return testApiUrl;
  },
  configurable: true
});

// Make unhandled promise rejections fail tests loudly
process.on("unhandledRejection", (reason) => {
  // eslint-disable-next-line no-console
  console.error("UNHANDLED REJECTION in tests:", reason);
  // Non-zero exit so CI fails explicitly
  process.exitCode = 1;
});

// Make uncaught exceptions visible
process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.error("UNCAUGHT EXCEPTION in tests:", err);
  process.exitCode = 1;
});

// Optional: disable external HTTP calls except via nock
try {
  const nock = require("nock");
  nock.disableNetConnect();
  // Allow localhost if you ever need it:
  // nock.enableNetConnect("127.0.0.1");
} catch (e) {
  // if nock isn't loaded here, just ignore
}
