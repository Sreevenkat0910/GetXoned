import { useState, useMemo } from 'react';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';

// Mock product data
const allProducts = [
  {
    id: '1',
    name: 'CIPHER HOODIE',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBob29kaWUlMjBzdHJlZXR8ZW58MXx8fHwxNzYwMjczOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'ESSENTIALS',
    isNew: true,
    stock: 12,
    colors: ['#000000', '#1a1a1a', '#262930']
  },
  {
    id: '2',
    name: 'MINIMAL TEE',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdHNoaXJ0JTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNzM5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'BASICS',
    stock: 25,
    colors: ['#ffffff', '#000000', '#f9f7f0']
  },
  {
    id: '3',
    name: 'URBAN BOMBER',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqYWNrZXQlMjB1cmJhbnxlbnwxfHx8fDE3NjAyNzM5MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'OUTERWEAR',
    isNew: true,
    stock: 3,
    colors: ['#000000', '#404040', '#262930', '#1a1a1a']
  },
  {
    id: '4',
    name: 'AVANT PANTS',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBhbnRzJTIwYmxhY2t8ZW58MXx8fHwxNzYwMjczOTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'BOTTOMS',
    stock: 8,
    colors: ['#000000', '#262930']
  },
  {
    id: '5',
    name: 'CIPHER BACKPACK',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzYwMjczOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'ACCESSORIES',
    stock: 15,
    colors: ['#000000']
  },
  {
    id: '6',
    name: 'NOIR SNEAKERS',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc25lYWtlcnMlMjBmYXNoaW9ufGVufDF8fHx8MTc2MDI3MzkzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'FOOTWEAR',
    stock: 0,
    colors: ['#000000', '#ffffff']
  },
  {
    id: '7',
    name: 'LUXURY COAT',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb2F0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NjAyNzQwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'OUTERWEAR',
    isNew: true,
    stock: 4,
    colors: ['#000000', '#262930']
  },
  {
    id: '8',
    name: 'ESSENTIAL SHORTS',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc2hvcnRzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjAyNzQwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'BOTTOMS',
    stock: 18,
    colors: ['#000000', '#404040', '#f9f7f0']
  }
];

const categories = ['ALL', 'ESSENTIALS', 'BASICS', 'OUTERWEAR', 'BOTTOMS', 'ACCESSORIES', 'FOOTWEAR'];
const sortOptions = [
  { value: 'newest', label: 'NEWEST FIRST' },
  { value: 'price-low', label: 'PRICE: LOW TO HIGH' },
  { value: 'price-high', label: 'PRICE: HIGH TO LOW' },
  { value: 'name', label: 'NAME: A-Z' }
];

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showInStock, setShowInStock] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search query filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      
      // Price range filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Stock filter
      const matchesStock = !showInStock || product.stock > 0;
      
      // New only filter
      const matchesNew = !showNewOnly || product.isNew;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesNew;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy, showInStock, showNewOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setPriceRange([0, 30000]);
    setShowInStock(false);
    setShowNewOnly(false);
    setSortBy('newest');
  };

  const activeFilterCount = [
    selectedCategory !== 'ALL',
    priceRange[0] !== 0 || priceRange[1] !== 30000,
    showInStock,
    showNewOnly
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <NavBar />
      
      <main className="pt-28 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 
              className="uppercase-headline mb-2"
              style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              SEARCH
            </h1>
            <p style={{ fontSize: '13px', opacity: 0.7 }}>
              Find your perfect piece from our collection
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH FOR PRODUCTS..."
                className="w-full pl-12 pr-12 py-4 frosted-glass border border-white/30 rounded-sm focus:outline-none focus:border-[#D04007] transition-colors duration-300"
                style={{ fontSize: '12px', letterSpacing: '0.05em' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#404040] hover:text-[#D04007] transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Filter and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 frosted-glass border border-white/30 rounded-sm hover:border-[#D04007] transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.1em' }}
            >
              <SlidersHorizontal size={16} />
              FILTERS
              {activeFilterCount > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-[#D04007] text-white rounded-full" style={{ fontSize: '9px' }}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span className="uppercase-headline opacity-70" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
                {filteredProducts.length} RESULTS
              </span>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 frosted-glass border border-white/30 rounded-sm focus:outline-none focus:border-[#D04007] transition-colors duration-300 cursor-pointer"
                style={{ fontSize: '11px', letterSpacing: '0.05em' }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mb-8 p-6 frosted-glass border border-white/30 rounded-sm">
              <div className="grid md:grid-cols-4 gap-8">
                {/* Categories */}
                <div>
                  <h3 
                    className="uppercase-headline mb-4"
                    style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    CATEGORY
                  </h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-sm transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-[#D04007] text-white'
                            : 'hover:bg-white/40'
                        }`}
                        style={{ fontSize: '11px', letterSpacing: '0.05em' }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 
                    className="uppercase-headline mb-4"
                    style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    PRICE RANGE
                  </h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={30000}
                      step={1000}
                      className="mt-2"
                    />
                    <div className="flex justify-between" style={{ fontSize: '11px' }}>
                      <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                      <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 
                    className="uppercase-headline mb-4"
                    style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    AVAILABILITY
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="in-stock"
                        checked={showInStock}
                        onCheckedChange={(checked) => setShowInStock(checked as boolean)}
                      />
                      <label
                        htmlFor="in-stock"
                        className="cursor-pointer"
                        style={{ fontSize: '11px', letterSpacing: '0.05em' }}
                      >
                        IN STOCK ONLY
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="new-only"
                        checked={showNewOnly}
                        onCheckedChange={(checked) => setShowNewOnly(checked as boolean)}
                      />
                      <label
                        htmlFor="new-only"
                        className="cursor-pointer"
                        style={{ fontSize: '11px', letterSpacing: '0.05em' }}
                      >
                        NEW ARRIVALS ONLY
                      </label>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 border border-[#262930]/20 rounded-sm hover:bg-[#D04007] hover:text-white hover:border-[#D04007] transition-all duration-300"
                    style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                  >
                    CLEAR ALL FILTERS
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6">
                <Search size={48} className="mx-auto opacity-30" />
              </div>
              <h3 
                className="uppercase-headline mb-4"
                style={{ fontSize: '18px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                NO RESULTS FOUND
              </h3>
              <p className="mb-6 opacity-70" style={{ fontSize: '13px' }}>
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-[#D04007] text-white uppercase-headline transition-all duration-300 hover:bg-[#ff6b1a] hover:scale-105"
                style={{ fontSize: '11px', letterSpacing: '0.2em' }}
              >
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
