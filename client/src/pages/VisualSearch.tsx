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
  };
  similarStyles: any[];
  colorAnalysis: {
    dominantColors: string[];
    colorScheme: string;
  };
  styleClassification: {
    category: string;
    subcategory: string;
    tags: string[];
  };
  celebrityContext?: {
    detected: boolean;
    context: string;
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
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Eye className="w-4 h-4 mr-2" />
            AI Visual Recognition
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Visual Sneaker Search
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload any sneaker photo and let our AI identify the exact model, suggest similar styles, 
            and provide market insights. Perfect for finding that pair you spotted on social media.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Sneaker Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
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
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <label htmlFor="file-upload-replace">
                            Replace
                          </label>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-medium mb-2">
                          Drop your sneaker photo here
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Support for JPG, PNG, WebP up to 10MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button asChild>
                          <label htmlFor="file-upload">
                            Choose File
                          </label>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis Progress */}
                {analyzeImageMutation.isPending && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing image...
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Image processing
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Brand detection
                      </div>
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Style analysis
                      </div>
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Finding matches
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pro Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5" />
                  Pro Tips for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Clear, well-lit photos work best</div>
                      <div className="text-muted-foreground">Avoid blurry or dark images</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Show the full sneaker profile</div>
                      <div className="text-muted-foreground">Side view captures the most details</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Celebrity or influencer photos work great</div>
                      <div className="text-muted-foreground">Our AI recognizes context and styling</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analyzeImageMutation.isError && (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">
                      Failed to analyze image. Please try again or ensure your image is clear and well-lit.
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {analysisResult ? (
              <Tabs defaultValue="identification" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="identification">Identification</TabsTrigger>
                  <TabsTrigger value="similar">Similar Styles</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="identification" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Search className="w-5 h-5" />
                          Identified Sneaker
                        </span>
                        <Badge variant="secondary">
                          {analysisResult.identifiedSneaker.confidence}% match
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          {analysisResult.identifiedSneaker.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {analysisResult.identifiedSneaker.brand}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">
                          Market Value: {analysisResult.identifiedSneaker.marketValue}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          In Demand
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {analysisResult.identifiedSneaker.description}
                      </p>
                    </CardContent>
                  </Card>

                  {analysisResult.celebrityContext?.detected && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        AI-Powered Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Category & Style</h4>
                        <Badge variant="outline" className="mb-2">
                          {analysisResult.styleClassification.category} → {analysisResult.styleClassification.subcategory}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">AI Recognition Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.styleClassification.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Colorway Analysis</h4>
                        <div className="space-y-2">
                          <Badge variant="outline">{analysisResult.colorAnalysis.colorScheme}</Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Dominant Colors:</span>
                            <div className="flex gap-1">
                              {analysisResult.colorAnalysis.dominantColors.map((color, index) => (
                                <div 
                                  key={index}
                                  className="w-5 h-5 rounded-full border-2 border-muted"
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
              </Tabs>
            ) : !analyzeImageMutation.isPending && !analyzeImageMutation.isError && (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready for AI Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload a sneaker image to experience real-time OpenAI Vision identification
                  </p>
                  <div className="flex justify-center">
                    <Badge variant="outline" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Powered by GPT-4o Vision API
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {analyzeImageMutation.error && (
              <Card>
                <CardContent className="py-6">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Analysis failed</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please try again with a different image or check your connection.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}