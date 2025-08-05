import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  Home, 
  TrendingUp, 
  Search, 
  Bot, 
  Zap, 
  Accessibility,
  Monitor,
  Globe,
  AlertTriangle
} from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  expected: string;
  status: 'pending' | 'passed' | 'failed' | 'skipped';
  priority: 'high' | 'medium' | 'low';
}

interface TestSuite {
  id: string;
  name: string;
  icon: React.ComponentType;
  description: string;
  testCases: TestCase[];
}

export default function ManualTestSuite() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: 'auth',
      name: 'Authentication',
      icon: User,
      description: 'User login, registration, and session management',
      testCases: [
        {
          id: 'auth-1',
          title: 'User Registration',
          description: 'Test new user registration flow',
          steps: [
            'Navigate to registration page',
            'Fill in valid user information',
            'Submit registration form',
            'Verify email confirmation (if required)',
            'Complete registration process'
          ],
          expected: 'User successfully registers and is redirected to dashboard',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'auth-2',
          title: 'User Login',
          description: 'Test user login with valid credentials',
          steps: [
            'Navigate to login page',
            'Enter valid email and password',
            'Click login button',
            'Verify successful authentication'
          ],
          expected: 'User logs in successfully and accesses protected areas',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'auth-3',
          title: 'Session Persistence',
          description: 'Test session management across browser refresh',
          steps: [
            'Log in to the application',
            'Refresh the browser page',
            'Navigate to different pages',
            'Verify session remains active'
          ],
          expected: 'User session persists across page refreshes',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'navigation',
      name: 'Home & Navigation',
      icon: Home,
      description: 'Homepage functionality and site navigation',
      testCases: [
        {
          id: 'nav-1',
          title: 'Page Load Performance',
          description: 'Test homepage loading speed',
          steps: [
            'Open browser developer tools',
            'Navigate to homepage',
            'Measure page load time',
            'Check for performance issues'
          ],
          expected: 'Page loads within 3 seconds with no errors',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'nav-2',
          title: 'Mobile Navigation',
          description: 'Test mobile menu functionality',
          steps: [
            'Resize browser to mobile width (375px)',
            'Click hamburger menu icon',
            'Test all navigation links',
            'Verify menu closes after selection'
          ],
          expected: 'Mobile menu works smoothly with all links functional',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'nav-3',
          title: 'Featured Content',
          description: 'Test homepage featured sneakers and content',
          steps: [
            'Scroll through featured sneakers section',
            'Click on featured sneaker cards',
            'Verify images load correctly',
            'Test hover effects and interactions'
          ],
          expected: 'All featured content displays and functions correctly',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'market',
      name: 'Live Market',
      icon: TrendingUp,
      description: 'Live market data, trends, and catalog functionality',
      testCases: [
        {
          id: 'market-1',
          title: 'Market Data Display',
          description: 'Test live market overview and data accuracy',
          steps: [
            'Navigate to Live Market section',
            'Verify market overview statistics',
            'Check trending sneakers list',
            'Verify price data accuracy'
          ],
          expected: 'All market data displays correctly with accurate information',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'market-2',
          title: 'Catalog Integration',
          description: 'Test catalog tab within live market',
          steps: [
            'Click on Catalog tab in Live Market',
            'Test search functionality',
            'Apply various filters',
            'Toggle between grid and list views'
          ],
          expected: 'Catalog section works with all filtering and view options',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'market-3',
          title: 'Real-time Updates',
          description: 'Test real-time data refresh',
          steps: [
            'Monitor trending data for updates',
            'Wait for automatic refresh cycle',
            'Verify data changes appropriately',
            'Test manual refresh functionality'
          ],
          expected: 'Data updates automatically and manually as expected',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'search',
      name: 'Search & Discovery',
      icon: Search,
      description: 'Search functionality and content discovery',
      testCases: [
        {
          id: 'search-1',
          title: 'Global Search',
          description: 'Test main search functionality',
          steps: [
            'Use global search with various queries',
            'Test search suggestions',
            'Verify search results relevance',
            'Test no results scenarios'
          ],
          expected: 'Search returns relevant results with helpful suggestions',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'search-2',
          title: 'Filtering System',
          description: 'Test advanced filtering options',
          steps: [
            'Apply multiple filters simultaneously',
            'Test filter combinations',
            'Clear individual filters',
            'Reset all filters'
          ],
          expected: 'Filtering system works correctly with all combinations',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'ai',
      name: 'AI Features',
      icon: Bot,
      description: 'AI-powered recommendations and chat functionality',
      testCases: [
        {
          id: 'ai-1',
          title: 'SoleBot Chat',
          description: 'Test AI chat assistant functionality',
          steps: [
            'Open SoleBot chat interface',
            'Send various types of queries',
            'Test sneaker recommendations',
            'Verify response accuracy'
          ],
          expected: 'SoleBot responds appropriately to user queries',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: 'ai-2',
          title: 'AI Recommendations',
          description: 'Test personalized recommendations',
          steps: [
            'View AI-generated recommendations',
            'Interact with recommended content',
            'Verify recommendation relevance',
            'Test recommendation updates'
          ],
          expected: 'AI provides relevant and useful recommendations',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: Zap,
      description: 'Application performance and optimization',
      testCases: [
        {
          id: 'perf-1',
          title: 'Load Time Optimization',
          description: 'Test page load performance across the site',
          steps: [
            'Measure load times for key pages',
            'Test image loading optimization',
            'Verify progressive loading',
            'Check for performance bottlenecks'
          ],
          expected: 'All pages load within acceptable time limits',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'perf-2',
          title: 'Memory Management',
          description: 'Test for memory leaks and efficient resource usage',
          steps: [
            'Monitor memory usage during extended use',
            'Navigate through multiple pages',
            'Test image gallery performance',
            'Check for memory leaks'
          ],
          expected: 'Application uses memory efficiently without leaks',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      icon: Accessibility,
      description: 'WCAG compliance and inclusive design',
      testCases: [
        {
          id: 'a11y-1',
          title: 'Keyboard Navigation',
          description: 'Test complete keyboard navigation',
          steps: [
            'Navigate entire site using only keyboard',
            'Test tab order and focus management',
            'Verify skip navigation links',
            'Test modal and dropdown accessibility'
          ],
          expected: 'All functionality accessible via keyboard navigation',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'a11y-2',
          title: 'Screen Reader Compatibility',
          description: 'Test with assistive technologies',
          steps: [
            'Test with NVDA or JAWS screen reader',
            'Verify ARIA labels and descriptions',
            'Test image alt text',
            'Verify semantic HTML structure'
          ],
          expected: 'Site works correctly with screen readers',
          status: 'pending',
          priority: 'high'
        }
      ]
    },
    {
      id: 'responsive',
      name: 'Responsive Design',
      icon: Monitor,
      description: 'Multi-device and viewport testing',
      testCases: [
        {
          id: 'resp-1',
          title: 'Mobile Layout',
          description: 'Test mobile device layouts and interactions',
          steps: [
            'Test on various mobile screen sizes',
            'Verify touch interactions',
            'Test orientation changes',
            'Check mobile-specific features'
          ],
          expected: 'Mobile layout works perfectly on all devices',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'resp-2',
          title: 'Tablet Layout',
          description: 'Test tablet-specific layouts',
          steps: [
            'Test on tablet screen sizes (768px)',
            'Verify hybrid touch/mouse interactions',
            'Test landscape and portrait modes',
            'Check tablet-optimized features'
          ],
          expected: 'Tablet layout provides optimal user experience',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'browser',
      name: 'Cross-Browser',
      icon: Globe,
      description: 'Browser compatibility testing',
      testCases: [
        {
          id: 'browser-1',
          title: 'Chrome Compatibility',
          description: 'Test in Google Chrome',
          steps: [
            'Test all functionality in Chrome',
            'Verify performance metrics',
            'Check developer tools for errors',
            'Test Chrome-specific features'
          ],
          expected: 'Perfect functionality in Chrome browser',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'browser-2',
          title: 'Safari Compatibility',
          description: 'Test in Safari browser',
          steps: [
            'Test all functionality in Safari',
            'Verify Safari-specific behaviors',
            'Test iOS Safari compatibility',
            'Check for Safari-specific issues'
          ],
          expected: 'Perfect functionality in Safari browser',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'error',
      name: 'Error Handling',
      icon: AlertTriangle,
      description: 'Error scenarios and recovery testing',
      testCases: [
        {
          id: 'error-1',
          title: 'Network Error Handling',
          description: 'Test behavior during network issues',
          steps: [
            'Simulate network disconnection',
            'Test offline functionality',
            'Verify error messages',
            'Test recovery after reconnection'
          ],
          expected: 'Graceful handling of network errors with recovery',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'error-2',
          title: '404 Error Pages',
          description: 'Test 404 and error page handling',
          steps: [
            'Navigate to non-existent pages',
            'Verify 404 page displays',
            'Test navigation from error page',
            'Check error page design'
          ],
          expected: 'Helpful error pages with clear navigation options',
          status: 'pending',
          priority: 'medium'
        }
      ]
    }
  ]);

  const updateTestStatus = (suiteId: string, testId: string, newStatus: TestCase['status']) => {
    setTestSuites(prevSuites =>
      prevSuites.map(suite =>
        suite.id === suiteId
          ? {
              ...suite,
              testCases: suite.testCases.map(test =>
                test.id === testId ? { ...test, status: newStatus } : test
              )
            }
          : suite
      )
    );
  };

  const getOverallProgress = () => {
    const allTests = testSuites.flatMap(suite => suite.testCases);
    const completedTests = allTests.filter(test => test.status === 'passed' || test.status === 'failed');
    return Math.round((completedTests.length / allTests.length) * 100);
  };

  const getSuiteProgress = (suite: TestSuite) => {
    const completedTests = suite.testCases.filter(test => test.status === 'passed' || test.status === 'failed');
    return Math.round((completedTests.length / suite.testCases.length) * 100);
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'skipped':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: TestCase['priority']) => {
    const variants = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[priority]} className="text-xs">
        {priority.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Manual Testing Suite</h1>
        <p className="text-muted-foreground">
          Comprehensive manual testing checklist for SoleGrithm
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{getOverallProgress()}%</div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
          <Progress value={getOverallProgress()} className="w-32" />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Test Overview</TabsTrigger>
          <TabsTrigger value="execution">Test Execution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Test Suite Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testSuites.map((suite) => {
              const IconComponent = suite.icon;
              const progress = getSuiteProgress(suite);
              const passedCount = suite.testCases.filter(t => t.status === 'passed').length;
              const failedCount = suite.testCases.filter(t => t.status === 'failed').length;
              
              return (
                <Card key={suite.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="w-5 h-5" />
                      {suite.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {suite.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {suite.testCases.length} tests
                        </span>
                        <span className="font-medium">
                          {progress}% complete
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {passedCount > 0 && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {passedCount} passed
                          </Badge>
                        )}
                        {failedCount > 0 && (
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            {failedCount} failed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="execution" className="space-y-6">
          {/* Test Execution */}
          {testSuites.map((suite) => {
            const IconComponent = suite.icon;
            return (
              <Card key={suite.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    {suite.name} Tests
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {suite.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suite.testCases.map((testCase) => (
                      <Card key={testCase.id} className="border-l-4 border-l-gray-200">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{testCase.title}</h4>
                                  {getPriorityBadge(testCase.priority)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {testCase.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(testCase.status)}
                                <span className="text-sm capitalize">{testCase.status}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Test Steps:</h5>
                              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                {testCase.steps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </div>

                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Expected Result:</h5>
                              <p className="text-sm text-muted-foreground">
                                {testCase.expected}
                              </p>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button
                                size="sm"
                                variant={testCase.status === 'passed' ? 'default' : 'outline'}
                                onClick={() => updateTestStatus(suite.id, testCase.id, 'passed')}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                Pass
                              </Button>
                              <Button
                                size="sm"
                                variant={testCase.status === 'failed' ? 'destructive' : 'outline'}
                                onClick={() => updateTestStatus(suite.id, testCase.id, 'failed')}
                              >
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Fail
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTestStatus(suite.id, testCase.id, 'skipped')}
                              >
                                <Clock className="w-4 h-4 mr-1" />
                                Skip
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateTestStatus(suite.id, testCase.id, 'pending')}
                              >
                                Reset
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}