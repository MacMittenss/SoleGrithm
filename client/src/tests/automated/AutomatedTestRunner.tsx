import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Square, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  BarChart3,
  FileText,
  Terminal,
  Download
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'running' | 'passed' | 'failed' | 'pending';
  duration: number;
  coverage?: number;
  errors?: string[];
  warnings?: string[];
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCount: number;
  results: TestResult[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  totalDuration: number;
  coverage: number;
}

export default function AutomatedTestRunner() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: 'component',
      name: 'Component Tests',
      description: 'Unit tests for React components',
      testCount: 45,
      results: [],
      status: 'idle',
      totalDuration: 0,
      coverage: 0
    },
    {
      id: 'integration',
      name: 'Integration Tests',
      description: 'API and component interaction tests',
      testCount: 18,
      results: [],
      status: 'idle',
      totalDuration: 0,
      coverage: 0
    },
    {
      id: 'e2e',
      name: 'End-to-End Tests',
      description: 'Complete user journey tests',
      testCount: 12,
      results: [],
      status: 'idle',
      totalDuration: 0,
      coverage: 0
    },
    {
      id: 'accessibility',
      name: 'Accessibility Tests',
      description: 'WCAG compliance and usability tests',
      testCount: 25,
      results: [],
      status: 'idle',
      totalDuration: 0,
      coverage: 0
    },
    {
      id: 'performance',
      name: 'Performance Tests',
      description: 'Load time and optimization tests',
      testCount: 20,
      results: [],
      status: 'idle',
      totalDuration: 0,
      coverage: 0
    },
    {
      id: 'responsive',
      name: 'Responsive Tests',
      description: 'Multi-device viewport tests',
      testCount: 15,
      results: [],
      status: 'idle',
      totalDuration: 0,
      coverage: 0
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentSuite, setCurrentSuite] = useState<string | null>(null);
  const [outputLogs, setOutputLogs] = useState<string[]>([]);

  // Simulate test execution
  const runTestSuite = async (suiteId: string) => {
    const suite = testSuites.find(s => s.id === suiteId);
    if (!suite) return;

    // Update suite status to running
    setTestSuites(prev => prev.map(s => 
      s.id === suiteId ? { ...s, status: 'running' as const, results: [] } : s
    ));

    setCurrentSuite(suiteId);
    addLog(`Starting ${suite.name}...`);

    // Simulate running individual tests
    for (let i = 0; i < suite.testCount; i++) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));
      
      const testName = `${suite.name.toLowerCase()}-test-${i + 1}`;
      const passed = Math.random() > 0.1; // 90% pass rate
      const duration = Math.random() * 1000 + 50;
      
      const result: TestResult = {
        name: testName,
        status: passed ? 'passed' : 'failed',
        duration,
        coverage: Math.random() * 20 + 80,
        errors: passed ? [] : [`Error in ${testName}: Mock test failure`],
        warnings: Math.random() > 0.8 ? [`Warning in ${testName}: Mock warning`] : []
      };

      // Update results
      setTestSuites(prev => prev.map(s => 
        s.id === suiteId 
          ? { 
              ...s, 
              results: [...s.results, result],
              totalDuration: s.totalDuration + duration
            } 
          : s
      ));

      addLog(`${passed ? '✓' : '✗'} ${testName} (${duration.toFixed(0)}ms)`);
    }

    // Calculate final suite status
    const finalSuite = testSuites.find(s => s.id === suiteId);
    const hasFailed = finalSuite?.results.some(r => r.status === 'failed');
    const avgCoverage = finalSuite?.results.reduce((acc, r) => acc + (r.coverage || 0), 0) || 0;

    setTestSuites(prev => prev.map(s => 
      s.id === suiteId 
        ? { 
            ...s, 
            status: hasFailed ? 'failed' as const : 'completed' as const,
            coverage: avgCoverage / suite.testCount
          } 
        : s
    ));

    addLog(`${suite.name} completed: ${hasFailed ? 'FAILED' : 'PASSED'}`);
    addLog('');
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setOutputLogs([]);
    addLog('Starting comprehensive test suite...');
    addLog('');

    for (const suite of testSuites) {
      if (isRunning) {
        await runTestSuite(suite.id);
      }
    }

    setCurrentSuite(null);
    setIsRunning(false);
    addLog('All tests completed!');
  };

  const stopTests = () => {
    setIsRunning(false);
    setCurrentSuite(null);
    addLog('Tests stopped by user');
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setOutputLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const getStatusIcon = (status: TestSuite['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'running':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getOverallStats = () => {
    const totalTests = testSuites.reduce((acc, suite) => acc + suite.testCount, 0);
    const completedTests = testSuites.reduce((acc, suite) => acc + suite.results.length, 0);
    const passedTests = testSuites.reduce((acc, suite) => 
      acc + suite.results.filter(r => r.status === 'passed').length, 0);
    const failedTests = testSuites.reduce((acc, suite) => 
      acc + suite.results.filter(r => r.status === 'failed').length, 0);
    const avgCoverage = testSuites.reduce((acc, suite) => acc + suite.coverage, 0) / testSuites.length;

    return {
      totalTests,
      completedTests,
      passedTests,
      failedTests,
      avgCoverage: isNaN(avgCoverage) ? 0 : avgCoverage,
      progress: (completedTests / totalTests) * 100
    };
  };

  const stats = getOverallStats();

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Automated Test Runner</h1>
          <p className="text-muted-foreground">
            Execute and monitor comprehensive test suites
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={runAllTests}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Run All Tests
          </Button>
          {isRunning && (
            <Button
              variant="outline"
              onClick={stopTests}
              className="flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              Stop
            </Button>
          )}
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.completedTests}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.passedTests}</div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.failedTests}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.avgCoverage.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.progress.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
          <Progress value={stats.progress} className="mt-4" />
        </CardContent>
      </Card>

      <Tabs defaultValue="suites" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suites">Test Suites</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="logs">Output Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="suites" className="space-y-4">
          {/* Test Suites */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testSuites.map((suite) => (
              <Card key={suite.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{suite.name}</span>
                    {getStatusIcon(suite.status)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {suite.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Tests: {suite.results.length}/{suite.testCount}</span>
                      <span>Coverage: {suite.coverage.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={(suite.results.length / suite.testCount) * 100} 
                      className="h-2" 
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => runTestSuite(suite.id)}
                        disabled={isRunning}
                        className="flex-1"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                      <Badge 
                        variant={suite.status === 'completed' ? 'default' : 
                                suite.status === 'failed' ? 'destructive' : 'secondary'}
                      >
                        {suite.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {/* Detailed Results */}
          {testSuites.map((suite) => (
            suite.results.length > 0 && (
              <Card key={suite.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    {suite.name} Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {suite.results.map((result, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg border"
                      >
                        <div className="flex items-center gap-2">
                          {result.status === 'passed' ? 
                            <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          }
                          <span className="text-sm font-mono">{result.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{result.duration.toFixed(0)}ms</span>
                          <span>{result.coverage?.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </TabsContent>

        <TabsContent value="logs">
          {/* Output Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Test Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
                {outputLogs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
                {outputLogs.length === 0 && (
                  <div className="text-gray-500">No output yet. Run tests to see results...</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Current Status */}
      {isRunning && currentSuite && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span className="font-medium">
                Running {testSuites.find(s => s.id === currentSuite)?.name}...
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}