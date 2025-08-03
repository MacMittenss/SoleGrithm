import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Settings, 
  Heart, 
  Star,
  Crown,
  LogOut,
  Shield,
  Bell,
  Smartphone,
  Camera,
  Loader2,
  Trophy,
  Package,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { logout, updateUserProfile } from '@/lib/firebase';
import { useLocation } from 'wouter';

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    displayName: user?.displayName || '',
    bio: '',
    location: '',
    website: ''
  });
  
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Mock user stats - in real app, fetch from backend
  const userStats = {
    sneakersOwned: 42,
    wishlistItems: 18,
    reviewsWritten: 15,
    collectionsCreated: 6,
    totalSpent: 2850,
    memberSince: new Date(2023, 5, 15),
    level: 'Sneaker Enthusiast',
    badges: ['Early Adopter', 'Review Master', 'Trend Setter']
  };

  const handleProfileSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      await updateUserProfile(user, {
        displayName: editedProfile.displayName
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">Access Denied</h2>
            <p className="text-muted-foreground">
              Please sign in to view your profile.
            </p>
            <Button onClick={() => setLocation('/auth')} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Avatar */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                      {user.displayName?.split(' ').map(n => n[0]).join('') || 
                       user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    data-testid="button-edit-avatar"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  {!isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h1 className="text-2xl sm:text-3xl font-bold">
                          {user.displayName || 'Sneaker Enthusiast'}
                        </h1>
                        <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          {userStats.level}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Member since {userStats.memberSince.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input
                            id="displayName"
                            value={editedProfile.displayName}
                            onChange={(e) => setEditedProfile(prev => ({ 
                              ...prev, 
                              displayName: e.target.value 
                            }))}
                            placeholder="Your display name"
                            data-testid="input-edit-display-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editedProfile.location}
                            onChange={(e) => setEditedProfile(prev => ({ 
                              ...prev, 
                              location: e.target.value 
                            }))}
                            placeholder="Your location"
                            data-testid="input-edit-location"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {!isEditing ? (
                      <>
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="flex items-center gap-2"
                          data-testid="button-edit-profile"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </Button>
                        <Button
                          onClick={handleSignOut}
                          variant="outline"
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                          data-testid="button-sign-out"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={handleProfileSave}
                          disabled={isSaving}
                          className="flex items-center gap-2"
                          data-testid="button-save-profile"
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="flex items-center gap-2"
                          data-testid="button-cancel-edit"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* User Badges */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  {userStats.badges.map((badge, index) => (
                    <motion.div
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {badge}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Sneakers Owned', value: userStats.sneakersOwned, icon: Package, color: 'text-blue-600' },
              { label: 'Wishlist Items', value: userStats.wishlistItems, icon: Heart, color: 'text-red-600' },
              { label: 'Reviews Written', value: userStats.reviewsWritten, icon: Star, color: 'text-yellow-600' },
              { label: 'Collections', value: userStats.collectionsCreated, icon: TrendingUp, color: 'text-green-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Profile Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="collection" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="collection">Collection</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="collection" className="space-y-4">
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    My Sneaker Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No sneakers in collection yet</h3>
                    <p className="mb-4">Start building your collection by adding sneakers you own.</p>
                    <Button variant="outline" data-testid="button-add-sneaker">
                      Add Your First Sneaker
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist" className="space-y-4">
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="mb-4">Save sneakers you want to buy later.</p>
                    <Button variant="outline" data-testid="button-browse-sneakers">
                      Browse Sneakers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    My Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No reviews written yet</h3>
                    <p className="mb-4">Share your thoughts about sneakers you own or have tried.</p>
                    <Button variant="outline" data-testid="button-write-review">
                      Write Your First Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new releases and price drops
                        </p>
                      </div>
                      <Button variant="outline" size="sm" data-testid="button-toggle-notifications">
                        <Bell className="w-4 h-4 mr-2" />
                        Enabled
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">
                          Download the SoleGrithm mobile app
                        </p>
                      </div>
                      <Button variant="outline" size="sm" data-testid="button-download-app">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Privacy Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Manage your privacy and data preferences
                        </p>
                      </div>
                      <Button variant="outline" size="sm" data-testid="button-privacy-settings">
                        <Shield className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}