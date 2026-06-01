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

  const selectedCenter = gyms.find(
    (gym) => gym.lat && gym.lng
  );

  const mapCenter = selectedCenter ? {
    lat: Number(selectedCenter.lat),
    lng: Number(selectedCenter.lng)
  } : {
    lat: 22.5726,
    lng: 88.3639
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          Nearby Gym Recommendations
        </h1>

        <LoadScript
          googleMapsApiKey={
            process.env.REACT_APP_GOOGLE_MAPS_API
          }
        >

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
          >

            {gyms
              .filter((gym) => gym.lat && gym.lng)
              .map((gym, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: Number(gym.lat),
                    lng: Number(gym.lng)
                  }}
                />
              ))}
          </GoogleMap>

        </LoadScript>

        {gyms.length === 0 ? (

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-slate-300 mt-8">
            No cloud gym data found.
          </div>
        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

            {gyms.map((gym, index) => (

              <div
                key={index}
                className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl hover:scale-105 transition-all duration-300"
              >

                <h2 className="text-3xl font-bold mb-4">
                  {gym.name}
                </h2>

                {gym.rating && (
                  <p className="text-yellow-400 text-2xl font-bold mb-3">
                    Rating: {gym.rating}
                  </p>
                )}

                {gym.distance && (
                  <p className="text-green-400 text-xl mb-3">
                    Distance: {gym.distance}
                  </p>
                )}

                {gym.type && (
                  <p className="text-blue-400 text-xl mb-6">
                    {gym.type}
                  </p>
                )}

                {gym.recommendation && (

                  <div className="bg-slate-800 p-4 rounded-2xl">

                    <h3 className="text-xl font-bold mb-2">
                      Recommendation
                    </h3>

                    <p className="text-slate-300">
                      {gym.recommendation}
                    </p>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default GymRecommendations;
