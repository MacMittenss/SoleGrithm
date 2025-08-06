#!/usr/bin/env node

/**
 * API Endpoint Testing Script for SoleGrithm
 * Simple curl-based tests to validate API endpoints
 */

import { execSync } from 'child_process';

const BASE_URL = 'http://localhost:5000';
const API_PREFIX = '/api';

class APITester {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
      reset: '\x1b[0m'
    };
    
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
  }

  async testEndpoint(name, path, expectedStatus = 200) {
    try {
      const url = `${BASE_URL}${API_PREFIX}${path}`;
      const command = `curl -s -w "%{http_code}" -o /dev/null "${url}"`;
      
      const statusCode = execSync(command, { encoding: 'utf8' }).trim();
      const actualStatus = parseInt(statusCode);
      
      if (actualStatus === expectedStatus) {
        this.log(`✓ ${name} (${actualStatus})`, 'success');
        this.passed++;
        this.results.push({ name, path, status: actualStatus, passed: true });
      } else {
        this.log(`✗ ${name} (expected ${expectedStatus}, got ${actualStatus})`, 'error');
        this.failed++;
        this.results.push({ name, path, status: actualStatus, passed: false });
      }
    } catch (error) {
      this.log(`✗ ${name} (error: ${error.message})`, 'error');
      this.failed++;
      this.results.push({ name, path, status: 'error', passed: false });
    }
  }

  async testDataContent(name, path) {
    try {
      const url = `${BASE_URL}${API_PREFIX}${path}`;
      const command = `curl -s "${url}"`;
      
      const response = execSync(command, { encoding: 'utf8' });
      const data = JSON.parse(response);
      
      if (Array.isArray(data) && data.length > 0) {
        this.log(`✓ ${name} (${data.length} items)`, 'success');
        this.passed++;
        this.results.push({ name, path, dataCount: data.length, passed: true });
        return data;
      } else if (typeof data === 'object' && data !== null) {
        this.log(`✓ ${name} (object response)`, 'success');
        this.passed++;
        this.results.push({ name, path, dataType: 'object', passed: true });
        return data;
      } else {
        this.log(`✗ ${name} (invalid data format)`, 'error');
        this.failed++;
        this.results.push({ name, path, passed: false });
      }
    } catch (error) {
      this.log(`✗ ${name} (error: ${error.message})`, 'error');
      this.failed++;
      this.results.push({ name, path, passed: false });
    }
  }

  async checkServerHealth() {
    this.log('Checking server health...', 'info');
    
    try {
      const url = `${BASE_URL}${API_PREFIX}/brands`;
      const command = `curl -s -w "%{http_code}" -o /dev/null "${url}"`;
      const statusCode = execSync(command, { encoding: 'utf8' }).trim();
      
      if (parseInt(statusCode) === 200) {
        this.log('✓ Server is healthy and responding', 'success');
        return true;
      } else {
        this.log(`✗ Server returned status ${statusCode}`, 'error');
        return false;
      }
    } catch (error) {
      this.log(`✗ Cannot connect to server: ${error.message}`, 'error');
      return false;
    }
  }

  async runAllTests() {
    this.log('Starting SoleGrithm API Tests...', 'info');
    console.log('');
    
    // Check server health first
    const serverHealthy = await this.checkServerHealth();
    if (!serverHealthy) {
      this.log('Server is not available. Exiting tests.', 'error');
      return false;
    }
    
    console.log('');
    this.log('Running endpoint tests...', 'info');
    
    // Basic endpoint tests
    await this.testEndpoint('Brands API', '/brands');
    await this.testEndpoint('Featured Sneakers API', '/sneakers/featured');
    await this.testEndpoint('Blog API', '/blog');
    await this.testEndpoint('Invalid Endpoint', '/nonexistent', 404);
    
    console.log('');
    this.log('Testing data content...', 'info');
    
    // Data content tests
    const brands = await this.testDataContent('Brands Data', '/brands');
    const sneakers = await this.testDataContent('Featured Sneakers Data', '/sneakers/featured');
    const blog = await this.testDataContent('Blog Data', '/blog');
    
    // Validate specific data structure
    if (brands && brands.length > 0) {
      const brand = brands[0];
      if (brand.id && brand.name && brand.slug) {
        this.log('✓ Brand data structure is valid', 'success');
        this.passed++;
      } else {
        this.log('✗ Brand data structure is invalid', 'error');
        this.failed++;
      }
    }
    
    if (sneakers && sneakers.length > 0) {
      const sneaker = sneakers[0];
      if (sneaker.id && sneaker.name && sneaker.brand) {
        this.log('✓ Sneaker data structure is valid', 'success');
        this.passed++;
      } else {
        this.log('✗ Sneaker data structure is invalid', 'error');
        this.failed++;
      }
    }
    
    if (blog && blog.length > 0) {
      const post = blog[0];
      if (post.id && post.title && post.content) {
        this.log('✓ Blog data structure is valid', 'success');
        this.passed++;
      } else {
        this.log('✗ Blog data structure is invalid', 'error');
        this.failed++;
      }
    }
    
    console.log('');
    this.generateReport();
    
    return this.failed === 0;
  }

  generateReport() {
    const total = this.passed + this.failed;
    const successRate = total > 0 ? ((this.passed / total) * 100).toFixed(1) : 0;
    
    this.log('='.repeat(50), 'info');
    this.log('API TEST REPORT', 'info');
    this.log('='.repeat(50), 'info');
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log(`Success Rate: ${successRate}%`);
    
    if (this.failed === 0) {
      this.log('All API tests passed! 🎉', 'success');
    } else {
      this.log(`${this.failed} test(s) failed. Please review the results above.`, 'error');
    }
    
    // Save results to file
    try {
      const timestamp = new Date().toISOString();
      const report = {
        timestamp,
        total,
        passed: this.passed,
        failed: this.failed,
        successRate: parseFloat(successRate),
        results: this.results
      };
      
      import('fs').then(fs => {
        const reportDir = 'test-reports';
        if (!fs.existsSync(reportDir)) {
          fs.mkdirSync(reportDir, { recursive: true });
        }
        
        const filename = `api-test-${timestamp.replace(/[:.]/g, '-')}.json`;
        const filepath = `${reportDir}/${filename}`;
        
        fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
        this.log(`API test report saved to: ${filepath}`, 'info');
      });
    } catch (error) {
      this.log(`Warning: Could not save test report: ${error.message}`, 'warning');
    }
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new APITester();
  tester.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
  });
}

export default APITester;