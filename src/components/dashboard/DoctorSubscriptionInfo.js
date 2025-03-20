// components/dashboard/DoctorSubscriptionInfo.js
import React from 'react';

const DoctorSubscriptionInfo = () => {
  // Dummy data - later this will come from API
  const subscription = {
    plan: 'Premium',
    price: 1200,
    duration: '12 Months',
    startDate: '01 July 2024',
    endDate: '30 June 2025',
    paymentStatus: 'Paid',
    features: [
      'Online Booking',
      'Custom Domain',
      'Marketing Tools Integration',
      'Patient Management',
      'Prescription System'
    ]
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Subscription Information</h2>
      <div className="bg-white p-6 rounded-xl shadow">
        <p><strong>Plan:</strong> {subscription.plan}</p>
        <p><strong>Price:</strong> ৳{subscription.price}</p>
        <p><strong>Duration:</strong> {subscription.duration}</p>
        <p><strong>Start Date:</strong> {subscription.startDate}</p>
        <p><strong>End Date:</strong> {subscription.endDate}</p>
        <p><strong>Payment Status:</strong> <span className="text-green-600 font-semibold">{subscription.paymentStatus}</span></p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Included Features:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {subscription.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorSubscriptionInfo;
