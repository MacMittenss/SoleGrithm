import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';

interface SpotlightPerson {
  id: string;
  name: string;
  role: string;
  image: string;
  sneakerOfChoice: string;
  sneakerImage: string;
  quote: string;
  fullStoryUrl: string;
  backgroundColor: string;
}

const spotlightPeople: SpotlightPerson[] = [
  {
    id: '1',
    name: 'Janelle Chen',
    role: 'Collector & Content Creator',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f3f4f6"/><circle cx="200" cy="160" r="60" fill="%236366f1"/><rect x="140" y="240" width="120" height="80" rx="10" fill="%236366f1"/><text x="200" y="350" text-anchor="middle" fill="%234b5563" font-size="14" font-family="Arial">Janelle</text></svg>',
    sneakerOfChoice: 'Air Jordan 1 "Chicago"',
    sneakerImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23ffffff"/><path d="M50 150c0-20 20-40 50-40s50 20 50 40v20H50v-20z" fill="%23dc2626"/><path d="M60 170h80v10H60z" fill="%23000000"/><text x="100" y="190" text-anchor="middle" fill="%23666" font-size="10">AJ1</text></svg>',
    quote: "Sneakers aren't just fashion—they're storytelling. Every pair in my collection has a moment, a memory, a meaning.",
    fullStoryUrl: '/women-stories/janelle-chen',
    backgroundColor: 'from-purple-500 to-pink-500'
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    role: 'Sneaker Designer',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f3f4f6"/><circle cx="200" cy="160" r="60" fill="%23ec4899"/><rect x="140" y="240" width="120" height="80" rx="10" fill="%23ec4899"/><text x="200" y="350" text-anchor="middle" fill="%234b5563" font-size="14" font-family="Arial">Maya</text></svg>',
    sneakerOfChoice: 'Nike Dunk Low "Panda"',
    sneakerImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23ffffff"/><path d="M50 150c0-20 20-40 50-40s50 20 50 40v20H50v-20z" fill="%23000000"/><path d="M60 170h80v10H60z" fill="%23ffffff"/><text x="100" y="190" text-anchor="middle" fill="%23666" font-size="10">Dunk</text></svg>',
    quote: "Design is about solving problems while creating beauty. Women's perspectives bring fresh solutions to sneaker design.",
    fullStoryUrl: '/women-stories/maya-rodriguez',
    backgroundColor: 'from-blue-500 to-cyan-500'
  },
  {
    id: '3',
    name: 'Aisha Johnson',
    role: 'Sneaker Influencer & Entrepreneur',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f3f4f6"/><circle cx="200" cy="160" r="60" fill="%23f59e0b"/><rect x="140" y="240" width="120" height="80" rx="10" fill="%23f59e0b"/><text x="200" y="350" text-anchor="middle" fill="%234b5563" font-size="14" font-family="Arial">Aisha</text></svg>',
    sneakerOfChoice: 'Yeezy Boost 350 V2',
    sneakerImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23ffffff"/><path d="M50 150c0-15 15-35 50-35s50 20 50 35v25H50v-25z" fill="%236b7280"/><path d="M55 170h90v5H55z" fill="%23374151"/><text x="100" y="190" text-anchor="middle" fill="%23666" font-size="10">Yeezy</text></svg>',
    quote: "Building a sneaker business as a woman means breaking barriers daily. But that's exactly why representation matters.",
    fullStoryUrl: '/women-stories/aisha-johnson',
    backgroundColor: 'from-green-500 to-teal-500'
  }
];

export default function SpotlightFeatureCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % spotlightPeople.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + spotlightPeople.length) % spotlightPeople.length);
  };

  const currentPerson = spotlightPeople[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div data-section="spotlight" className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Spotlight Feature
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Meet the women who are defining sneaker culture, one story at a time
        </p>
      </motion.div>

      {/* Feature Card */}
      <Card className="overflow-hidden border-none shadow-2xl">
        <div className={`bg-gradient-to-r ${currentPerson.backgroundColor} p-1`}>
          <CardContent className="bg-background m-0 p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPerson.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="space-y-6"
                  >
                    {/* Person Info */}
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-foreground">
                        {currentPerson.name}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {currentPerson.role}
                      </p>
                    </div>

                    {/* Sneaker of Choice */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Sneaker of Choice
                      </h4>
                      <p className="text-xl font-semibold text-foreground">
                        {currentPerson.sneakerOfChoice}
                      </p>
                    </div>

                    {/* Quote */}
                    <div className="space-y-3">
                      <Quote className="w-8 h-8 text-purple-500" />
                      <p className="text-lg italic text-foreground leading-relaxed">
                        "{currentPerson.quote}"
                      </p>
                    </div>

                    {/* CTA */}
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-fit"
                      data-testid={`button-read-more-${currentPerson.name.toLowerCase().replace(' ', '-')}`}
                    >
                      Read Full Story
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Visual Side */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPerson.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="flex flex-col items-center justify-center p-8 h-full min-h-[400px]"
                  >
                    {/* Person Image */}
                    <div className="relative mb-6">
                      <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${currentPerson.backgroundColor} p-1`}>
                        <img
                          src={currentPerson.image}
                          alt={currentPerson.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                    </div>

                    {/* Sneaker Image */}
                    <div className="relative">
                      <img
                        src={currentPerson.sneakerImage}
                        alt={currentPerson.sneakerOfChoice}
                        className="w-48 h-32 object-contain"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="rounded-full"
          data-testid="button-spotlight-prev"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {spotlightPeople.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-purple-500 scale-110'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-purple-300'
              }`}
              data-testid={`dot-indicator-${index}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full"
          data-testid="button-spotlight-next"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}