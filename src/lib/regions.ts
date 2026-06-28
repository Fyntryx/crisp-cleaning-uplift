import DirectionIcon from "@/components/ui/DirectionIcon";

export const serviceRegions = [
  {
    region: "Central Melbourne",
    icon: DirectionIcon,
    iconProps: { direction: 'C' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [
      { name: "Melbourne CBD", slug: "melbourne-cbd", path: "/apartment-cleaning-melbourne-cbd" },
      { name: "North Melbourne", slug: "north-melbourne" },
      { name: "South Yarra", slug: "south-yarra" }
    ]
  },
  {
    region: "South & Bayside",
    icon: DirectionIcon,
    iconProps: { direction: 'S' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [
      { name: "Brighton", slug: "brighton" },
      { name: "Cheltenham", slug: "cheltenham" },
      { name: "Hampton", slug: "hampton" },
      { name: "Malvern", slug: "malvern" },
      { name: "Toorak", slug: "toorak" }
    ]
  },
  {
    region: "North & North-East",
    icon: DirectionIcon,
    iconProps: { direction: 'N' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [
      { name: "Brunswick", slug: "brunswick" },
      { name: "Bundoora", slug: "bundoora" },
      { name: "Preston", slug: "preston" }
    ]
  },
  {
    region: "East & South-East",
    icon: DirectionIcon,
    iconProps: { direction: 'E' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [] as { name: string, slug: string, path?: string }[]
  },
  {
    region: "West & North-West",
    icon: DirectionIcon,
    iconProps: { direction: 'W' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [
      { name: "Essendon", slug: "essendon" },
      { name: "Maribyrnong", slug: "maribyrnong" },
      { name: "Point Cook", slug: "point-cook" }
    ]
  }
];
