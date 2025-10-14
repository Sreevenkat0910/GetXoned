import { Package, CreditCard, MapPin, User } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Order } from "../utils/mockData";

interface OrderDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

export function OrderDetailsDrawer({ open, onClose, order }: OrderDetailsDrawerProps) {
  if (!order) return null;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'pending':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'cancelled':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return '';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'failed':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return '';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-white dark:bg-[#1a1a1a]">
        <SheetHeader className="space-y-3 pb-6">
          <SheetTitle className="text-[#262930] dark:text-white">
            Order Details
          </SheetTitle>
          <SheetDescription className="text-[#404040] dark:text-gray-400">
            {order.orderId}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* Status Cards */}
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-[#F8F8F8] dark:bg-[#262930] rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-[#1a1a1a] rounded-lg">
                  <Package className="w-5 h-5 text-[#262930] dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-[#404040] dark:text-gray-400 mb-1">Order Status</p>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-[#F8F8F8] dark:bg-[#262930] rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-[#1a1a1a] rounded-lg">
                  <CreditCard className="w-5 h-5 text-[#262930] dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-[#404040] dark:text-gray-400 mb-1">Payment Status</p>
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-[#E5E5E5] dark:bg-[#2a2a2a]" />

          {/* Customer Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#A00000]" />
              <h3 className="text-[#262930] dark:text-white">Customer Information</h3>
            </div>
            <div className="space-y-3 pl-7">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#404040] dark:text-gray-400">Name</span>
                <span className="text-sm text-[#262930] dark:text-white">{order.customerName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#404040] dark:text-gray-400">Email</span>
                <span className="text-sm text-[#262930] dark:text-white">{order.customerEmail}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-[#E5E5E5] dark:bg-[#2a2a2a]" />

          {/* Shipping Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#CC5500]" />
              <h3 className="text-[#262930] dark:text-white">Shipping Address</h3>
            </div>
            <div className="pl-7">
              <p className="text-sm text-[#262930] dark:text-white leading-relaxed">
                {order.shippingAddress}
              </p>
            </div>
          </div>

          <Separator className="bg-[#E5E5E5] dark:bg-[#2a2a2a]" />

          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#404040] dark:text-gray-400" />
              <h3 className="text-[#262930] dark:text-white">Order Items</h3>
            </div>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div 
                  key={index}
                  className="p-4 bg-[#F8F8F8] dark:bg-[#262930] rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-[#262930] dark:text-white">
                        {item.productName}
                      </p>
                      <p className="text-xs text-[#404040] dark:text-gray-400 mt-1">
                        {item.capsuleName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#262930] dark:text-white">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#404040] dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-[#262930] dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-[#E5E5E5] dark:bg-[#2a2a2a]" />

          {/* Order Summary */}
          <div className="space-y-3 p-4 bg-[#F8F8F8] dark:bg-[#262930] rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#404040] dark:text-gray-400">Subtotal</span>
              <span className="text-sm text-[#262930] dark:text-white">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#404040] dark:text-gray-400">Shipping</span>
              <span className="text-sm text-[#262930] dark:text-white">Free</span>
            </div>
            <Separator className="bg-[#E5E5E5] dark:bg-[#2a2a2a]" />
            <div className="flex justify-between items-center pt-1">
              <span className="text-[#262930] dark:text-white">Total</span>
              <span className="text-lg text-[#A00000]">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Order Date */}
          <div className="pt-2 pb-6">
            <div className="text-xs text-[#404040] dark:text-gray-400 text-center">
              Order placed on {order.createdAt}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
