import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  MessageSquareText, 
  ThumbsUp, 
  ThumbsDown, 
  TrendingUp,
  Users,
  Quote,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface ReviewSummaryProps {
  sneakerId: number;
  sneakerName: string;
}

interface ReviewSummaryData {
  summary: string;
  whatSneakerheadsAreSaying: string[];
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  overallSentiment: 'positive' | 'negative' | 'mixed';
  confidenceScore: number;
  keyInsights: {
    comfort: { rating: number; comments: string[] };
    durability: { rating: number; comments: string[] };
    style: { rating: number; comments: string[] };
    valueForMoney: { rating: number; comments: string[] };
  };
  recommendationScore: number;
  targetAudience: string[];
  comparisonInsights?: string;
}

export default function ReviewSummary({ sneakerId, sneakerName }: ReviewSummaryProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: reviewSummary, isLoading, error, refetch } = useQuery<ReviewSummaryData>({
    queryKey: ['review-summary', sneakerId],
    queryFn: async () => {
      const response = await fetch(`/api/ai/review-summary/${sneakerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch review summary');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'mixed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4" />;
      case 'negative':
        return <ThumbsDown className="w-4 h-4" />;
      case 'mixed':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <MessageSquareText className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-red-200">
        <CardContent className="p-6 text-center">
          <MessageSquareText className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Unable to Load Review Summary
          </h3>
          <p className="text-red-500 mb-4">
            There was an issue generating the AI review summary. Please try again.
          </p>
          <Button onClick={handleRefresh} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!reviewSummary) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            AI Review Summary
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`${getSentimentColor(reviewSummary.overallSentiment)} border`}
            >
              {getSentimentIcon(reviewSummary.overallSentiment)}
              <span className="ml-1 capitalize">{reviewSummary.overallSentiment}</span>
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {Math.round(reviewSummary.confidenceScore * 100)}% confidence
            </Badge>
            <Button 
              onClick={handleRefresh} 
              variant="ghost" 
              size="sm"
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
            <MessageSquareText className="w-4 h-4" />
            Overall Community Sentiment
          </h3>
          <p className="text-gray-800 leading-relaxed">{reviewSummary.summary}</p>
        </div>

        <Separator />

        {/* What Sneakerheads Are Saying */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            What Sneakerheads Are Saying
          </h3>
          <div className="space-y-3">
            {reviewSummary.whatSneakerheadsAreSaying.map((quote, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-400">
                <div className="flex items-start gap-3">
                  <Quote className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 italic leading-relaxed">{quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pros */}
          <div>
            <h3 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              What People Love
            </h3>
            <ul className="space-y-2">
              {reviewSummary.prosAndCons.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div>
            <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
              <ThumbsDown className="w-4 h-4" />
              Common Concerns
            </h3>
            <ul className="space-y-2">
              {reviewSummary.prosAndCons.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Disclaimer */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-xs text-blue-600 flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            This summary is generated by AI from community reviews and discussions. 
            Individual experiences may vary.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}