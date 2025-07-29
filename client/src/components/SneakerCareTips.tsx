import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Shield, 
  Droplets, 
  Home, 
  AlertTriangle,
  Loader2,
  RefreshCw
} from "lucide-react";

interface SneakerCareTipsProps {
  sneaker: {
    id: number;
    name: string;
    materials: string;
    colorway: string;
    brandName?: string;
  };
}

interface CareTips {
  generalTips: string[];
  materialSpecific: string[];
  cleaningSteps: string[];
  storageAdvice: string[];
  warnings: string[];
}

export default function SneakerCareTips({ sneaker }: SneakerCareTipsProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: careTips, isLoading, error } = useQuery({
    queryKey: ['/api/ai/care-tips', sneaker.id, refreshKey],
    queryFn: async () => {
      const response = await fetch(`/api/ai/care-tips/${sneaker.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sneaker.name,
          materials: sneaker.materials,
          colorway: sneaker.colorway,
          brand: sneaker.brandName || 'Unknown'
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate care tips');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-600" />
            Care & Maintenance Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Unable to generate care tips at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Care & Maintenance Tips
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Generated
            </Badge>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Personalized care instructions for your {sneaker.name}
        </p>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : careTips ? (
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                General
              </TabsTrigger>
              <TabsTrigger value="materials" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Materials
              </TabsTrigger>
              <TabsTrigger value="cleaning" className="text-xs">
                <Droplets className="h-3 w-3 mr-1" />
                Cleaning
              </TabsTrigger>
              <TabsTrigger value="storage" className="text-xs">
                <Home className="h-3 w-3 mr-1" />
                Storage
              </TabsTrigger>
              <TabsTrigger value="warnings" className="text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Warnings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">General Maintenance</h4>
                <ul className="space-y-2">
                  {careTips.generalTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Material-Specific Care</h4>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg mb-3">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Materials:</strong> {sneaker.materials}
                  </p>
                </div>
                <ul className="space-y-2">
                  {careTips.materialSpecific.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="cleaning" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Step-by-Step Cleaning</h4>
                <ol className="space-y-3">
                  {careTips.cleaningSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="storage" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Storage Recommendations</h4>
                <ul className="space-y-2">
                  {careTips.storageAdvice.map((advice, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="warnings" className="mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Important Warnings</h4>
                <ul className="space-y-2">
                  {careTips.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        ) : null}
      </CardContent>
    </Card>
  );
}