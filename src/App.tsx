import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HowItWorks from './howitworks';

const DataRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 py-4 border-b border-zinc-100 last:border-0 group">
    <i className={`ph ${icon} text-2xl text-zinc-400 group-hover:text-zinc-700 transition-colors mt-0.5`}></i>
    <div className="flex-1">
      <div className="text-xs font-bold text-zinc-500 uppercase tracking-[0.15em] mb-1.5">{label}</div>
      <div className="text-base font-medium text-zinc-900 break-words pr-4 leading-relaxed">
        {value || <span className="text-zinc-300 italic">N/A</span>}
      </div>
    </div>
  </div>
);

const FlatBadge = ({ children, isActive }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider ${isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'
    }`}>
    {children}
  </span>
);



const FormattedIP = ({ ip }) => {
  if (!ip) return null;
  const octets = ip.split('.');

  return (
    <div className="flex items-end gap-3 my-8">
      {octets.map((octet, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-medium text-zinc-900 tracking-tight leading-none">
              {octet}
            </span>
            <div className="h-[3px] w-full bg-zinc-300 mt-3 rounded-full"></div>
          </div>
          {index < 3 && (
            <span className="text-3xl text-zinc-300 font-bold mb-3">.</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const LeafletMap = ({
  lat,
  lon,
  city,
  zoom = 17,
  showControls = true,
  showAttribution = true,
  offsetX = 0,
  offsetY = 0
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [leafletReady, setLeafletReady] = useState(false);

  useEffect(() => {
    if (window.L) {
      setLeafletReady(true);
      return;
    }

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;

    const L = window.L;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: showAttribution
      });

      let targetLatLng = L.latLng(lat, lon);
      if (offsetX !== 0 || offsetY !== 0) {
        const pt = mapInstance.current.project(targetLatLng, zoom).subtract([offsetX, offsetY]);
        targetLatLng = mapInstance.current.unproject(pt, zoom);
      }
      mapInstance.current.setView(targetLatLng, zoom);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: showAttribution ? '&copy; OpenStreetMap &copy; CARTO' : '',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstance.current);

      if (showControls) {
        L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);
      }

      const customIcon = L.divIcon({
        className: 'custom-flat-pin',
        html: `<div class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shadow-[0_0_0_4px_white]">
                 <i class="ph-fill ph-crosshair text-white text-xl"></i>
               </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });


      markerInstance.current = L.marker([lat, lon], { icon: customIcon }).addTo(mapInstance.current);
    } else {
      let targetLatLng = L.latLng(lat, lon);
      if (offsetX !== 0 || offsetY !== 0) {
        const pt = mapInstance.current.project(targetLatLng, zoom).subtract([offsetX, offsetY]);
        targetLatLng = mapInstance.current.unproject(pt, zoom);
      }
      mapInstance.current.setView(targetLatLng, zoom, { animate: true, duration: 1 });
      markerInstance.current.setLatLng([lat, lon]);
    }
  }, [lat, lon, city, leafletReady]);

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
  const [iconsLoaded, setIconsLoaded] = useState(false);
  const [isDefaultIp, setIsDefaultIp] = useState(true);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    if (!document.querySelector('script[src="https://unpkg.com/@phosphor-icons/web"]')) {
      const phosphorScript = document.createElement('script');
      phosphorScript.src = 'https://unpkg.com/@phosphor-icons/web';
      phosphorScript.onload = () => setIconsLoaded(true);
      document.head.appendChild(phosphorScript);
    } else {
      setIconsLoaded(true);
    }

    if (!document.querySelector('#rubik-font')) {
      const fontLink = document.createElement('link');
      fontLink.id = 'rubik-font';
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(fontLink);
    }


    fetchIpData();
  }, []);

  const fetchIpData = async (queryIp = '') => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = 'https://api-point-ip-details.vercel.app';
      const targetUrl = queryIp ? `${baseUrl}/?ip=${queryIp}` : baseUrl;

      const response = await fetch(targetUrl);
      const data = await response.json();

      if (data.status === 'success') {
        setIpData(data);
        setIsDefaultIp(!queryIp);
      } else {
        throw new Error(data.message || 'Failed to fetch IP details');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchIpData(searchInput.trim());
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row w-full h-screen bg-white text-zinc-900 overflow-hidden"
      style={{ fontFamily: "'Rubik', sans-serif" }}
    >


      <div className="w-full lg:w-[480px] flex-shrink-0 flex flex-col border-r border-zinc-200 z-10 bg-white h-[55vh] lg:h-screen">

        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <div className="text-sm font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
            <i className="ph-fill ph-radar text-xl"></i>
            <span className="text-zinc-900 font-bold uppercase tracking-widest pt-1">What's your IP human?</span>
          </div>
          <button onClick={() => setShowHowItWorks(!showHowItWorks)} className="group flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-sm cursor-pointer">
            {showHowItWorks ? (
              <><i className="ph ph-arrow-left text-base group-hover:translate-x-[-5px] transition-transform"></i> Back to Map</>
            ) : (
              <>How it works <i className="ph ph-arrow-right text-base group-hover:translate-x-[5px] transition-transform"></i></>
            )}
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex items-center w-full border-b border-zinc-200 bg-white px-6 h-16 flex-shrink-0 group focus-within:bg-zinc-50 transition-colors">
          <i className="ph ph-magnifying-glass text-2xl text-zinc-400 group-focus-within:text-zinc-800 transition-colors mr-4"></i>
          <input
            type="text"
            placeholder="Enter IP address to trace..."
            className="flex-1 bg-transparent text-base focus:outline-none placeholder:text-zinc-400 font-medium text-zinc-900"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={loading}
          />
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
            <i className="ph ph-warning-circle text-lg mt-0.5"></i>
            <span className="font-medium">{error}</span>
          </div>
        )}


        <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar">
          {loading ? (
            <div className="space-y-8 opacity-50">
              <div className="h-4 bg-zinc-200 rounded-sm w-1/3 animate-pulse"></div>
              <div className="h-12 bg-zinc-100 rounded-sm w-3/4 animate-pulse mb-10"></div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-5 py-2">
                  <div className="w-6 h-6 bg-zinc-100 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-3 mt-1">
                    <div className="h-2 bg-zinc-200 rounded-sm w-1/4 animate-pulse"></div>
                    <div className="h-3 bg-zinc-100 rounded-sm w-2/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : ipData ? (
            <div className="space-y-12 pb-12">


              <div>

                {isDefaultIp ? (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-800"></span>
                    </span>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.15em]">Your Current Connection</span>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-[0.15em] mb-4">Target Traced</div>
                )}


                <FormattedIP ip={ipData.query} />


                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <FlatBadge isActive={true}>Trace Active</FlatBadge>
                  {ipData.mobile && <FlatBadge isActive={false}>Mobile Data</FlatBadge>}
                  {ipData.proxy && <FlatBadge isActive={false}>Proxy / VPN</FlatBadge>}
                  {ipData.hosting && <FlatBadge isActive={false}>Data Center</FlatBadge>}
                </div>
              </div>


              <div className="space-y-12">


                <div>
                  <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-4 mb-4 flex items-center gap-3">
                    <i className="ph ph-map-pin-line text-xl text-zinc-500"></i>
                    Geolocation
                  </h3>
                  <DataRow icon="ph-buildings" label="City & Region" value={`${ipData.city || 'Unknown'}, ${ipData.regionName || 'Unknown'}`} />
                  <DataRow icon="ph-flag" label="Country" value={`${ipData.country || 'Unknown'} (${ipData.countryCode || '-'})`} />
                  <DataRow icon="ph-push-pin" label="ZIP / Postal" value={ipData.zip} />
                  <DataRow icon="ph-crosshair" label="Coordinates" value={`${ipData.lat}, ${ipData.lon}`} />
                </div>


                <div>
                  <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-4 mb-4 flex items-center gap-3">
                    <i className="ph ph-globe text-xl text-zinc-500"></i>
                    Network Details
                  </h3>
                  <DataRow icon="ph-wifi-high" label="Internet Provider (ISP)" value={ipData.isp} />
                  <DataRow icon="ph-hard-drives" label="Organization / ASN" value={`${ipData.org || '-'} \n ${ipData.as || ''}`} />
                </div>


                <div>
                  <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-4 mb-4 flex items-center gap-3">
                    <i className="ph ph-cpu text-xl text-zinc-500"></i>
                    System Context
                  </h3>
                  <DataRow icon="ph-clock" label="Timezone" value={`${ipData.timezone} (UTC ${ipData.offset / 3600 >= 0 ? '+' : ''}${ipData.offset / 3600})`} />
                  <DataRow icon="ph-currency-circle-dollar" label="Local Currency" value={ipData.currency} />
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 pb-20">
              <i className="ph ph-radar text-5xl mb-4 opacity-30"></i>
              <p className="text-sm font-medium tracking-wide">Awaiting input.</p>
            </div>
          )}
        </div>
      </div>


      <div className="flex-1 relative bg-zinc-200 z-0 h-[45vh] lg:h-screen border-t lg:border-t-0 border-zinc-200">
        {showHowItWorks ? (
          <HowItWorks lat={ipData?.lat} lon={ipData?.lon} ip={ipData?.query} country={ipData?.country} />
        ) : ipData && ipData.lat && ipData.lon ? (
          <LeafletMap lat={ipData.lat} lon={ipData.lon} city={ipData.city} showAttribution={false} />
        ) : (

          <div className="w-full h-full flex items-center justify-center bg-zinc-100">
            <div className="flex flex-col items-center space-y-4 opacity-30">
              <i className="ph ph-map-trifold text-4xl"></i>
              <span className="text-sm font-medium tracking-widest uppercase">Location Map Disabled</span>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e4e4e7;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d4d4d8;
        }
      `}} />
    </div>
  );
}


