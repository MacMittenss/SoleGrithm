import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Camera, Smartphone, Zap, Target, RefreshCw } from 'lucide-react';
import { Link } from 'wouter';

export default function ARDemo() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Eye className="w-4 h-4 mr-2" />
            Augmented Reality
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            AR Try-On Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how sneakers look on your feet before you buy. Use your camera to virtually 
            try on any sneaker with real-time AR fitting technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AR Demo Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden aspect-[4/3]">
              {/* Simulated phone screen */}
              <div className="absolute inset-4 bg-black rounded-xl overflow-hidden">
                <div className="relative h-full">
                  {/* Camera view background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-gray-900/50" />
                  
                  {/* Foot tracking outline */}
                  <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      {/* Tracking box */}
                      <div className="w-48 h-24 border-2 border-green-400 rounded-lg animate-pulse">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <div className="bg-green-400 text-black text-xs px-2 py-1 rounded">
                            Tracking: 94%
                          </div>
                        </div>
                      </div>
                      
                      {/* Sneaker overlay */}
                      <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">Air Jordan 1</div>
                          <div className="text-xs text-gray-600">$170</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* UI Elements */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                      AR Active
                    </div>
                    <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                      HD Quality
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Phone frame details */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced foot detection with 94% accuracy for perfect fitting
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Mobile Optimized</h3>
                <p className="text-sm text-muted-foreground">
                  Works seamlessly on any smartphone with camera access
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Size Accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  Precise sizing recommendations based on foot measurements
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  See how sneakers look immediately with zero lag
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/ar-tryon">
                  <Eye className="w-4 h-4 mr-2" />
                  Try AR Experience
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Requires camera access • Works on mobile & desktop
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}