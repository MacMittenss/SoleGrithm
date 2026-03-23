import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function CollectionDetail() {
  const params = useParams();
  const collectionId = params.id;

  // Fetch all collections
  const { data: collections, isLoading } = useQuery({
    queryKey: ['/api/collections/ai-curated'],
    queryFn: async () => {
      const response = await fetch('/api/collections/ai-curated');
      if (!response.ok) throw new Error('Failed to fetch collections');
      return response.json();
    }
  });

  // Find the specific collection
  const collection = collections?.find((c: any) => c.id === collectionId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-20 pb-8">
        <div className="w-layout-blockcontainer container w-container">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-96 bg-white/10 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-black pt-20 pb-8">
        <div className="w-layout-blockcontainer container w-container">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Collection Not Found</h1>
            <p className="text-white/60 mb-8">This collection doesn't exist or has been removed.</p>
            <Link href="/collections">
              <Button className="bg-white text-black hover:bg-white/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-8">
      <div className="w-layout-blockcontainer container w-container">
        {/* Header */}
        <div className="mb-8">
          <Link href="/collections">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collections
            </Button>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{collection.icon}</span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-anton">
                  {collection.title.toUpperCase()}
                </h1>
              </div>
              <p className="text-xl text-white/80 max-w-3xl mb-4">
                {collection.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {collection.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-white/10 border-white/20 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Collection Size</div>
              <div className="text-3xl font-bold text-white">{collection.totalCount}</div>
              <div className="text-sm text-white/60 mt-2">Avg Price</div>
              <div className="text-xl font-bold text-white">{collection.avgPrice}</div>
            </div>
          </div>
        </div>

        {/* AI Rationale */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-2">AI Curation Insight</h3>
            <p className="text-white/80 text-sm leading-relaxed">{collection.aiRationale}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-white/60">Selection Criteria: </span>
              <span className="text-xs text-white/80">{collection.criteria}</span>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collection.sneakers.map((sneaker: any) => (
            <Card key={sneaker.id} className="bg-white/5 border-white/10 hover:bg-white/8 transition-all group">
              <CardContent className="p-0">
                {/* Image */}
                <div className="aspect-square bg-white rounded-t-lg overflow-hidden">
                  <img
                    src={sneaker.imageUrl || sneaker.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'}
                    alt={sneaker.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="text-xs text-white/60 mb-1">{sneaker.brandName || 'Brand'}</div>
                  <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
                    {sneaker.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-white/60">Retail</div>
                      <div className="text-lg font-bold text-white">
                        ${typeof sneaker.retailPrice === 'string' ? sneaker.retailPrice : sneaker.retailPrice || '0'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/sneakers/${sneaker.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent border-white/30 text-white hover:bg-white/10">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {collection.sneakers.length === 0 && (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-12 text-center">
              <p className="text-white/60">No products in this collection yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
