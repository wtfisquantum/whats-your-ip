import React from 'react';
import { LeafletMap } from './App';
const FlatBadge = ({ children, dark = false }: { children: React.ReactNode, dark?: boolean }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider ${dark ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
    {children}
  </span>
);

const CodeBlock = ({ children, title }: { children: React.ReactNode, title?: string }) => (
  <div className="my-8 rounded-sm overflow-hidden border border-zinc-200">
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
  <div className={`px-6 py-4 border rounded-sm text-center font-medium text-lg transition-all duration-300 ${highlight ? 'bg-zinc-700 text-white border-zinc-800 shadow-md transform scale-[1.02]' : 'border-zinc-200 text-zinc-700 '}`}>
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

const DataGrid = ({ items }: { items: { label: string, value: string, logo?: string }[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
    {items.map((item, i) => (
      <div key={i} className="p-3 border border-zinc-200 bg-zinc-50 rounded-sm flex items-center gap-10">
        {item.logo && (
          <div className="ml-5 w-14 h-14 flex-shrink-0 flex items-center justify-center">
            <img src={item.logo} alt={item.label} className="max-w-full max-h-full object-contain filter invert" />
          </div>
        )}
        <div>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{item.label}</div>
          <div className="text-zinc-900 font-medium">{item.value}</div>
        </div>
      </div>
    ))}
  </div>
);

export default function HowItWorks({ lat = 20, lon = 0, ip = '49.32.128.15', country = "Your Country" }) {
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200" style={{ fontFamily: "'Rubik', sans-serif" }}>



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
            At first glance, it feels almost magical. How can a simple number like <code className="bg-zinc-200 px-2 py-1 rounded-sm text-sm font-bold text-zinc-900">{ip}</code> reveal your country, city, ISP and even whether you're using a VPN?  The answer is surprisingly fascinating...
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
              <span className="text-pink-600 font-semibold">GET</span> <span className="text-cyan-600">/</span> <span className="text-pink-600 font-semibold">HTTP/1.1</span><br />
              <span className="text-blue-600 font-semibold">Host:</span> <span className="text-zinc-600">whats-your-ip-human.vercel.app</span><br />
              <span className="text-blue-600 font-semibold">X-Forwarded-For:</span> <span className="text-amber-600">{ip}</span>
            </CodeBlock>
            <p>
              Without this IP address, the server wouldn't even know where to send its response. Think of an IP address as your home's mailing address on the Internet. The server's first job is simply to read this address.
            </p>
            <div className="bg-white p-6 border-l-4 border-zinc-800 rounded-r-sm ">
              <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <i className="ph-fill ph-warning-circle text-lg" /> Core Misconception
              </h4>
              <p className="text-zinc-600 m-0">
                An IP address itself <strong>does not encode</strong> information like your country or city. <code className="bg-zinc-100 px-1 text-sm">{ip}</code> doesn't secretly contain the word "{country}". It's just a 32-bit number. All additional information comes from enormous external databases.
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
            <DataGrid
              items={[
                // DNS / CDN
                {
                  label: 'Cloudflare',
                  value: '1.1.1.0/24',
                  logo: 'https://api-point-search.vercel.app/icon/cloudflare'
                },
                {
                  label: 'Google',
                  value: '8.8.8.0/24',
                  logo: 'https://api-point-search.vercel.app/icon/google'
                },
                {
                  label: 'Google Cloud',
                  value: '34.64.0.0/10',
                  logo: 'https://static.vecteezy.com/system/resources/previews/072/678/162/non_2x/google-cloud-logo-icon-free-png.png'
                },
                {
                  label: 'Amazon AWS',
                  value: '3.5.0.0/16',
                  logo: 'https://api-point-search.vercel.app/icon/amazon'
                },
                {
                  label: 'Reliance Jio',
                  value: '49.32.0.0/11',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reliance_Jio_Logo_%28October_2015%29.svg/960px-Reliance_Jio_Logo_%28October_2015%29.svg.png'
                },
                {
                  label: 'BSNL',
                  value: '117.192.0.0/10',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/BSNL_logo_with_slogan.svg/960px-BSNL_logo_with_slogan.svg.png'
                },
                {
                  label: 'Microsoft Azure',
                  value: '20.0.0.0/11',
                  logo: 'https://api-point-search.vercel.app/icon/microsoft'
                },
                {
                  label: 'Bharti Airtel',
                  value: '122.160.0.0/12',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Bharti_Airtel_Logo.svg'
                },

                {
                  label: 'Vodafone Idea (Vi)',
                  value: '49.200.0.0/13',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Vodafone_Idea_logo.svg/250px-Vodafone_Idea_logo.svg.png'
                },

                {
                  label: 'Oracle Cloud',
                  value: '129.146.0.0/16',
                  logo: 'https://flexy.id/_next/static/media/oracle_cloud_infrastructure_logo.af32663b.png'
                },
                {
                  label: 'DigitalOcean',
                  value: '134.122.0.0/16',
                  logo: 'https://api-point-search.vercel.app/icon/digitalocean'
                },
                {
                  label: 'Linode',
                  value: '45.33.0.0/16',
                  logo: 'https://pcr.cloud-mercato.com/static/img/logo/linode.png'
                },
                {
                  label: 'Hetzner',
                  value: '88.198.0.0/16',
                  logo: 'https://www.svgrepo.com/show/331425/hetzner.svg'
                },
                {
                  label: 'OVHcloud',
                  value: '51.68.0.0/16',
                  logo: 'https://indelec.com/wp-content/uploads/ovhcloud-logo.png'
                },
                {
                  label: 'Vultr',
                  value: '149.28.0.0/16',
                  logo: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/vultr.webp'
                },

                // Indian Telecom
                {
                  label: 'Tata Communications',
                  value: '14.96.0.0/12',
                  logo: 'https://companieslogo.com/img/orig/TATACOMM.NS-cdc72eca.png?t=1720244494'
                },

                // Global ISPs
                {
                  label: 'Comcast',
                  value: '73.0.0.0/8',
                  logo: 'https://companieslogo.com/img/orig/CMCSA-6309c0ab.png?t=1720244491'
                },
                {
                  label: 'AT&T',
                  value: '99.0.0.0/8',
                  logo: 'https://brandlogos.net/wp-content/uploads/2022/05/att-logo_brandlogos.net_57cuk.png'
                },

                {
                  label: 'IBM Cloud',
                  value: '169.44.0.0/14',
                  logo: 'https://api-point-search.vercel.app/icon/ibm'
                },
                {
                  label: 'GitHub',
                  value: '140.82.112.0/20',
                  logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-2.svg'
                },
              ]}
            />
            <p>
              The global Internet is managed by five <strong>Regional Internet Registries (RIRs)</strong>. Whenever an ISP requests new IP ranges, these organizations officially register the organization name, country, and contact info. This becomes the first layer of information available to IP lookup providers.
            </p>

            {/* Visual block for RIRs */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-8">
              {[
                { name: 'ARIN', region: 'North America', logo: "https://www.arin.net/img/ARIN-logo-std.svg" },
                { name: 'RIPE NCC', region: 'Europe / Middle East', logo: "https://www.ripe.net/static/images/ripe-community-logo.svg" },
                { name: 'APNIC', region: 'Asia-Pacific', logo: "https://wp.logos-download.com/wp-content/uploads/2019/06/Asia-Pacific_Network_Information_Centre_Logo_white_text.png" },
                { name: 'AFRINIC', region: 'Africa', logo: "https://rackzar.com/assets/img/logos/AFRINIC-logo-white.webp" },
                { name: 'LACNIC', region: 'Latin America', logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Logo_-_LACNIC.svg/1280px-Logo_-_LACNIC.svg.png" },
              ].map(rir => (
                <div key={rir.name} className="p-3 border border-zinc-200 bg-zinc-50 rounded-sm flex items-center gap-10 ">
                  <div className="ml-5 w-14 h-14 flex-shrink-0 flex items-center justify-center">
                    <img src={rir.logo} alt={rir.name} className="max-w-full max-h-full object-contain filter invert" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{rir.region}</div>
                    <div className="font-medium text-zinc-900 mt-2">{rir.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <StepHeader num="03" title="WHOIS Records" icon="ph-share-network" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              Now that we know IP addresses are allocated by Regional Internet Registries (RIRs), the next question is.. <strong>How can anyone find out who owns a particular IP address?</strong>
            </p>
            <p>
              The answer lies in <strong>WHOIS</strong>.
              Whenever an organization such as an ISP, cloud provider or large enterprise receives an IP block from a Regional Internet Registry (RIR), that allocation is recorded in a publicly <strong>WHOIS</strong> database.
              Just like land records tell you who owns a piece of property, WHOIS records tell you who has been allocated a particular IP address or IP range.
            </p>

            <p>
              The WHOIS record for an IP address typically includes the following information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {['Which organization owns the IP', 'Which RIR allocated it', 'Country details of the allocation', 'The network\'s official name', 'ASN associated with that IP', 'Admin registration details'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border border-zinc-200 rounded-sm">
                  <i className="ph-fill ph-check-circle text-rose-500 text-xl" />
                  <span className="text-lg font-medium text-zinc-900">{item}</span>
                </div>
              ))}
            </div>

            <p>
              However, WHOIS also has its limitations. It does not tell us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {['The user\'s exact location', 'The city they\'re currently in', 'GPS coordinates or address', 'Whether they\'re using a VPN'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border border-zinc-200 rounded-sm">
                  <i className="ph-fill ph-x-circle text-cyan-600 text-xl" />
                  <span className="text-lg font-medium text-zinc-900">{item}</span>
                </div>
              ))}
            </div>

          </div>
        </section>




        {/* Step 6 & 7 */}
        <section>
          <StepHeader num="04" title="ASNs and BGP Routing" icon="ph-share-network" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              By now, we've learned that WHOIS records can tell us who owns an IP range. But Knowing that an IP belongs to Reliance Jio or Google doesn't tell us how Internet traffic actually reaches that network. To understand that, we need to look at two of the Internet's most important concepts.

            </p>
            <p>
              <strong>Autonomous Systems (AS)</strong> and <strong>Border Gateway Protocol (BGP)</strong>.
              These two technologies work together to form the backbone of global Internet routing.
            </p>


            <p>
              An <strong>Autonomous System</strong> is a large network or a group of interconnected networks that operates under a single administrative organization and follows a common routing policy.
              In simpler terms, an ISP or cloud provider doesn't manage routers individually on the global Internet. Instead, all of its infrastructure is represented as one logical network called an Autonomous System.
              Every Autonomous System is assigned a globally unique identifier known as an <strong>Autonomous System Number (ASN)</strong>. This allows routers across the world to identify which network they are communicating with.
            </p>

            <p>
              Now that every major network has an ASN, the next challenge is enabling these networks to communicate with one another.

              This is where the <strong>Border Gateway Protocol (BGP)</strong> comes into play.

              BGP is the protocol responsible for exchanging routing information between Autonomous Systems.


              Instead of asking, <em>Where is IP 49.32.128.15?</em> ~ Routers ask, <em>Which Autonomous System (AS) is responsible for the network containing this IP?</em>
            </p>

            <p>
              And the response is something like: <em>If you're trying to reach any IP address within <strong>49.32.0.0/11</strong>, send the traffic to <strong>AS55836</strong>.</em>

            </p>
            <p>Every ISP, cloud provider, Internet exchange and backbone carrier continuously exchanges these announcements with one another.

              As these updates propagate across the Internet, routers gradually build a complete picture of which Autonomous System is responsible for every reachable IP range.

              This continuously updated collection of routing information is known as the <strong>global BGP routing table</strong>.
            </p>

            <div className="mt-8">
              <FlowBox>IP Address ~ 49.32.128.15</FlowBox>
              <ArrowDown />
              <FlowBox>IP Range falls inside ~ 49.32.0.0/11</FlowBox>
              <ArrowDown />
              <FlowBox>Originated by Autonomous System ~ AS55836</FlowBox>
              <ArrowDown />
              <FlowBox>ISP ~ Reliance Jio Infocomm Limited India</FlowBox>
            </div>
          </div>
        </section>

        {/* Step 9 */}
        <section>
          <StepHeader num="04" title="How Do They Know the City?" icon="ph-city" />
          <div className="prose text-lg prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6">
            <p>
              This is probably the most misunderstood part. An IP address <strong>does not reveal a city directly</strong>. Instead, providers estimate it using multiple signals built up over time.
            </p>
            <div className="mt-8">
              {/* <h4 className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">City Resolution Hierarchy</h4> */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="border border-zinc-200 px-4 py-3 rounded-sm text-zinc-700 font-medium text-lg">IP Range</div>
                <i className="ph ph-arrow-right text-zinc-300 text-2xl hidden sm:block" />
                <i className="ph ph-arrow-down text-zinc-300 text-2xl block sm:hidden" />
                <div className=" border border-zinc-200 px-4 py-3 rounded-sm text-zinc-700 font-medium text-lg">Bengaluru</div>
                <i className="ph ph-arrow-right text-zinc-300 text-2xl hidden sm:block" />
                <i className="ph ph-arrow-down text-zinc-300 text-2xl block sm:hidden" />
                <div className=" border border-zinc-200 px-4 py-3 rounded-sm text-zinc-700 font-medium text-lg">Karnataka</div>
                <i className="ph ph-arrow-right text-zinc-300 text-2xl hidden sm:block" />
                <i className="ph ph-arrow-down text-zinc-300 text-2xl block sm:hidden" />
                <div className="border border-zinc-200 px-4 py-3 rounded-sm text-zinc-700 font-medium text-lg">India</div>
              </div>
            </div>
            <p>
              If thousands or million of devices using a specific IP range consistently appear around Bengaluru, India, the provider gradually associates that IP range with Bengaluru. They use supporting signals like:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {['ISP network topology', 'Reverse DNS hostnames', 'Mobile carrier cell data', 'CDN edge locations', 'Network measurement projects', 'Anonymous usage stats'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 border border-zinc-200 rounded-sm">
                  <i className="ph-fill ph-check-circle text-zinc-800 text-xl" />
                  <span className="text-lg font-medium text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 border-l-4 border-zinc-800 rounded-r-sm ">
              <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <i className="ph-fill ph-crosshair text-lg" /> What about Latitude & Longitude?
              </h4>
              <p className="text-zinc-600 m-0">
                They don't know your exact coordinates. The returned coordinates usually represent the approximate city center, an ISP Point of Presence, or a regional network hub. It is <strong>not</strong> your physical address.
              </p>
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
              <span className="text-zinc-400 italic">// 1. Convert IP to Integer</span><br />
              <span className="text-amber-600">49.32.15.200</span> <span className="text-zinc-400">→</span> <span className="text-purple-600">824184776</span><br />
              <br />
              <span className="text-zinc-400 italic">// 2. Database stores ranges as integers</span><br />
              <span className="text-blue-600 font-semibold">Start IP:</span> <span className="text-purple-600">824180000</span><br />
              <span className="text-blue-600 font-semibold">End IP:</span>   <span className="text-purple-600">824190000</span><br />
              <span className="text-blue-600 font-semibold">Country:</span>  <span className="text-green-600">India</span><br />
              <span className="text-blue-600 font-semibold">ISP:</span>      <span className="text-green-600">Reliance Jio</span><br />
              <br />
              <span className="text-zinc-400 italic">// 3. Fast Range Search using Binary Search Trees</span><br />
              <span className="text-pink-600 font-semibold">SELECT</span> <span className="text-zinc-500">*</span> <span className="text-pink-600 font-semibold">FROM</span> <span className="text-cyan-600">ip_blocks</span><br />
              <span className="text-pink-600 font-semibold">WHERE</span> <span className="text-blue-600">start_ip</span> <span className="text-zinc-500">{"<="}</span> <span className="text-purple-600">824184776</span> <span className="text-pink-600 font-semibold">AND</span> <span className="text-blue-600">end_ip</span> <span className="text-zinc-500">{">="}</span> <span className="text-purple-600">824184776</span>
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

          <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden ">
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
        {/* <section className="bg-white border border-zinc-200 p-8 md:p-12 rounded-sm  text-center">
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
    </div >
  );
}
