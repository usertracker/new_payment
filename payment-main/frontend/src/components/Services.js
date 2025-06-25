import React from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const tourismPackages = [
    {
      id: 1,
      name: "Temple Heritage Tour",
      price: 4500,
      duration: "2 Days",
      image: "https://images.unsplash.com/photo-1621437667155-6f77f90fd752",
      description: "Explore ancient temples and spiritual heritage of Nagapattinam",
      highlights: ["Nagore Dargah", "Ancient Temples", "Cultural Sites", "Local Guide"]
    },
    {
      id: 2,
      name: "Beach and Coastal Retreat",
      price: 3500,
      duration: "1 Day",
      image: "https://images.unsplash.com/photo-1646151732626-1771afd880f4",
      description: "Relax and rejuvenate at pristine beaches and coastal areas",
      highlights: ["Beach Activities", "Coastal Views", "Sunset Points", "Local Seafood"]
    },
    {
      id: 3,
      name: "Eco-Tourism Adventure",
      price: 5500,
      duration: "3 Days",
      image: "https://images.pexels.com/photos/2111253/pexels-photo-2111253.jpeg",
      description: "Experience nature and wildlife in eco-friendly environment",
      highlights: ["Nature Walks", "Bird Watching", "Eco Resort", "Organic Farming"]
    },
    {
      id: 4,
      name: "Cultural Immersion Package",
      price: 6000,
      duration: "4 Days",
      image: "https://images.pexels.com/photos/32696006/pexels-photo-32696006.jpeg",
      description: "Deep dive into local culture, traditions and lifestyle",
      highlights: ["Traditional Arts", "Local Festivals", "Village Stay", "Cultural Shows"]
    },
    {
      id: 5,
      name: "Family Fun Tour",
      price: 4000,
      duration: "2 Days",
      image: "https://images.pexels.com/photos/3126568/pexels-photo-3126568.jpeg",
      description: "Perfect family getaway with activities for all ages",
      highlights: ["Family Activities", "Kids Zone", "Group Games", "Photography"]
    },
    {
      id: 6,
      name: "Nagore Dargah Special",
      price: 2500,
      duration: "1 Day",
      image: "https://images.pexels.com/photos/15828309/pexels-photo-15828309.jpeg",
      description: "Sacred pilgrimage to the famous Nagore Dargah",
      highlights: ["Dargah Visit", "Prayer Sessions", "Historical Tour", "Spiritual Guide"]
    }
  ];

  const handleBookNow = (tourPackage) => {
    navigate('/payment', { state: { selectedPackage: tourPackage } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-0.5 bg-red-500 mr-4"></div>
            <span className="text-blue-600 font-semibold tracking-wider">NAGAI TOURISM</span>
            <div className="w-16 h-0.5 bg-red-500 ml-4"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Unlock the Hidden Gems of
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
            Nagapattinam
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the rich cultural heritage, pristine beaches, and spiritual essence of Nagapattinam. 
            Choose from our curated tourism packages for an unforgettable experience.
          </p>
        </div>

        {/* Tourism Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tourismPackages.map((tourPackage) => (
            <div key={tourPackage.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-hover">
              <div className="relative">
                <img 
                  src={tourPackage.image} 
                  alt={tourPackage.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {tourPackage.duration}
                </div>
                <div className="absolute bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  ₹{tourPackage.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tourPackage.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tourPackage.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Package Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {tourPackage.highlights.map((highlight, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBookNow(tourPackage)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg btn-pulse"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need a Custom Package?</h3>
          <p className="text-gray-600 mb-6">Contact us to create a personalized tour experience just for you!</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;