exports.module = {
    "setupFiles": ["<rootDir>/src/setupTests.js"],
    "testRegex": "/*.test.js$",
    "collectCoverage": true,
    "coverageReporters": ["lcov"],
    "coverageDirectory": "test-coverage",
    "coverageThreshold": {
     "global": {
     "branches": 0,
     "functions": 0,
     "lines": 0,
     "statements": 0
     }
    },
    "moduleDirectories": ["node_modules", "src"],
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporters", {
          "pageTitle": "Test Report",
          "filename":"tests/test-report.html",
          "expand": true
        }]
      ],
   }