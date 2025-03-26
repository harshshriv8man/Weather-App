// src/components/google-map-card.tsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface GoogleMapCardProps {
  lat: number;
  lon: number;
}

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 0,
  lng: 0,
};

const GoogleMapCard = ({ lat, lon }: GoogleMapCardProps) => {
  const mapCenter = { lat, lng: lon };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCMtCzvblTRzDlg4Al_LMGFJH9mZ7bkaF0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapCard;
