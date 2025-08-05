import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Heart, 
  Zap, 
  Coffee, 
  Moon, 
  Sun, 
  Cloud, 
  Flame,
  Snowflake,
  Star,
  Target,
  Shuffle,
  Play
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';

interface MoodOption {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
  keywords: string[];
}

interface MatchedSneaker {
  id: number;
  name: string;
  brandName: string;
  images: string[];
  retailPrice: string;
  colorway: string;
  matchScore: number;
  matchReason: string;
  mood: string;
}

interface MoodMatchResult {
  selectedMood: string;
  matches: MatchedSneaker[];
  personalityInsights: string;
  styleRecommendations: string[];
}

const moodOptions: MoodOption[] = [
  {
    id: 'energetic',
    name: 'Energetic',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-yellow-400 to-orange-500',
    description: 'Ready to conquer the world with bold energy',
    keywords: ['vibrant', 'neon', 'electric', 'bright', 'energizing']
  },
  {
    id: 'chill',
    name: 'Chill',
    icon: <Cloud className="w-6 h-6" />,
    color: 'from-blue-400 to-cyan-500',
    description: 'Relaxed and comfortable vibes',
    keywords: ['comfortable', 'casual', 'relaxed', 'neutral', 'soft']
  },
  {
    id: 'confident',
    name: 'Confident',
    icon: <Flame className="w-6 h-6" />,
    color: 'from-red-500 to-pink-600',
    description: 'Bold choices that make a statement',
    keywords: ['bold', 'statement', 'luxury', 'premium', 'standout']
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    icon: <Star className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-600',
    description: 'Classic styles with timeless appeal',
    keywords: ['retro', 'vintage', 'classic', 'timeless', 'heritage']
  },
  {
    id: 'adventurous',
    name: 'Adventurous',
    icon: <Target className="w-6 h-6" />,
    color: 'from-green-500 to-teal-600',
    description: 'Ready for anything life throws at you',
    keywords: ['outdoor', 'rugged', 'versatile', 'adventure', 'active']
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    icon: <Moon className="w-6 h-6" />,
    color: 'from-gray-500 to-slate-600',
    description: 'Clean, simple, and refined aesthetics',
    keywords: ['clean', 'minimal', 'simple', 'monochrome', 'understated']
  },
  {
    id: 'romantic',
    name: 'Romantic',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-400 to-rose-500',
    description: 'Soft, dreamy, and elegant choices',
    keywords: ['pastel', 'soft', 'elegant', 'delicate', 'feminine']
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-600',
    description: 'Unique and artistic expressions',
    keywords: ['unique', 'artistic', 'creative', 'experimental', 'avant-garde']
  }
];

export default function MoodMatcher() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const moodMatchMutation = useMutation({
    mutationFn: async (mood: string) => {
      const response = await apiRequest(`/api/ai/mood-match`, {
        method: 'POST',
        body: JSON.stringify({ mood, preferences: {} })
      });
      return response as MoodMatchResult;
    },
    onSuccess: () => {
      setShowResults(true);
      setIsAnimating(false);
    },
    onError: () => {
      setIsAnimating(false);
    }
  });

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setIsAnimating(true);
    setShowResults(false);
    setMatchProgress(0);

    // Animated progress effect
    const progressInterval = setInterval(() => {
      setMatchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Start the mood matching
    moodMatchMutation.mutate(moodId);
  };

  const handleRandomMood = () => {
    const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)];
    handleMoodSelect(randomMood.id);
  };

  const selectedMoodData = moodOptions.find(m => m.id === selectedMood);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sneaker Mood Matcher
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Discover sneakers that match your current vibe
          </p>
        </motion.div>
        
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleRandomMood}
            variant="outline"
            className="gap-2"
            disabled={isAnimating}
            data-testid="button-random-mood"
          >
            <Shuffle className="w-4 h-4" />
            Surprise Me
          </Button>
        </div>
      </div>

      {/* Mood Selection Grid */}
      {!showResults && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moodOptions.map((mood, index) => (
                  <motion.div
                    key={mood.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedMood === mood.id ? 'ring-2 ring-purple-500' : ''
                      }`}
                      onClick={() => handleMoodSelect(mood.id)}
                      data-testid={`mood-option-${mood.id}`}
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${mood.color} flex items-center justify-center text-white`}>
                          {mood.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{mood.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {mood.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Loading Animation */}
      <AnimatePresence>
        {isAnimating && selectedMoodData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-8 text-center space-y-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${selectedMoodData.color} flex items-center justify-center text-white`}
                >
                  {selectedMoodData.icon}
                </motion.div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">
                    Analyzing your {selectedMoodData.name.toLowerCase()} vibe...
                  </h3>
                  <p className="text-muted-foreground">
                    Finding sneakers that match your {selectedMoodData.description.toLowerCase()}
                  </p>
                  
                  <div className="max-w-md mx-auto space-y-2">
                    <Progress value={matchProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {matchProgress < 30 && "Scanning sneaker database..."}
                      {matchProgress >= 30 && matchProgress < 60 && "Analyzing style preferences..."}
                      {matchProgress >= 60 && matchProgress < 90 && "Calculating mood compatibility..."}
                      {matchProgress >= 90 && "Finalizing recommendations..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResults && moodMatchMutation.data && selectedMoodData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedMoodData.color} flex items-center justify-center text-white`}>
                    {selectedMoodData.icon}
                  </div>
                  <h2 className="text-2xl font-bold">Perfect Matches for Your {selectedMoodData.name} Mood</h2>
                </div>
                {moodMatchMutation.data.personalityInsights && (
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {moodMatchMutation.data.personalityInsights}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Matched Sneakers */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moodMatchMutation.data.matches.map((sneaker, index) => (
                <motion.div
                  key={sneaker.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300" data-testid={`match-card-${sneaker.id}`}>
                    <div className="relative">
                      <img
                        src={sneaker.images[0]}
                        alt={sneaker.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90 text-purple-600 font-semibold">
                          {sneaker.matchScore}% Match
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{sneaker.name}</h3>
                        <p className="text-sm text-muted-foreground">{sneaker.brandName}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">${sneaker.retailPrice}</span>
                        <Badge variant="outline">{sneaker.colorway}</Badge>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3">
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
                          Why it matches:
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          {sneaker.matchReason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Style Recommendations */}
            {moodMatchMutation.data.styleRecommendations && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Style Tips for Your {selectedMoodData.name} Mood
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {moodMatchMutation.data.styleRecommendations.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Try Again Button */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setShowResults(false);
                  setSelectedMood(null);
                }}
                variant="outline"
                className="gap-2"
                data-testid="button-try-again"
              >
                <Play className="w-4 h-4" />
                Try Another Mood
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}