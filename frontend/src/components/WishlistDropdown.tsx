import { Heart, X, ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useWishlist } from './WishlistContext';

interface WishlistDropdownProps {
  itemCount?: number;
}

export function WishlistDropdown({ itemCount }: WishlistDropdownProps) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const count = itemCount ?? wishlistItems.length;

  const handleRemoveItem = (id: string) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (id: string) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', id);
  };

  const handleViewProduct = (id: string) => {
    window.location.hash = `#product/${id}`;
  };

  const handleViewAllWishlist = () => {
    window.location.hash = '#account/wishlist';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="transition-smooth hover:text-[#D04007] relative">
          <Heart size={18} />
          {count > 0 && (
            <span 
              className="absolute -top-1 -right-1 bg-[#D04007] text-white rounded-full w-4 h-4 flex items-center justify-center" 
              style={{ fontSize: '9px' }}
            >
              {count}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-[#f9f7f0] border-[#262930]/10 p-0 mt-2"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#262930]/10">
          <h3 className="uppercase-headline" style={{ fontSize: '12px' }}>
            Wishlist ({count})
          </h3>
        </div>

        {/* Content */}
        {wishlistItems.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Heart className="mx-auto mb-2 text-[#404040]" size={32} />
            <p className="text-[#404040]" style={{ fontSize: '12px' }}>
              Your wishlist is empty
            </p>
          </div>
        ) : (
          <>
            {/* Wishlist Items */}
            <div className="max-h-96 overflow-y-auto">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 border-b border-[#262930]/10 last:border-0 hover:bg-[#262930]/5 transition-smooth"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <button
                      onClick={() => handleViewProduct(item.id)}
                      className="w-16 h-20 bg-white rounded overflow-hidden flex-shrink-0"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <p
                          className="uppercase-headline text-[#404040] mb-0.5"
                          style={{ fontSize: '9px' }}
                        >
                          {item.category}
                        </p>
                        <button
                          onClick={() => handleViewProduct(item.id)}
                          className="text-left hover:text-[#D04007] transition-smooth"
                        >
                          <h4 
                            className="truncate" 
                            style={{ fontSize: '12px', fontWeight: 600 }}
                          >
                            {item.name}
                          </h4>
                        </button>
                        <p style={{ fontSize: '12px', fontWeight: 600 }} className="mt-0.5">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          onClick={() => handleAddToCart(item.id)}
                          disabled={!item.inStock}
                          size="sm"
                          className="flex-1 bg-[#000] hover:bg-[#262930] text-[#f9f7f0] uppercase-headline h-7 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontSize: '9px' }}
                        >
                          {item.inStock ? (
                            <>
                              <ShoppingCart size={10} className="mr-1" />
                              Add to Cart
                            </>
                          ) : (
                            'Out of Stock'
                          )}
                        </Button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-[#404040] hover:text-[#D04007] transition-smooth p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[#262930]/10">
              <Button
                onClick={handleViewAllWishlist}
                variant="outline"
                className="w-full border-[#262930]/20 hover:bg-[#262930]/5 uppercase-headline h-9"
                style={{ fontSize: '10px' }}
              >
                View All Items
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}