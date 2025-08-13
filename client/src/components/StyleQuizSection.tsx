import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Zap,
  Star,
  Palette,
  User,
  DollarSign,
  RefreshCw,
  Play
} from "lucide-react";
import { Link } from "wouter";

interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  category: 'personality' | 'lifestyle' | 'style' | 'budget' | 'occasion';
  options: {
    value: string;
    label: string;
    description?: string;
    personality: string[];
    icon?: React.ReactNode;
    gradient?: string;
  }[];
}

interface QuizAnswer {
  questionId: string;
  value: string;
  personality: string[];
}

const miniQuizQuestions: QuizQuestion[] = [
  {
    id: 'vibe',
    question: 'What\'s your vibe?',
    subtitle: 'Choose the energy that speaks to you',
    category: 'personality',
    options: [
      { 
        value: 'trendsetter', 
        label: 'Trendsetter',
        description: 'First to discover new styles',
        personality: ['innovative', 'bold', 'confident'],
        icon: <Zap className="w-5 h-5" />,
        gradient: 'from-yellow-400 to-orange-500'
      },
      { 
        value: 'classic', 
        label: 'Classic',
        description: 'Timeless and reliable',
        personality: ['traditional', 'reliable', 'refined'],
        icon: <Star className="w-5 h-5" />,
        gradient: 'from-blue-400 to-blue-600'
      },
      { 
        value: 'creative', 
        label: 'Creative',
        description: 'Express through unique style',
        personality: ['artistic', 'expressive', 'original'],
        icon: <Palette className="w-5 h-5" />,
        gradient: 'from-purple-400 to-pink-500'
      },
      { 
        value: 'minimal', 
        label: 'Minimal',
        description: 'Less is always more',
        personality: ['simple', 'clean', 'functional'],
        icon: <User className="w-5 h-5" />,
        gradient: 'from-gray-400 to-gray-600'
      }
    ]
  },
  {
    id: 'lifestyle',
    question: 'Your lifestyle?',
    subtitle: 'How do you move through the world',
    category: 'lifestyle',
    options: [
      { 
        value: 'active', 
        label: 'Always Moving',
        description: 'Gym to street ready',
        personality: ['energetic', 'sporty', 'dynamic'],
        gradient: 'from-green-400 to-emerald-600'
      },
      { 
        value: 'professional', 
        label: 'Business First',
        description: 'Meetings and networking',
        personality: ['sophisticated', 'polished', 'versatile'],
        gradient: 'from-indigo-400 to-blue-600'
      },
      { 
        value: 'social', 
        label: 'Social Scene',
        description: 'Parties and events',
        personality: ['outgoing', 'trendy', 'social'],
        gradient: 'from-pink-400 to-rose-500'
      },
      { 
        value: 'comfort', 
        label: 'Comfort Zone',
        description: 'Everyday ease',
        personality: ['relaxed', 'comfortable', 'practical'],
        gradient: 'from-amber-400 to-orange-500'
      }
    ]
  },
  {
    id: 'budget',
    question: 'Your range?',
    subtitle: 'What feels right for your wallet',
    category: 'budget',
    options: [
      { 
        value: 'budget', 
        label: 'Smart Shopper',
        description: 'Under $150',
        personality: ['practical', 'value-conscious', 'smart'],
        icon: <DollarSign className="w-5 h-5" />,
        gradient: 'from-emerald-400 to-green-600'
      },
      { 
        value: 'mid', 
        label: 'Sweet Spot',
        description: '$150-$300',
        personality: ['balanced', 'quality-focused', 'reasonable'],
        icon: <DollarSign className="w-5 h-5" />,
        gradient: 'from-blue-400 to-cyan-500'
      },
      { 
        value: 'premium', 
        label: 'Premium Pick',
        description: '$300-$500',
        personality: ['quality-focused', 'discerning', 'investment-minded'],
        icon: <DollarSign className="w-5 h-5" />,
        gradient: 'from-purple-400 to-violet-600'
      },
      { 
        value: 'luxury', 
        label: 'No Limits',
        description: '$500+',
        personality: ['luxury-focused', 'exclusive', 'premium'],
        icon: <DollarSign className="w-5 h-5" />,
        gradient: 'from-yellow-400 to-amber-600'
      }
    ]
  }
];

export default function StyleQuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / miniQuizQuestions.length) * 100;
  const currentQ = miniQuizQuestions[currentQuestion];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    
    // Auto-advance after selection with slight delay
    setTimeout(() => {
      const question = miniQuizQuestions[currentQuestion];
      const selectedAnswer = question.options.find(opt => opt.value === value);
      
      if (selectedAnswer) {
        const newAnswer: QuizAnswer = {
          questionId: question.id,
          value: value,
          personality: selectedAnswer.personality
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestion < miniQuizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption('');
        } else {
          setIsCompleted(true);
          setShowResults(true);
        }
      }
    }, 800);
  };

  const startQuiz = () => {
    setIsStarted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption('');
    setIsStarted(false);
    setIsCompleted(false);
    setShowResults(false);
  };

  if (!isStarted) {
    return (
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-orange-500/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={cardVariants} className="text-center">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 text-sm px-3 py-1">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Style Quiz
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Find Your Perfect
                <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> Sneaker Style</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Take our quick 3-question style quiz and discover sneakers that match your personality, lifestyle, and budget.
              </p>
            </div>

            <motion.div
              className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">30</div>
                  <div className="text-sm text-muted-foreground">Seconds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">∞</div>
                  <div className="text-sm text-muted-foreground">Possibilities</div>
                </div>
              </div>

              <Button 
                size="lg" 
                onClick={startQuiz}
                className="w-full max-w-md mx-auto h-12 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:opacity-90"
                data-testid="button-start-style-quiz"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your Style Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (showResults) {
    return (
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-orange-500/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={cardVariants} className="text-center">
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Your Style Profile is Ready!
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                We've analyzed your preferences and found the perfect sneaker matches for you.
              </p>
            </div>

            <motion.div
              className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border mb-8"
              variants={cardVariants}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {answers.map((answer, index) => {
                  const question = miniQuizQuestions.find(q => q.id === answer.questionId);
                  const option = question?.options.find(opt => opt.value === answer.value);
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${option?.gradient || 'from-gray-400 to-gray-600'} flex items-center justify-center text-white`}>
                        {option?.icon || <Star className="w-6 h-6" />}
                      </div>
                      <div className="font-semibold text-sm">{option?.label}</div>
                      <div className="text-xs text-muted-foreground">{option?.description}</div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4">
                <Link href="/quiz">
                  <Button 
                    size="lg"
                    className="w-full max-w-md h-12 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:opacity-90"
                    data-testid="button-view-full-results"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    View Full Results & Recommendations
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  onClick={resetQuiz}
                  className="ml-4"
                  data-testid="button-retake-quiz"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Take Again
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-orange-500/10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={cardVariants}>
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-sm">
                Question {currentQuestion + 1} of {miniQuizQuestions.length}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </div>
            </div>
            <Progress value={progress} className="h-2 mb-6" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border"
            >
              {/* Question */}
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {currentQ.question}
                </h3>
                {currentQ.subtitle && (
                  <p className="text-muted-foreground text-lg">
                    {currentQ.subtitle}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    variants={optionVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedOption === option.value 
                          ? 'ring-2 ring-primary shadow-lg' 
                          : 'hover:ring-1 hover:ring-primary/50'
                      }`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.gradient || 'from-gray-400 to-gray-600'} flex items-center justify-center text-white flex-shrink-0`}>
                            {option.icon || <Star className="w-6 h-6" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg mb-1">{option.label}</h4>
                            {option.description && (
                              <p className="text-muted-foreground text-sm">
                                {option.description}
                              </p>
                            )}
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === option.value 
                              ? 'border-primary bg-primary' 
                              : 'border-muted-foreground/30'
                          }`}>
                            {selectedOption === option.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 bg-white rounded-full"
                              />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}