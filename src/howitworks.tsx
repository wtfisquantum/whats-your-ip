import React from 'react';
import { LeafletMap } from './App';

// ─── Reusable Primitives ─────────────────────────────────────────────────────────

const FlatBadge = ({ children, dark = false }: { children: React.ReactNode, dark?: boolean }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider ${dark ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
    {children}
  </span>
);

const CodeBlock = ({ children, title }: { children: React.ReactNode, title?: string }) => (
  <div className="my-8 rounded-sm overflow-hidden border border-zinc-200 shadow-sm">
    {title && (
      <div className="bg-zinc-100 px-4 py-2 border-b border-zinc-200 text-xs font-bold text-zinc-500 uppercase tracking-widest">
        {title}
      </div>
    )}
    <div className="bg-zinc-50 p-6 font-mono text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap break-all">
      {children}
    </div>
  </div>
);

const ArrowDown = () => (
  <div className="flex justify-center py-2">
    <i className="ph ph-arrow-down text-zinc-300 text-2xl" />
  </div>
);

const FlowBox = ({ children, highlight = false }: { children: React.ReactNode, highlight?: boolean }) => (
  <div className={`px-6 py-4 border rounded-sm text-center font-medium text-sm sm:text-base transition-all duration-300 ${highlight ? 'bg-zinc-800 text-white border-zinc-800 shadow-md transform scale-[1.02]' : 'bg-white border-zinc-200 text-zinc-700 shadow-sm'}`}>
    {children}
  </div>
);

const StepHeader = ({ num, title, icon }: { num: string, title: string, icon: string }) => (
  <div className="flex items-start gap-5 mb-8">
    <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-zinc-900 text-white flex items-center justify-center text-lg font-bold shadow-md">
      {num}
    </div>
    <div className="pt-1">
      <div className="flex items-center gap-3 mb-2">
        {/* <i className={`ph ${icon} text-2xl text-zinc-400`} /> */}
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h2>
      </div>
      <div className="h-1 w-12 bg-zinc-200 rounded-full mt-4"></div>
    </div>
  </div>
);

const DataGrid = ({ items }: { items: { label: string, value: string }[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
    {items.map((item, i) => (
      <div key={i} className="p-5 border border-zinc-100 bg-zinc-50 rounded-sm">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{item.label}</div>
        <div className="text-zinc-900 font-medium">{item.value}</div>
      </div>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HowItWorks({ lat = 20, lon = 0 }) {
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200" style={{ fontFamily: "'Rubik', sans-serif" }}>



      {/* ── Hero Article Header ── */}
      <header className="relative bg-white border-b border-zinc-200 pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0  opacity-40 mix-blend-luminosity pointer-events-none ">
          <LeafletMap lat={lat} lon={lon} city="" zoom={17} showControls={false} showAttribution={false} offsetX={-190} offsetY={-90} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-800" />
            </span>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.15em]">Let's Dive Deep Under The Hood</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-8">
            Do We Really Know Your Location From Your IP.?
          </h1>
          {/* 
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            Every time you visit a website that automatically detects your city, it performs a fascinating multi-layered lookup. It's not magic—it's database engineering.
          </p> */}

          {/* <div className="flex flex-wrap justify-center gap-3 mt-10">
            <FlatBadge>BGP Routing</FlatBadge>
            <FlatBadge>Geolocation</FlatBadge>
            <FlatBadge>WHOIS</FlatBadge>
            <FlatBadge>Databases</FlatBadge>
          </div> */}
        </div>
      </header>

      {/* ── Article Body ── */}
      <main className="max-w-3xl mx-auto px-6 py-20 space-y-24 bg-zinc-50">

        {/* Intro */}
        <section className="prose text-lg prose-zinc prose-lg max-w-none">
          <p className="text-xl text-zinc-700 leading-relaxed font-medium">
            At first glance, it feels almost magical. How can a simple number like <code className="bg-zinc-200 px-2 py-1 rounded-sm text-sm font-bold text-zinc-900">49.32.128.15</code> reveal your country, city, ISP and even whether you're using a VPN?  The answer is surprisingly fascinating...
          </p>
          {/* <p className="text-zinc-600 leading-relaxed mt-6">
            The answer is surprisingly fascinating—and it has nothing to do with websites secretly tracking your GPS. Let's dive deep into what actually happens behind the scenes.
          </p> */}
        </section>
        {/* Step 1 */}
        <section>
          <StepHeader num="01" title="It All Starts with Your Public IP" icon="ph-globe" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              Whenever you access a website, your browser sends an HTTP request. That request contains one very important piece of information: <strong>Your Public IP Address</strong>.
            </p>
            <CodeBlock title="Example Request Payload">
              {`GET / HTTP/1.1
Host: www.example.com
X-Forwarded-For: 49.32.128.15`}
            </CodeBlock>
            <p>
              Without this IP address, the server wouldn't even know where to send its response. Think of an IP address as your home's mailing address on the Internet. The server's first job is simply to read this address.
            </p>
            <div className="bg-white p-6 border-l-4 border-zinc-800 rounded-r-sm shadow-sm">
              <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <i className="ph-fill ph-warning-circle text-lg" /> Core Misconception
              </h4>
              <p className="text-zinc-600 m-0">
                An IP address itself <strong>does not encode</strong> information like your country or city. <code className="bg-zinc-100 px-1 text-sm">49.32.128.15</code> doesn't secretly contain the word "India". It's just a 32-bit number. All additional information comes from enormous external databases.
              </p>
            </div>
          </div>
        </section>

        {/* Step 3 & 4 */}
        <section>
          <StepHeader num="02" title="Who Owns Every IP Address?" icon="ph-buildings" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              The Internet isn't a random collection of addresses. Every public IP block belongs to an organization. Instead of assigning IP addresses one by one, organizations receive entire ranges.
            </p>
            <DataGrid items={[
              { label: 'Cloudflare', value: '1.1.1.0/24' },
              { label: 'Google', value: '8.8.8.0/24' },
              { label: 'Reliance Jio', value: '49.32.0.0/11' },
              { label: 'Amazon AWS', value: '3.5.0.0/16' }
            ]} />
            <p>
              The global Internet is managed by five <strong>Regional Internet Registries (RIRs)</strong>. Whenever an ISP requests new IP ranges, these organizations officially register the organization name, country, and contact info.
            </p>

            {/* Visual block for RIRs */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {[
                { name: 'ARIN', region: 'North America' },
                { name: 'RIPE NCC', region: 'Europe / Middle East' },
                { name: 'APNIC', region: 'Asia-Pacific' },
                { name: 'AFRINIC', region: 'Africa' },
                { name: 'LACNIC', region: 'Latin America' },
              ].map(rir => (
                <div key={rir.name} className="bg-white border border-zinc-200 p-4 rounded-sm text-center shadow-sm">
                  <div className="font-medium text-zinc-900 mb-2">{rir.name}</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{rir.region}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 6 & 7 */}
        <section>
          <StepHeader num="03" title="ASNs and BGP Routing" icon="ph-share-network" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              Every large network connected to the Internet is assigned an <strong>Autonomous System Number (ASN)</strong>. Think of an ASN as the unique identity of an ISP on the global Internet (e.g., Google is <code className="bg-zinc-200 px-1 text-sm rounded-sm">AS15169</code>).
            </p>
            <p>
              Internet routers don't exchange individual IP addresses. They exchange entire IP ranges using ASNs via the <strong>Border Gateway Protocol (BGP)</strong>.
            </p>

            <div className="bg-white p-8 border border-zinc-200 rounded-sm shadow-sm my-8">
              <h4 className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Live BGP Announcement Flow</h4>
              <FlowBox>Router broadcasts: "I am AS55836 (Jio)"</FlowBox>
              <ArrowDown />
              <FlowBox>Announces route for: 49.32.0.0/11</FlowBox>
              <ArrowDown />
              <FlowBox highlight>Global Internet Routing Table Updated</FlowBox>
              <ArrowDown />
              <FlowBox>IP Intelligence Companies ingest this live feed</FlowBox>
            </div>

            <p>
              Because companies continuously monitor these live routing announcements, they know exactly which ISP is currently serving an IP address. This makes ISP identification extremely accurate.
            </p>
          </div>
        </section>

        {/* Step 9 */}
        <section>
          <StepHeader num="04" title="How Do They Know the City?" icon="ph-city" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              This is probably the most misunderstood part. An IP address <strong>does not reveal a city directly</strong>. Instead, providers estimate it using multiple signals built up over time.
            </p>
            <p>
              If thousands of devices using a specific IP range consistently appear around Bengaluru, India, the provider gradually associates that IP range with Bengaluru. They use supporting signals like:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {['ISP network topology', 'Reverse DNS hostnames', 'Mobile carrier cell data', 'CDN edge locations', 'Network measurement projects', 'Anonymous usage stats'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 border border-zinc-200 rounded-sm">
                  <i className="ph-fill ph-check-circle text-zinc-800 text-xl" />
                  <span className="text-sm font-medium text-zinc-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 border border-zinc-200 rounded-sm shadow-sm mt-8">
              <h4 className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">City Resolution Hierarchy</h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-sm font-mono text-sm text-zinc-600">IP Range</div>
                <i className="ph ph-arrow-right text-zinc-300 text-2xl hidden sm:block" />
                <i className="ph ph-arrow-down text-zinc-300 text-2xl block sm:hidden" />
                <div className="bg-zinc-100 border border-zinc-300 px-4 py-3 rounded-sm font-medium text-zinc-700">Bengaluru</div>
                <i className="ph ph-arrow-right text-zinc-300 text-2xl hidden sm:block" />
                <i className="ph ph-arrow-down text-zinc-300 text-2xl block sm:hidden" />
                <div className="bg-zinc-200 border border-zinc-400 px-4 py-3 rounded-sm font-bold text-zinc-800">Karnataka</div>
                <i className="ph ph-arrow-right text-zinc-300 text-2xl hidden sm:block" />
                <i className="ph ph-arrow-down text-zinc-300 text-2xl block sm:hidden" />
                <div className="bg-zinc-800 border border-zinc-800 px-4 py-3 rounded-sm font-bold text-white shadow-md">India</div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-4 p-5 bg-zinc-100 rounded-sm">
              <i className="ph-fill ph-crosshair text-2xl text-zinc-500 mt-1" />
              <div>
                <h5 className="font-bold text-zinc-900 mb-1">What about Latitude & Longitude?</h5>
                <p className="text-sm text-zinc-600 m-0">
                  They don't know your exact coordinates. The returned coordinates usually represent the approximate city center, an ISP Point of Presence, or a regional network hub. It is <strong>not</strong> your physical address.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 15 & 16 */}
        <section>
          <StepHeader num="05" title="The Secret Behind Fast Lookups" icon="ph-lightning" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              Millions of IP ranges exist worldwide. Searching them one by one would be far too slow. Instead, providers convert IPv4 addresses into integers.
            </p>

            <CodeBlock title="Integer Conversion & Search">
              {`// 1. Convert IP to Integer
49.32.15.200  →  824184776

// 2. Database stores ranges as integers
Start IP: 824180000
End IP:   824190000
Country:  India
ISP:      Reliance Jio

// 3. Fast Range Search using Binary Search Trees
SELECT * FROM ip_blocks 
WHERE start_ip <= 824184776 AND end_ip >= 824184776`}
            </CodeBlock>

            <p>
              Using binary search, radix trees, or optimized in-memory indexes, this lookup usually completes in just a few milliseconds.
            </p>
          </div>
        </section>

        {/* Accuracy Table */}
        <section>
          <StepHeader num="06" title="Is It Always Accurate?" icon="ph-chart-bar" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed mb-8">
            <p>
              Some fields are highly reliable, while others are educated estimates. Here is what you can typically expect:
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 border-b border-zinc-200">
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest w-1/2">Data Field</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest w-1/2">Typical Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  { field: 'Country & ASN', accuracy: '99%+', highlight: true },
                  { field: 'ISP / Provider', accuracy: '95–99%', highlight: true },
                  { field: 'Region / State', accuracy: '85–95%', highlight: false },
                  { field: 'City', accuracy: '60–90%', highlight: false },
                  { field: 'Lat / Lon', accuracy: 'Approximate Center', highlight: false },
                  { field: 'Street Address', accuracy: 'Not possible from IP alone', highlight: false, danger: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-zinc-800">{row.field}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2.5 py-1 rounded-sm font-medium ${row.danger ? 'bg-zinc-200 text-zinc-700' :
                        row.highlight ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-700'
                        }`}>
                        {row.accuracy}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Conclusion */}
        {/* <section className="bg-white border border-zinc-200 p-8 md:p-12 rounded-sm shadow-sm text-center">
          <i className="ph-fill ph-check-circle text-5xl text-zinc-800 mb-6" />
          <h2 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">The Final Word</h2>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-10">
            An IP geolocation API doesn't "discover" your location in real time. It queries one of the largest continuously updated maps of the Internet ever assembled. Behind every seemingly simple JSON response lies decades of networking standards, global coordination, and large-scale data engineering.
          </p>
          <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <i className="ph-fill ph-radar text-xl" />
            Try The IP Tracker
          </Link>
        </section> */}

      </main>



      {/* Tailwind & Scrollbar Overrides */}
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            background-color: #fafa-f9;
          }
          ::selection {
            background: #e4e4e7;
            color: #18181b;
          }
        `
      }} />
    </div>
  );
}
