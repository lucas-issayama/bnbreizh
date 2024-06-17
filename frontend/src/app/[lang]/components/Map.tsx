"use client";
import React from "react";
import { useState, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getStrapiMedia } from "../utils/api-helpers";

export default function MapComponent({ festivals }: any) {
  //const MapComponent: React.FC = () => {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      longitude: -4.4855,
      latitude: 48.3814,
      description: "Brest",
      imageUrl: "",
    },
    //{ id: 2, longitude: -2.0324, latitude: 48.6445, description: "Saint-Malo" },
    // { id: 3, longitude: -1.675, latitude: 48.1173, description: "Rennes" },
  ]);
  //   const markers =;
  useEffect(() => {
    // alert(JSON.stringify({ festivals }));
    if (festivals.length) {
      setMarkers(
        festivals.map((el: any) => ({
          id: el.id,
          longitude: el.longitude ?? -4.4855,
          latitude: el.latitude ?? 48.3814,
          description: el?.title,
          imageUrl: getStrapiMedia(el?.cover?.url),
        }))
      );
    }

    //loadMarkers
  }, [festivals]);
  const [selectedMarker, setSelectedMarker] = useState<
    null | (typeof markers)[0]
  >(null);

  return (
    <Map
      initialViewState={{
        longitude: -3.4308,
        latitude: 48.202,
        zoom: 7,
      }}
      style={{ width: "100%", height: "800px" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      <NavigationControl position="top-left" />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          longitude={marker.longitude}
          latitude={marker.latitude}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedMarker(marker);
          }}
        >
          <div
            style={{
              background: "transparent",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <img
              alt="space center"
              width={"100%"}
              style={{ margin: "0px", padding: "0px" }}
              src="https://active-ants-7480a709ab.media.strapiapp.com/marker_Black_a218de54d9.png"
            />
          </div>
        </Marker>
      ))}
      {selectedMarker && (
        <Popup
          longitude={selectedMarker.longitude}
          latitude={selectedMarker.latitude}
          onClose={() => setSelectedMarker(null)}
          closeOnClick={true}
        >
          <div>
            {selectedMarker.description}
            <img
              alt="space center"
              width={"100%"}
              style={{ margin: "0px", padding: "0px" }}
              src={selectedMarker?.imageUrl}
            />
          </div>
        </Popup>
      )}
    </Map>
  );
}

//export default MapComponent;
