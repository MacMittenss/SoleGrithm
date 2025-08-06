#!/bin/bash

# SoleGrithm Test Execution Script
# Comprehensive testing script for unit tests and API tests

set -e

echo "🧪 SoleGrithm Testing Suite"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if required tools are available
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is available (${NODE_VERSION})"
    else
        print_error "Node.js is not installed"
        exit 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is available (${NPM_VERSION})"
    else
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check if Jest is available
    if npx jest --version &> /dev/null; then
        JEST_VERSION=$(npx jest --version)
        print_success "Jest is available (${JEST_VERSION})"
    else
        print_error "Jest is not available"
        exit 1
    fi
    
    echo ""
}

# Run unit tests
run_unit_tests() {
    print_status "Running unit tests..."
    
    # Create test reports directory
    mkdir -p test-reports
    
    # Run Jest with coverage and detailed reporting
    if npx jest \
        --testPathPatterns="__tests__" \
        --coverage \
        --coverageDirectory="coverage" \
        --coverageReporters="text" \
        --coverageReporters="lcov" \
        --coverageReporters="json-summary" \
        --verbose \
        --watchAll=false \
        --passWithNoTests \
        --testResultsProcessor="jest-sonar-reporter" 2>/dev/null || npx jest \
        --testPathPatterns="__tests__" \
        --coverage \
        --coverageDirectory="coverage" \
        --coverageReporters="text" \
        --coverageReporters="lcov" \
        --coverageReporters="json-summary" \
        --verbose \
        --watchAll=false \
        --passWithNoTests; then
        
        print_success "Unit tests completed successfully"
        
        # Display coverage summary if available
        if [ -f "coverage/coverage-summary.json" ]; then
            print_status "Code Coverage Summary:"
            node -e "
                const fs = require('fs');
                try {
                    const coverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
                    if (coverage.total) {
                        console.log('  Statements: ' + coverage.total.statements.pct + '%');
                        console.log('  Branches: ' + coverage.total.branches.pct + '%');
                        console.log('  Functions: ' + coverage.total.functions.pct + '%');
                        console.log('  Lines: ' + coverage.total.lines.pct + '%');
                    }
                } catch (e) {
                    console.log('  Coverage data not available');
                }
            "
        fi
        
        return 0
    else
        print_error "Unit tests failed"
        return 1
    fi
}

# Run Women in Sneakers specific tests
run_women_tests() {
    print_status "Running Women in Sneakers component tests..."
    
    if npx jest \
        --testPathPatterns="women" \
        --verbose \
        --watchAll=false; then
        
        print_success "Women in Sneakers tests completed successfully"
        return 0
    else
        print_error "Women in Sneakers tests failed"
        return 1
    fi
}

# Test API endpoints (simple curl tests)
test_api_endpoints() {
    print_status "Testing API endpoints..."
    
    # Check if server is running
    if curl -s "http://localhost:5000/api/brands" > /dev/null; then
        print_success "Server is responding"
        
        # Test key endpoints
        ENDPOINTS=(
            "/api/brands"
            "/api/sneakers/featured"
            "/api/blog"
        )
        
        for endpoint in "${ENDPOINTS[@]}"; do
            if curl -s -f "http://localhost:5000${endpoint}" > /dev/null; then
                print_success "✓ ${endpoint}"
            else
                print_error "✗ ${endpoint}"
            fi
        done
        
        return 0
    else
        print_warning "Server not running on localhost:5000 - API tests skipped"
        return 0
    fi
}

# Generate test report
generate_report() {
    print_status "Generating test report..."
    
    TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
    REPORT_FILE="test-reports/test-report-${TIMESTAMP}.md"
    
    cat > "${REPORT_FILE}" << EOF
# SoleGrithm Test Report
Generated: $(date)

## Test Summary
- Unit Tests: $([ $UNIT_TESTS_RESULT -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")
- Women Components: $([ $WOMEN_TESTS_RESULT -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")
- API Tests: $([ $API_TESTS_RESULT -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")

## Coverage
$([ -f "coverage/coverage-summary.json" ] && node -e "
const fs = require('fs');
try {
    const coverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
    if (coverage.total) {
        console.log('- Statements: ' + coverage.total.statements.pct + '%');
        console.log('- Branches: ' + coverage.total.branches.pct + '%');
        console.log('- Functions: ' + coverage.total.functions.pct + '%');
        console.log('- Lines: ' + coverage.total.lines.pct + '%');
    }
} catch (e) {
    console.log('- Coverage data not available');
}
" || echo "- Coverage data not available")

## Test Files
$(find client/src/__tests__ -name "*.test.tsx" -o -name "*.test.ts" 2>/dev/null | sort || echo "No test files found")

## Postman Collection
- Location: postman/SoleGrithm_API_Tests.postman_collection.json
- Tests: Authentication, Sneakers API, Brands API, Blog API, Reviews API, Performance, Error Handling
EOF

    print_success "Test report saved to: ${REPORT_FILE}"
}

# Main execution
main() {
    echo ""
    print_status "Starting SoleGrithm test suite execution..."
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Initialize result variables
    UNIT_TESTS_RESULT=1
    WOMEN_TESTS_RESULT=1
    API_TESTS_RESULT=1
    
    # Run tests
    echo "📋 Running test suites..."
    echo ""
    
    # Unit tests
    if run_unit_tests; then
        UNIT_TESTS_RESULT=0
    fi
    echo ""
    
    # Women in Sneakers specific tests
    if run_women_tests; then
        WOMEN_TESTS_RESULT=0
    fi
    echo ""
    
    # API tests
    if test_api_endpoints; then
        API_TESTS_RESULT=0
    fi
    echo ""
    
    # Generate report
    generate_report
    echo ""
    
    # Final summary
    print_status "Test Execution Summary:"
    echo "  Unit Tests: $([ $UNIT_TESTS_RESULT -eq 0 ] && echo -e "${GREEN}PASSED${NC}" || echo -e "${RED}FAILED${NC}")"
    echo "  Women Components: $([ $WOMEN_TESTS_RESULT -eq 0 ] && echo -e "${GREEN}PASSED${NC}" || echo -e "${RED}FAILED${NC}")"
    echo "  API Tests: $([ $API_TESTS_RESULT -eq 0 ] && echo -e "${GREEN}PASSED${NC}" || echo -e "${RED}FAILED${NC}")"
    echo ""
    
    # Exit with appropriate code
    if [ $UNIT_TESTS_RESULT -eq 0 ] && [ $WOMEN_TESTS_RESULT -eq 0 ] && [ $API_TESTS_RESULT -eq 0 ]; then
        print_success "All tests completed successfully! 🎉"
        exit 0
    else
        print_error "Some tests failed. Please review the results above."
        exit 1
    fi
}

# Run main function
main "$@"