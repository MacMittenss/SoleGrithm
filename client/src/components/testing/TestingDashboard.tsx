import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  BarChart3,
  Zap,
  Shield,
  Monitor,
  Target,
  TrendingUp
} from 'lucide-react';

export default function TestingDashboard() {
  const testingMetrics = {
    totalTests: 135,
    passedTests: 127,
    failedTests: 3,
    skippedTests: 5,
    coverage: 87.3,
    performance: 'Good',
    accessibility: 'Compliant',
    lastRun: '2 hours ago'
  };

  const testCategories = [
    {
      name: 'Component Tests',
      count: 45,
      passed: 43,
      failed: 1,
      status: 'warning',
      icon: Activity
    },
    {
      name: 'Integration Tests',
      count: 18,
      passed: 18,
      failed: 0,
      status: 'success',
      icon: BarChart3
    },
    {
      name: 'E2E Tests',
      count: 12,
      passed: 11,
      failed: 1,
      status: 'warning',
      icon: Monitor
    },
    {
      name: 'Accessibility Tests',
      count: 25,
      passed: 24,
      failed: 1,
      status: 'warning',
      icon: Shield
    },
    {
      name: 'Performance Tests',
      count: 20,
      passed: 20,
      failed: 0,
      status: 'success',
      icon: Zap
    },
    {
      name: 'Responsive Tests',
      count: 15,
      passed: 11,
      failed: 0,
      status: 'success',
      icon: Target
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testingMetrics.totalTests}</div>
            <p className="text-xs text-muted-foreground">
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Coverage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testingMetrics.coverage}%</div>
            <Progress value={testingMetrics.coverage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed Tests</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{testingMetrics.passedTests}</div>
            <p className="text-xs text-muted-foreground">
              94% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Tests</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{testingMetrics.failedTests}</div>
            <p className="text-xs text-muted-foreground">
              -2 from last run
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Test Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Test Suite Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testCategories.map((category) => {
              const IconComponent = category.icon;
              const successRate = Math.round((category.passed / category.count) * 100);
              
              return (
                <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {category.passed}/{category.count} tests passing
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">{successRate}%</div>
                      <Progress value={successRate} className="w-16 h-2" />
                    </div>
                    {getStatusIcon(category.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quality Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>WCAG 2.1 AA</span>
                <Badge variant="outline" className="text-green-600">Compliant</Badge>
              </div>
              <div className="flex justify-between">
                <span>Color Contrast</span>
                <Badge variant="outline" className="text-green-600">4.5:1</Badge>
              </div>
              <div className="flex justify-between">
                <span>Keyboard Navigation</span>
                <Badge variant="outline" className="text-green-600">Pass</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Page Load</span>
                <Badge variant="outline" className="text-green-600">2.1s</Badge>
              </div>
              <div className="flex justify-between">
                <span>First Paint</span>
                <Badge variant="outline" className="text-green-600">1.2s</Badge>
              </div>
              <div className="flex justify-between">
                <span>Memory Usage</span>
                <Badge variant="outline" className="text-yellow-600">45MB</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quality Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>This Week</span>
                <Badge variant="outline" className="text-green-600">+5%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Test Stability</span>
                <Badge variant="outline" className="text-green-600">98%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Bug Detection</span>
                <Badge variant="outline" className="text-blue-600">Early</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              Run All Tests
            </Button>
            <Button variant="outline">
              Generate Coverage Report
            </Button>
            <Button variant="outline">
              Export Test Results
            </Button>
            <Button variant="outline">
              Performance Audit
            </Button>
            <Button variant="outline">
              Accessibility Scan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}