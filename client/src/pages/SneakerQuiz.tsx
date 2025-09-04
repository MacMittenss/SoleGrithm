import React, { useState } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Heart,
  Star,
  Zap,
  User,
  Palette,
  MapPin,
  Calendar,
  DollarSign,
  Shuffle
} from "lucide-react";
import SneakerCard from "@/components/SneakerCard";

interface QuizQuestion {
  id: string;
  question: string;
  category: 'personality' | 'lifestyle' | 'style' | 'budget' | 'occasion';
  options: {
    value: string;
    label: string;
    personality: string[];
    icon?: React.ReactNode;
  }[];
}

interface QuizResult {
  personalityType: string;
  styleProfile: string;
  recommendations: any[];
  confidence: number;
  personalityDescription: string;
  styleStory: string;
  brandRecommendations?: string[];
  matchingExplanation?: string;
  aiEnhanced?: boolean;
  matchingAlgorithm?: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'personality',
    question: 'Which describes your personality best?',
    category: 'personality',
    options: [
      { 
        value: 'trendsetter', 
        label: 'Trendsetter - I love being first to discover new styles',
        personality: ['innovative', 'bold', 'confident'],
        icon: <Zap className="w-4 h-4" />
      },
      { 
        value: 'classic', 
        label: 'Classic - I prefer timeless, reliable choices',
        personality: ['traditional', 'reliable', 'refined'],
        icon: <Star className="w-4 h-4" />
      },
      { 
        value: 'creative', 
        label: 'Creative - I express myself through unique combinations',
        personality: ['artistic', 'expressive', 'original'],
        icon: <Palette className="w-4 h-4" />
      },
      { 
        value: 'minimalist', 
        label: 'Minimalist - Less is more, I value simplicity',
        personality: ['simple', 'clean', 'functional'],
        icon: <User className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'lifestyle',
    question: 'What best describes your lifestyle?',
    category: 'lifestyle',
    options: [
      { 
        value: 'active', 
        label: 'Active - Always on the move, gym to street',
        personality: ['energetic', 'sporty', 'dynamic']
      },
      { 
        value: 'professional', 
        label: 'Professional - Business meetings and networking',
        personality: ['sophisticated', 'polished', 'versatile']
      },
      { 
        value: 'social', 
        label: 'Social - Parties, events, and hanging out',
        personality: ['outgoing', 'trendy', 'social']
      },
      { 
        value: 'casual', 
        label: 'Casual - Comfort is key in daily life',
        personality: ['relaxed', 'comfortable', 'practical']
      }
    ]
  },
  {
    id: 'style-preference',
    question: 'Which style resonates with you most?',
    category: 'style',
    options: [
      { 
        value: 'streetwear', 
        label: 'Streetwear - Bold graphics and urban culture',
        personality: ['urban', 'edgy', 'contemporary']
      },
      { 
        value: 'athletic', 
        label: 'Athletic - Performance meets style',
        personality: ['sporty', 'functional', 'modern']
      },
      { 
        value: 'luxury', 
        label: 'Luxury - Premium materials and craftsmanship',
        personality: ['refined', 'exclusive', 'quality-focused']
      },
      { 
        value: 'vintage', 
        label: 'Vintage - Retro vibes and nostalgic appeal',
        personality: ['nostalgic', 'authentic', 'timeless']
      }
    ]
  },
  {
    id: 'occasion',
    question: 'When do you wear sneakers most?',
    category: 'occasion',
    options: [
      { 
        value: 'everyday', 
        label: 'Everyday wear - My go-to for most activities',
        personality: ['versatile', 'practical', 'reliable']
      },
      { 
        value: 'special', 
        label: 'Special occasions - When I want to make a statement',
        personality: ['bold', 'attention-grabbing', 'unique']
      },
      { 
        value: 'workout', 
        label: 'Workouts - Performance and comfort first',
        personality: ['functional', 'athletic', 'performance-focused']
      },
      { 
        value: 'fashion', 
        label: 'Fashion moments - Complete my outfit perfectly',
        personality: ['stylish', 'coordinated', 'fashion-forward']
      }
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your sneaker budget range?',
    category: 'budget',
    options: [
      { 
        value: 'budget', 
        label: 'Under $150 - Great value for money',
        personality: ['practical', 'value-conscious', 'smart']
      },
      { 
        value: 'mid-range', 
        label: '$150-300 - Quality with reasonable price',
        personality: ['balanced', 'quality-focused', 'reasonable']
      },
      { 
        value: 'premium', 
        label: '$300-500 - Investment in quality',
        personality: ['quality-focused', 'discerning', 'investment-minded']
      },
      { 
        value: 'luxury', 
        label: '$500+ - Only the finest will do',
        personality: ['luxury-focused', 'exclusive', 'premium']
      }
    ]
  }
];

export default function SneakerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Submit quiz for AI analysis
  const quizMutation = useMutation({
    mutationFn: async (quizData: any) => {
      const response = await fetch('/api/ai/sneaker-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
      });
      if (!response.ok) throw new Error('Failed to analyze quiz');
      return response.json();
    },
    onSuccess: () => {
      setShowResults(true);
      setIsSubmitting(false);
    }
  });

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [quizQuestions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Submit quiz
      setIsSubmitting(true);
      const selectedOptions = quizQuestions.map(q => 
        q.options.find(opt => opt.value === newAnswers[q.id])
      ).filter(Boolean);

      const personalityTraits = selectedOptions.flatMap(opt => opt?.personality || []);
      
      quizMutation.mutate({
        answers: newAnswers,
        personalityTraits,
        preferences: {
          style: newAnswers['style-preference'],
          lifestyle: newAnswers.lifestyle,
          budget: newAnswers.budget,
          occasion: newAnswers.occasion,
          personality: newAnswers.personality
        }
      });
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setIsSubmitting(false);
    quizMutation.reset();
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">AI Personality Analysis in Progress...</h2>
            <p className="text-muted-foreground mb-4">
              OpenAI GPT-4o is analyzing your responses to create a comprehensive personality profile
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Analyzing personality traits</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                <span>Matching with brand preferences</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                <span>Generating personalized recommendations</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full animate-pulse transition-all duration-1000" 
              style={{ width: '85%' }} 
            />
          </div>
          <Badge variant="outline" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by AI Personality Analysis
          </Badge>
        </div>
      </div>
    );
  }

  if (showResults && quizMutation.data) {
    const result = quizMutation.data as QuizResult;
    
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4" />
              Quiz Complete
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Sneaker DNA</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on your responses, we've identified your perfect sneaker matches
            </p>
          </div>

          {/* Personality Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Your Style Personality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {result.personalityType}
                  </h3>
                  <p className="text-muted-foreground">
                    {result.personalityDescription}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">
                    {result.confidence}% personality match confidence
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Your Style Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {result.styleStory}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Enhanced Insights */}
          {(result.brandRecommendations && result.brandRecommendations.length > 0) && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI-Powered Brand Insights
                </CardTitle>
                {result.aiEnhanced && (
                  <Badge variant="outline" className="w-fit">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Enhanced by OpenAI GPT-4o
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Recommended Brands for Your Personality</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.brandRecommendations.map((brand, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-2 text-sm">
                        {brand}
                      </Badge>
                    ))}
                  </div>
                </div>
                {result.matchingExplanation && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      "{result.matchingExplanation}"
                    </p>
                  </div>
                )}
                {result.matchingAlgorithm && (
                  <div className="text-xs text-muted-foreground">
                    Powered by {result.matchingAlgorithm}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Your Perfect Matches</h2>
              <p className="text-muted-foreground mb-2">
                These sneakers were chosen specifically for your personality and style
              </p>
              {result.aiEnhanced && (
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Enhanced Matching
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.recommendations.map((sneaker: any, index: number) => (
                <div key={sneaker.id} className="relative">
                  <SneakerCard 
                    sneaker={{
                      id: sneaker.id,
                      name: sneaker.name,
                      brand: sneaker.brandName || 'Brand',
                      price: new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(sneaker.retailPrice),
                      imageUrl: sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                      slug: sneaker.slug,
                      isNew: false,
                      rating: 4.5,
                      reviewCount: Math.floor(Math.random() * 50) + 10
                    }} 
                  />
                  
                  {/* Match indicators */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary text-white text-xs">
                      #{index + 1} Match
                    </Badge>
                  </div>
                  
                  {index === 0 && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-white text-xs">
                        Perfect Match
                      </Badge>
                    </div>
                  )}

                  {/* AI-generated story */}
                  {sneaker.aiStory && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground italic">
                        "{sneaker.aiStory}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-12">
            <Button onClick={restartQuiz} variant="outline" className="flex items-center gap-2">
              <Shuffle className="w-4 h-4" />
              Take Quiz Again
            </Button>
            <Button className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Save My Matches
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Sneaker Matchmaker
          </div>
          <h1 className="text-4xl font-bold mb-4">Find Your Sneaker Style</h1>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to discover sneakers that match your personality
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              {question.category === 'personality' && <User className="w-4 h-4" />}
              {question.category === 'lifestyle' && <MapPin className="w-4 h-4" />}
              {question.category === 'style' && <Palette className="w-4 h-4" />}
              {question.category === 'occasion' && <Calendar className="w-4 h-4" />}
              {question.category === 'budget' && <DollarSign className="w-4 h-4" />}
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
            </div>
            <CardTitle className="text-2xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[question.id] || ''} onValueChange={handleAnswer}>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div 
                    key={option.value}
                    className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleAnswer(option.value)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex-1">
                      <Label 
                        htmlFor={option.value} 
                        className="cursor-pointer flex items-center gap-2"
                      >
                        {option.icon}
                        {option.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={goBack}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground self-center">
            {answers[question.id] ? 'Great choice! Moving to next question...' : 'Select an option to continue'}
          </div>
        </div>
      </div>
    </div>
  );
}