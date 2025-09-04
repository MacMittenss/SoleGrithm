import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  thumbnail: string;
  excerpt: string;
  url: string;
  publishDate: string;
  featured: boolean;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Top 10 Women\'s Sneaker Collabs of 2024',
    category: 'Reviews',
    readTime: '8 min read',
    thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="50" y="50" width="300" height="200" rx="10" fill="%23ec4899"/><text x="200" y="160" text-anchor="middle" fill="%23ffffff" font-size="20" font-family="Arial">Collabs 2024</text><circle cx="100" cy="100" r="30" fill="%23ffffff" opacity="0.3"/><circle cx="300" cy="200" r="25" fill="%23ffffff" opacity="0.3"/></svg>',
    excerpt: 'From Aleali May\'s latest Jordan drop to groundbreaking Nike partnerships, here are the collaborations that defined women\'s sneaker culture this year.',
    url: '/articles/top-womens-collabs-2024',
    publishDate: '2024-12-01',
    featured: true
  },
  {
    id: '2',
    title: 'The History of Women in Sneaker Culture',
    category: 'History',
    readTime: '12 min read',
    thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="50" y="50" width="300" height="200" rx="10" fill="%236366f1"/><text x="200" y="140" text-anchor="middle" fill="%23ffffff" font-size="18" font-family="Arial">Women\'s</text><text x="200" y="170" text-anchor="middle" fill="%23ffffff" font-size="18" font-family="Arial">History</text><rect x="80" y="80" width="60" height="40" fill="%23ffffff" opacity="0.3"/><rect x="260" y="180" width="60" height="40" fill="%23ffffff" opacity="0.3"/></svg>',
    excerpt: 'Tracing the journey from the first female sneaker enthusiasts to today\'s cultural powerhouses who are reshaping the industry.',
    url: '/articles/women-sneaker-history',
    publishDate: '2024-11-28',
    featured: false
  },
  {
    id: '3',
    title: 'Why Women\'s Sizing Still Needs Work',
    category: 'Analysis',
    readTime: '6 min read',
    thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="50" y="50" width="300" height="200" rx="10" fill="%23f59e0b"/><text x="200" y="140" text-anchor="middle" fill="%23ffffff" font-size="16" font-family="Arial">Sizing</text><text x="200" y="170" text-anchor="middle" fill="%23ffffff" font-size="16" font-family="Arial">Issues</text><rect x="100" y="90" width="200" height="20" fill="%23ffffff" opacity="0.4"/><rect x="120" y="190" width="160" height="15" fill="%23ffffff" opacity="0.4"/></svg>',
    excerpt: 'An in-depth look at the persistent challenges in women\'s sneaker sizing and what brands are doing (or not doing) to address them.',
    url: '/articles/womens-sizing-challenges',
    publishDate: '2024-11-25',
    featured: false
  },
  {
    id: '4',
    title: 'Rising Stars: 5 Female Designers to Watch',
    category: 'Interviews',
    readTime: '10 min read',
    thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="50" y="50" width="300" height="200" rx="10" fill="%2310b981"/><text x="200" y="130" text-anchor="middle" fill="%23ffffff" font-size="18" font-family="Arial">Rising</text><text x="200" y="160" text-anchor="middle" fill="%23ffffff" font-size="18" font-family="Arial">Stars</text><circle cx="130" cy="100" r="15" fill="%23ffffff" opacity="0.5"/><circle cx="200" cy="200" r="20" fill="%23ffffff" opacity="0.5"/><circle cx="270" cy="110" r="12" fill="%23ffffff" opacity="0.5"/></svg>',
    excerpt: 'Meet the next generation of female sneaker designers who are bringing fresh perspectives and innovative approaches to footwear.',
    url: '/articles/rising-female-designers',
    publishDate: '2024-11-22',
    featured: false
  },
  {
    id: '5',
    title: 'Breaking Barriers: Women in Sneaker Retail',
    category: 'Business',
    readTime: '7 min read',
    thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="50" y="50" width="300" height="200" rx="10" fill="%238b5cf6"/><text x="200" y="140" text-anchor="middle" fill="%23ffffff" font-size="16" font-family="Arial">Breaking</text><text x="200" y="170" text-anchor="middle" fill="%23ffffff" font-size="16" font-family="Arial">Barriers</text><rect x="80" y="80" width="240" height="8" fill="%23ffffff" opacity="0.3"/><rect x="100" y="210" width="200" height="6" fill="%23ffffff" opacity="0.3"/></svg>',
    excerpt: 'How female entrepreneurs are transforming sneaker retail, from boutique stores to innovative online platforms.',
    url: '/articles/women-sneaker-retail',
    publishDate: '2024-11-20',
    featured: false
  },
  {
    id: '6',
    title: 'The Future is Female: Sneaker Trends 2025',
    category: 'Trends',
    readTime: '9 min read',
    thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="50" y="50" width="300" height="200" rx="10" fill="%23ef4444"/><text x="200" y="130" text-anchor="middle" fill="%23ffffff" font-size="18" font-family="Arial">Future</text><text x="200" y="160" text-anchor="middle" fill="%23ffffff" font-size="18" font-family="Arial">2025</text><path d="M150 100l50 30l50-30v80l-50 30l-50-30z" fill="%23ffffff" opacity="0.3"/></svg>',
    excerpt: 'Predicting the trends that will define women\'s sneaker culture in 2025, from sustainable materials to inclusive design.',
    url: '/articles/sneaker-trends-2025',
    publishDate: '2024-11-18',
    featured: true
  }
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Reviews': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'History': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Analysis': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'Interviews': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Business': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    'Trends': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

export default function EditorialSection() {
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Editorial Stories
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          In-depth articles, interviews, and analysis on women shaping sneaker culture
        </p>
      </motion.div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-2xl font-semibold text-foreground">Featured Stories</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-l-4 border-l-purple-500">
                  <div className="relative">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                      Featured
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground group-hover:text-purple-600 transition-colors">
                      {article.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-purple-50 group-hover:border-purple-300 group-hover:text-purple-600 transition-all"
                      data-testid={`button-read-article-${article.id}`}
                    >
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">More Stories</h3>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
                <div className="relative">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="pt-0 flex-1">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start p-0 group-hover:text-purple-600 transition-colors"
                    data-testid={`button-read-more-${article.id}`}
                  >
                    Read More
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button 
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          data-testid="button-view-all-articles"
        >
          View All Articles
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}