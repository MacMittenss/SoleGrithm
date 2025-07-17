import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ungroup, Heart, MoreVertical, Edit, Trash2, DollarSign, TrendingUp, Grid, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SneakerCard from "@/components/SneakerCard";

interface CollectionItem {
  id: number;
  sneaker: any;
  size?: string;
  condition?: string;
  purchasePrice?: string;
  purchaseDate?: string;
  notes?: string;
  isWishlist: boolean;
}

export default function CollectionPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date_added');
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);
  const [editForm, setEditForm] = useState({
    size: '',
    condition: 'new',
    purchasePrice: '',
    purchaseDate: '',
    notes: ''
  });

  const { data: collections, isLoading } = useQuery({
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

  const removeFromCollectionMutation = useMutation({
    mutationFn: async (sneakerId: number) => {
      const response = await fetch(`/api/user/collections/${sneakerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      if (!response.ok) throw new Error('Failed to remove from collection');
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Removed from collection"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/collections'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    }
  });

  const updateCollectionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CollectionItem> }) => {
      const response = await fetch(`/api/user/collections/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update collection item');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Ungroup updated"
      });
      setEditingItem(null);
      queryClient.invalidateQueries({ queryKey: ['/api/user/collections'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update item",
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
              Please sign in to view your collection
            </p>
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ownedSneakers = collections?.filter((item: CollectionItem) => !item.isWishlist) || [];
  const wishlistItems = wishlist || [];

  const totalValue = ownedSneakers.reduce((sum: number, item: CollectionItem) => {
    return sum + (parseFloat(item.purchasePrice || '0'));
  }, 0);

  const handleEditItem = (item: CollectionItem) => {
    setEditingItem(item);
    setEditForm({
      size: item.size || '',
      condition: item.condition || 'new',
      purchasePrice: item.purchasePrice || '',
      purchaseDate: item.purchaseDate || '',
      notes: item.notes || ''
    });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      updateCollectionMutation.mutate({
        id: editingItem.id,
        data: editForm
      });
    }
  };

  const sortedCollections = [...ownedSneakers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.sneaker.name.localeCompare(b.sneaker.name);
      case 'brand':
        return (a.sneaker.brand?.name || '').localeCompare(b.sneaker.brand?.name || '');
      case 'price':
        return parseFloat(b.purchasePrice || '0') - parseFloat(a.purchasePrice || '0');
      case 'date_added':
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  const sortedWishlist = [...wishlistItems].sort((a, b) => {
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            My Ungroup
          </h1>
          <p className="text-xl text-muted-foreground">
            Track and manage your sneaker collection
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Ungroup className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{ownedSneakers.length}</div>
              <div className="text-sm text-muted-foreground">Total Sneakers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{wishlistItems.length}</div>
              <div className="text-sm text-muted-foreground">Wishlist Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">${totalValue.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">
                {ownedSneakers.length > 0 ? (totalValue / ownedSneakers.length).toFixed(0) : '0'}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Value</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="collection">
              Ungroup ({ownedSneakers.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              Wishlist ({wishlistItems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="space-y-6">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date_added">Date Added</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Ungroup Items */}
            {sortedCollections.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {sortedCollections.map((item: CollectionItem) => (
                  <div key={item.id} className={viewMode === 'grid' ? "space-y-3" : ""}>
                    {viewMode === 'grid' ? (
                      <>
                        <div className="relative group">
                          <SneakerCard sneaker={item.sneaker} />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => removeFromCollectionMutation.mutate(item.sneaker.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="space-y-1 text-sm">
                          {item.size && <div><strong>Size:</strong> {item.size}</div>}
                          {item.condition && (
                            <div className="flex items-center space-x-2">
                              <strong>Condition:</strong>
                              <Badge variant="secondary">{item.condition}</Badge>
                            </div>
                          )}
                          {item.purchasePrice && (
                            <div><strong>Paid:</strong> ${item.purchasePrice}</div>
                          )}
                          {item.purchaseDate && (
                            <div><strong>Bought:</strong> {new Date(item.purchaseDate).toLocaleDateString()}</div>
                          )}
                        </div>
                      </>
                    ) : (
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.sneaker.images?.[0] || "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150"}
                              alt={item.sneaker.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.sneaker.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.sneaker.brand?.name}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                {item.size && <span>Size: {item.size}</span>}
                                {item.condition && <Badge variant="secondary">{item.condition}</Badge>}
                                {item.purchasePrice && <span>${item.purchasePrice}</span>}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => removeFromCollectionMutation.mutate(item.sneaker.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    )}
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

          <TabsContent value="wishlist" className="space-y-6">
            {sortedWishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedWishlist.map((item: CollectionItem) => (
                  <div key={item.id} className="relative group">
                    <SneakerCard sneaker={item.sneaker} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onClick={() => removeFromCollectionMutation.mutate(item.sneaker.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove from Wishlist
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
        </Tabs>

        {/* Edit Item Dialog */}
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Ungroup Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  value={editForm.size}
                  onChange={(e) => setEditForm(prev => ({ ...prev, size: e.target.value }))}
                  placeholder="e.g., 10.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={editForm.condition} onValueChange={(value) => setEditForm(prev => ({ ...prev, condition: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like_new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={editForm.purchasePrice}
                  onChange={(e) => setEditForm(prev => ({ ...prev, purchasePrice: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={editForm.purchaseDate}
                  onChange={(e) => setEditForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editForm.notes}
                  onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes..."
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveEdit} disabled={updateCollectionMutation.isPending}>
                  Save Changes
                </Button>
                <Button onClick={() => setEditingItem(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
