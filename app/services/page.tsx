"use client";

import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client"; // Adjust path to your Sanity client
import { serviceLocationsQuery } from "../../sanity/lib/queries"; // Adjust path to your queries
import Image from "next/image";
import banner from "../../public/images/banner4.png";
import ServiceForm from "../components/ServiceForm";
import partsImage from "../../public/images/Parts-Accs.svg";

// Define the type for the service location data
interface ServiceLocation {
  _id: string;
  location: string;
  contact: number;
}

const HomePage = () => {
  // Set the correct type for the locations state
  const [locations, setLocations] = useState<ServiceLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Filter locations based on the search query
  const filteredLocations = locations.filter((location) =>
    location.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await client.fetch(serviceLocationsQuery);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching service locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    // This function will be triggered when the search button is clicked
    // For now, it works by filtering locations as the user types in the input
    // You can add additional functionality if needed
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative mb-12">
        <Image
          src={banner}
          alt="Banner"
          className="w-full h-auto object-cover"
          priority
        />
        <div className="container mx-auto px-4 sm:px-12 py-8 absolute inset-0 flex items-center text-white text-center text-4xl md:text-6xl font-bold font-['Montserrat']">
          Services
        </div>
      </div>

      {/* Service Form Section */}
      <div className="relative mb-3 p-5">
        <ServiceForm />
      </div>

      {/* Service Locations Section */}
      <div className="container mx-auto px-4  py-4 mt-24 mb-12">
        <h3 className="text-black text-2xl md:text-4xl font-semibold font-['Montserrat'] mb-8">
          Service Locations
        </h3>

        {/* Search Input */}
        <div className="mb-4 w-full md:w-3/5 flex flex-col md:flex-row md:space-x-9 items-center">
          <input
            type="text"
            placeholder="Search for a location"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex-1">
            <button
              onClick={handleSearch}
              className="bg-[#006a33] text-white py-2 px-9 rounded-md mt-2 md:mt-0 md:ml-2 w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-gray-500">Loading service locations...</p>
        ) : filteredLocations.length > 0 ? (
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Service Locations List */}
            <ul className="space-y-4 flex-1 h-[480px] overflow-y-auto pr-2">
              {filteredLocations.map((location) => (
                <li
                  key={location._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md border border-white"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {location.location}
                  </h4>
                  <p className="text-gray-600">📞 {location.contact}</p>
                </li>
              ))}
            </ul>

            {/* Google Maps Iframe */}
            <div className="flex-1">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1Vp5TqZEeylTOW4O4J_fEDsdWVqaF9Zg&ehbc=2E312F"
                width="100%" // Adjust width to fill its container
                height="480"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No service locations available.</p>
        )}
      </div>
{/* Buy Parts & Accessories Session */}
      <div className="relative mb-12 p-3 container mx-auto px-4 sm:px-12 bg-[#eeeeee] rounded-[25px] py-">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="text-black text-2xl p-6  md:text-3xl font-semibold font-['Montserrat']">
              Buy Parts & Accessories{" "}
            </div>
            <div className="text-black text-base font-normal font-['Montserrat']">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </div>
            <div className="h-11 px-[30px] py-2.5 bg-[#006a33] rounded-[40px] inline-flex justify-center items-center gap-2.5 cursor-pointer">
              <span className="text-white text-xl font-semibold font-['Montserrat']">
                Learn More
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 flex justify-center mt-3 md:mt-0">
            <Image
              src={partsImage}
              alt="Accessories Image"
              className="object-contain p-2"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
