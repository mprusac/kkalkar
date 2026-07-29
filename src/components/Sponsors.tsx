import { useState } from "react";
import { ChevronUp, ChevronDown, Crown, Medal, Award, Heart, Star, Trophy } from "lucide-react";

import hotelAlkarAsset from "@/assets/sponsors/hotel_alkar.png.asset.json";
import adriaticketAsset from "@/assets/sponsors/adriaticket.png.asset.json";
import papirkoAsset from "@/assets/sponsors/papirko.png.asset.json";
import zsuAsset from "@/assets/sponsors/zajednica_sportskih_udruga.png.asset.json";
import idsAsset from "@/assets/sponsors/ids.png.asset.json";
import no1Asset from "@/assets/sponsors/no1.png.asset.json";
import jakoAsset from "@/assets/sponsors/jako.png.asset.json";
import gradSinjAsset from "@/assets/sponsors/grad_sinj.png.asset.json";

interface SponsorTier {
  name: string;
  price: string;
  benefits: string[];
  icon: React.ReactNode;
  color: string;
}

const sponsorTiers: SponsorTier[] = [
  {
    name: "ZLATNI",
    price: "10.000 EUR",
    benefits: [
      "Natpis na prednjem dijelu dresa",
      "Objava na svim kanalima",
      "Logo na dresu i parketu",
      "Sezonske ulaznice",
      "Ekskluzivni sadržaj",
    ],
    icon: <Crown className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-primary",
  },
  {
    name: "SREBRENI",
    price: "5.000 EUR",
    benefits: ["Natpis na prednjem dijelu dresa", "Objava na svim kanalima"],
    icon: <Medal className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-[hsl(0,0%,75%)]",
  },
  {
    name: "BRONČANI",
    price: "2.500 EUR",
    benefits: ["Natpis na donjem dijelu dresa", "Objava na svim kanalima"],
    icon: <Award className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-[hsl(30,60%,45%)]",
  },
  {
    name: "DONACIJA",
    price: "Bilo koji iznos",
    benefits: ["Objava na svim kanalima"],
    icon: <Heart className="w-4 h-4 md:w-8 md:h-8" />,
    color: "text-primary",
  },
];

const goldBorder = "border-[hsl(48,96%,53%)]";
const goldGlow = "hover:[box-shadow:0_0_25px_8px_hsl(48,96%,53%,0.35)]";

const sponsors = [
  { name: "Hotel Alkar", image: hotelAlkarAsset.url, url: "https://hotelalkar.com/", scale: 1.3225 },
  { name: "Adriaticket", image: adriaticketAsset.url, url: "https://adriaticket.com/", scale: 1.15 },
  { name: "Papirko", image: papirkoAsset.url, url: "https://www.facebook.com/papirko.sinj/", scale: 1.15 },
  { name: "Zajednica športskih udruga Grada Sinja", image: zsuAsset.url, url: "https://sinj.hr/", scale: 1.38 },
  { name: "IDS Industrieservice", image: idsAsset.url, url: "https://www.ids-gmbh.at/", scale: 1.2 },
  { name: "No1", image: no1Asset.url, url: "#", scale: 1.15 },
  { name: "Jako", image: jakoAsset.url, url: "https://www.jako.de/", scale: 1.15 },
  { name: "Grad Sinj", image: gradSinjAsset.url, url: "https://sinj.hr/", scale: 1.3225 },
];



const Sponsors = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-3 md:mb-4">
          <span className="section-title-white">NAŠI </span>
          <span className="section-title-gold">SPONZORI</span>
        </h2>

        <p className="text-[hsl(38,75%,45%)] text-center mb-8 md:mb-16 max-w-2xl mx-auto text-sm md:text-base">
          Naši partneri koji podržavaju razvoj kluba i omogućavaju ostvarivanje naših ciljeva
        </p>

        {/* Sponsor Logos */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-5 max-w-4xl mx-auto mb-8 md:mb-16">
          {sponsors.map((sponsor, index) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-2xl overflow-hidden hover:scale-[1.05] ${goldGlow} transition-all duration-300 animate-fade-in-up aspect-[2/1] flex items-center justify-center p-4 md:p-6 border-2 border-primary shadow-[0_0_30px_hsl(48,96%,53%,0.2)]`}
              style={{
                animationDelay: `${index * 100}ms`,
                background:
                  'linear-gradient(135deg, hsl(220 79% 15%) 0%, hsl(217 68% 30%) 50%, hsl(220 79% 12%) 100%)',
              }}
            >
              <img decoding="async"
                src={sponsor.image}
                alt={sponsor.name}
                className="max-w-[85%] max-h-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                style={{ transform: `scale(${sponsor.scale})` }}
              />
            </a>
          ))}

        </div>


        {/* Become a Sponsor */}
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-xl overflow-hidden border-2 border-primary shadow-[0_0_30px_hsl(48,96%,53%,0.2)]"
            style={{
              background:
                'linear-gradient(135deg, hsl(220 79% 15%) 0%, hsl(217 68% 30%) 50%, hsl(220 79% 12%) 100%)',
            }}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-6 flex items-center justify-between transition-all duration-300"
            >
              <div className="p-2 rounded-full opacity-0 pointer-events-none">
                <ChevronDown size={24} />
              </div>
              <div className="text-center flex-1">
                <h3 className="text-2xl md:text-3xl font-display">
                  <span className="text-white">POSTANI </span>
                  <span className="text-primary">SPONZOR</span>
                </h3>
                <p className="text-white/80 text-base mt-1">
                  <span className="md:hidden">Pogledaj sponzorske<br />pakete i podrži klub</span>
                  <span className="hidden md:inline">Pogledaj sponzorske pakete i podrži klub</span>
                </p>
              </div>
              <div className={`p-2 rounded-full bg-primary/20 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="text-primary" size={24} />
              </div>
            </button>

            {/* Expandable Content */}
          <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-[1200px]" : "max-h-0"
              }`}
            >
              <div className="p-4 md:p-6 pt-2 md:pt-4">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6 mt-2 md:mt-4">
                  {sponsorTiers.map((tier, index) => {
                    const shadowColor = tier.name === "ZLATNI"
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(48,96%,53%,0.35)]"
                      : tier.name === "SREBRENI"
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(0,0%,70%,0.25)]"
                      : tier.name === "BRONČANI"
                      ? "hover:[box-shadow:0_0_25px_8px_hsl(30,60%,45%,0.25)]"
                      : "hover:[box-shadow:0_0_25px_8px_hsl(0,80%,60%,0.25)]";

                    return (
                      <div
                        key={tier.name}
                        className={`group border rounded-xl p-3 md:p-6 transition-all duration-300 animate-fade-in-up hover:scale-[1.03] ${shadowColor}`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          background: 'linear-gradient(180deg, #ffffff 0%, #fff8e6 60%, #faf3e0 100%)',
                          borderColor: '#d4a017',
                          borderWidth: '1.5px',
                          boxShadow: '0 4px 16px rgba(212,160,23,0.12)',
                        }}
                      >

                        <div className={`${tier.color} mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110`}>{tier.icon}</div>
                        <h4 className={`font-semibold text-xs md:text-base ${tier.color} transition-colors duration-300`}>{tier.name}</h4>
                        <p className="text-[hsl(38,75%,38%)] text-sm md:text-lg font-display mt-1">{tier.price}</p>
                        <ul className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                          {tier.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="text-neutral-700 text-xs md:text-sm flex items-start gap-1 md:gap-2"
                            >
                              <span className="text-[hsl(38,75%,38%)] mt-0.5 md:mt-1">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Payment Info - Inside expandable */}
                <div
                  className="border rounded-xl p-4 md:p-6"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #fff8e6 60%, #faf3e0 100%)',
                    borderColor: '#d4a017',
                    borderWidth: '1.5px',
                    boxShadow: '0 4px 16px rgba(212,160,23,0.12)',
                  }}
                >

                  <h4 className="font-display text-base md:text-lg mb-3 md:mb-4">
                    <span className="text-[hsl(38,75%,38%)]">PODACI ZA </span>
                    <span className="text-[hsl(38,75%,38%)]">PLAĆANJE</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-xs md:text-sm">
                    <div>
                      <span className="text-neutral-500 block mb-1">PRIMATELJ</span>
                      <span className="text-neutral-900">Košarkaški Klub Alkar Sinj</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">BANKA</span>
                      <span className="text-neutral-900">Zagrebačka banka d.d.</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">IBAN</span>
                      <span className="text-neutral-900">HR12 2360 0001 1010 0000 0</span>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
