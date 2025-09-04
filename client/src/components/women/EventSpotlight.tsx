import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, ArrowRight, Clock, Camera, ExternalLink } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  city: string;
  type: 'upcoming' | 'past';
  category: 'panel' | 'popup' | 'launch' | 'conference' | 'workshop';
  organizer: string;
  description: string;
  image: string;
  attendees?: number;
  featured: boolean;
  registrationUrl?: string;
  recap?: {
    highlights: string[];
    photos: string[];
    coverage: string;
  };
}

const events: Event[] = [
  // Upcoming Events
  {
    id: '1',
    title: 'Women in Sneaker Design Panel',
    date: '2024-12-15',
    time: '7:00 PM EST',
    location: 'Nike NYC Flagship',
    city: 'New York',
    type: 'upcoming',
    category: 'panel',
    organizer: 'Nike Women',
    description: 'Join leading female designers from Nike, Jordan, and emerging brands as they discuss breaking barriers in sneaker design and share insights on creating inclusive products.',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="%236366f1"/><rect x="50" y="50" width="300" height="150" rx="10" fill="%23ffffff" opacity="0.9"/><text x="200" y="110" text-anchor="middle" fill="%236366f1" font-size="16" font-family="Arial">Women in Design</text><text x="200" y="140" text-anchor="middle" fill="%236366f1" font-size="14" font-family="Arial">Panel Discussion</text><circle cx="120" cy="170" r="15" fill="%236366f1"/><circle cx="200" cy="170" r="15" fill="%236366f1"/><circle cx="280" cy="170" r="15" fill="%236366f1"/></svg>',
    attendees: 150,
    featured: true,
    registrationUrl: '/events/women-design-panel'
  },
  {
    id: '2',
    title: 'SoleGrithm x Female Founders Popup',
    date: '2024-12-20',
    time: '12:00 PM - 8:00 PM',
    location: 'Melrose Trading Post',
    city: 'Los Angeles',
    type: 'upcoming',
    category: 'popup',
    organizer: 'SoleGrithm',
    description: 'Exclusive popup featuring sneakers from female-founded brands, customization workshops, and networking opportunities for women in sneaker entrepreneurship.',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23ec4899"/><rect x="50" y="50" width="300" height="150" rx="10" fill="%23ffffff" opacity="0.9"/><text x="200" y="100" text-anchor="middle" fill="%23ec4899" font-size="18" font-family="Arial">Female Founders</text><text x="200" y="125" text-anchor="middle" fill="%23ec4899" font-size="16" font-family="Arial">Popup Event</text><rect x="80" y="140" width="240" height="40" rx="20" fill="%23ec4899" opacity="0.2"/><text x="200" y="165" text-anchor="middle" fill="%23ec4899" font-size="14" font-family="Arial">LA • Dec 20</text></svg>',
    featured: true,
    registrationUrl: '/events/female-founders-popup'
  },
  {
    id: '3',
    title: 'Sneaker Culture & Feminism Workshop',
    date: '2024-12-28',
    time: '2:00 PM EST',
    location: 'Community Center',
    city: 'Chicago',
    type: 'upcoming',
    category: 'workshop',
    organizer: 'Kicks for Change',
    description: 'Interactive workshop exploring the intersection of sneaker culture and feminist movements, led by cultural historians and industry veterans.',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23f59e0b"/><rect x="50" y="50" width="300" height="150" rx="10" fill="%23ffffff" opacity="0.9"/><text x="200" y="105" text-anchor="middle" fill="%23f59e0b" font-size="16" font-family="Arial">Culture &amp;</text><text x="200" y="130" text-anchor="middle" fill="%23f59e0b" font-size="16" font-family="Arial">Feminism</text><text x="200" y="155" text-anchor="middle" fill="%23f59e0b" font-size="14" font-family="Arial">Workshop</text><rect x="120" y="170" width="160" height="20" rx="10" fill="%23f59e0b" opacity="0.3"/></svg>',
    attendees: 75,
    featured: false,
    registrationUrl: '/events/culture-feminism-workshop'
  },

  // Past Events
  {
    id: '4',
    title: 'SneakerCon Women\'s Leadership Summit',
    date: '2024-11-15',
    location: 'Jacob Javits Center',
    city: 'New York',
    type: 'past',
    category: 'conference',
    organizer: 'SneakerCon',
    description: 'A day-long summit featuring female leaders in sneaker retail, design, and media sharing insights on career development and industry trends.',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="%2310b981"/><rect x="50" y="50" width="300" height="150" rx="10" fill="%23ffffff" opacity="0.9"/><text x="200" y="100" text-anchor="middle" fill="%2310b981" font-size="16" font-family="Arial">Leadership</text><text x="200" y="125" text-anchor="middle" fill="%2310b981" font-size="16" font-family="Arial">Summit</text><text x="200" y="150" text-anchor="middle" fill="%2310b981" font-size="12" font-family="Arial">SneakerCon 2024</text><rect x="100" y="170" width="200" height="15" rx="7" fill="%2310b981" opacity="0.3"/></svg>',
    attendees: 500,
    featured: true,
    recap: {
      highlights: [
        'Keynote from Nike\'s VP of Women\'s Design',
        '3 panel discussions on industry trends',
        'Networking sessions with 50+ female executives',
        'Exclusive sneaker releases announcement'
      ],
      photos: [
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><rect x="50" y="50" width="200" height="100" fill="%2310b981" opacity="0.3"/><text x="150" y="105" text-anchor="middle" fill="%236b7280" font-size="12">Event Photo 1</text></svg>',
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><rect x="50" y="50" width="200" height="100" fill="%2310b981" opacity="0.3"/><text x="150" y="105" text-anchor="middle" fill="%236b7280" font-size="12">Event Photo 2</text></svg>'
      ],
      coverage: '/articles/sneakercon-women-summit-recap'
    }
  },
  {
    id: '5',
    title: 'Women\'s Sneaker Marketplace Launch',
    date: '2024-10-08',
    location: 'The Standard High Line',
    city: 'New York',
    type: 'past',
    category: 'launch',
    organizer: 'HerKicks',
    description: 'Launch event for the first women-focused sneaker marketplace, featuring exclusive drops from female designers and entrepreneurs.',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="%238b5cf6"/><rect x="50" y="50" width="300" height="150" rx="10" fill="%23ffffff" opacity="0.9"/><text x="200" y="105" text-anchor="middle" fill="%238b5cf6" font-size="18" font-family="Arial">Marketplace</text><text x="200" y="130" text-anchor="middle" fill="%238b5cf6" font-size="16" font-family="Arial">Launch</text><circle cx="130" cy="160" r="10" fill="%238b5cf6" opacity="0.5"/><circle cx="200" cy="160" r="10" fill="%238b5cf6" opacity="0.5"/><circle cx="270" cy="160" r="10" fill="%238b5cf6" opacity="0.5"/></svg>',
    attendees: 200,
    featured: false,
    recap: {
      highlights: [
        'Launch of HerKicks platform',
        '15 exclusive sneaker drops',
        'Female entrepreneur showcase',
        '$50K raised for Girls Inc.'
      ],
      photos: [
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><rect x="50" y="50" width="200" height="100" fill="%238b5cf6" opacity="0.3"/><text x="150" y="105" text-anchor="middle" fill="%236b7280" font-size="12">Launch Photo</text></svg>'
      ],
      coverage: '/articles/herkicks-marketplace-launch'
    }
  }
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'panel': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'popup': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    'launch': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'conference': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'workshop': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

const getCategoryLabel = (category: string) => {
  const labels: { [key: string]: string } = {
    'panel': 'Panel Discussion',
    'popup': 'Pop-up Event',
    'launch': 'Product Launch',
    'conference': 'Conference',
    'workshop': 'Workshop'
  };
  return labels[category] || category;
};

export default function EventSpotlight() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = events.filter(event => event.type === 'upcoming');
  const pastEvents = events.filter(event => event.type === 'past');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Event Spotlight
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Women-led events, panels, and gatherings celebrating sneaker culture
        </p>
      </motion.div>

      {/* Event Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Past Events
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Events */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 h-full ${
                  event.featured ? 'border-2 border-purple-200 dark:border-purple-800' : ''
                }`}>
                  {/* Event Image */}
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                    {event.featured && (
                      <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                        Featured
                      </Badge>
                    )}
                    <Badge className={`absolute top-3 right-3 ${getCategoryColor(event.category)}`}>
                      {getCategoryLabel(event.category)}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                        {event.time && <span>• {event.time}</span>}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}, {event.city}</span>
                      </div>

                      {event.attendees && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} expected attendees</span>
                        </div>
                      )}

                      <div className="text-sm">
                        <span className="font-medium">Organized by:</span> {event.organizer}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {event.description}
                    </p>

                    {/* CTA */}
                    {event.registrationUrl && (
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        data-testid={`button-register-${event.id}`}
                      >
                        Register Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                No upcoming events at the moment. Check back soon for new announcements!
              </div>
            </div>
          )}
        </TabsContent>

        {/* Past Events */}
        <TabsContent value="past" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  event.featured ? 'border-l-4 border-l-purple-500' : ''
                }`}>
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Event Image */}
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {event.featured && (
                        <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div>
                          <Badge className={`mb-2 ${getCategoryColor(event.category)}`}>
                            {getCategoryLabel(event.category)}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground">
                            {event.title}
                          </h3>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}, {event.city}</span>
                          </div>

                          {event.attendees && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          )}
                        </div>

                        {/* Recap Highlights */}
                        {event.recap && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">Event Highlights:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {event.recap.highlights.slice(0, 3).map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-purple-500 mt-1.5">•</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Coverage Link */}
                        {event.recap?.coverage && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full"
                            data-testid={`button-coverage-${event.id}`}
                          >
                            <ExternalLink className="mr-2 w-4 h-4" />
                            Read Full Coverage
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {pastEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                No past events to display yet.
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* See More Events CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button 
          size="lg"
          variant="outline"
          className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
          data-testid="button-see-more-events"
        >
          See More Events
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}