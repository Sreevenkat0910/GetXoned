import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from './CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items: cartItems, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = subtotal >= 50000 ? 0 : (subtotal > 0 ? 500 : 0);
  const total = subtotal + shipping;

  const handleQuantityChange = (id: string, currentQuantity: number, delta: number) => {
    updateQuantity(id, currentQuantity + delta);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    window.location.hash = '#checkout';
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-[#f9f7f0] border-l border-[#262930]/10 p-0 flex flex-col h-[calc(100vh-2rem)] mt-8"
      >
        <SheetHeader className="px-6 py-6 border-b border-[#262930]/10">
          <SheetTitle className="uppercase-headline" style={{ fontSize: '16px' }}>
            SHOPPING CART ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center">
              <p className="text-[#404040] mb-4">Your cart is empty</p>
              <Button 
                onClick={onClose}
                className="bg-[#000] hover:bg-[#262930] text-[#f9f7f0] uppercase-headline"
                style={{ fontSize: '11px' }}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-[#262930]/10 last:border-0"
                >
                  {/* Product Image */}
                  <div className="w-20 h-24 bg-white rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p 
                        className="uppercase-headline text-[#262930] mb-1"
                        style={{ fontSize: '11px' }}
                      >
                        {item.category}
                      </p>
                      <h4 className="mb-1" style={{ fontSize: '13px', fontWeight: 600 }}>
                        {item.name}
                      </h4>
                      <p className="text-[#404040]" style={{ fontSize: '11px' }}>
                        Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-[#262930]/20 rounded">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="p-1.5 hover:bg-[#262930]/5 transition-smooth disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="p-1.5 hover:bg-[#262930]/5 transition-smooth"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p style={{ fontSize: '13px', fontWeight: 600 }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-[#404040] hover:text-[#D04007] transition-smooth"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-[#262930]/10 px-6 py-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="uppercase-headline" style={{ fontSize: '11px' }}>
                  Subtotal
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center pb-4 border-b border-[#262930]/10">
                <span className="uppercase-headline" style={{ fontSize: '11px' }}>
                  Shipping
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600 }} className={shipping === 0 ? 'text-[#D04007]' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="uppercase-headline" style={{ fontSize: '12px' }}>
                  Total
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700 }}>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#000] hover:bg-[#262930] text-[#f9f7f0] uppercase-headline h-12"
                  style={{ fontSize: '11px' }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={() => {
                    window.location.hash = '#cart';
                    onClose();
                  }}
                  variant="outline"
                  className="w-full border-[#262930]/20 hover:bg-[#262930]/5 uppercase-headline h-12"
                  style={{ fontSize: '11px' }}
                >
                  View Full Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}