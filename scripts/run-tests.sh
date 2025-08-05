#!/bin/bash

# SoleGrithm Test Runner Script
# Comprehensive testing automation for development and CI/CD

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Test categories
COMPONENT_TESTS="client/src/tests/components"
INTEGRATION_TESTS="client/src/tests/integration"
E2E_TESTS="client/src/tests/e2e"
ACCESSIBILITY_TESTS="client/src/tests/accessibility"
PERFORMANCE_TESTS="client/src/tests/performance"
RESPONSIVE_TESTS="client/src/tests/responsive"

# Default options
RUN_ALL=true
COVERAGE=false
WATCH=false
VERBOSE=false
CI_MODE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --component)
            RUN_ALL=false
            COMPONENT=true
            shift
            ;;
        --integration)
            RUN_ALL=false
            INTEGRATION=true
            shift
            ;;
        --e2e)
            RUN_ALL=false
            E2E=true
            shift
            ;;
        --accessibility)
            RUN_ALL=false
            ACCESSIBILITY=true
            shift
            ;;
        --performance)
            RUN_ALL=false
            PERFORMANCE=true
            shift
            ;;
        --responsive)
            RUN_ALL=false
            RESPONSIVE=true
            shift
            ;;
        --coverage)
            COVERAGE=true
            shift
            ;;
        --watch)
            WATCH=true
            shift
            ;;
        --verbose)
            VERBOSE=true
            shift
            ;;
        --ci)
            CI_MODE=true
            shift
            ;;
        --help)
            echo "SoleGrithm Test Runner"
            echo ""
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --component     Run component tests only"
            echo "  --integration   Run integration tests only"
            echo "  --e2e          Run end-to-end tests only"
            echo "  --accessibility Run accessibility tests only"
            echo "  --performance   Run performance tests only"
            echo "  --responsive    Run responsive design tests only"
            echo "  --coverage      Generate coverage report"
            echo "  --watch         Run tests in watch mode"
            echo "  --verbose       Enable verbose output"
            echo "  --ci            Run in CI mode (no watch, coverage enabled)"
            echo "  --help          Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                    # Run all tests"
            echo "  $0 --component        # Run component tests only"
            echo "  $0 --coverage         # Run all tests with coverage"
            echo "  $0 --component --watch # Run component tests in watch mode"
            echo "  $0 --ci               # Run in CI mode"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# CI mode configuration
if [ "$CI_MODE" = true ]; then
    COVERAGE=true
    WATCH=false
    VERBOSE=true
    print_status "Running in CI mode"
fi

# Start testing
print_status "Starting SoleGrithm Test Suite"
echo "=================================="

# Check if Jest is available
if ! command -v npx &> /dev/null; then
    print_error "npx not found. Please install Node.js and npm."
    exit 1
fi

# Create test results directory
mkdir -p test-results

# Function to run tests with proper configuration
run_test_suite() {
    local test_name=$1
    local test_path=$2
    local jest_options=""
    
    if [ "$COVERAGE" = true ]; then
        jest_options="$jest_options --coverage"
    fi
    
    if [ "$WATCH" = true ]; then
        jest_options="$jest_options --watch"
    fi
    
    if [ "$VERBOSE" = true ]; then
        jest_options="$jest_options --verbose"
    fi
    
    if [ "$CI_MODE" = true ]; then
        jest_options="$jest_options --ci --watchAll=false"
    fi
    
    print_status "Running $test_name tests..."
    
    if npx jest $test_path $jest_options; then
        print_success "$test_name tests completed successfully"
        return 0
    else
        print_error "$test_name tests failed"
        return 1
    fi
}

# Track test results
FAILED_SUITES=()

# Run test suites based on options
if [ "$RUN_ALL" = true ] || [ "$COMPONENT" = true ]; then
    if ! run_test_suite "Component" "--testPathPattern=components"; then
        FAILED_SUITES+=("Component")
    fi
    echo ""
fi

if [ "$RUN_ALL" = true ] || [ "$INTEGRATION" = true ]; then
    if ! run_test_suite "Integration" "--testPathPattern=integration"; then
        FAILED_SUITES+=("Integration")
    fi
    echo ""
fi

if [ "$RUN_ALL" = true ] || [ "$E2E" = true ]; then
    if ! run_test_suite "End-to-End" "--testPathPattern=e2e"; then
        FAILED_SUITES+=("End-to-End")
    fi
    echo ""
fi

if [ "$RUN_ALL" = true ] || [ "$ACCESSIBILITY" = true ]; then
    if ! run_test_suite "Accessibility" "--testPathPattern=accessibility"; then
        FAILED_SUITES+=("Accessibility")
    fi
    echo ""
fi

if [ "$RUN_ALL" = true ] || [ "$PERFORMANCE" = true ]; then
    if ! run_test_suite "Performance" "--testPathPattern=performance"; then
        FAILED_SUITES+=("Performance")
    fi
    echo ""
fi

if [ "$RUN_ALL" = true ] || [ "$RESPONSIVE" = true ]; then
    if ! run_test_suite "Responsive" "--testPathPattern=responsive"; then
        FAILED_SUITES+=("Responsive")
    fi
    echo ""
fi

# Summary
echo "=================================="
print_status "Test Suite Summary"

if [ ${#FAILED_SUITES[@]} -eq 0 ]; then
    print_success "All test suites passed! ✅"
    exit 0
else
    print_error "The following test suites failed:"
    for suite in "${FAILED_SUITES[@]}"; do
        echo "  - $suite"
    done
    print_error "❌ Testing completed with failures"
    exit 1
fi