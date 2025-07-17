import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, User, Ungroup, Heart, PenTool, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SneakerCard from "@/components/SneakerCard";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    username: ''
  });

  const { data: userProfile } = useQuery({
    queryKey: ['/api/user/profile'],
    queryFn: async () => {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
    enabled: !!user
  });

  const { data: collections } = useQuery({
    queryKey: ['/api/user/collections'],
    queryFn: async () => {
      const response = await fetch('/api/user/collections', {
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch collections');
      return response.json();
    },
    enabled: !!user
  });

  const { data: wishlist } = useQuery({
    queryKey: ['/api/user/collections', 'wishlist'],
    queryFn: async () => {
      const response = await fetch('/api/user/collections?wishlist=true', {
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      return response.json();
    },
    enabled: !!user
  });

  const { data: userReviews } = useQuery({
    queryKey: ['/api/user/reviews'],
    queryFn: async () => {
      const response = await fetch(`/api/reviews?userId=${userProfile?.id}`, {
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
    enabled: !!userProfile
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof profileData) => {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your profile
            </p>
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleEditProfile = () => {
    if (userProfile) {
      setProfileData({
        displayName: userProfile.displayName || '',
        bio: userProfile.bio || '',
        username: userProfile.username || ''
      });
    }
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileData);
  };

  const ownedSneakers = collections?.filter((item: any) => !item.isWishlist) || [];
  const wishlistItems = wishlist || [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile?.avatar} />
                    <AvatarFallback className="text-lg">
                      {userProfile?.displayName?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h1 className="text-2xl font-bold">
                        {userProfile?.displayName || 'Sneaker Enthusiast'}
                      </h1>
                      {userProfile?.isVerified && (
                        <Badge variant="secondary">Verified</Badge>
                      )}
                      {userProfile?.isPremium && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">@{userProfile?.username}</p>
                    {userProfile?.bio && (
                      <p className="text-sm max-w-md">{userProfile.bio}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{ownedSneakers.length} Sneakers</span>
                      <span>{wishlistItems.length} Wishlist</span>
                      <span>{userReviews?.length || 0} Reviews</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleEditProfile} variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Modal */}
        {editMode && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSaveProfile}
                  disabled={updateProfileMutation.isPending}
                >
                  Save Changes
                </Button>
                <Button onClick={() => setEditMode(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Tabs */}
        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="collection" className="flex items-center space-x-2">
              <Ungroup className="h-4 w-4" />
              <span>Collection ({ownedSneakers.length})</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Wishlist ({wishlistItems.length})</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2">
              <PenTool className="h-4 w-4" />
              <span>Reviews ({userReviews?.length || 0})</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            {ownedSneakers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ownedSneakers.map((item: any) => (
                  <div key={item.id} className="space-y-2">
                    <SneakerCard sneaker={item.sneaker} />
                    <div className="text-sm text-muted-foreground space-y-1">
                      {item.size && <div>Size: {item.size}</div>}
                      {item.condition && <div>Condition: {item.condition}</div>}
                      {item.purchasePrice && (
                        <div>Paid: ${item.purchasePrice}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Ungroup className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Sneakers Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your collection by exploring our catalog
                  </p>
                  <Button>Browse Catalog</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="wishlist">
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item: any) => (
                  <SneakerCard key={item.id} sneaker={item.sneaker} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Empty Wishlist</h3>
                  <p className="text-muted-foreground mb-4">
                    Add sneakers to your wishlist to keep track of what you want
                  </p>
                  <Button>Browse Catalog</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            {userReviews?.length > 0 ? (
              <div className="space-y-4">
                {userReviews.map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{review.sneaker?.name}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < review.rating ? 'text-yellow-400' : 'text-muted-foreground'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && (
                        <h5 className="font-medium mb-2">{review.title}</h5>
                      )}
                      <p className="text-muted-foreground">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <PenTool className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your thoughts on sneakers you own or have tried
                  </p>
                  <Button>Write Your First Review</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {ownedSneakers.length}
                  </div>
                  <div className="text-muted-foreground">Total Sneakers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {wishlistItems.length}
                  </div>
                  <div className="text-muted-foreground">Wishlist Items</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {userReviews?.length || 0}
                  </div>
                  <div className="text-muted-foreground">Reviews Written</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
