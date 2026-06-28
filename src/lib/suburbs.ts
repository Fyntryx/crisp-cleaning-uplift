export interface Suburb {
  name: string;
  slug: string;
  live: boolean;
  path?: string;
}

export const suburbs: Suburb[] = [
  // Tier A - 14 Suburbs
  { name: "Brighton", slug: "brighton", live: true },
  { name: "North Melbourne", slug: "north-melbourne", live: true },
  { name: "Cheltenham", slug: "cheltenham", live: true },
  { name: "Essendon", slug: "essendon", live: true },
  { name: "Maribyrnong", slug: "maribyrnong", live: true },
  { name: "Bundoora", slug: "bundoora", live: true },
  { name: "Hampton", slug: "hampton", live: true },
  { name: "Brunswick", slug: "brunswick", live: true },
  { name: "Malvern", slug: "malvern", live: true },
  { name: "Point Cook", slug: "point-cook", live: true },
  { name: "Preston", slug: "preston", live: true },
  { name: "South Yarra", slug: "south-yarra", live: true },
  { name: "Toorak", slug: "toorak", live: true },
  { name: "Melbourne CBD", slug: "melbourne-cbd", live: true, path: "/apartment-cleaning-melbourne-cbd" },

  // Tier B - 35 Suburbs
  { name: "Doncaster", slug: "doncaster", live: false },
  { name: "Doncaster East", slug: "doncaster-east", live: false },
  { name: "Mount Waverley", slug: "mount-waverley", live: false },
  { name: "Kew", slug: "kew", live: false },
  { name: "Hawthorn", slug: "hawthorn", live: false },
  { name: "Camberwell", slug: "camberwell", live: false },
  { name: "Glen Iris", slug: "glen-iris", live: false },
  { name: "Glen Waverley", slug: "glen-waverley", live: false },
  { name: "Bentleigh East", slug: "bentleigh-east", live: false },
  { name: "Moonee Ponds", slug: "moonee-ponds", live: false },
  { name: "Reservoir", slug: "reservoir", live: false },
  { name: "Caroline Springs", slug: "caroline-springs", live: false },
  { name: "Greensborough", slug: "greensborough", live: false },
  { name: "Footscray", slug: "footscray", live: false },
  { name: "Templestowe", slug: "templestowe", live: false },
  { name: "Balwyn North", slug: "balwyn-north", live: false },
  { name: "Brooklyn", slug: "brooklyn", live: false },
  { name: "Coburg", slug: "coburg", live: false },
  { name: "St Albans", slug: "st-albans", live: false },
  { name: "Mernda", slug: "mernda", live: false },
  { name: "Chelsea", slug: "chelsea", live: false },
  { name: "Ringwood", slug: "ringwood", live: false },
  { name: "Strathmore", slug: "strathmore", live: false },
  { name: "Werribee", slug: "werribee", live: false },
  { name: "Croydon", slug: "croydon", live: false },
  { name: "Windsor", slug: "windsor", live: false },
  { name: "Craigieburn", slug: "craigieburn", live: false },
  { name: "Richmond", slug: "richmond", live: false },
  { name: "Albert Park", slug: "albert-park", live: false },
  { name: "Carnegie", slug: "carnegie", live: false },
  { name: "Sandringham", slug: "sandringham", live: false },
  { name: "Box Hill", slug: "box-hill", live: false },
  { name: "Oakleigh", slug: "oakleigh", live: false },
  { name: "Yarraville", slug: "yarraville", live: false },
  { name: "Ivanhoe", slug: "ivanhoe", live: false }
];

export function getLiveSuburbs(): Suburb[] {
  return suburbs.filter(suburb => suburb.live);
}
