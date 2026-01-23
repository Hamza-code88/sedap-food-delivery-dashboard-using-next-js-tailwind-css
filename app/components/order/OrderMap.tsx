"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Fake Coordinates (Kitchen to Customer)
const kitchenPos: [number, number] = [40.7128, -74.0060]; // New York (Kitchen)
const customerPos: [number, number] = [40.7138, -74.0070]; // Customer
const driverPos: [number, number] = [40.7132, -74.0065]; // Driver (Beech mein)

export default function OrderMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-full w-full bg-gray-200 animate-pulse" />;

  return (
    <MapContainer center={driverPos} zoom={16} scrollWheelZoom={false} className="h-full w-full rounded-xl z-0">
      {/* 1. Real Map Tiles (OpenStreetMap) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 2. Route Line (Green Line) */}
      <Polyline positions={[kitchenPos, customerPos]} color="#10B981" weight={4} dashArray="5, 10" />

      {/* 3. Markers (Circle Markers use kar rahe hain taaki image error na aaye) */}
      
      {/* Kitchen */}
      <CircleMarker center={kitchenPos} radius={8} pathOptions={{ color: '#10B981', fillColor: '#fff', fillOpacity: 1 }}>
        <Popup>Kitchen: Fnavolca Hcart</Popup>
      </CircleMarker>

      {/* Customer */}
      <CircleMarker center={customerPos} radius={8} pathOptions={{ color: '#047857', fillColor: '#047857', fillOpacity: 1 }}>
         <Popup>Customer: Samantha</Popup>
      </CircleMarker>

      {/* Driver Icon (Moving Car Simulation - Simple Circle for now) */}
      <CircleMarker center={driverPos} radius={6} pathOptions={{ color: 'black', fillColor: 'black', fillOpacity: 1 }}>
         <Popup>Driver is here</Popup>
      </CircleMarker>

    </MapContainer>
  );
}