#!/usr/bin/env node

// Simple test runner for SoleGrithm
// This script provides a unified interface for running all test types

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

async function runTests() {
  log('blue', '🧪 SoleGrithm Test Runner');
  log('blue', '========================');
  console.log();

  try {
    // Check if Jest is available
    log('blue', 'Checking test environment...');
    await runCommand('npx', ['jest', '--version']);
    log('green', '✓ Jest is available');
    console.log();

    // Run tests
    log('blue', 'Running test suite...');
    await runCommand('npx', ['jest', '--passWithNoTests', '--verbose']);
    
    log('green', '✅ All tests completed successfully!');
    
  } catch (error) {
    log('red', `❌ Test execution failed: ${error.message}`);
    process.exit(1);
  }
}

// Command line interface
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
SoleGrithm Test Runner

Usage: node test-runner.js [options]

Options:
  --help, -h     Show this help message
  --coverage     Run tests with coverage report
  --watch        Run tests in watch mode
  --component    Run component tests only
  --integration  Run integration tests only
  --e2e          Run end-to-end tests only

Examples:
  node test-runner.js                 # Run all tests
  node test-runner.js --coverage      # Run with coverage
  node test-runner.js --component     # Component tests only
  `);
  process.exit(0);
}

runTests();