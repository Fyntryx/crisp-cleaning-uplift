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
      { name: "Richmond", slug: "richmond" },
      { name: "South Yarra", slug: "south-yarra" },
      { name: "Windsor", slug: "windsor" }
    ]
  },
  {
    region: "South & Bayside",
    icon: DirectionIcon,
    iconProps: { direction: 'S' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [
      { name: "Albert Park", slug: "albert-park" },
      { name: "Bentleigh East", slug: "bentleigh-east" },
      { name: "Brighton", slug: "brighton" },
      { name: "Carnegie", slug: "carnegie" },
      { name: "Cheltenham", slug: "cheltenham" },
      { name: "Glen Iris", slug: "glen-iris" },
      { name: "Hampton", slug: "hampton" },
      { name: "Hawthorn", slug: "hawthorn" },
      { name: "Kew", slug: "kew" },
      { name: "Malvern", slug: "malvern" },
      { name: "Oakleigh", slug: "oakleigh" },
      { name: "Sandringham", slug: "sandringham" },
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
      { name: "Coburg", slug: "coburg" },
      { name: "Craigieburn", slug: "craigieburn" },
      { name: "Greensborough", slug: "greensborough" },
      { name: "Ivanhoe", slug: "ivanhoe" },
      { name: "Mernda", slug: "mernda" },
      { name: "Preston", slug: "preston" },
      { name: "Reservoir", slug: "reservoir" }
    ]
  },
  {
    region: "East & South-East",
    icon: DirectionIcon,
    iconProps: { direction: 'E' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [
      { name: "Balwyn North", slug: "balwyn-north" },
      { name: "Box Hill", slug: "box-hill" },
      { name: "Camberwell", slug: "camberwell" },
      { name: "Chelsea", slug: "chelsea" },
      { name: "Croydon", slug: "croydon" },
      { name: "Doncaster", slug: "doncaster" },
      { name: "Doncaster East", slug: "doncaster-east" },
      { name: "Glen Waverley", slug: "glen-waverley" },
      { name: "Mount Waverley", slug: "mount-waverley" },
      { name: "Ringwood", slug: "ringwood" },
      { name: "Templestowe", slug: "templestowe" }
    ]
  },
  {
    region: "West & North-West",
    icon: DirectionIcon,
    iconProps: { direction: 'W' as const },
    iconClass: "text-[#FB8C42]",
    suburbs: [
      { name: "Brooklyn", slug: "brooklyn" },
      { name: "Caroline Springs", slug: "caroline-springs" },
      { name: "Essendon", slug: "essendon" },
      { name: "Footscray", slug: "footscray" },
      { name: "Maribyrnong", slug: "maribyrnong" },
      { name: "Moonee Ponds", slug: "moonee-ponds" },
      { name: "Point Cook", slug: "point-cook" },
      { name: "St Albans", slug: "st-albans" },
      { name: "Strathmore", slug: "strathmore" },
      { name: "Werribee", slug: "werribee" },
      { name: "Yarraville", slug: "yarraville" }
    ]
  }
];
