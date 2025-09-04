import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X, ChevronDown } from "lucide-react";

interface Brand {
  id: number;
  name: string;
  slug: string;
}

interface FilterState {
  search: string;
  brandId?: number;
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  condition: string[];
  sortBy: string;
}

interface SearchFilterProps {
  filters: FilterState;
  brands: Brand[];
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const CATEGORIES = [
  "Basketball", "Running", "Lifestyle", "Skateboarding", "Training",
  "Retro", "Limited Edition", "Collaboration", "Classic"
];

const SIZES = [
  "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", 
  "10.5", "11", "11.5", "12", "12.5", "13", "14", "15"
];

const CONDITIONS = [
  "New", "Like New", "Good", "Fair", "Poor"
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
  { value: "popularity", label: "Most Popular" }
];

export default function SearchFilter({ filters, brands, onFilterChange }: SearchFilterProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange || [0, 1000]);

  const handleSearchChange = (value: string) => {
    onFilterChange({ search: value });
  };

  const handleBrandChange = (brandId: string) => {
    onFilterChange({ brandId: brandId === "all" ? undefined : parseInt(brandId) });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ categories: newCategories });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes?.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...(filters.sizes || []), size];
    onFilterChange({ sizes: newSizes });
  };

  const handleConditionToggle = (condition: string) => {
    const newConditions = filters.condition?.includes(condition)
      ? filters.condition.filter(c => c !== condition)
      : [...(filters.condition || []), condition];
    onFilterChange({ condition: newConditions });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setLocalPriceRange([values[0], values[1]]);
  };

  const handlePriceRangeCommit = (values: number[]) => {
    onFilterChange({ priceRange: [values[0], values[1]] });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ sortBy });
  };

  const clearAllFilters = () => {
    onFilterChange({
      search: "",
      brandId: undefined,
      categories: [],
      priceRange: [0, 1000],
      sizes: [],
      condition: [],
      sortBy: "relevance"
    });
    setLocalPriceRange([0, 1000]);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.brandId) count++;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000)) count++;
    if (filters.sizes && filters.sizes.length > 0) count++;
    if (filters.condition && filters.condition.length > 0) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Search and Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search sneakers..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Brand Filter */}
          <Select value={filters.brandId?.toString() || "all"} onValueChange={handleBrandChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id.toString()}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={filters.sortBy || "relevance"} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Advanced Filter Toggle */}
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>

        {/* Advanced Filters */}
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleContent className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={filters.categories.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                    {filters.categories.includes(category) && (
                      <X className="h-3 w-3 ml-2" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">
                Price Range: ${localPriceRange[0]} - ${localPriceRange[1]}
              </h4>
              <Slider
                value={localPriceRange}
                onValueChange={handlePriceRangeChange}
                onValueCommit={handlePriceRangeCommit}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="font-medium mb-3">Sizes</h4>
              <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
                {SIZES.map((size) => (
                  <Button
                    key={size}
                    variant={filters.sizes?.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSizeToggle(size)}
                    className="aspect-square p-0"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <h4 className="font-medium mb-3">Condition</h4>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((condition) => (
                  <Button
                    key={condition}
                    variant={filters.condition?.includes(condition) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleConditionToggle(condition)}
                  >
                    {condition}
                    {filters.condition?.includes(condition) && (
                      <X className="h-3 w-3 ml-2" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <div className="flex justify-end">
                <Button variant="ghost" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Active Filter Tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {filters.search}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => handleSearchChange("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.brandId && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {brands.find(b => b.id === filters.brandId)?.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => handleBrandChange("all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => handleCategoryToggle(category)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
