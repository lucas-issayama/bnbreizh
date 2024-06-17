"use client";
import React from "react";
import { useState, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getStrapiMedia } from "../utils/api-helpers";

interface Marker {
  id: number;
  longitude: number;
  latitude: number;
  description: string;
  imageUrl: string;
}

export default function MapComponent({ festivals }: any) {
  const [markers, setMarkers] = useState(Array<Marker>);
  useEffect(() => {
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
              alt={selectedMarker?.description}
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
