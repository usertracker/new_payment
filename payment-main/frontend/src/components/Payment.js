import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage;

  const [formData, setFormData] = useState({
    selectedPackageId: selectedPackage?.id || 1,
    customerName: '',
    email: '',
    phone: '',
    travelDate: '',
    numberOfPeople: 1,
    transportOption: 'none',
    accommodationType: 'standard',
    additionalServices: []
  });

  const [totalAmount, setTotalAmount] = useState(selectedPackage?.price || 4500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tourismPackages = [
    { id: 1, name: "Temple Heritage Tour", price: 4500, duration: "2 Days" },
    { id: 2, name: "Beach and Coastal Retreat", price: 3500, duration: "1 Day" },
    { id: 3, name: "Eco-Tourism Adventure", price: 5500, duration: "3 Days" },
    { id: 4, name: "Cultural Immersion Package", price: 6000, duration: "4 Days" },
    { id: 5, name: "Family Fun Tour", price: 4000, duration: "2 Days" },
    { id: 6, name: "Nagore Dargah Special", price: 2500, duration: "1 Day" }
  ];

  const transportOptions = [
    { id: 'none', name: 'No Transport', price: 0 },
    { id: 'car', name: 'Private Car (4+1)', price: 2000 },
    { id: 'suv', name: 'SUV (7+1)', price: 3000 },
    { id: 'bus', name: 'Mini Bus (18+1)', price: 4000 }
  ];

  const accommodationTypes = [
    { id: 'standard', name: 'Standard Room', price: 0 },
    { id: 'deluxe', name: 'Deluxe Room', price: 1500 },
    { id: 'suite', name: 'Suite Room', price: 3000 }
  ];

  const additionalServices = [
    { id: 'guide', name: 'Professional Tour Guide', price: 800 },
    { id: 'photography', name: 'Photography Service', price: 1200 },
    { id: 'meals', name: 'All Meals Included', price: 1000 },
    { id: 'insurance', name: 'Travel Insurance', price: 500 }
  ];

  useEffect(() => {
    calculateTotal();
  }, [formData]);

  const calculateTotal = () => {
    const tourPackage = tourismPackages.find(p => p.id === parseInt(formData.selectedPackageId));
    let basePrice = tourPackage ? tourPackage.price : 4500;
    
    // Number of people multiplier
    let peopleMultiplier = formData.numberOfPeople;
    
    // Transport option
    const transport = transportOptions.find(t => t.id === formData.transportOption);
    let transportPrice = transport ? transport.price : 0;
    
    // Accommodation upgrade
    const accommodation = accommodationTypes.find(a => a.id === formData.accommodationType);
    let accommodationPrice = accommodation ? accommodation.price : 0;
    
    // Additional services
    let servicesTotal = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);

    setTotalAmount((basePrice * peopleMultiplier) + transportPrice + (accommodationPrice * peopleMultiplier) + servicesTotal);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          additionalServices: [...prev.additionalServices, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          additionalServices: prev.additionalServices.filter(id => id !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePayNow = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-4 animate-bounce">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-checkmark">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your Nagapattinam tour has been booked successfully. Get ready for an amazing experience!</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  const selectedTourPackage = tourismPackages.find(p => p.id === parseInt(formData.selectedPackageId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Tourism Packages
          </button>
          <h1 className="text-4xl font-bold gradient-text mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Book your dream tour to Nagapattinam</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-slideInUp">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tourism Package Booking</h2>
                
                {/* Package Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Tourism Package</label>
                  <select
                    name="selectedPackageId"
                    value={formData.selectedPackageId}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {tourismPackages.map(tourPackage => (
                      <option key={tourPackage.id} value={tourPackage.id}>
                        {tourPackage.name} ({tourPackage.duration}) - ₹{tourPackage.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Date *</label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of People</label>
                  <input
                    type="number"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Transport Options (Optional) */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Transport Option (Optional)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {transportOptions.map(transport => (
                      <label key={transport.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-300">
                        <input
                          type="radio"
                          name="transportOption"
                          value={transport.id}
                          checked={formData.transportOption === transport.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex-1">
                          <span className="text-sm font-medium text-gray-900">{transport.name}</span>
                          {transport.price > 0 && (
                            <span className="text-sm text-green-600 font-semibold ml-2">+₹{transport.price}</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Accommodation Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Accommodation Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {accommodationTypes.map(accommodation => (
                      <label key={accommodation.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-300">
                        <input
                          type="radio"
                          name="accommodationType"
                          value={accommodation.id}
                          checked={formData.accommodationType === accommodation.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex-1">
                          <span className="text-sm font-medium text-gray-900">{accommodation.name}</span>
                          {accommodation.price > 0 && (
                            <span className="text-sm text-green-600 font-semibold ml-2">+₹{accommodation.price}/person</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Services */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Services (Optional)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {additionalServices.map(service => (
                      <label key={service.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-300">
                        <input
                          type="checkbox"
                          value={service.id}
                          checked={formData.additionalServices.includes(service.id)}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="ml-3 flex-1">
                          <span className="text-sm font-medium text-gray-900">{service.name}</span>
                          <span className="text-sm text-green-600 font-semibold ml-2">+₹{service.price}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 animate-float">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h3>
                
                {selectedTourPackage && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">{selectedTourPackage.name}</h4>
                    <p className="text-sm text-blue-600">{selectedTourPackage.duration}</p>
                  </div>
                )}
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Price</span>
                    <span className="font-semibold">₹{tourismPackages.find(p => p.id === parseInt(formData.selectedPackageId))?.price || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">People ({formData.numberOfPeople})</span>
                    <span className="font-semibold">×{formData.numberOfPeople}</span>
                  </div>
                  {formData.transportOption !== 'none' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transport</span>
                      <span className="font-semibold">₹{transportOptions.find(t => t.id === formData.transportOption)?.price || 0}</span>
                    </div>
                  )}
                  {formData.accommodationType !== 'standard' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accommodation Upgrade</span>
                      <span className="font-semibold">₹{(accommodationTypes.find(a => a.id === formData.accommodationType)?.price || 0) * formData.numberOfPeople}</span>
                    </div>
                  )}
                  {formData.additionalServices.map(serviceId => {
                    const service = additionalServices.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="flex justify-between">
                        <span className="text-gray-600">{service.name}</span>
                        <span className="font-semibold">₹{service.price}</span>
                      </div>
                    ) : null;
                  })}
                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform payment-button ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-105 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                      Pay Now ₹{totalAmount}
                    </div>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Secure payment with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;