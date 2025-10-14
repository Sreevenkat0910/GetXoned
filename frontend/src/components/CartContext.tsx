import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('xoned-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('xoned-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );

      if (existingItem) {
        toast.success('Quantity updated', {
          description: `${newItem.name} quantity increased`
        });
        return prevItems.map(item =>
          item.id === existingItem.id && item.size === existingItem.size && item.color === existingItem.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success('Added to cart', {
        description: `${newItem.name} - ${newItem.size}`
      });
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (item) {
        toast.info('Removed from cart', {
          description: item.name
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Cart cleared');
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
