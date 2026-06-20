import React from "react";
import { MapPin } from "lucide-react";

const regions = [
  {
    name: "NORTH / NORTH-WEST",
    count: 27,
    suburbs: "Attwood · Airport West · Broadmeadows · Bulla · Campbellfield · Coburg · Coburg North · Craigieburn · Dallas · Essendon · Fawkner · Glenroy · Greenvale · Hadfield · Jacana · Kalkallo · Meadow Heights · Mickleham · Niddrie · Oak Park · Pascoe Vale · Pascoe Vale South · Roxburgh Park · Somerton · Strathmore · Strathmore Heights · Tullamarine",
  },
  {
    name: "NORTH / NORTH-EAST",
    count: 28,
    suburbs: "Beveridge · Briar Hill · Bundoora · Diamond Creek · Donnybrook · Doreen · Epping · Eltham · Eltham North · Greensborough · Heidelberg · Heidelberg Heights · Heidelberg West · Ivanhoe · Lalor · Lower Plenty · Macleod · Mernda · Mill Park · Montmorency · Northcote · Preston · Reservoir · Rosanna · South Morang · Thornbury · Viewbank · Watsonia",
  },
  {
    name: "INNER CITY / INNER NORTH",
    count: 10,
    suburbs: "Abbotsford · Brunswick · Carlton · Collingwood · Docklands · Fitzroy · Kensington · North Melbourne · Southbank · West Melbourne",
  },
  {
    name: "INNER EAST / EAST",
    count: 17,
    suburbs: "Balwyn · Balwyn North · Blackburn · Box Hill · Bulleen · Camberwell · Doncaster · Forest Hill · Hawthorn · Kew · Mitcham · Nunawading · Ringwood · Surrey Hills · Templestowe · Vermont · Vermont South",
  },
  {
    name: "SOUTH-EAST / MONASH CORRIDOR",
    count: 20,
    suburbs: "Ashburton · Ashwood · Burwood · Carnegie · Chadstone · Clayton · Glen Iris · Glen Waverley · Hughesdale · Malvern · Mount Waverley · Mulgrave · Murrumbeena · Noble Park · Oakleigh · Oakleigh South · Rowville · Scoresby · Springvale · Wheelers Hill",
  },
  {
    name: "SOUTH / BAYSIDE",
    count: 19,
    suburbs: "Aspendale · Balaclava · Bentleigh · Bentleigh East · Black Rock · Caulfield · Caulfield North · Cheltenham · Chelsea · Edithvale · Elsternwick · Elwood · Hampton · Mentone · Moorabbin · Mordialloc · Parkdale · Sandringham · St Kilda",
  },
  {
    name: "INNER SOUTH / SOUTH-EAST",
    count: 7,
    suburbs: "Armadale · Prahran · Richmond · South Melbourne · South Yarra · Toorak · Windsor",
  },
  {
    name: "WEST / INNER WEST",
    count: 39,
    suburbs: "Albion · Altona · Altona Meadows · Altona North · Ardeer · Ascot Vale · Braybrook · Caroline Springs · Deer Park · Deanside · Delahey · Derrimut · Footscray · Fraser Rise · Flemington · Hillside · Keilor · Keilor Downs · Keilor East · Keilor Park · Kings Park · Laverton · Maidstone · Maribyrnong · Moonee Ponds · Newport · Ravenhall · Seddon · St Albans · Sunshine · Sunshine North · Sunshine West · Sydenham · Taylors Hill · Taylors Lakes · Truganina · West Footscray · Williamstown · Yarraville",
  },
  {
    name: "OUTER WEST / WYNDHAM",
    count: 7,
    suburbs: "Hoppers Crossing · Manor Lakes · Point Cook · Tarneit · Werribee · Williams Landing · Wyndham Vale",
  },
  {
    name: "SOUTH-EAST / GREATER SOUTH-EAST",
    count: 8,
    suburbs: "Berwick · Cranbourne · Cranbourne North · Dandenong · Keysborough · Narre Warren · Officer · Pakenham",
  },
  {
    name: "PORT / CITY FRINGE",
    count: 1,
    suburbs: "Port Melbourne",
  }
];

export default function ServiceAreas() {
  // We want to distribute the regions into 3 columns exactly as they appear in the Figma design.
  // Column 1: North/North-West, Inner East/East, Inner South/South-East, South-East/Greater South-East
  // Column 2: North/North-East, South-East/Monash Corridor, West/Inner West, Port/City Fringe
  // Column 3: Inner City/Inner North, South/Bayside, Outer West/Wyndham
  
  const col1 = ["NORTH / NORTH-WEST", "INNER EAST / EAST", "INNER SOUTH / SOUTH-EAST", "SOUTH-EAST / GREATER SOUTH-EAST"];
  const col2 = ["NORTH / NORTH-EAST", "SOUTH-EAST / MONASH CORRIDOR", "WEST / INNER WEST", "PORT / CITY FRINGE"];
  const col3 = ["INNER CITY / INNER NORTH", "SOUTH / BAYSIDE", "OUTER WEST / WYNDHAM"];

  const getRegion = (name: string) => regions.find(r => r.name === name);

  return (
    <section id="service-area" className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-6 md:px-8 max-w-[1400px]">
        {/* Header Section */}
        <div className="mb-10 max-w-3xl">
          <span className="text-primary font-bold tracking-widest text-[11px] uppercase mb-4 block">
            SERVICE AREAS
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-foreground tracking-tight mb-6 leading-[1.1]">
            Serving homes across Melbourne.
          </h2>
          <p className="text-lg text-muted-foreground">
            We currently service the following Melbourne suburbs. Don't see yours? Get in touch — we're expanding.
          </p>
        </div>

        {/* Map Container */}
        <div className="w-full relative shadow-sm border border-gray-100 rounded-[32px] overflow-hidden bg-gray-50 mb-16">
          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 px-4 py-2.5 rounded-full flex items-center gap-2 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]"></div>
            <span className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">Melbourne · Service Coverage</span>
          </div>
          
          {/* Google My Maps Live Embed */}
          <iframe
            src="https://www.google.com/maps/d/embed?mid=11PYOwOoDelJTAgTpJpjNStPXKjAcyeU&ehbc=2E312F"
            className="w-full aspect-square md:aspect-auto md:h-[450px] border-0"
            title="Crisp Cleaning Service Areas in Melbourne"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Suburbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-10">
            {col1.map((name, i) => {
              const region = getRegion(name);
              if (!region) return null;
              return (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                    <h3 className="text-xs font-bold text-primary tracking-widest uppercase">
                      {region.name} <span className="text-gray-400 font-medium tracking-normal ml-1">({region.count})</span>
                    </h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-gray-600 font-medium pr-4">
                    {region.suburbs}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-10">
            {col2.map((name, i) => {
              const region = getRegion(name);
              if (!region) return null;
              return (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                    <h3 className="text-xs font-bold text-primary tracking-widest uppercase">
                      {region.name} <span className="text-gray-400 font-medium tracking-normal ml-1">({region.count})</span>
                    </h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-gray-600 font-medium pr-4">
                    {region.suburbs}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-10">
            {col3.map((name, i) => {
              const region = getRegion(name);
              if (!region) return null;
              return (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                    <h3 className="text-xs font-bold text-primary tracking-widest uppercase">
                      {region.name} <span className="text-gray-400 font-medium tracking-normal ml-1">({region.count})</span>
                    </h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-gray-600 font-medium pr-4">
                    {region.suburbs}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
