import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Camera, 
  Search, 
  Sparkles, 
  Eye, 
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Link } from 'wouter';
import SneakerCard from '@/components/SneakerCard';

interface AnalysisResult {
  identifiedSneaker: {
    name: string;
    brand: string;
    confidence: number;
    marketValue: string;
    description: string;
    releaseDate?: string;
    retailPrice?: string;
    currentMarketTrend?: string;
  };
  similarStyles: any[];
  colorAnalysis: {
    dominantColors: string[];
    colorScheme: string;
    seasonalFit?: string;
  };
  styleClassification: {
    category: string;
    subcategory: string;
    tags: string[];
    targetDemographic?: string[];
    versatilityScore?: number;
  };
  condition?: {
    overall: string;
    wear: string;
    authenticity: string;
    careRecommendations?: string[];
  };
  celebrityContext?: {
    detected: boolean;
    context: string;
    stylingTips?: string[];
  };
  marketInsights?: {
    investmentPotential: string;
    priceHistory: string;
    availabilityStatus: string;
    recommendedAction: string;
  };
  stylingAdvice?: {
    occasions: string[];
    outfitSuggestions: string[];
    seasonalWear: string;
    colorPairing: string[];
  };
}

export default function VisualSearch() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Image analysis mutation
  const analyzeImageMutation = useMutation({
    mutationFn: async (imageFile: File) => {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch('/api/ai/visual-search', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    }
  });

  const handleImageUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Automatically start analysis
      analyzeImageMutation.mutate(file);
    }
  }, [analyzeImageMutation]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, [handleImageUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  return (
    <div data-testid="page-visual-search">
      {/* Animated Section Header */}
      <section className="section no-bottom-padding bg-black" data-testid="visual-header-section">
          <div className="flex flex-col lg:flex-row gap-8 mb-12 px-4 md:px-8 lg:px-16 xl:px-32">
            {/* Upload Section */}
            <div className="flex-1 min-w-0 px-2 md:px-4">
              <div className="rounded-2xl bg-zinc-900 shadow-lg border border-white/10 p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Upload className="w-5 h-5 text-white" />
                    <span className="text-lg font-semibold text-white">Upload Sneaker Photo</span>
                  </div>
                  <div
                    className={`relative border border-dashed rounded-xl p-10 text-center transition-colors ${
                      dragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted-foreground/10 hover:border-primary/30'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {imagePreview ? (
                      <div className="space-y-6 bg-black rounded-2xl p-8 shadow-lg">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-72 mx-auto rounded-xl shadow border-2 border-white"
                        />
                        <div className="flex justify-center gap-3">
                          <Button
                            className="bg-zinc-900 text-white border border-white hover:bg-zinc-800"
                            size="sm"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                              setAnalysisResult(null);
                            }}
                          >
                            Remove
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                            id="file-upload-replace"
                          />
                          <Button
                            className="bg-zinc-900 text-white border border-white hover:bg-zinc-800"
                            size="sm"
                            asChild
                          >
                            <label htmlFor="file-upload-replace" className="cursor-pointer">
                              Replace
                            </label>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 bg-black rounded-2xl p-8 shadow-lg flex flex-col items-center">
                        <div className="mx-auto w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-white">
                          <Camera className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold mb-2 text-white tracking-wide">
                            Drop your sneaker photo here
                          </p>
                          <p className="text-sm text-zinc-300 mb-4">
                            JPG, PNG, WebP up to 10MB
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                            id="file-upload"
                          />
                          <Button asChild className="bg-white text-black font-semibold px-6 py-2 rounded-lg shadow hover:bg-zinc-200 transition">
                            <label htmlFor="file-upload" className="cursor-pointer">
                              Choose File
                            </label>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Analysis Progress */}
                {analyzeImageMutation.isPending && (
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-2 text-base font-medium">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing image...
                    </div>
                    <Progress value={75} className="h-2 rounded-full bg-muted" />
                  </div>
                )}
              </div>
            </div>
            {/* Pro Tips */}
            <div className="flex-1 min-w-0 px-2 md:px-4">
              <div className="rounded-2xl bg-zinc-900 shadow-lg border border-white/10 p-8 h-full flex flex-col justify-center text-center">
                <div className="flex items-center gap-2 text-2xl mb-6 justify-center">
                  <Target className="w-7 h-7 text-white" />
                  <span className="text-white font-bold">Pro Tips for Best Results</span>
                </div>
                <div className="space-y-6 text-lg">
                  <div className="flex flex-col items-center">
                    <Zap className="w-6 h-6 text-blue-400 mb-2" />
                    <div>
                      <div className="font-semibold text-white text-xl">Clear, well-lit photos work best</div>
                      <div className="text-zinc-300 text-lg">Avoid blurry or dark images</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap className="w-6 h-6 text-blue-400 mb-2" />
                    <div>
                      <div className="font-semibold text-white text-xl">Show the full sneaker profile</div>
                      <div className="text-zinc-300 text-lg">Side view captures the most details</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap className="w-6 h-6 text-blue-400 mb-2" />
                    <div>
                      <div className="font-semibold text-white text-xl">Celebrity or influencer photos work great</div>
                      <div className="text-zinc-300 text-lg">Our AI recognizes context and styling</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Results Section */}
            <div className="space-y-12">
            {analyzeImageMutation.isError && (
              <Card className="bg-zinc-900 border border-red-500 text-white mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">
                      Failed to analyze image. Please try again or ensure your image is clear and well-lit.
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {analysisResult ? (
              <Tabs defaultValue="identification" className="w-full bg-zinc-900 rounded-2xl p-4 text-white mb-8">
                <TabsList className="grid w-full grid-cols-4 bg-black rounded-xl mb-4 border border-white/10">
                  <TabsTrigger value="identification" className="text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-400">Identification</TabsTrigger>
                  <TabsTrigger value="similar" className="text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-400">Similar Styles</TabsTrigger>
                  <TabsTrigger value="analysis" className="text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-400">Analysis</TabsTrigger>
                  <TabsTrigger value="insights" className="text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-400">Market & Style</TabsTrigger>
                </TabsList>
                
                <TabsContent value="identification" className="space-y-6">
                  <Card className="bg-black border border-white/10 text-white mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Search className="w-5 h-5 text-blue-400" />
                          Identified Sneaker
                        </span>
                        <Badge className="bg-zinc-900 border border-white/20 text-blue-400">
                          {analysisResult.identifiedSneaker.confidence}% match
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {analysisResult.identifiedSneaker.name}
                        </h3>
                        <p className="text-zinc-300">
                          {analysisResult.identifiedSneaker.brand}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-zinc-900 border border-white/20 text-white">
                          Market Value: {analysisResult.identifiedSneaker.marketValue}
                        </Badge>
                        {analysisResult.identifiedSneaker.currentMarketTrend && (
                          <Badge className="bg-green-900 text-green-300 border border-green-700">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {analysisResult.identifiedSneaker.currentMarketTrend}
                          </Badge>
                        )}
                        {analysisResult.identifiedSneaker.retailPrice && (
                          <Badge className="bg-zinc-900 border border-white/20 text-white">
                            Retail: ${analysisResult.identifiedSneaker.retailPrice}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-zinc-300">
                        {analysisResult.identifiedSneaker.description}
                      </p>
                    </CardContent>
                  </Card>

                  {analysisResult.celebrityContext?.detected && (
                    <Card className="bg-black border border-white/10 text-white mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-400" />
                          Celebrity Context
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          {analysisResult.celebrityContext.context}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="similar" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Similar Styles</h3>
                    <div className="grid gap-4">
                      {analysisResult.similarStyles.map((sneaker, index) => (
                        <SneakerCard key={index} sneaker={sneaker} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  <Card className="bg-black border border-white/10 text-white mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-400" />
                          AI-Powered Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Category & Style</h4>
                        <Badge className="bg-zinc-900 border border-white/20 text-white mb-2">
                          {analysisResult.styleClassification.category} → {analysisResult.styleClassification.subcategory}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">AI Recognition Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.styleClassification.tags.map((tag, index) => (
                            <Badge key={index} className="bg-zinc-900 border border-white/20 text-white text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Versatility Score */}
                        {analysisResult.styleClassification.versatilityScore && (
                          <div className="mt-3">
                            <h4 className="font-medium mb-2">Versatility Score</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-zinc-800 rounded-full h-2">
                                <div 
                                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${analysisResult.styleClassification.versatilityScore * 10}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {analysisResult.styleClassification.versatilityScore}/10
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Colorway Analysis</h4>
                        <div className="space-y-2">
                          <Badge className="bg-zinc-900 border border-white/20 text-white">{analysisResult.colorAnalysis.colorScheme}</Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Dominant Colors:</span>
                            <div className="flex gap-1">
                              {analysisResult.colorAnalysis.dominantColors.map((color, index) => (
                                <div 
                                  key={index}
                                  className="w-5 h-5 rounded-full border-2 border-white"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  {/* Market Insights */}
                  {analysisResult.marketInsights && (
                    <Card className="bg-black border border-white/10 text-white mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-400" />
                          Market Intelligence
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-1">Investment Potential</h4>
                            <p className="text-sm text-zinc-300">{analysisResult.marketInsights.investmentPotential}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Availability</h4>
                            <p className="text-sm text-zinc-300">{analysisResult.marketInsights.availabilityStatus}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Price History</h4>
                            <p className="text-sm text-zinc-300">{analysisResult.marketInsights.priceHistory}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Recommendation</h4>
                            <p className="text-sm text-zinc-300">{analysisResult.marketInsights.recommendedAction}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Styling Advice */}
                  {analysisResult.stylingAdvice && (
                    <Card className="bg-black border border-white/10 text-white mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-400" />
                          Style Guide
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Perfect Occasions</h4>
                          <div className="flex flex-wrap gap-1">
                            {analysisResult.stylingAdvice.occasions.map((occasion, index) => (
                              <Badge key={index} className="bg-zinc-900 border border-white/20 text-white text-xs">
                                {occasion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Outfit Suggestions</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {analysisResult.stylingAdvice.outfitSuggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Color Pairing</h4>
                          <div className="flex flex-wrap gap-1">
                            {analysisResult.stylingAdvice.colorPairing.map((color, index) => (
                              <Badge key={index} className="bg-zinc-900 border border-white/20 text-white text-xs">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">Seasonal Wear</h4>
                          <p className="text-sm text-zinc-300">{analysisResult.stylingAdvice.seasonalWear}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Condition Assessment */}
                  {analysisResult.condition && (
                    <Card className="bg-black border border-white/10 text-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                          Condition Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-white">Overall</div>
                            <div className="text-zinc-300">{analysisResult.condition.overall}</div>
                          </div>
                          <div>
                            <div className="font-medium text-white">Wear Pattern</div>
                            <div className="text-zinc-300">{analysisResult.condition.wear}</div>
                          </div>
                          <div>
                            <div className="font-medium text-white">Authenticity</div>
                            <div className="text-zinc-300">{analysisResult.condition.authenticity}</div>
                          </div>
                        </div>
                        
                        {analysisResult.condition.careRecommendations && (
                          <div>
                            <h4 className="font-medium mb-2 text-white">Care Recommendations</h4>
                            <ul className="text-sm text-zinc-300 space-y-1">
                              {analysisResult.condition.careRecommendations.map((recommendation, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  {recommendation}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            ) : !analyzeImageMutation.isPending && !analyzeImageMutation.isError && (
              <div className="rounded-2xl bg-zinc-900 shadow-lg border border-white/10 p-12 text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-900/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Ready for AI Analysis</h3>
                <p className="text-zinc-300 mb-4">
                  Upload a sneaker image to experience real-time OpenAI Vision identification
                </p>
                <div className="flex justify-center">
                  <Badge className="bg-black border border-white/20 text-blue-400 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Powered by GPT-4o Vision API
                  </Badge>
                </div>
              </div>
            )}

            {analyzeImageMutation.error && (
              <Card className="bg-zinc-900 border border-red-500 text-white mb-8">
                <CardContent className="py-6">
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Analysis failed</span>
                  </div>
                  <p className="text-sm text-zinc-300 mt-1">
                    Please try again with a different image or check your connection.
                  </p>
                </CardContent>
              </Card>
            )}
        </div>
      </section>
    </div>
  );
}