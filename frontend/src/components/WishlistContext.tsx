import { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  stock?: number;
  isNew?: boolean;
  colors?: string[];
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Mock initial wishlist items
const initialWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'PHANTOM TEE',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    category: 'T-SHIRTS',
    inStock: true,
    stock: 10,
    colors: ['#000000', '#ffffff']
  },
  {
    id: '2',
    name: 'ONYX JACKET',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
    category: 'JACKETS',
    inStock: true,
    stock: 5,
    isNew: true,
    colors: ['#000000']
  },
  {
    id: '3',
    name: 'NOIR BOOTS',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1542840410-3092f99611a3?w=400&h=500&fit=crop',
    category: 'FOOTWEAR',
    inStock: false,
    stock: 0,
    colors: ['#000000']
  }
];

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
