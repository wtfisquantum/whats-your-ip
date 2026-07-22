import React from "react";
import { useState, useEffect, useRef } from "react";
import DataRow from "./components/DataRow";
import FlatBadge from "./components/FlatBadge";
import FormattedIP from "./components/FormattedIP";
import Loading from "./components/Loading";

const LeafletMap = (lat, lon, city) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const makerInstance = useRef(null as any);
  const Leaflet = window.L;
  const zoom = 17;
  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = Leaflet.map(mapRef.current, {
        zoomControl: false,
      }).setView([lat, lon], zoom);

      Leaflet.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap &copy; CARTO",
          subdomains: "abcd",
          maxZoom: 20,
        },
      ).addTo(mapInstance.current);

      Leaflet.control
        .zoom({ position: "bottomright" })
        .addTo(mapInstance.current);

      const customIcon = Leaflet.divIcon({
        className: "custom-flat-pin",
        html: `<div class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shoadow[0_0_0_4px_white]">
        <i class="ph-full ph-crosshair text-white text-xl"
        </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      makerInstance.current = Leaflet.marker([lat, lon], {
        icon: customIcon,
      }).addTo(mapInstance.current);
    } else {
      mapInstance.current.setView([lat, lon], zoom, {
        animate: true,
        duration: 1,
      });
      makerInstance.current.setLatLng([lat, lon]);
    }
  }, [lat, lon, city]);
  return (
    <div className="w-full h-full relative z-0">
      <div ref={mapRef} className="w-full h-full bg-zinc-100" />
    </div>
  );
};

export default function App() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isDefaultIp, setIsDefaultIp] = useState(true);

  const fetchIP = async (ip = "") => {
    setLoading(true);
    setError(null);
    try {
      const baseurl = "https://api-point-ip-details.vercel.app";
      const target = ip ? `${baseurl}/ip?=${ip}` : baseurl;

      const response = await fetch(target);
      const data = await response.json();

      if (data.success === "success") {
        setIpData(data);
        setIsDefaultIP(!ip);
      } else {
        throw new Error(data.message || "Failed to fetch IP data");
      }
    } catch (error:any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e:any) => {
    e.preventDefault();
    if(searchInput.trim()){
        fetchIP(searchInput.trim());
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full h-screen bg-white text-zinc-900 overflow-hidden"
    style={{
        fontFamily: "'Rubik', sans-serif"
    }}>

<div className="w-full lg:w-[480px] flex-shirnk-0 flex flex-col border-r border-zinc-200 bg-white h-[55vh] lg:h-screen">
    <form onSubmit={handleSearch} className="flex items-center w-full border-b border-zinc-200 px-6 h-20 flex-shrink-0 group focus-within:bg-zinc-50 transition-colors">
<i className="ph ph-magnifying-glass text-2xl text-zinc-400 group-focus-within:text-zinc-800 transition-colors mr-4"></i>
<input
type="text"
placeholder="Enter an IP address to trace..."
className="flex-1 bg-transparent text-base focus:outline-none placeholder:text-zinc-400 font-medium text-zinc-900"
value={searchInput}
onChange={(e)=> setSearchInput(e.target.value)}
disabled={loading}
></input>
  {searchInput && (
             <button 
                type="button" 
                onClick={() => setSearchInput('')}
                className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
             >
                <i className="ph ph-x text-lg"></i>
             </button>
          )}
    </form>
{error && (
    <div className="px-6 py-4 bg-zinc-100 text-zinc-800 text-sm border-b border-zinc-200 flex items-start gap-3">
        <i className="ph ph-warning text-lg mt-0.5"></i>
        <span className="font-medium">{error}</span>
    </div>
)}

<div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar">
{loading ? <Loading/> : (
    <>
    </>
)}

</div>
</div>
    </div>
  );
}
