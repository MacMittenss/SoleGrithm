import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calendar, DollarSign, Users, Flame, Clock, Star, BarChart3 } from "lucide-react";
import SneakerCard from "@/components/SneakerCard";
import { useAI } from "@/hooks/useAI";

interface TrendingItem {
  id: number;
  name: string;
  brand: string;
  currentPrice: number;
  priceChange: number;
  image: string;
  popularity: number;
}

interface UpcomingRelease {
  id: number;
  name: string;
  brand: string;
  releaseDate: string;
  retailPrice: number;
  image: string;
  hypeLevel: 'low' | 'medium' | 'high';
}

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const { getRecommendations, isLoading: aiLoading } = useAI();

  // Mock data - in production this would come from real APIs
  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ['/api/discover/trending'],
    queryFn: async () => {
      // This would fetch from real market data APIs
      const mockTrending: TrendingItem[] = [
        {
          id: 1,
          name: "Air Jordan 1 'Chicago'",
          brand: "Nike",
          currentPrice: 2499,
          priceChange: 12.5,
          image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          popularity: 95
        },
        {
          id: 2,
          name: "Yeezy Boost 350 V2 'Zebra'",
          brand: "Adidas",
          currentPrice: 325,
          priceChange: -8.2,
          image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          popularity: 88
        }
      ];
      return mockTrending;
    }
  });

  const { data: upcomingData, isLoading: upcomingLoading } = useQuery({
    queryKey: ['/api/discover/upcoming'],
    queryFn: async () => {
      // This would fetch from release calendar APIs
      const mockUpcoming: UpcomingRelease[] = [
        {
          id: 1,
          name: "Air Jordan 4 'White Cement' 2025",
          brand: "Nike",
          releaseDate: "2025-02-15",
          retailPrice: 200,
          image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          hypeLevel: 'high'
        },
        {
          id: 2,
          name: "New Balance 990v6 'Grey'",
          brand: "New Balance",
          releaseDate: "2025-01-28",
          retailPrice: 199,
          image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          hypeLevel: 'medium'
        }
      ];
      return mockUpcoming;
    }
  });

  const { data: aiRecommendations } = useQuery({
    queryKey: ['/api/ai/recommendations', 'discover'],
    queryFn: async () => {
      return getRecommendations({
        brands: ['Nike', 'Adidas', 'New Balance'],
        styles: ['retro', 'modern'],
        priceRange: '$100-500'
      });
    }
  });

  const marketMetrics = {
    totalVolume: "$2.3B",
    avgPrice: "$247",
    topGainer: "+23.4%",
    activeListings: "1.2M"
  };

  const getHypeBadgeColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Discover
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of the market with trending sneakers, upcoming releases, and personalized recommendations
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{marketMetrics.totalVolume}</div>
              <div className="text-sm text-muted-foreground">Market Volume</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{marketMetrics.avgPrice}</div>
              <div className="text-sm text-muted-foreground">Average Price</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{marketMetrics.topGainer}</div>
              <div className="text-sm text-muted-foreground">Top Gainer</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{marketMetrics.activeListings}</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trending" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending">Trending Now</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Releases</TabsTrigger>
            <TabsTrigger value="recommendations">AI Picks</TabsTrigger>
            <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trending Sneakers</h2>
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-sm text-muted-foreground">Updated every hour</span>
              </div>
            </div>

            {trendingLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted rounded-2xl h-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-6 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {trendingData?.map((item, index) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0">
                          <div className="text-2xl font-bold text-muted-foreground">
                            #{index + 1}
                          </div>
                        </div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge variant="secondary" className="mb-2">
                                {item.brand}
                              </Badge>
                              <h3 className="text-lg font-semibold">{item.name}</h3>
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="text-2xl font-bold">${item.currentPrice}</div>
                                <div className={`flex items-center space-x-1 ${
                                  item.priceChange > 0 ? 'text-green-500' : 'text-red-500'
                                }`}>
                                  <TrendingUp className="h-4 w-4" />
                                  <span className="font-medium">
                                    {item.priceChange > 0 ? '+' : ''}{item.priceChange}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground mb-1">Popularity</div>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${item.popularity}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{item.popularity}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Releases</h2>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Next 30 days</span>
              </div>
            </div>

            {upcomingLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted rounded-2xl h-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-6 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingData?.map((release) => (
                  <Card key={release.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={release.image}
                        alt={release.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={getHypeBadgeColor(release.hypeLevel)}>
                          {release.hypeLevel} hype
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        {release.brand}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2">{release.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Release Date</div>
                          <div className="font-semibold">
                            {new Date(release.releaseDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Retail Price</div>
                          <div className="text-lg font-bold">${release.retailPrice}</div>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        <Clock className="h-4 w-4 mr-2" />
                        Set Reminder
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">AI Recommendations</h2>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Personalized for you</span>
              </div>
            </div>

            {aiLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted rounded-2xl h-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-6 bg-muted rounded w-full"></div>
                      <div className="h-16 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : aiRecommendations?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiRecommendations.map((rec: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {rec.brand}
                          </Badge>
                          <h3 className="text-lg font-semibold">{rec.name}</h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            {rec.reason}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground">Price Range</div>
                            <div className="font-semibold">{rec.priceRange}</div>
                          </div>
                          <Badge variant="outline">{rec.category}</Badge>
                        </div>
                        <Button className="w-full">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Building Your Profile</h3>
                  <p className="text-muted-foreground mb-4">
                    Add some sneakers to your collection to get personalized recommendations
                  </p>
                  <Button>Browse Catalog</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Market Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Brands</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { brand: 'Nike', growth: '+18.5%', volume: '$1.2B' },
                      { brand: 'Adidas', growth: '+12.3%', volume: '$680M' },
                      { brand: 'New Balance', growth: '+25.1%', volume: '$340M' },
                      { brand: 'Asics', growth: '+8.7%', volume: '$180M' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{item.brand}</div>
                          <div className="text-sm text-muted-foreground">{item.volume}</div>
                        </div>
                        <div className="text-green-500 font-medium">
                          {item.growth}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { range: '$0-100', percentage: 35, count: '12.5K' },
                      { range: '$100-300', percentage: 45, count: '18.2K' },
                      { range: '$300-500', percentage: 15, count: '6.1K' },
                      { range: '$500+', percentage: 5, count: '2.3K' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.range}</span>
                          <span>{item.count} listings</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
