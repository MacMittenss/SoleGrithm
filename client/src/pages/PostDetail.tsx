import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Eye, Share2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function PostDetail() {
  const { slug } = useParams();
  const { user } = useAuth();

  const { data: post, isLoading } = useQuery({
    queryKey: [`/api/blog/${slug}`],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) throw new Error('Post not found');
      return response.json();
    }
  });

  const { data: comments } = useQuery({
    queryKey: [`/api/comments`, { postId: post?.id }],
    queryFn: async () => {
      const response = await fetch(`/api/comments?postId=${post.id}`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      return response.json();
    },
    enabled: !!post
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-6">
            {/* Categories */}
            {post.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category: string) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author?.displayName || 'SoleGrid Team'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.viewCount || 0} views</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Separator />
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-2xl overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="space-y-6">
            <Separator />
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Comments ({comments?.length || 0})
              </h3>

              {/* Comment Form */}
              {user ? (
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Leave a Comment</h4>
                    <form className="space-y-4">
                      <textarea
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        placeholder="Share your thoughts..."
                      ></textarea>
                      <Button type="submit">Post Comment</Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-8">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Sign in to join the conversation
                    </p>
                    <Button>Sign In</Button>
                  </CardContent>
                </Card>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments?.length > 0 ? (
                  comments.map((comment: any) => (
                    <Card key={comment.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="font-semibold">
                              {comment.user?.displayName || 'Anonymous'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{comment.content}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">
                        No comments yet. Be the first to share your thoughts!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
