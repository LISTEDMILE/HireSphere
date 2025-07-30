import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Offers() {


    const [offers, setOffers] = useState([]);
    

    useEffect(() => {
        const fetchOffers = async () => {
            try{
            const response = await fetch(`http://localhost:3000/store/offers`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if(data.error){
                console.error("Error fetching Offers:", data.error);
                return;
            }
            setOffers(data.offers);

        } catch(error){
            console.error("Error fetching Offers:", error);
        }
      };
      console.log(offers);
    fetchOffers();
    
    },[]);


    const handleIgnore = async (offerId) => {
        try {
            await fetch(`http://localhost:3000/store/ignoreOffer/${offerId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setOffers((prevOffers) =>
                prevOffers.filter((offer) => offer._id !== offerId)
            ); // Remove the ignored offer from the list
        } catch (error) {
            console.error("Error ignoring offer:", error);
        }
    };

    const handleAccept = async (profileId) => {
        try{
            await fetch(`http://localhost:3000/store/acceptOffer/${profileId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setOffers((prevOffers) =>
                prevOffers.map((offer) => offer._id == profileId ? { ...offer, status: "accepted" } : offer)
        );

        } catch (error) {
            console.error("Error accepting offer:", error);
        }
    };


    const handleReject = async (profileId) => {
        try {
            await fetch(`http://localhost:3000/store/rejectOffer/${profileId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setOffers((prevOffers) =>
                prevOffers.map((offer) => offer._id == profileId ? { ...offer, status: "rejected" } : offer)
            );
        } catch (error) {
            console.error("Error rejecting offer:", error);
        }
    };
  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Here are the added Profiles</h1>
      <ul className="space-y-4">
        {offers.map((offer) => (
          <li key={offer._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{offer.jobPost}</h2>
              <div className="flex space-x-2">
                <Link
                  to={`/store/editProfile/${offer.profile._id}?editing=true`}
                  className="text-blue-500 hover:underline"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => handleReject(offer.profile._id)}
                  className="text-red-500 hover:underline"
                >
                  ✘
                </button>
              </div>
            </div>
            <h3 className="text-gray-700">Company: {offer.jobCompany}</h3>
            <h3 className="text-gray-700">Expected Salary: {offer.jobSalaryOffered}</h3>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Location:</label>
              <p className="text-gray-800">{offer.jobLocation}</p>
            </div>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Skills Required:</label>
              <p className="text-gray-800">{offer.jobSkills}</p>
            </div>
            <button
              onClick={() => handleIgnore(offer.profile._id)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              Ignore
            </button>
            <button
              onClick={() => handleAccept(offer.profile._id)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
             Accept
            </button>
            <Link
              to={`/store/hostProfileDetails/${offer.profile._id}`}
              className="text-teal-600 hover:underline mt-4 block"
            >
              More..
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}