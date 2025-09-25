// Mock data for development/demo
const mockRegions: MapRegion[] = [
  {
    name: 'New York',
    coordinates: [-74.006, 40.7128],
    totalActivity: 90,
    trends: [
      {
        id: 1,
        city: 'New York',
        state: 'NY',
        coordinates: [-74.006, 40.7128],
        sneakerId: 101,
        sneakerName: 'Air Jordan 1',
        brand: 'Nike',
        trendScore: 95,
        priceChange: 5,
        searchVolume: 1000,
        popularityRank: 1,
        imageUrl: ''
      }
    ]
  },
  {
    name: 'Los Angeles',
    coordinates: [-118.2437, 34.0522],
    totalActivity: 70,
    trends: [
      {
        id: 2,
        city: 'Los Angeles',
        state: 'CA',
        coordinates: [-118.2437, 34.0522],
        sneakerId: 102,
        sneakerName: 'Yeezy Boost 350',
        brand: 'Adidas',
        trendScore: 80,
        priceChange: 3,
        searchVolume: 800,
        popularityRank: 2,
        imageUrl: ''
      }
    ]
  }
];
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

  // Fetch live sneaker data from backend API
  async function fetchMapData() {
    setLoading(true);
    try {
      const response = await fetch('/api/sneaker-map');
      const data = await response.json();
      setMapData(data);
    } catch (error) {
      console.error('Error loading sneaker map data:', error);
      setMapData([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMapData();
  }, []);

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
              <div className="relative w-full h-96 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden" style={{ background: '#181818', color: '#fff' }}>
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
              <div className="absolute bottom-4 left-4" style={{ background: '#181818', color: '#fff', borderRadius: '12px', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
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
                    <div key={trend.id} style={{ border: '1px solid #222', borderRadius: '12px', padding: '12px', background: '#181818', color: '#fff', marginBottom: '1rem' }}>
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
              <div className="text-center" style={{ color: '#ccc', padding: '2rem 0' }}>
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
                <div key={region.name} style={{ border: '1px solid #222', borderRadius: '12px', padding: '16px', background: '#181818', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', marginBottom: '1rem' }}>
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