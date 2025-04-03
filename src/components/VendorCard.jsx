import { useState } from "react";
import MapComponent from "./MapComponent";

export default function VendorCard({ vendor, darkMode }) {
  const { name, category, location, rating } = vendor;
  const [showMessage, setShowMessage] = useState(false);

  const handleContactClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; // Check if there's a decimal part
    const stars = "★".repeat(fullStars) + (halfStar ? "☆" : "");
    return stars.padEnd(5, "☆"); // Fill remaining with empty stars
  };

  return (
    <div
      className={`p-5 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h3 className="text-2xl font-semibold">{vendor.name}</h3>
      <p className="text-sm">{vendor.category}</p>
      <p className="text-sm">{vendor.address}</p>

      {/* Fixed Rating (Stars + Number) */}
      <div className="flex items-center mt-2">
        <span className="text-yellow-400 text-lg">{renderStars(rating)}</span>
        <span className="ml-2 text-gray-400">({rating}/5)</span>
      </div>

      {/* Contact Button */}
      <button
        onClick={handleContactClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Contact
      </button>

      {/* Show Map with Vendor Location */}
      <MapComponent latitude={vendor.latitude} longitude={vendor.longitude} vendorName={vendor.name} />

      {/* Dummy Contact Message */}
      {showMessage && (
        <p className="mt-2 text-green-400 font-semibold">
          Contact feature coming soon!
        </p>
      )}
    </div>
  );
}
