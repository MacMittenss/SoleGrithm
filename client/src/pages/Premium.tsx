import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Crown, 
  Zap, 
  Eye, 
  TrendingUp, 
  Bell, 
  Shield, 
  Star,
  Check,
  Sparkles,
  Clock,
  Target,
  Gem,
  Users,
  Calendar,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'wouter';

interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: {
    text: string;
    included: boolean;
    premium?: boolean;
  }[];
  popular?: boolean;
  cta: string;
  icon: React.ReactNode;
}

export default function Premium() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Subscribe mutation
  const subscribeMutation = useMutation({
    mutationFn: async (tierId: string) => {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierId, billingCycle })
      });
      return response.json();
    }
  });

  const pricingTiers: PricingTier[] = [
    {
      id: 'free',
      name: 'Explorer',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for casual sneaker enthusiasts',
      icon: <Eye className="w-6 h-6" />,
      cta: 'Get Started Free',
      features: [
        { text: 'Basic sneaker catalog access', included: true },
        { text: 'Community reviews and ratings', included: true },
        { text: 'Standard blog content', included: true },
        { text: '5 AI chat messages per day', included: true },
        { text: 'Basic visual search (3 per day)', included: true },
        { text: 'Advanced AI insights', included: false },
        { text: 'Early drop notifications', included: false },
        { text: 'Price prediction models', included: false },
        { text: 'Exclusive collections', included: false },
        { text: 'Priority customer support', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Curator',
      price: { monthly: 19, yearly: 190 },
      description: 'Enhanced AI insights for serious collectors',
      icon: <Sparkles className="w-6 h-6" />,
      popular: true,
      cta: 'Upgrade to Pro',
      features: [
        { text: 'Everything in Explorer', included: true },
        { text: 'Unlimited AI chat messages', included: true, premium: true },
        { text: 'Advanced visual search (unlimited)', included: true, premium: true },
        { text: 'AI price predictions with confidence scores', included: true, premium: true },
        { text: 'Early drop notifications (30min ahead)', included: true, premium: true },
        { text: 'Exclusive curated collections', included: true, premium: true },
        { text: 'Detailed market analytics', included: true, premium: true },
        { text: 'Personal collection insights', included: true, premium: true },
        { text: 'Priority email support', included: true, premium: true },
        { text: 'VIP community access', included: false }
      ]
    },
    {
      id: 'elite',
      name: 'Connoisseur',
      price: { monthly: 49, yearly: 490 },
      description: 'Ultimate AI-powered sneaker intelligence',
      icon: <Crown className="w-6 h-6" />,
      cta: 'Go Elite',
      features: [
        { text: 'Everything in Curator', included: true },
        { text: 'AI trend predictions (next 30 days)', included: true, premium: true },
        { text: 'VIP early access (2 hours ahead)', included: true, premium: true },
        { text: 'Custom AI collection generation', included: true, premium: true },
        { text: 'Advanced market sentiment analysis', included: true, premium: true },
        { text: 'Exclusive reseller network access', included: true, premium: true },
        { text: 'Personal sneaker concierge service', included: true, premium: true },
        { text: '1-on-1 curator consultations', included: true, premium: true },
        { text: 'VIP community and events access', included: true, premium: true },
        { text: 'White-glove customer service', included: true, premium: true }
      ]
    }
  ];

  const yearlyDiscount = (tier: PricingTier) => {
    if (tier.price.monthly === 0) return 0;
    const monthlyAnnual = tier.price.monthly * 12;
    const savings = monthlyAnnual - tier.price.yearly;
    return Math.round((savings / monthlyAnnual) * 100);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Crown className="w-4 h-4 mr-2" />
            Premium Access
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Unlock Advanced AI Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get exclusive access to advanced AI predictions, early drop notifications, 
            and premium features designed for serious sneaker collectors and investors.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={billingCycle === 'yearly'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
          />
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
          </span>
          <Badge variant="secondary" className="ml-2">
            Save up to 20%
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                tier.popular ? 'ring-2 ring-primary border-primary' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${tier.popular ? 'pt-12' : 'pt-6'}`}>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {tier.icon}
                </div>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                      ${billingCycle === 'yearly' ? tier.price.yearly : tier.price.monthly}
                    </span>
                    {tier.price.monthly > 0 && (
                      <span className="text-muted-foreground">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && tier.price.monthly > 0 && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {yearlyDiscount(tier)}% off
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{tier.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          feature.premium ? 'text-primary' : 'text-green-500'
                        }`} />
                      ) : (
                        <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full bg-muted" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-foreground' : 'text-muted-foreground line-through'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  variant={tier.popular ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => subscribeMutation.mutate(tier.id)}
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending ? 'Processing...' : tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">AI Price Predictions</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms predict price movements with 89% accuracy
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold mb-2">Early Drop Access</h3>
            <p className="text-sm text-muted-foreground">
              Get notifications 30min-2hrs before public releases
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold mb-2">Market Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Deep insights into market trends and sentiment analysis
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-semibold mb-2">VIP Community</h3>
            <p className="text-sm text-muted-foreground">
              Exclusive access to premium collector community
            </p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How accurate are the AI predictions?</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI models achieve 89% accuracy on price predictions and 94% on trend identification, 
                  trained on millions of data points from major marketplaces.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll retain access to premium 
                  features until the end of your current billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What makes early drop access special?</h3>
                <p className="text-sm text-muted-foreground">
                  Premium members get notifications 30 minutes to 2 hours before public announcements, 
                  giving you a significant advantage for limited releases.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}