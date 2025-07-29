import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, TrendingUp, Users, DollarSign } from 'lucide-react';

interface GeographicTrend {
  id: number;
  city: string;
  state: string;
  coordinates: [number, number]; // [longitude, latitude]
  sneakerId: number;
  sneakerName: string;
  brand: string;
  trendScore: number;
  priceChange: number;
  searchVolume: number;
  popularityRank: number;
  imageUrl: string;
}

interface MapRegion {
  name: string;
  coordinates: [number, number];
  trends: GeographicTrend[];
  totalActivity: number;
}

const SneakerMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'heatmap' | 'trends' | 'prices'>('trends');
  const [mapData, setMapData] = useState<MapRegion[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - in real app this would come from API
  const mockRegions: MapRegion[] = [
    {
      name: "New York City",
      coordinates: [-74.006, 40.7128],
      totalActivity: 89,
      trends: [
        {
          id: 1,
          city: "New York",
          state: "NY",
          coordinates: [-74.006, 40.7128],
          sneakerId: 1,
          sneakerName: "Nike Dunk Low",
          brand: "Nike",
          trendScore: 95,
          priceChange: 12.5,
          searchVolume: 15420,
          popularityRank: 1,
          imageUrl: "/api/placeholder/400/300"
        },
        {
          id: 2,
          city: "New York",
          state: "NY",
          coordinates: [-74.006, 40.7128],
          sneakerId: 2,
          sneakerName: "Jordan 1 High",
          brand: "Nike",
          trendScore: 87,
          priceChange: 8.2,
          searchVolume: 12350,
          popularityRank: 2,
          imageUrl: "/api/placeholder/400/300"
        }
      ]
    },
    {
      name: "Atlanta",
      coordinates: [-84.388, 33.7490],
      totalActivity: 76,
      trends: [
        {
          id: 3,
          city: "Atlanta",
          state: "GA",
          coordinates: [-84.388, 33.7490],
          sneakerId: 3,
          sneakerName: "Adidas Yeezy 350",
          brand: "Adidas",
          trendScore: 92,
          priceChange: 15.8,
          searchVolume: 18750,
          popularityRank: 1,
          imageUrl: "/api/placeholder/400/300"
        }
      ]
    },
    {
      name: "Los Angeles",
      coordinates: [-118.2437, 34.0522],
      totalActivity: 82,
      trends: [
        {
          id: 4,
          city: "Los Angeles",
          state: "CA",
          coordinates: [-118.2437, 34.0522],
          sneakerId: 4,
          sneakerName: "Travis Scott Jordan 1",
          brand: "Nike",
          trendScore: 98,
          priceChange: 22.1,
          searchVolume: 21500,
          popularityRank: 1,
          imageUrl: "/api/placeholder/400/300"
        }
      ]
    },
    {
      name: "Chicago",
      coordinates: [-87.6298, 41.8781],
      totalActivity: 71,
      trends: [
        {
          id: 5,
          city: "Chicago",
          state: "IL",
          coordinates: [-87.6298, 41.8781],
          sneakerId: 5,
          sneakerName: "Jordan 1 Chicago",
          brand: "Nike",
          trendScore: 89,
          priceChange: 5.7,
          searchVolume: 9800,
          popularityRank: 1,
          imageUrl: "/api/placeholder/400/300"
        }
      ]
    },
    {
      name: "Miami",
      coordinates: [-80.1918, 25.7617],
      totalActivity: 65,
      trends: [
        {
          id: 6,
          city: "Miami",
          state: "FL",
          coordinates: [-80.1918, 25.7617],
          sneakerId: 6,
          sneakerName: "Off-White x Nike",
          brand: "Nike",
          trendScore: 85,
          priceChange: 18.3,
          searchVolume: 14200,
          popularityRank: 1,
          imageUrl: "/api/placeholder/400/300"
        }
      ]
    }
  ];

  useEffect(() => {
    // For now, load mock data - in future could connect to real API
    const loadMapData = async () => {
      try {
        // You could fetch from /api/geographic-trends/mock here
        // const response = await fetch('/api/geographic-trends/mock');
        // const trends = await response.json();
        
        // For demonstration, using mock data
        setMapData(mockRegions);
        setLoading(false);
      } catch (error) {
        console.error('Error loading map data:', error);
        setMapData(mockRegions);
        setLoading(false);
      }
    };

    loadMapData();
  }, []);

  const getHeatmapColor = (activity: number): string => {
    if (activity >= 80) return 'bg-red-500';
    if (activity >= 60) return 'bg-orange-500';
    if (activity >= 40) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getTrendIcon = (change: number) => {
    if (change > 10) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
  };

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading sneaker trends map...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Interactive Map */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Sneaker Discovery Map
              </CardTitle>
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="heatmap">Heat</TabsTrigger>
                  <TabsTrigger value="prices">Prices</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {/* SVG Map of US */}
            <div className="relative w-full h-96 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                {/* US Map Outline (simplified) */}
                <path
                  d="M150 150 L850 150 L850 450 L150 450 Z"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                
                {/* Interactive City Points */}
                {mapData.map((region, index) => {
                  const x = ((region.coordinates[0] + 125) / 70) * 700 + 150;
                  const y = ((50 - region.coordinates[1]) / 25) * 300 + 150;
                  
                  return (
                    <g key={region.name}>
                      {/* City Pulse Animation */}
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill={getHeatmapColor(region.totalActivity)}
                        opacity="0.3"
                        className="animate-ping"
                      />
                      
                      {/* Main City Point */}
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill={getHeatmapColor(region.totalActivity)}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-16 transition-all duration-300"
                        onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                      />
                      
                      {/* Activity Score */}
                      <text
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        className="fill-white text-xs font-bold pointer-events-none"
                      >
                        {region.totalActivity}
                      </text>
                      
                      {/* City Label */}
                      <text
                        x={x}
                        y={y - 20}
                        textAnchor="middle"
                        className="fill-white text-sm font-semibold pointer-events-none"
                      >
                        {region.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                <div className="text-sm font-semibold mb-2">Activity Level</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Hot (80+)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Warm (60+)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Cool (40+)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Cold (0+)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Region Details */}
        <Card className="lg:w-80">
          <CardHeader>
            <CardTitle>
              {selectedRegion ? `${selectedRegion} Trends` : 'Select a City'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRegion ? (
              <div className="space-y-4">
                {mapData
                  .find(r => r.name === selectedRegion)
                  ?.trends.map((trend) => (
                    <div key={trend.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{trend.sneakerName}</div>
                        <Badge variant="secondary">#{trend.popularityRank}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{trend.brand}</span>
                        {getTrendIcon(trend.priceChange)}
                        <span className={trend.priceChange > 0 ? 'text-green-600' : 'text-red-600'}>
                          {trend.priceChange > 0 ? '+' : ''}{trend.priceChange}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{trend.searchVolume.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{trend.trendScore}/100</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Click on a city to see trending sneakers in that area</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Global Trends Summary */}
      <Card>
        <CardHeader>
          <CardTitle>National Trend Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mapData.slice(0, 4).map((region) => {
              const topTrend = region.trends[0];
              return (
                <div key={region.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{region.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${getHeatmapColor(region.totalActivity)}`}></div>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Trending: {topTrend.sneakerName}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span>Activity: {region.totalActivity}</span>
                    <span className={topTrend.priceChange > 0 ? 'text-green-600' : 'text-red-600'}>
                      {topTrend.priceChange > 0 ? '+' : ''}{topTrend.priceChange}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SneakerMap;