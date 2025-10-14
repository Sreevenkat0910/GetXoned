import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useCart } from '../components/CartContext';
import { isValidEmail, isValidIndianPhone, isValidPincode } from '../utils/performance';
import { Lock, CreditCard, Wallet, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';

export function CheckoutPage() {
  const { items: cartItems, subtotal: cartSubtotal } = useCart();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Calculate totals
  const subtotal = cartSubtotal;
  const shipping = subtotal >= 50000 ? 0 : (subtotal > 0 ? 500 : 0);
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingData(prev => ({ ...prev, [field]: value }));
  };

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(shippingData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!shippingData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!isValidIndianPhone(shippingData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!shippingData.address.trim()) newErrors.address = 'Address is required';
    if (!shippingData.city.trim()) newErrors.city = 'City is required';
    if (!shippingData.state.trim()) newErrors.state = 'State is required';
    if (!shippingData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!isValidPincode(shippingData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const proceedToPayment = () => {
    if (!validateShipping()) {
      toast.error('Please fix the errors', {
        description: 'Check all required fields and try again'
      });
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRazorpayPayment = () => {
    // Initialize Razorpay (this is a mock - in production, you'd get the key from environment variables)
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with actual Razorpay key
      amount: total * 100, // Amount in paise
      currency: 'INR',
      name: 'XONED',
      description: 'Fashion Purchase',
      image: '/logo.png', // Your logo
      order_id: '', // This should come from your backend after creating an order
      handler: function (response: any) {
        // Payment success
        console.log('Payment successful:', response);
        setStep('success');
      },
      prefill: {
        name: `${shippingData.firstName} ${shippingData.lastName}`,
        email: shippingData.email,
        contact: shippingData.phone
      },
      notes: {
        address: shippingData.address
      },
      theme: {
        color: '#D04007'
      },
      modal: {
        ondismiss: function() {
          toast.warning('Payment cancelled', {
            description: 'You can try again when ready'
          });
        }
      }
    };

    // In a real implementation, you would load Razorpay script dynamically
    // const rzp = new window.Razorpay(options);
    // rzp.open();
    
    // For demo purposes, we'll simulate success
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const placeOrder = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else if (paymentMethod === 'cod') {
      // Cash on Delivery
      setTimeout(() => {
        setStep('success');
      }, 1000);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen">
        <AnnouncementBar />
        <NavBar />
        
        <main className="pt-28 pb-16">
          <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center">
            <div className="mb-8">
              <CheckCircle2 size={80} className="mx-auto mb-6 text-green-500" />
              <h1 
                className="uppercase-headline mb-4"
                style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                ORDER CONFIRMED
              </h1>
              <p className="mb-2" style={{ fontSize: '15px', opacity: 0.85 }}>
                Thank you for your purchase!
              </p>
              <p className="mb-8 opacity-70" style={{ fontSize: '13px' }}>
                Order #XND-2024-{Math.floor(Math.random() * 10000)}
              </p>
            </div>

            <div className="frosted-glass border border-white/30 rounded-sm p-8 mb-8 text-left">
              <h2 
                className="uppercase-headline mb-6"
                style={{ fontSize: '16px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                ORDER DETAILS
              </h2>
              
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between" style={{ fontSize: '13px' }}>
                    <span className="opacity-80">
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 mb-4" style={{ fontSize: '13px' }}>
                <div className="flex justify-between opacity-70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span 
                  className="uppercase-headline"
                  style={{ fontSize: '14px', letterSpacing: '0.1em', fontWeight: 600 }}
                >
                  TOTAL PAID
                </span>
                <span 
                  className="price-outlined"
                  style={{ fontSize: '24px' }}
                >
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="frosted-glass border border-white/30 rounded-sm p-6 mb-8 text-left">
              <h3 
                className="uppercase-headline mb-4"
                style={{ fontSize: '14px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                SHIPPING ADDRESS
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.7, opacity: 0.85 }}>
                {shippingData.firstName} {shippingData.lastName}<br />
                {shippingData.address}{shippingData.apartment && `, ${shippingData.apartment}`}<br />
                {shippingData.city}, {shippingData.state} - {shippingData.pincode}<br />
                {shippingData.phone}
              </p>
            </div>

            <div className="space-y-3">
              <p className="opacity-70" style={{ fontSize: '13px' }}>
                A confirmation email has been sent to <strong>{shippingData.email}</strong>
              </p>
              <p className="opacity-70" style={{ fontSize: '13px' }}>
                Expected delivery: 5-7 business days
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="#account"
                className="px-8 py-4 bg-[#D04007] text-white uppercase-headline transition-all duration-300 hover:bg-[#ff6b1a] hover:scale-105"
                style={{ fontSize: '11px', letterSpacing: '0.2em' }}
              >
                VIEW ORDER STATUS
              </a>
              <a
                href="#capsule"
                className="px-8 py-4 border border-[#262930]/20 rounded-sm uppercase-headline transition-colors duration-300 hover:border-[#D04007]"
                style={{ fontSize: '11px', letterSpacing: '0.2em' }}
              >
                CONTINUE SHOPPING
              </a>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <NavBar />
      
      <main className="pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <a
              href="#cart"
              className="inline-flex items-center gap-2 mb-4 opacity-70 hover:opacity-100 hover:text-[#D04007] transition-colors"
              style={{ fontSize: '12px', letterSpacing: '0.05em' }}
            >
              <ArrowLeft size={16} />
              BACK TO CART
            </a>
            <h1 
              className="uppercase-headline mb-2"
              style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              CHECKOUT
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[#D04007]' : 'opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'details' ? 'border-[#D04007]' : 'border-current'}`}>
                  1
                </div>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em' }}>DETAILS</span>
              </div>
              <div className="flex-1 h-px bg-white/30"></div>
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#D04007]' : 'opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'payment' ? 'border-[#D04007]' : 'border-current'}`}>
                  2
                </div>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em' }}>PAYMENT</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {step === 'details' && (
                <div className="space-y-8">
                  {/* Contact Information */}
                  <div className="frosted-glass border border-white/30 rounded-sm p-6">
                    <h2 
                      className="uppercase-headline mb-6"
                      style={{ fontSize: '16px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      CONTACT INFORMATION
                    </h2>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">EMAIL *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingData.email}
                            onChange={(e) => handleShippingChange('email', e.target.value)}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">PHONE *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingData.phone}
                            onChange={(e) => handleShippingChange('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="frosted-glass border border-white/30 rounded-sm p-6">
                    <h2 
                      className="uppercase-headline mb-6"
                      style={{ fontSize: '16px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      SHIPPING ADDRESS
                    </h2>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">FIRST NAME *</Label>
                          <Input
                            id="firstName"
                            value={shippingData.firstName}
                            onChange={(e) => handleShippingChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">LAST NAME *</Label>
                          <Input
                            id="lastName"
                            value={shippingData.lastName}
                            onChange={(e) => handleShippingChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">ADDRESS *</Label>
                        <Input
                          id="address"
                          value={shippingData.address}
                          onChange={(e) => handleShippingChange('address', e.target.value)}
                          placeholder="Street address"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="apartment">APARTMENT, SUITE, ETC.</Label>
                        <Input
                          id="apartment"
                          value={shippingData.apartment}
                          onChange={(e) => handleShippingChange('apartment', e.target.value)}
                          placeholder="Apartment, suite, etc. (optional)"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">CITY *</Label>
                          <Input
                            id="city"
                            value={shippingData.city}
                            onChange={(e) => handleShippingChange('city', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">STATE *</Label>
                          <Input
                            id="state"
                            value={shippingData.state}
                            onChange={(e) => handleShippingChange('state', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">PINCODE *</Label>
                          <Input
                            id="pincode"
                            value={shippingData.pincode}
                            onChange={(e) => handleShippingChange('pincode', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="saveInfo"
                          checked={saveInfo}
                          onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                        />
                        <label
                          htmlFor="saveInfo"
                          className="cursor-pointer"
                          style={{ fontSize: '12px' }}
                        >
                          Save this information for next time
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={proceedToPayment}
                      className="flex-1 py-4 bg-[#D04007] text-white uppercase-headline transition-all duration-300 hover:bg-[#ff6b1a] hover:scale-[1.02]"
                      style={{ fontSize: '12px', letterSpacing: '0.15em' }}
                    >
                      CONTINUE TO PAYMENT
                    </button>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-8">
                  {/* Payment Method */}
                  <div className="frosted-glass border border-white/30 rounded-sm p-6">
                    <h2 
                      className="uppercase-headline mb-6"
                      style={{ fontSize: '16px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      PAYMENT METHOD
                    </h2>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        {/* Razorpay */}
                        <div className="flex items-center space-x-3 p-4 border border-white/30 rounded-sm hover:border-[#D04007] transition-colors cursor-pointer">
                          <RadioGroupItem value="razorpay" id="razorpay" />
                          <label
                            htmlFor="razorpay"
                            className="flex-1 flex items-center gap-3 cursor-pointer"
                          >
                            <CreditCard size={20} className="text-[#D04007]" />
                            <div>
                              <p className="uppercase-headline" style={{ fontSize: '12px', letterSpacing: '0.05em' }}>
                                CREDIT/DEBIT CARD, UPI, NETBANKING
                              </p>
                              <p className="opacity-60" style={{ fontSize: '10px' }}>
                                Secured by Razorpay
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Cash on Delivery */}
                        <div className="flex items-center space-x-3 p-4 border border-white/30 rounded-sm hover:border-[#D04007] transition-colors cursor-pointer">
                          <RadioGroupItem value="cod" id="cod" />
                          <label
                            htmlFor="cod"
                            className="flex-1 flex items-center gap-3 cursor-pointer"
                          >
                            <Wallet size={20} className="text-[#D04007]" />
                            <div>
                              <p className="uppercase-headline" style={{ fontSize: '12px', letterSpacing: '0.05em' }}>
                                CASH ON DELIVERY
                              </p>
                              <p className="opacity-60" style={{ fontSize: '10px' }}>
                                Pay when you receive
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 frosted-glass border border-white/30 rounded-sm">
                    <Lock size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <div style={{ fontSize: '12px' }}>
                      <p className="mb-1 opacity-90">
                        Your payment information is secure and encrypted
                      </p>
                      <p className="opacity-60" style={{ fontSize: '11px' }}>
                        We never store your card details
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep('details')}
                      className="px-6 py-4 border border-[#262930]/20 rounded-sm uppercase-headline transition-colors duration-300 hover:border-[#D04007]"
                      style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                    >
                      BACK
                    </button>
                    <button
                      onClick={placeOrder}
                      className="flex-1 py-4 bg-[#D04007] text-white uppercase-headline transition-all duration-300 hover:bg-[#ff6b1a] hover:scale-[1.02] flex items-center justify-center gap-2"
                      style={{ fontSize: '12px', letterSpacing: '0.15em' }}
                    >
                      <Lock size={16} />
                      PLACE ORDER - ₹{total.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="frosted-glass border border-white/30 rounded-sm p-6 sticky top-32">
                <h2 
                  className="uppercase-headline mb-6"
                  style={{ fontSize: '16px', letterSpacing: '0.1em', fontWeight: 600 }}
                >
                  ORDER SUMMARY
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-[#d0cdc7] rounded-sm"></div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#D04007] text-white rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="uppercase-headline mb-1" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                          {item.name}
                        </p>
                        <p className="opacity-60" style={{ fontSize: '10px' }}>
                          {item.size} / {item.color}
                        </p>
                        <p className="mt-1" style={{ fontSize: '12px' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between" style={{ fontSize: '13px' }}>
                    <span className="opacity-70">Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: '13px' }}>
                    <span className="opacity-70">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: '13px' }}>
                    <span className="opacity-70">Tax (GST 18%)</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span 
                    className="uppercase-headline"
                    style={{ fontSize: '14px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    TOTAL
                  </span>
                  <span 
                    className="price-outlined"
                    style={{ fontSize: '24px' }}
                  >
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
