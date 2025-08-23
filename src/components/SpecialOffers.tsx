import React from 'react';
import { Percent, Zap, Gift,  } from 'lucide-react';
import durga from '../image/durgathakur.png';
const SpecialOffers: React.FC = () => {
  const offers = [
    {
      icon: <Gift className="w-5 h-5" />,
      title: "BUY 1 GET 1",
      subtitle: "Free on Selective Items",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: <Percent className="w-5 h-5" />,
      title: "UP TO 50% OFF",
      subtitle: "On Specific Brands",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "FLASH SALE",
      subtitle: "Limited Time Only (21th september to 2nd october) ",
      color: "from-orange-500 to-yellow-500"
    },
    
    {
      icon: <Gift className="w-5 h-5" />,
      title: "🎁Free Gift🎁 ",
      subtitle: " 🎁on Selective Purchase🎁",
      color: "from-purple-500 to-blue-500"
    },
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
        <img className="w-48" src={durga} alt="Durga Puja Offer" />
      </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
             🎁দুর্গাপূজার জন্য ধামাকা অফার 🎁
          </h2>
          <p className="text-gray-600">Don't miss out on these amazing deals!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${offer.color} text-white p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center justify-center mb-3">
                {offer.icon}
              </div>
              <h3 className="text-lg font-bold text-center mb-1">{offer.title}</h3>
              <p className="text-center opacity-90 text-sm">{offer.subtitle}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full font-bold animate-pulse shadow-lg">
            🚦LIVE🚦 From: ⏰ 21th september to 2nd october ⏰
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;