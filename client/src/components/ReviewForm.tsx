import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  sneakerId: number;
}

export default function ReviewForm({ sneakerId }: ReviewFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: { rating: number; title: string; content: string; sneakerId: number }) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify(reviewData)
      });
      if (!response.ok) throw new Error('Failed to create review');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Review submitted successfully!"
      });
      setRating(0);
      setTitle("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: [`/api/sneakers/${sneakerId}/reviews`] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !content.trim()) {
      toast({
        title: "Error",
        description: "Please provide a rating and review content",
        variant: "destructive"
      });
      return;
    }

    createReviewMutation.mutate({
      rating,
      title: title.trim(),
      content: content.trim(),
      sneakerId
    });
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to write a review</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className="p-1"
              onMouseEnter={() => setHoveredRating(i + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(i + 1)}
            >
              <Star
                className={`h-6 w-6 ${
                  i < (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title (optional)</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your review"
          maxLength={100}
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Review</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this sneaker..."
          rows={4}
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={createReviewMutation.isPending || !rating || !content.trim()}
        className="w-full"
      >
        {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
