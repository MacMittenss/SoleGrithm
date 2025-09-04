import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ReviewSummary from '@/components/ReviewSummary';
import { 
  Sparkles, 
  MessageSquareText, 
  Users, 
  ArrowRight,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

export default function ReviewSummaryDemo() {
  const [customReviews, setCustomReviews] = useState('');
  const [sneakerName, setSneakerName] = useState('');
  const [customSummary, setCustomSummary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCustomSummary = async () => {
    if (!customReviews.trim() || !sneakerName.trim()) return;

    setIsGenerating(true);
    try {
      const reviews = customReviews
        .split('\n\n')
        .filter(review => review.trim().length > 0);

      const response = await fetch('/api/ai/summarize-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews,
          sneakerName
        }),
      });

      if (response.ok) {
        const summary = await response.json();
        setCustomSummary(summary);
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const demoSneakers = [
    { id: 1, name: "Air Jordan 1 Retro High OG" },
    { id: 2, name: "Nike Dunk Low" },
    { id: 5, name: "Converse Chuck Taylor All Star" },
    { id: 3, name: "Adidas Stan Smith" },
  ];

  const sampleReviews = `These are absolutely fire! The quality on this retro is incredible - leather feels premium and the colorway is clean. Definitely worth the retail price.

Got these on release day and I'm impressed. They fit true to size for me (size 10) and the comfort is better than I expected. The hype is real on these.

Quality control issues on my pair - some glue stains and the leather feels cheap compared to older retros. Still love the silhouette though.

Best sneaker purchase I've made this year. Goes with everything and the comfort for walking around campus is perfect. 10/10 would recommend.

Overpriced for what you get IMO. There are better options for the same money. The quality just isn't there anymore.

These grew on me. Initially thought they were overhyped but after wearing them for a month, I totally get it. Super versatile and well-built.

Perfect beater shoe. Bought them to beat up and they've held up amazingly well. Great for everyday wear.

The fit is weird - runs small compared to other Jordans. Had to size up half a size. Otherwise they're dope.`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold">AI Review Summarization</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience AI-powered review analysis that summarizes community opinions into actionable insights. 
            See "What Sneakerheads Are Saying" with intelligent pros and cons generation.
          </p>
        </div>

        {/* Feature Overview */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Lightbulb className="w-5 h-5" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquareText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Collect Reviews</h3>
                <p className="text-sm text-gray-600">
                  Gather reviews from Reddit, StockX, social media, and sneaker communities
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">
                  OpenAI processes sentiment, extracts key insights, and identifies common themes
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Generate Summary</h3>
                <p className="text-sm text-gray-600">
                  Creates "What Sneakerheads Are Saying" with clear pros, cons, and sentiment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demo Sneakers */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Live Demo - Popular Sneakers
            </h2>
            <div className="space-y-4">
              {demoSneakers.map((sneaker) => (
                <ReviewSummary 
                  key={sneaker.id} 
                  sneakerId={sneaker.id} 
                  sneakerName={sneaker.name} 
                />
              ))}
            </div>
          </div>

          {/* Custom Review Input */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquareText className="w-5 h-5" />
              Try It Yourself
            </h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Review Analysis</CardTitle>
                <p className="text-sm text-gray-600">
                  Paste reviews (separated by blank lines) and get an AI summary
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sneaker-name">Sneaker Name</Label>
                  <Input
                    id="sneaker-name"
                    placeholder="e.g., Air Jordan 1 Chicago"
                    value={sneakerName}
                    onChange={(e) => setSneakerName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reviews">Reviews (separate each review with a blank line)</Label>
                  <Textarea
                    id="reviews"
                    placeholder="Paste reviews here..."
                    value={customReviews}
                    onChange={(e) => setCustomReviews(e.target.value)}
                    rows={8}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerateCustomSummary}
                    disabled={!customReviews.trim() || !sneakerName.trim() || isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Generate Summary
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCustomReviews(sampleReviews);
                      setSneakerName('Air Jordan 1 Retro High OG');
                    }}
                  >
                    Use Sample
                  </Button>
                </div>

                {/* Custom Summary Display */}
                {customSummary && (
                  <div className="mt-6">
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {customSummary.overallSentiment}
                        </Badge>
                        <Badge variant="secondary">
                          {Math.round(customSummary.confidenceScore * 100)}% confidence
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Summary</h4>
                        <p className="text-gray-700 text-sm">{customSummary.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">What Sneakerheads Are Saying</h4>
                        <div className="space-y-2">
                          {customSummary.whatSneakerheadsAreSaying.map((quote: string, index: number) => (
                            <div key={index} className="bg-gray-50 p-3 rounded border-l-4 border-purple-400">
                              <p className="text-sm italic text-gray-700">"{quote}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                          <ul className="space-y-1">
                            {customSummary.prosAndCons.pros.map((pro: string, index: number) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                          <ul className="space-y-1">
                            {customSummary.prosAndCons.cons.map((con: string, index: number) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}