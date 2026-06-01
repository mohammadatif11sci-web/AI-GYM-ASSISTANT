import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import {
  GoogleMap,
  LoadScript,
  Marker
} from "@react-google-maps/api";

function GymRecommendations() {

  const [gyms, setGyms] =
    useState([]);

  useEffect(() => {

    fetchGyms();

  }, []);

  const fetchGyms = async () => {

    try {

      const response = await API.get(
        "/nearby-gyms"
      );

      setGyms(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const mapContainerStyle = {

  width: "100%",

  height: "500px",

  borderRadius: "24px"
};

const center = {

  lat: 22.5726,

  lng: 88.3639
};

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          🗺️ Nearby Gym Recommendations
        </h1>

        <LoadScript
       googleMapsApiKey={
  process.env.REACT_APP_GOOGLE_MAPS_API
}
    >

     <GoogleMap
       mapContainerStyle={
       mapContainerStyle
     }
     center={center}
      zoom={12}
     >

       <Marker position={center} />
        </GoogleMap>

         </LoadScript>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {gyms.map((gym, index) => (

            <div
              key={index}
              className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl hover:scale-105 transition-all duration-300"
            >

              {/* Gym Name */}

              <h2 className="text-3xl font-bold mb-4">

                {gym.name}

              </h2>

              {/* Rating */}

              <p className="text-yellow-400 text-2xl font-bold mb-3">

                ⭐ {gym.rating}

              </p>

              {/* Distance */}

              <p className="text-green-400 text-xl mb-3">

                📍 {gym.distance}

              </p>

              {/* Type */}

              <p className="text-blue-400 text-xl mb-6">

                💪 {gym.type}

              </p>

              {/* AI Recommendation */}

              <div className="bg-slate-800 p-4 rounded-2xl">

                <h3 className="text-xl font-bold mb-2">

                  🤖 AI Recommendation

                </h3>

                <p className="text-slate-300">

                  Best for improving strength and endurance training.

                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default GymRecommendations;