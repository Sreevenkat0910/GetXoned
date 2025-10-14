import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../components/WishlistContext';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Heart, 
  Package, 
  Settings, 
  LogOut,
  Edit,
  Truck,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';

// Mock user data
const userData = {
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1725887150031-d353e5c4ce3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdXNlciUyMGF2YXRhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDI3MzM5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  joinDate: 'January 2024',
  totalOrders: 12,
  totalSpent: 145680
};

// Mock order data
const orders = [
  {
    id: 'ORD-2024-1234',
    date: '2024-10-08',
    status: 'delivered',
    total: 18998,
    items: [
      { name: 'CIPHER HOODIE', size: 'M', quantity: 1, price: 8999 },
      { name: 'URBAN BOMBER', size: 'L', quantity: 1, price: 9999 }
    ],
    tracking: 'TRK123456789',
    deliveryDate: '2024-10-10'
  },
  {
    id: 'ORD-2024-1189',
    date: '2024-09-22',
    status: 'shipped',
    total: 14999,
    items: [
      { name: 'NOIR SNEAKERS', size: '42', quantity: 1, price: 14999 }
    ],
    tracking: 'TRK987654321',
    estimatedDelivery: '2024-10-14'
  },
  {
    id: 'ORD-2024-1156',
    date: '2024-09-10',
    status: 'processing',
    total: 9999,
    items: [
      { name: 'AVANT PANTS', size: 'L', quantity: 1, price: 9999 }
    ]
  }
];

// Mock addresses
const addresses = [
  {
    id: 1,
    type: 'HOME',
    name: 'Alex Chen',
    address: '123, MG Road, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    phone: '+91 98765 43210',
    isDefault: true
  },
  {
    id: 2,
    type: 'OFFICE',
    name: 'Alex Chen',
    address: '456, Tech Park, Whitefield',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
    phone: '+91 98765 43210',
    isDefault: false
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle2 size={20} className="text-green-500" />;
    case 'shipped':
      return <Truck size={20} className="text-[#D04007]" />;
    case 'processing':
      return <Clock size={20} className="text-yellow-600" />;
    default:
      return <Package size={20} />;
  }
};

const getStatusBadge = (status: string) => {
  const variants: Record<string, any> = {
    delivered: 'default',
    shipped: 'secondary',
    processing: 'outline'
  };
  
  return (
    <Badge 
      variant={variants[status]} 
      className={status === 'shipped' ? 'bg-[#D04007] text-white' : ''}
    >
      {status.toUpperCase()}
    </Badge>
  );
};

export function AccountPage() {
  const { wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'account/wishlist') return 'wishlist';
    return 'orders';
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <NavBar />
      
      <main className="pt-28 pb-16">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Header with User Info */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <Avatar className="w-24 h-24 border-4 border-white/30">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-[#D04007] text-white text-2xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 
                  className="uppercase-headline mb-2"
                  style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, letterSpacing: '0.1em' }}
                >
                  {userData.name}
                </h1>
                <p className="opacity-70 mb-3" style={{ fontSize: '13px' }}>
                  {userData.email}
                </p>
                <div className="flex flex-wrap gap-4" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                  <div className="px-3 py-1 frosted-glass border border-white/30 rounded-full">
                    MEMBER SINCE {userData.joinDate.toUpperCase()}
                  </div>
                  <div className="px-3 py-1 frosted-glass border border-white/30 rounded-full">
                    {userData.totalOrders} ORDERS
                  </div>
                  <div className="px-3 py-1 bg-[#D04007] text-white rounded-full">
                    ₹{userData.totalSpent.toLocaleString('en-IN')} SPENT
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  toast.success('Logged out successfully', {
                    description: 'See you soon!'
                  });
                  // In a real app, would handle logout logic here
                }}
                className="flex items-center gap-2 px-4 py-2 border border-[#262930]/20 rounded-sm hover:bg-[#D04007] hover:text-white hover:border-[#D04007] transition-all duration-300"
                style={{ fontSize: '11px', letterSpacing: '0.1em' }}
              >
                <LogOut size={16} />
                LOGOUT
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package size={16} />
                <span className="hidden sm:inline">ORDERS</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart size={16} />
                <span className="hidden sm:inline">WISHLIST</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">PROFILE</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="hidden sm:inline">ADDRESSES</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={16} />
                <span className="hidden sm:inline">SETTINGS</span>
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 
                    className="uppercase-headline"
                    style={{ fontSize: '20px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    ORDER HISTORY
                  </h2>
                  <p className="opacity-70" style={{ fontSize: '12px' }}>
                    {orders.length} Orders
                  </p>
                </div>

                {orders.map((order) => (
                  <div 
                    key={order.id}
                    className="frosted-glass border border-white/30 rounded-sm p-6 hover:border-[#D04007]/30 transition-colors duration-300"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <p 
                            className="uppercase-headline mb-1"
                            style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                          >
                            {order.id}
                          </p>
                          <p className="opacity-60" style={{ fontSize: '11px' }}>
                            Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <p 
                          className="price-outlined"
                          style={{ fontSize: '18px' }}
                        >
                          ₹{order.total.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <p className="uppercase-headline" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                              {item.name}
                            </p>
                            <p className="opacity-60" style={{ fontSize: '10px' }}>
                              Size: {item.size} • Qty: {item.quantity}
                            </p>
                          </div>
                          <p style={{ fontSize: '12px' }}>
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Info */}
                    {order.tracking && (
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-white/20">
                        <div>
                          {order.status === 'delivered' && (
                            <p className="text-green-600 mb-1" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                              ✓ Delivered on {new Date(order.deliveryDate!).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'long' 
                              })}
                            </p>
                          )}
                          {order.status === 'shipped' && (
                            <p className="text-[#D04007] mb-1" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                              📦 Estimated delivery: {new Date(order.estimatedDelivery!).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'long' 
                              })}
                            </p>
                          )}
                          <p className="opacity-60" style={{ fontSize: '10px' }}>
                            Tracking: {order.tracking}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            className="px-4 py-2 border border-[#262930]/20 rounded-sm hover:border-[#D04007] hover:text-[#D04007] transition-colors duration-300"
                            style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                          >
                            TRACK ORDER
                          </button>
                          <button 
                            className="px-4 py-2 bg-[#D04007] text-white rounded-sm hover:bg-[#ff6b1a] transition-colors duration-300"
                            style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                          >
                            VIEW DETAILS
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 
                    className="uppercase-headline"
                    style={{ fontSize: '20px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    MY WISHLIST
                  </h2>
                  <p className="opacity-70" style={{ fontSize: '12px' }}>
                    {wishlistItems.length} Items
                  </p>
                </div>

                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <ProductCard key={item.id} {...item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 frosted-glass border border-white/30 rounded-sm">
                    <Heart size={48} className="mx-auto mb-4 opacity-30" />
                    <h3 
                      className="uppercase-headline mb-2"
                      style={{ fontSize: '16px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      YOUR WISHLIST IS EMPTY
                    </h3>
                    <p className="mb-6 opacity-70" style={{ fontSize: '13px' }}>
                      Save your favorite items for later
                    </p>
                    <a
                      href="#capsule"
                      className="inline-block px-6 py-3 bg-[#D04007] text-white uppercase-headline transition-all duration-300 hover:bg-[#ff6b1a] hover:scale-105"
                      style={{ fontSize: '11px', letterSpacing: '0.2em' }}
                    >
                      BROWSE COLLECTION
                    </a>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 
                    className="uppercase-headline"
                    style={{ fontSize: '20px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    PROFILE INFORMATION
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#262930]/20 rounded-sm hover:border-[#D04007] hover:text-[#D04007] transition-colors duration-300"
                    style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                  >
                    <Edit size={14} />
                    {isEditing ? 'CANCEL' : 'EDIT'}
                  </button>
                </div>

                <div className="frosted-glass border border-white/30 rounded-sm p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="uppercase-headline mb-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                          FIRST NAME
                        </Label>
                        <Input 
                          id="firstName"
                          defaultValue="Alex"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="uppercase-headline mb-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                          LAST NAME
                        </Label>
                        <Input 
                          id="lastName"
                          defaultValue="Chen"
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="uppercase-headline mb-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                        EMAIL
                      </Label>
                      <Input 
                        id="email"
                        type="email"
                        defaultValue={userData.email}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="uppercase-headline mb-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                        PHONE NUMBER
                      </Label>
                      <Input 
                        id="phone"
                        type="tel"
                        defaultValue={userData.phone}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            toast.success('Profile updated', {
                              description: 'Your changes have been saved'
                            });
                          }}
                          className="flex-1 py-3 bg-[#D04007] text-white uppercase-headline transition-all duration-300 hover:bg-[#ff6b1a]"
                          style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                        >
                          SAVE CHANGES
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex-1 py-3 border border-[#262930]/20 uppercase-headline transition-colors duration-300 hover:border-[#D04007]"
                          style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                        >
                          CANCEL
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 
                    className="uppercase-headline"
                    style={{ fontSize: '20px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    SAVED ADDRESSES
                  </h2>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-[#D04007] text-white rounded-sm hover:bg-[#ff6b1a] transition-colors duration-300"
                    style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                  >
                    + ADD NEW ADDRESS
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div 
                      key={address.id}
                      className="frosted-glass border border-white/30 rounded-sm p-6 hover:border-[#D04007]/30 transition-colors duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={address.isDefault ? 'default' : 'outline'} className={address.isDefault ? 'bg-[#D04007]' : ''}>
                            {address.type}
                          </Badge>
                          {address.isDefault && (
                            <span className="uppercase-headline text-[#D04007]" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <button className="text-[#262930]/40 hover:text-[#D04007] transition-colors">
                          <Edit size={16} />
                        </button>
                      </div>

                      <div className="space-y-1" style={{ fontSize: '13px' }}>
                        <p className="uppercase-headline" style={{ fontSize: '12px', letterSpacing: '0.05em', fontWeight: 600 }}>
                          {address.name}
                        </p>
                        <p className="opacity-80">{address.address}</p>
                        <p className="opacity-80">{address.city}, {address.state} - {address.pincode}</p>
                        <p className="opacity-70">Phone: {address.phone}</p>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-white/20">
                        {!address.isDefault && (
                          <button
                            className="flex-1 py-2 border border-[#262930]/20 rounded-sm hover:border-[#D04007] hover:text-[#D04007] transition-colors duration-300"
                            style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                          >
                            SET AS DEFAULT
                          </button>
                        )}
                        <button
                          className="py-2 px-4 text-red-500 hover:bg-red-50 rounded-sm transition-colors duration-300"
                          style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="max-w-2xl">
                <h2 
                  className="uppercase-headline mb-6"
                  style={{ fontSize: '20px', letterSpacing: '0.1em', fontWeight: 600 }}
                >
                  ACCOUNT SETTINGS
                </h2>

                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="frosted-glass border border-white/30 rounded-sm p-6">
                    <h3 
                      className="uppercase-headline mb-4"
                      style={{ fontSize: '14px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      CHANGE PASSWORD
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword" className="uppercase-headline mb-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                          CURRENT PASSWORD
                        </Label>
                        <Input 
                          id="currentPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword" className="uppercase-headline mb-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                          NEW PASSWORD
                        </Label>
                        <Input 
                          id="newPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="uppercase-headline mb-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                          CONFIRM NEW PASSWORD
                        </Label>
                        <Input 
                          id="confirmPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                      <button
                        className="w-full py-3 bg-[#D04007] text-white uppercase-headline transition-all duration-300 hover:bg-[#ff6b1a]"
                        style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                      >
                        UPDATE PASSWORD
                      </button>
                    </div>
                  </div>

                  {/* Email Preferences */}
                  <div className="frosted-glass border border-white/30 rounded-sm p-6">
                    <h3 
                      className="uppercase-headline mb-4"
                      style={{ fontSize: '14px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      EMAIL PREFERENCES
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#D04007]" />
                        <span style={{ fontSize: '12px' }}>New arrivals and product launches</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#D04007]" />
                        <span style={{ fontSize: '12px' }}>Exclusive offers and promotions</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="accent-[#D04007]" />
                        <span style={{ fontSize: '12px' }}>Order updates and shipping notifications</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="accent-[#D04007]" />
                        <span style={{ fontSize: '12px' }}>Style tips and fashion news</span>
                      </label>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div className="frosted-glass border border-red-200 rounded-sm p-6">
                    <h3 
                      className="uppercase-headline mb-2 text-red-600"
                      style={{ fontSize: '14px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      DANGER ZONE
                    </h3>
                    <p className="mb-4 opacity-70" style={{ fontSize: '12px' }}>
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors duration-300"
                          style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                        >
                          DELETE ACCOUNT
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="frosted-glass border border-white/30">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="uppercase-headline" style={{ fontSize: '16px', letterSpacing: '0.1em' }}>
                            Delete Account
                          </AlertDialogTitle>
                          <AlertDialogDescription style={{ fontSize: '13px', lineHeight: 1.6 }}>
                            Are you sure you want to delete your account? This action cannot be undone. 
                            All your data, orders, and wishlist will be permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="uppercase-headline" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              toast.error('Account deleted', {
                                description: 'Your account has been removed'
                              });
                            }}
                            className="bg-red-500 hover:bg-red-600 uppercase-headline"
                            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}