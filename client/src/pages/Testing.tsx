import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TestTube, 
  Play, 
  FileText, 
  BarChart3, 
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import ManualTestSuite from '@/tests/manual/ManualTestSuite';
import AutomatedTestRunner from '@/tests/automated/AutomatedTestRunner';
import TestingDashboard from '@/components/testing/TestingDashboard';

export default function Testing() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const testingStats = {
    totalTests: 135,
    automatedTests: 135,
    manualTests: 78,
    coverage: 87.3,
    lastRun: new Date().toISOString(),
    status: 'passing'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8"
      data-testid="page-testing"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <TestTube className="h-10 w-10 text-blue-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SoleGrithm Testing Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive testing suite for quality assurance, performance validation, and accessibility compliance
          </p>
          
          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{testingStats.totalTests}</div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{testingStats.coverage}%</div>
              <div className="text-sm text-muted-foreground">Coverage</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <span className="text-2xl font-bold text-green-600">Passing</span>
              </div>
              <div className="text-sm text-muted-foreground">Test Status</div>
            </div>
          </div>
        </motion.div>

        {/* Testing Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="automated" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Automated
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Manual
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <TestingDashboard />
          </TabsContent>

          <TabsContent value="automated" className="space-y-6">
            <AutomatedTestRunner />
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <ManualTestSuite />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Test Reports */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Coverage Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Components</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hooks</span>
                      <span className="font-semibold">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utils</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pages</span>
                      <span className="font-semibold">81%</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Performance Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Page Load</span>
                      <Badge variant="outline" className="text-green-600">2.1s</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>First Paint</span>
                      <Badge variant="outline" className="text-green-600">1.2s</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Largest Paint</span>
                      <Badge variant="outline" className="text-green-600">2.8s</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Usage</span>
                      <Badge variant="outline" className="text-yellow-600">45MB</Badge>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Accessibility Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>WCAG 2.1 AA</span>
                      <Badge variant="outline" className="text-green-600">Compliant</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Color Contrast</span>
                      <Badge variant="outline" className="text-green-600">Pass</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Keyboard Nav</span>
                      <Badge variant="outline" className="text-green-600">Pass</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Screen Reader</span>
                      <Badge variant="outline" className="text-green-600">Pass</Badge>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Test Runs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Test Runs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 1, type: 'Full Suite', status: 'passed', time: '2 hours ago', duration: '12m 34s' },
                    { id: 2, type: 'Component Tests', status: 'passed', time: '4 hours ago', duration: '3m 21s' },
                    { id: 3, type: 'E2E Tests', status: 'failed', time: '6 hours ago', duration: '8m 45s' },
                    { id: 4, type: 'Performance Tests', status: 'passed', time: '8 hours ago', duration: '5m 12s' },
                    { id: 5, type: 'Accessibility Tests', status: 'passed', time: '1 day ago', duration: '2m 18s' }
                  ].map((run) => (
                    <div key={run.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {run.status === 'passed' ? 
                          <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        }
                        <div>
                          <div className="font-medium">{run.type}</div>
                          <div className="text-sm text-muted-foreground">{run.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={run.status === 'passed' ? 'outline' : 'destructive'}>
                          {run.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{run.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}