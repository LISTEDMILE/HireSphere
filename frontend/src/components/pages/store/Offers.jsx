import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${apiURL}/store/offers`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          console.error("Error fetching Offers:", data.error);
          return;
        }
        setOffers(data.offers);
      } catch (error) {
        console.error("Error fetching Offers:", error);
      }
    };
    fetchOffers();
  }, []);

  const handleIgnore = async (offerId) => {
    try {
      await fetch(`${apiURL}/store/ignoreOffer/${offerId}`, {
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

  const handleAccept = async (offerId) => {
    try {
      await fetch(`${apiURL}/store/acceptOffer/${offerId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id == offerId
            ? { ...offer, status: "accepted" }
            : offer
        )
      );
    } catch (error) {
      console.error("Error accepting offer:", error);
    }
  };

  const handleReject = async (offerId) => {
    try {
      await fetch(`${apiURL}/store/rejectOffer/${offerId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id == offerId
            ? { ...offer, status: "rejected" }
            : offer
        )
      );
    } catch (error) {
      console.error("Error rejecting offer:", error);
    }
  };

  return (
    <div className="w-full min-h[100vh] text-white bg-black flex flex-col items-center">
      <NavHome />

      <h1 className="text-5xl font-bold text-center my-12">Offers</h1>
      {offers.length === 0 && <Empty />}

      <div className="w-[70%] pb-12">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {offers.map((offer) => (
            <li
              key={offer._id}
              className="bg-[#0d212e80] rounded-2xl shadow-md p-6 flex flex-col w-full justify-between "
            >
              <div className="flex justify-end items-center text-2xl gap-12 pr-8">
                <Link
                  to={`/store/addProfile/${offer.profile._id}?editing=true`}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaUserEdit />
                </Link>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete(offer.profile._id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-red-700 hover:underline text-4xl hover:text-red-900"
                    title="Delete"
                  >
                    <MdDeleteSweep />
                  </button>
                </form>
              </div>
              <div className="w-full flex flex-col gap-4 pl-16">
                  <h2 className="text-3xl text-cyan-400 font-semibold">
                    {offer.profile.profilePost}
                  </h2>
                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 text-xl">Name:</label>
                    <p className="text-white text-xl">
                      {offer.profile.profileName}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 font-medium">Tenth</label>
                    <p className="text-white">
                      {" "}
                      <span className="font-semibold">10th (%):</span>{" "}
                      {offer.profile.profileTenth}
                    </p>
                  </div>
                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 font-medium">
                      Twelth:
                    </label>
                    <p className="text-white">
                      {" "}
                      <span className="font-semibold">12th (%):</span>{" "}
                      {offer.profile.profileTwelth}
                    </p>
                  </div>
                </div>

              <div className="w-full mt-8 flex justify-center">
                <div className=" flex gap-6 w-[80%] flex-col ">
                  <label className=" text-gray-400 font-medium">Skills:</label>
                  <div className="flex flex-wrap gap-3 items-center">
                    {offer.profile.profileSkills.map((skill) => {
                      return (
                        <span className="px-8 py-2 bg-cyan-950 rounded-lg">
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <div className="flex gap-3 items-center ml-6">
                  <span className="text-gray-400 text-xl"> Status:</span>
                  <p className="text-cyan-300 text-xl">{offer.status}</p>
                </div>
                  <Link
                    to={`/store/storeProfileDetails/${offer.profile._id}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg mr-4 "
                  >
                    Details
                  </Link>
                </div>
             
      

              {/*offeredBy */}
              <div className="mt-6 bg-[#0e201c8f] flex flex-col gap-3 p-8 rounded-lg shadow-inner">
                <h3 className="text-xl text-cyan-400 font-bold mb-2">
                  Offered By
                </h3>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">Name:</strong>{" "}
                  <p className="text-white">
                    {offer.offeredBy?.aboutRecruiter.fullName || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">
                    Designation:
                  </strong>{" "}
                  <p className="text-white">
                    {offer.offeredBy?.aboutRecruiter.designation || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">Company:</strong>{" "}
                  <p className="text-white">
                    {offer.offeredBy?.aboutRecruiter.company || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">Bio:</strong>{" "}
                  <p className="text-white">
                    {offer.offeredBy?.aboutRecruiter.bio || "N/A"}
                  </p>
                </div>

                <div className="flex justify-end gap-3 pr-6">
                  <Link
                    to={`/store/aboutRecruiter/${offer.offeredBy._id}`}
                    className="bg-cyan-600 text-white hover:bg-cyan-800 px-4 py-2  rounded-lg  "
                  >
                    Profile
                  </Link>

                  <Link
                    to={`/store/storeOffererJobs/${offer.offeredBy._id}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg  "
                  >
                    Get Uploaded Jobs
                  </Link>
                </div>
              </div>

              <div className="flex mt-6 items-center justify-end pr-6 gap-3">
                <button
                  onClick={() => handleIgnore(offer._id)}
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-4 py-2 rounded mt-4 ml-2"
                >
                  Ignore
                </button>
                {offer.status !== "accepted" && (
                  <button
                    onClick={() => handleAccept(offer._id)}
                    className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded mt-4 ml-2"
                  >
                    Accept
                  </button>
                )}
                {offer.status !== "rejected" && (
                  <button
                    onClick={() => handleReject(offer._id)}
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded mt-4"
                  >
                    Reject
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
