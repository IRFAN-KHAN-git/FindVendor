import { useState, useEffect } from "react";
import VendorCard from "./components/VendorCard";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer"; 

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("/vendors.json")
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error loading vendor data:", err));
  }, []);

  const filteredVendors = vendors.filter((vendor) => {
    return (
      (categoryFilter === "All" || vendor.category === categoryFilter) &&
      (vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const categories = ["All", ...new Set(vendors.map((vendor) => vendor.category))];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} font-poppins`}>
      
      {/* Main Content (Grows to push footer down) */}
      <div className="container mx-auto p-6 flex-grow">
        
        {/* Website Name */}
        <h1 className="text-5xl font-bold text-center mb-6 drop-shadow-md">
          FindyIt
        </h1>

        {/* Dark/Light Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-800 text-white rounded-full shadow-md flex items-center"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Search Bar & Filter Dropdown */}
        <div className="flex flex-col md:flex-row justify-center gap-4 my-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <select
            className={`p-2 rounded-md shadow-md transition ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-6 drop-shadow-md">
          Find Your Vendor
        </h2>

        {/* Vendor Listing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} darkMode={darkMode} />
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg font-semibold">
              No vendors found.
            </p>
          )}
          
        </div>

      </div>

      {/* Footer (Sticky at Bottom) */}
      <Footer />
    </div>
  );
}
