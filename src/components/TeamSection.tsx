"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, ChevronUp } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Leah",
    role: "Branding Manager",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    socials: { twitter: "#", instagram: "#" },
  },
  {
    id: 2,
    name: "Mark Johnson",
    role: "Content Strategist",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    id: 3,
    name: "Andrew Mark",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    socials: { facebook: "#", twitter: "#" },
  },
];

const SocialIcons = () => (
  <motion.div
    className="flex items-center justify-center gap-4 mt-4 pt-2 border-t border-gray-100"
    initial={{ opacity: 0, height: 0 }}
    variants={{
      initial: { opacity: 0, height: 0 },
      hover: { opacity: 1, height: "auto" },
    }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    // Prevent clicking icons from toggling the card closed
    onClick={(e) => e.stopPropagation()}
  >
    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
      <Facebook size={18} />
    </a>
    <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
      <Instagram size={18} />
    </a>
    <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
      <Twitter size={18} />
    </a>
  </motion.div>
);

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto flex flex-col items-center group cursor-pointer"
      initial="initial"
      // We control the animation state manually to support both hover and click
      animate={isHovered ? "hover" : "initial"}
      // Desktop Hover Events
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Mobile/Tablet Tap Event (Toggle)
      onClick={() => setIsHovered(!isHovered)}
      // Accessibility
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0} // Make focusable
    >
      <motion.div
        className="relative z-10 w-full aspect-[3/4] overflow-hidden rounded-t-2xl"
        variants={{
          initial: { scale: 1, y: 0 },
          hover: { scale: 1.05, y: -10 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      <motion.div
        className="relative z-20 w-full -mt-12 bg-white rounded-xl shadow-xl pb-6 px-6 text-center"
        variants={{
          initial: { y: 0 },
          hover: { y: -32 },
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm z-30">
          <motion.div
            variants={{
              initial: { rotate: 0 },
              hover: { rotate: 180 },
            }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <ChevronUp size={20} className="text-gray-800" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="mt-8">
          <motion.h3
            className="text-xl font-bold uppercase tracking-tight text-gray-900"
            variants={{
              initial: { color: "#111827" },
              hover: { color: "#FA8C42" },
            }}
          >
            {member.name}
          </motion.h3>

          <p className="text-gray-500 font-medium text-sm mt-1">
            {member.role}
          </p>

          <SocialIcons />
        </div>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-orange-500 rounded-t-md"
          variants={{
            initial: { width: "20%" },
            hover: {
              width: "100%",
              borderBottomLeftRadius: "0.75rem",
              borderBottomRightRadius: "0.75rem",
            },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export const TeamSection = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mx-auto">
            Our talented team of experts is dedicated to delivering the best
            results for your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
