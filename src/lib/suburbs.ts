export type Suburb = {
  name: string;
  slug: string;
  tier: "A" | "B";
  live: boolean;
};

// Batch 1A Suburbs: Brighton, North Melbourne, Cheltenham, Essendon (We leave them false for now as per instructions "All flags start false. As each build batch deploys... flip those suburbs to live: true")
export const SUBURBS: Suburb[] = [
  // Tier A (14 Suburbs)
  { name: "Brighton", slug: "brighton", tier: "A", live: true },
  { name: "North Melbourne", slug: "north-melbourne", tier: "A", live: true },
  { name: "Cheltenham", slug: "cheltenham", tier: "A", live: true },
  { name: "Essendon", slug: "essendon", tier: "A", live: true },
  { name: "Maribyrnong", slug: "maribyrnong", tier: "A", live: false },
  { name: "Bundoora", slug: "bundoora", tier: "A", live: false },
  { name: "Hampton", slug: "hampton", tier: "A", live: false },
  { name: "Brunswick", slug: "brunswick", tier: "A", live: false },
  { name: "Malvern", slug: "malvern", tier: "A", live: false },
  { name: "Point Cook", slug: "point-cook", tier: "A", live: false },
  { name: "Preston", slug: "preston", tier: "A", live: false },
  { name: "South Yarra", slug: "south-yarra", tier: "A", live: false },
  { name: "Toorak", slug: "toorak", tier: "A", live: false },
  { name: "Melbourne CBD", slug: "melbourne-cbd", tier: "A", live: false },

  // Tier B (35 Suburbs)
  { name: "Doncaster", slug: "doncaster", tier: "B", live: false },
  { name: "Doncaster East", slug: "doncaster-east", tier: "B", live: false },
  { name: "Mount Waverley", slug: "mount-waverley", tier: "B", live: false },
  { name: "Kew", slug: "kew", tier: "B", live: false },
  { name: "Hawthorn", slug: "hawthorn", tier: "B", live: false },
  { name: "Camberwell", slug: "camberwell", tier: "B", live: false },
  { name: "Glen Iris", slug: "glen-iris", tier: "B", live: false },
  { name: "Glen Waverley", slug: "glen-waverley", tier: "B", live: false },
  { name: "Bentleigh East", slug: "bentleigh-east", tier: "B", live: false },
  { name: "Moonee Ponds", slug: "moonee-ponds", tier: "B", live: false },
  { name: "Reservoir", slug: "reservoir", tier: "B", live: false },
  { name: "Caroline Springs", slug: "caroline-springs", tier: "B", live: false },
  { name: "Greensborough", slug: "greensborough", tier: "B", live: false },
  { name: "Footscray", slug: "footscray", tier: "B", live: false },
  { name: "Templestowe", slug: "templestowe", tier: "B", live: false },
  { name: "Balwyn North", slug: "balwyn-north", tier: "B", live: false },
  { name: "Brooklyn", slug: "brooklyn", tier: "B", live: false },
  { name: "Coburg", slug: "coburg", tier: "B", live: false },
  { name: "St Albans", slug: "st-albans", tier: "B", live: false },
  { name: "Mernda", slug: "mernda", tier: "B", live: false },
  { name: "Chelsea", slug: "chelsea", tier: "B", live: false },
  { name: "Ringwood", slug: "ringwood", tier: "B", live: false },
  { name: "Strathmore", slug: "strathmore", tier: "B", live: false },
  { name: "Werribee", slug: "werribee", tier: "B", live: false },
  { name: "Croydon", slug: "croydon", tier: "B", live: false },
  { name: "Windsor", slug: "windsor", tier: "B", live: false },
  { name: "Craigieburn", slug: "craigieburn", tier: "B", live: false },
  { name: "Richmond", slug: "richmond", tier: "B", live: false },
  { name: "Albert Park", slug: "albert-park", tier: "B", live: false },
  { name: "Carnegie", slug: "carnegie", tier: "B", live: false },
  { name: "Sandringham", slug: "sandringham", tier: "B", live: false },
  { name: "Box Hill", slug: "box-hill", tier: "B", live: false },
  { name: "Oakleigh", slug: "oakleigh", tier: "B", live: false },
  { name: "Yarraville", slug: "yarraville", tier: "B", live: false },
  { name: "Ivanhoe", slug: "ivanhoe", tier: "B", live: false },
];

export const getLiveSuburbs = () => SUBURBS.filter((s) => s.live);
export const getLiveSuburbsByTier = (tier: "A" | "B") => getLiveSuburbs().filter((s) => s.tier === tier);
