import React from "react";
import {useState, useEffect, useRef} from "react";
import DataRow from "./components/DataRow";
import FlatBadge from "./components/FlatBadge";
import FormattedIP from "./components/FormattedIP";

const LeafletMap = (lat, lon, city) => {
const mapRef = useRef(null);
const mapInstance = useRef(null);
const makerInstance = useRef(null as any);
const Leaflet = window.L;
const zoom = 17;
useEffect(() => {
if(!mapInstance.current){
    mapInstance.current = Leaflet.map(mapRef.current, {
        zoomControl:false
    }).setView([lat,lon], zoom);

    Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(mapInstance.current);

    Leaflet.control.zoom({position: 'bottomright'}).addTo(mapInstance.current);

    const customIcon = Leaflet.divIcon({
        className: 'custom-flat-pin',
        html: `<div class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shoadow[0_0_0_4px_white]">
        <i class="ph-full ph-crosshair text-white text-xl"
        </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
    makerInstance.current = Leaflet.marker([lat,lon],{icon: customIcon}).addTo(mapInstance.current);
} else {
    mapInstance.current.setView([lat,lon], zoom, {animate:true, duration:1});
    makerInstance.current.setLatLng([lat,lon]);
}
}, [lat,lon,city]);
return (
    <div className="w-full h-full relative z-0">
      <div ref={mapRef} className="w-full h-full bg-zinc-100"/>
    </div>
)
}
export default function App(){
    return (
        <>
        <p>Hello</p>
        </>
    )
}